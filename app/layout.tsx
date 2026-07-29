import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/context/LanguageContext';
import { ThemeProvider } from '@/context/ThemeContext';

export const metadata: Metadata = {
  title: 'VSZAPOWER | Smart Coin Cell Charger & Rechargeable Batteries (LIR2032/LIR2450)',
  description: 'Specialized smart coin cell chargers and rechargeable LIR series batteries for AirTags, car key fobs, and smart devices. 500+ recharge cycles.',
  keywords: [
    'LIR2032 charger',
    'rechargeable coin cell battery',
    'CR2032 rechargeable replacement',
    'AirTag battery charger',
    'Car key fob rechargeable battery',
    'LIR2450 charger kit',
    'ML2032 charger',
    'LIR1632 charger',
    'LIR1220 charger'
  ],
  authors: [{ name: 'Vszapower Tech Team' }],
  openGraph: {
    title: 'Vszapower Smart Coin Cell Charger & Rechargeable Batteries',
    description: 'Stop throwing away button batteries. Reusable LIR2032 & LIR2450 charger kit with eco papercard packaging.',
    url: 'https://www.vszapower.com',
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
    name: 'VSZAPOWER',
    url: 'https://www.vszapower.com',
    logo: 'https://www.vszapower.com/logo.png',
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
        <ThemeProvider>
          <LanguageProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
