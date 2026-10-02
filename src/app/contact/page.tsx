import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Send a message to Estara-AI.',
};

export default function ContactPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-band pt-32 pb-16 text-white md:pt-40 md:pb-20">
        <div className="grid-bg absolute inset-0 -z-10" aria-hidden="true" />
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">Contact</p>
          <h1 className="mt-4 font-serif text-5xl leading-tight md:text-6xl">Send us a message</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-300">
            Tell us what you have in mind. We will reply by email.
          </p>
        </div>
      </section>
      <section className="px-5 py-16 md:py-24">
        <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-white p-6 shadow-[0_4px_12px_rgba(0,0,0,.08)] sm:p-10">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
