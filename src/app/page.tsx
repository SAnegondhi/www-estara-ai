import Link from 'next/link';

const products = [
  {
    name: 'Prism Desk',
    href: 'https://www.prismdesk.io',
    tag: 'Remote computing',
    text: 'A self-hosted remote desktop that behaves like a cloud app while staying entirely yours, with no vendor cloud in the middle.',
  },
  {
    name: 'FacultyOS',
    href: 'https://www.faculty-os.com',
    tag: 'Academic teams',
    text: 'Publications, grants and clinical trials for an entire team, drawn from existing documents and public sources, ready when it is time to write the letter.',
  },
];

const adoption = [
  {
    title: 'Built for professionals',
    text: 'Tools shaped around how people in their field already work, not around what a model happens to do well.',
  },
  {
    title: 'Easier to start',
    text: 'The aim is simple: lower the effort it takes for a professional to put AI to useful work.',
  },
  {
    title: 'Useful first',
    text: 'We build products and tools that solve a real problem for the person using them.',
  },
];

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-band pt-32 pb-24 text-white md:pt-44 md:pb-36">
        <div className="grid-bg absolute inset-0 -z-10" aria-hidden="true" />
        <div
          className="absolute left-1/2 top-0 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="mx-auto max-w-6xl px-5">
          <p className="rise text-xs font-semibold uppercase tracking-[0.28em] text-gold">Estara-AI</p>
          <h1 className="rise mt-6 max-w-4xl font-serif text-5xl leading-[1.05] sm:text-6xl md:text-7xl" style={{ animationDelay: '80ms' }}>
            Useful products and tools.
            <br />
            <span className="gold-text italic">Now, AI made easier</span> for professionals.
          </h1>
          <p className="rise mt-8 max-w-2xl text-lg leading-relaxed text-slate-300" style={{ animationDelay: '160ms' }}>
            We build products and tools people actually use. Our current work is making AI adoption easier for professionals.
          </p>
          <div className="rise mt-10 flex flex-wrap gap-4" style={{ animationDelay: '240ms' }}>
            <Link href="#products" className="rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-band transition hover:brightness-110">
              See our products
            </Link>
            <Link href="/contact" className="rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white/60 hover:bg-white/5">
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="scroll-mt-16 px-5 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-dk">Products</p>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight md:text-5xl">Tools we have built</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {products.map((p) => (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-2xl border border-border bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,.06)] transition hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(15,23,42,.12)]"
              >
                <span className="w-fit rounded-full bg-blue/10 px-3 py-1 text-xs font-semibold text-blue-dk">{p.tag}</span>
                <h3 className="mt-5 font-serif text-3xl">{p.name}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-slate">{p.text}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-blue transition group-hover:gap-3">
                  Visit {p.name} <Arrow />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* AI adoption */}
      <section id="ai-adoption" className="relative isolate scroll-mt-16 overflow-hidden bg-band px-5 py-24 text-white md:py-32">
        <div className="grid-bg absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">What we are working on</p>
          <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight md:text-5xl">
            Making AI adoption easier for professionals
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {adoption.map((a, i) => (
              <div key={a.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-8">
                <span className="font-serif text-4xl text-gold">0{i + 1}</span>
                <h3 className="mt-5 text-lg font-semibold">{a.title}</h3>
                <p className="mt-3 leading-relaxed text-slate-300">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-4xl leading-tight md:text-5xl">Want to talk?</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate">
            Questions, ideas or a problem worth solving. Send us a message and we will read it.
          </p>
          <Link href="/contact" className="mt-9 inline-block rounded-full bg-band px-8 py-4 text-sm font-semibold text-white transition hover:bg-navy">
            Contact us
          </Link>
        </div>
      </section>
    </>
  );
}
