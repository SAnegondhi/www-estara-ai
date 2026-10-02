import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function limited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function clean(v: unknown, max: number): string {
  return typeof v === 'string' ? v.replace(/[\r\n]+/g, ' ').trim().slice(0, max) : '';
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (limited(ip)) {
    return NextResponse.json({ error: 'Too many messages in a short time. Please wait a few minutes and try again.' }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'The form could not be read. Please reload the page and try again.' }, { status: 400 });
  }

  // Honeypot: pretend success so bots learn nothing.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const subject = clean(body.subject, 150);
  const message = typeof body.message === 'string' ? body.message.trim().slice(0, 5000) : '';

  if (!name) return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 });
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: 'Please enter a valid email address so we can reply.' }, { status: 400 });
  if (message.length < 10) return NextResponse.json({ error: 'Please write a little more in your message.' }, { status: 400 });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.RESEND_FROM;
  if (!apiKey || !to || !from) {
    console.error('contact: RESEND_API_KEY, CONTACT_TO_EMAIL or RESEND_FROM is not set');
    return NextResponse.json({ error: 'Messages cannot be delivered right now. Please try again later.' }, { status: 503 });
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `[estara-ai.com] ${subject || 'New message'} — ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><strong>${esc(name)}</strong> &lt;${esc(email)}&gt;</p><p style="white-space:pre-wrap">${esc(message)}</p>`,
    }),
  });

  if (!res.ok) {
    console.error('contact: Resend responded', res.status, await res.text());
    return NextResponse.json({ error: 'Your message could not be sent. Please try again in a few minutes.' }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
