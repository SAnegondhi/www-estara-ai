import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-band-2 text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="" width={32} height={32} className="rounded-lg" />
          <div>
            <p className="text-sm font-semibold tracking-[0.18em] text-white">ESTARA-AI</p>
            <p className="text-sm">Useful products and tools.</p>
          </div>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
          <Link href="/#products" className="hover:text-white">Products</Link>
          <Link href="/#ai-adoption" className="hover:text-white">AI adoption</Link>
          <Link href="/contact" className="hover:text-white">Contact</Link>
        </nav>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs">
        © {new Date().getFullYear()} Estara-AI. All rights reserved.
      </div>
    </footer>
  );
}
