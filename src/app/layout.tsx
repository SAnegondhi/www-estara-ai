import type { Metadata, Viewport } from 'next';
import { Instrument_Serif, DM_Sans } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const description =
  'Estara-AI builds useful products and tools, and is now building tools that make AI adoption easier for professionals.';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.estara-ai.com'),
  title: { default: 'Estara-AI — Useful products and tools', template: '%s · Estara-AI' },
  description,
  openGraph: { title: 'Estara-AI', description, type: 'website', siteName: 'Estara-AI' },
  twitter: { card: 'summary', title: 'Estara-AI', description },
};

export const viewport: Viewport = { themeColor: '#091428' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${dmSans.variable}`}>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
