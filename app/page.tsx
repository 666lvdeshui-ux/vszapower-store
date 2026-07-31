'use client';

import React, { useState } from 'react';
import HeroCarousel from '@/components/HeroCarousel';
import ProductGrid from '@/components/ProductGrid';
import FactoryShowcase from '@/components/FactoryShowcase';
import CertificationsSection from '@/components/CertificationsSection';
import VideoSection from '@/components/VideoSection';
import ContactSection from '@/components/ContactSection';
import BlogPreview from '@/components/BlogPreview';
import CatalogDownloadModal from '@/components/CatalogDownloadModal';
import { Download, FileText } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translateDynamicContent } from '@/lib/dynamicI18n';

export default function HomePage() {
  const { lang } = useLanguage();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');

  const handleOpenContact = (productName?: string) => {
    if (productName) {
      setSelectedProduct(productName);
    }
    setIsContactModalOpen(true);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-main)', color: 'var(--text-main)', position: 'relative' }}>
      {/* 1. Hero Carousel Banner */}
      <HeroCarousel onContactClick={handleOpenContact} />

      {/* 2. B2B Product Catalog Grid (MOQ: 100 Pcs / Wholesale Quotes) */}
      <ProductGrid onContactClick={handleOpenContact} />

      {/* 3. Factory Showcase & OEM/ODM Customization Base */}
      <FactoryShowcase onContactClick={handleOpenContact} />

      {/* 4. Global Safety & Transport Certifications (CE, FCC, RoHS, UN38.3, MSDS) */}
      <CertificationsSection />

      {/* 5. Short Video Showcase */}
      <VideoSection onContactClick={handleOpenContact} />

      {/* 6. Battery Academy Technical Articles */}
      <BlogPreview />

      {/* 7. Direct Contact & B2B Inquiry Form */}
      <ContactSection />

      {/* Floating Lead Magnet Widget: Download PDF Catalog */}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 90,
      }}>
        <button
          onClick={() => setIsCatalogModalOpen(true)}
          className="btn-primary"
          style={{
            padding: '12px 20px',
            fontSize: '0.9rem',
            borderRadius: '30px',
            boxShadow: '0 10px 25px rgba(0, 230, 153, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <FileText size={18} /> {translateDynamicContent('Download 2026 Catalog (PDF)', lang)}
        </button>
      </div>

      {/* Pop-up Contact Inquiry Modal */}
      {isContactModalOpen && (
        <ContactSection
          isOpenModal={true}
          onCloseModal={() => setIsContactModalOpen(false)}
          prefilledProduct={selectedProduct}
        />
      )}

      {/* PDF Catalog Download Lead Capture Modal */}
      <CatalogDownloadModal
        isOpen={isCatalogModalOpen}
        onClose={() => setIsCatalogModalOpen(false)}
      />
    </div>
  );
}
