'use client';

import { useState } from 'react';

type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent' } | { kind: 'error'; message: string };

const field =
  'mt-2 w-full rounded-lg border border-border bg-white px-4 py-3 text-base text-navy outline-none transition placeholder:text-silver focus:border-blue focus:ring-2 focus:ring-blue/20';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus({ kind: 'sending' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus({ kind: 'error', message: body.error ?? 'Your message could not be sent. Please try again in a few minutes.' });
        return;
      }
      form.reset();
      setStatus({ kind: 'sent' });
    } catch {
      setStatus({ kind: 'error', message: 'We could not reach the server. Check your connection and try again.' });
    }
  }

  if (status.kind === 'sent') {
    return (
      <div role="status" className="py-10 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-green-100 text-green-700">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12l5 5 9-10" />
          </svg>
        </div>
        <h2 className="mt-6 font-serif text-3xl">Message sent</h2>
        <p className="mt-3 text-slate">Thank you. We will reply by email.</p>
        <button type="button" onClick={() => setStatus({ kind: 'idle' })} className="mt-8 text-sm font-semibold text-blue hover:underline">
          Send another message
        </button>
      </div>
    );
  }

  const sending = status.kind === 'sending';

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate={false}>
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          Name
          <input name="name" type="text" required maxLength={120} autoComplete="name" className={field} placeholder="Your name" />
        </label>
        <label className="block text-sm font-medium">
          Email
          <input name="email" type="email" required maxLength={200} autoComplete="email" className={field} placeholder="you@example.com" />
        </label>
      </div>
      <label className="block text-sm font-medium">
        Subject <span className="font-normal text-slate">(optional)</span>
        <input name="subject" type="text" maxLength={150} className={field} placeholder="What is this about?" />
      </label>
      <label className="block text-sm font-medium">
        Message
        <textarea name="message" required minLength={10} maxLength={5000} rows={7} className={field} placeholder="How can we help?" />
      </label>

      {/* Honeypot: hidden from people, filled by bots. */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Leave this empty
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status.kind === 'error' && (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {status.message}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="w-full rounded-full bg-band px-8 py-4 text-sm font-semibold text-white transition hover:bg-navy disabled:opacity-60 sm:w-auto"
      >
        {sending ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}
