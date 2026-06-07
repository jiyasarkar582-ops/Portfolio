import type { Metadata } from 'next';
import { Outfit, Inter } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-outfit',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Jiya Sarkar | Creative Developer & IoT Engineer',
  description: 'Portfolio of Jiya Sarkar, B.Tech Computer Science (IoT) student. Designing immersive 3D interfaces, intelligent web frontends, and machine learning applications.',
  keywords: [
    'Jiya Sarkar',
    'Creative Developer',
    'IoT Engineer',
    'Portfolio',
    'Next.js',
    'Three.js',
    'GSAP',
    'AgroMind',
    'ReliefChain',
    'Kolkata',
  ],
  authors: [{ name: 'Jiya Sarkar' }],
  creator: 'Jiya Sarkar',
  metadataBase: new URL('https://github.com/jiyasarkar582-ops'),
  openGraph: {
    title: 'Jiya Sarkar | Creative Developer & IoT Engineer',
    description: 'B.Tech CSE (IoT) Specialization • Building Intelligent Frontend & AI Systems.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
