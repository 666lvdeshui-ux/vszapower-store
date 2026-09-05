import type { Metadata } from 'next';
import './globals.css';
import StorefrontShell from '@/components/StorefrontShell';
import { LanguageProvider } from '@/context/LanguageContext';
import { ThemeProvider } from '@/context/ThemeContext';


export const metadata: Metadata = {
  metadataBase: new URL('https://www.vszapower.com'),
  alternates: {
    canonical: 'https://www.vszapower.com',
  },
  title: 'LIR2032 Charger & Rechargeable Batteries B2B Wholesale | VSZAPOWER Official',
  description: 'Specialized smart coin cell chargers and rechargeable LIR series batteries for AirTags, car key fobs, and smart devices. Rated 4.93/5 by 1,480+ verified buyers.',
  keywords: [
    'VSZAPOWER',
    'LIR2032 charger',
    'LIR2450 charger',
    'rechargeable coin cell charger',
    'AirTag battery charger',
    'rechargeable CR2032',
    'button cell charger dock',
    'VSZAPOWER wholesale',
    'VSZAPOWER customer reviews',
    'LIR2032 battery 3.6V',
  ],
  authors: [{ name: 'VSZAPOWER Team' }],
  verification: {
    google: 'L-Yl1DYsP2qOeWvEKjhXMpOEsuML91WJVhw7Pzp4cn8',
  },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/icon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'VSZAPOWER Smart Rechargeable Coin Cell Chargers & LIR Batteries (MOQ: 100 Pcs)',
    description: 'Rated 4.93/5.0 by 1,480+ verified buyers. Reusable LIR2032 & LIR2450 charger kit with 35-min fast charge for AirTags & car key fobs.',
    url: 'https://www.vszapower.com',
    siteName: 'VSZAPOWER Store',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vszapower Smart Coin Cell Charger & Rechargeable Batteries (4.93★ Customer Reviews)',
    description: 'Rated 4.93/5.0 by 1,480+ verified buyers. Reusable LIR2032 & LIR2450 charger kit with 35-min fast charge for AirTags & car key fobs.',
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
            <StorefrontShell>{children}</StorefrontShell>
          </LanguageProvider>
        </ThemeProvider>

      </body>
    </html>
  );
}
