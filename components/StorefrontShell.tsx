'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GeoSeoStructuredData from '@/components/GeoSeoStructuredData';
import AnalyticsTracker from '@/components/AnalyticsTracker';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

export default function StorefrontShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname ? pathname.startsWith('/admin') : false;

  if (isAdminRoute) {
    return (
      <>
        {children}
      </>
    );
  }

  return (
    <>
      <AnalyticsTracker />
      <GeoSeoStructuredData />
      <Header />
      <main>{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
