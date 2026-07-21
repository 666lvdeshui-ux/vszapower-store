'use client';

import React, { useState } from 'react';
import HeroCarousel from '@/components/HeroCarousel';
import ProductGrid from '@/components/ProductGrid';
import ContactSection from '@/components/ContactSection';
import BlogPreview from '@/components/BlogPreview';

export default function HomePage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');

  const handleOpenContact = (productName?: string) => {
    if (productName) {
      setSelectedProduct(productName);
    }
    setIsContactModalOpen(true);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-main)', color: 'var(--text-main)' }}>
      {/* 1. Hero Carousel Banner */}
      <HeroCarousel onContactClick={handleOpenContact} />

      {/* 2. Product Catalog List with Specs Modal & 'Click to Contact' Buttons */}
      <ProductGrid onContactClick={handleOpenContact} />

      {/* 3. Battery Academy Feature Highlights */}
      <BlogPreview />

      {/* 4. Direct Contact Us Section */}
      <ContactSection />

      {/* Pop-up Contact Inquiry Modal */}
      {isContactModalOpen && (
        <ContactSection
          isOpenModal={true}
          onCloseModal={() => setIsContactModalOpen(false)}
          prefilledProduct={selectedProduct}
        />
      )}
    </div>
  );
}
