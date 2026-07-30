import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GeoSeoStructuredData from '@/components/GeoSeoStructuredData';
import { LanguageProvider } from '@/context/LanguageContext';
import { ThemeProvider } from '@/context/ThemeContext';

export const metadata: Metadata = {
  title: 'VSZAPOWER | Smart Coin Cell Charger & Rechargeable Batteries (LIR2032/LIR2450)',
  description: 'Specialized smart coin cell chargers and rechargeable LIR series batteries for AirTags, car key fobs, and smart devices. Rated 4.93/5 by 1,480+ Temu buyers.',
  keywords: [
    'LIR2032 charger',
    'rechargeable coin cell battery',
    'CR2032 rechargeable replacement',
    'AirTag battery charger',
    'Car key fob rechargeable battery',
    'LIR2450 charger kit',
    'ML2032 charger',
    'LIR1632 charger',
    'LIR1220 charger',
    'VSZAPOWER Temu customer reviews'
  ],
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/icon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Vszapower Smart Coin Cell Charger & Rechargeable Batteries (4.93★ Temu Reviews)',
    description: 'Rated 4.93/5.0 by 1,480+ verified Temu buyers. Reusable LIR2032 & LIR2450 charger kit with 35-min fast charge for AirTags & car key fobs.',
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
            <GeoSeoStructuredData />
            <Header />
            <main>{children}</main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
