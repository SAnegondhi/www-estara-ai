'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const links = [
  { href: '/#products', label: 'Products' },
  { href: '/#ai-adoption', label: 'AI adoption' },
  { href: '/contact', label: 'Contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-band/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-3 text-white" onClick={() => setOpen(false)}>
          <Image src="/logo.png" alt="" width={36} height={36} className="rounded-lg" priority />
          <span className="text-[15px] font-semibold tracking-[0.18em]">ESTARA-AI</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {links.slice(0, 2).map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-slate-300 transition hover:text-white">
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-full bg-gold px-5 py-2 text-sm font-semibold text-band transition hover:brightness-110"
          >
            Contact
          </Link>
        </nav>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-lg text-white md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-white/10 bg-band px-5 pb-5 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-white/5 py-4 text-base text-slate-200"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
