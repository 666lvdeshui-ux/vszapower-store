import type { Metadata } from 'next';
import './globals.css';
import StorefrontShell from '@/components/StorefrontShell';
import { LanguageProvider } from '@/context/LanguageContext';
import { ThemeProvider } from '@/context/ThemeContext';


export const metadata: Metadata = {
 metadataBase:new URL('https://www.vszapower.com'), alternates:{canonical:'https://www.vszapower.com'},
 title:'Coin Cell Chargers & Rechargeable Batteries | VSZAPOWER', description:'VSZAPOWER rechargeable coin-cell charger and battery solutions for wholesale and OEM projects. Explore model-specific test documentation.',
 verification:{google:'L-Yl1DYsP2qOeWvEKjhXMpOEsuML91WJVhw7Pzp4cn8'}, icons:{icon:'/favicon.png',apple:'/apple-icon.png'}
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {'@context':'https://schema.org','@graph':[
 {'@type':'Organization','@id':'https://www.vszapower.com/#organization',name:'VSZAPOWER',legalName:'Shenzhen Weizan Technology Co., Ltd.',description:'Rechargeable coin cell batteries, charging solutions, OEM/ODM and private-label supply',url:'https://www.vszapower.com/about-vszapower',brand:{'@id':'https://www.vszapower.com/#brand'}},
 {'@type':'Brand','@id':'https://www.vszapower.com/#brand',name:'VSZAPOWER',logo:'https://www.vszapower.com/logo.svg'},
 {'@type':'WebSite','@id':'https://www.vszapower.com/#website',name:'VSZAPOWER',url:'https://www.vszapower.com',publisher:{'@id':'https://www.vszapower.com/#organization'}}]};

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
