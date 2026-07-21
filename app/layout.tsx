import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Vszapower | Smart Coin Cell Charger & LIR Rechargeable Batteries',
  description: 'Upgrade your Apple AirTags & Car Key Fobs to rechargeable LIR2032 batteries. Smart 3.6V-4.2V micro-chip USB dual-slot charger with eco-friendly kraft packaging.',
  keywords: [
    'LIR2032 charger',
    'rechargeable coin cell battery',
    'CR2032 rechargeable replacement',
    'AirTag battery charger',
    'Car key fob rechargeable battery',
    'LIR2450 charger kit'
  ],
  authors: [{ name: 'Vszapower Tech Team' }],
  openGraph: {
    title: 'Vszapower Smart Coin Cell Charger & Rechargeable Batteries',
    description: 'Stop throwing away button batteries. Reusable LIR2032 & LIR2450 charger kit with eco papercard packaging.',
    url: 'https://vszapower.vercel.app',
    siteName: 'Vszapower',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Vszapower',
    url: 'https://vszapower.vercel.app',
    logo: 'https://vszapower.vercel.app/logo.png',
    description: 'Specialized smart coin cell chargers and rechargeable LIR series batteries for AirTags, car key fobs, and smart devices.',
    sameAs: [
      'https://www.tiktok.com/@vszapower',
      'https://reddit.com/r/electronic'
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
