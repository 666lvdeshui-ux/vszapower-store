'use client';

import React, { useState, useEffect } from 'react';
import { ProductItem, CertificationItem, getCleanImageUrl } from '@/lib/store';
import { MessageSquare, Info, Zap, X, Filter, ShieldCheck, ChevronLeft, ChevronRight, Maximize2, Award, Star, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { localizeProduct } from '@/lib/productI18n';
import productUi from '@/content/products/translations/ui.json';
import ReviewSection from './ReviewSection';

interface ProductGridProps {
  onContactClick: (productName?: string) => void;
}

export default function ProductGrid({ onContactClick }: ProductGridProps) {
  const { lang, t } = useLanguage();
  const copy = (key: keyof typeof productUi.en) => (productUi as Record<string, typeof productUi.en>)[lang]?.[key] || productUi.en[key];
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProductSource, setSelectedProduct] = useState<ProductItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const selectedProduct = selectedProductSource ? localizeProduct(selectedProductSource, lang) : null;
  
  // Carousel & Lightbox State for Detail Modal
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string } | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const [lightboxList, setLightboxList] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(json => {
        if (json.success && json.data) {
          setProducts(json.data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));

    // Listen to hash / query changes in URL
    const checkHash = () => {
      const hash = window.location.hash;
      if (hash.includes('cat=charger')) {
        setSelectedCategory('纽扣电池充电器');
      } else if (hash.includes('cat=battery')) {
        setSelectedCategory('可充电纽扣电池');
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const openProductModal = (product: ProductItem) => {
    setSelectedProduct(product);
    setActiveImageIndex(0);
  };

  const openLightbox = (urlList: string[], index: number, title?: string) => {
    setLightboxList(urlList);
    setLightboxIndex(index);
    setLightboxImage({ url: urlList[index], title: title || copy('zoom') });
  };

  const nextLightboxImage = () => {
    if (lightboxList.length <= 1) return;
    const nextIdx = (lightboxIndex + 1) % lightboxList.length;
    setLightboxIndex(nextIdx);
    setLightboxImage({ url: lightboxList[nextIdx], title: lightboxImage?.title || copy('zoom') });
  };

  const prevLightboxImage = () => {
    if (lightboxList.length <= 1) return;
    const prevIdx = (lightboxIndex - 1 + lightboxList.length) % lightboxList.length;
    setLightboxIndex(prevIdx);
    setLightboxImage({ url: lightboxList[prevIdx], title: lightboxImage?.title || copy('zoom') });
  };

  const filteredProducts = products.filter(p => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === '纽扣电池充电器') {
      return p.category === '纽扣电池充电器' || p.is_starter_kit || p.title.includes('Charger') || p.title.includes('Dock') || p.title.includes('充电器');
    }
    if (selectedCategory === '可充电纽扣电池') {
      return p.category === '可充电纽扣电池' || p.title.includes('Batteries') || p.title.includes('Cells') || p.title.includes('Pack') || p.title.includes('电池');
    }
    return true;
  });

  return (
    <section id="products" style={{
      padding: '80px 24px',
      maxWidth: '1280px',
      margin: '0 auto',
    }}>
      {/* Section Title */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <span className="badge badge-green" style={{ marginBottom: '12px' }}>
          {copy('catalog')}
        </span>
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2rem, 4vw, 2.8rem)',
          fontWeight: 800,
        }}>
          {t('section_products_title')}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '640px', margin: '12px auto 0', lineHeight: 1.6 }}>
          {t('section_products_subtitle')}
        </p>
      </div>

      {/* Category Filter Pills */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
        marginBottom: '40px',
        flexWrap: 'wrap',
        overflowX: 'auto',
        maxWidth: '100%',
        paddingBottom: '8px',
      }} className="no-scrollbar">
        <button
          onClick={() => setSelectedCategory('all')}
          style={{
            padding: '10px 20px',
            borderRadius: '30px',
            fontSize: '0.9rem',
            fontWeight: 700,
            cursor: 'pointer',
            border: selectedCategory === 'all' ? '1px solid var(--accent-green)' : '1px solid var(--border-color)',
            background: selectedCategory === 'all' ? 'var(--accent-gradient)' : 'rgba(255,255,255,0.05)',
            color: selectedCategory === 'all' ? '#041410' : 'var(--text-muted)',
            transition: 'all 0.2s ease',
          }}
        >
          <Filter size={14} style={{ marginRight: '6px', display: 'inline' }} /> {t('filter_all')}
        </button>

        <button
          onClick={() => setSelectedCategory('纽扣电池充电器')}
          style={{
            padding: '10px 20px',
            borderRadius: '30px',
            fontSize: '0.9rem',
            fontWeight: 700,
            cursor: 'pointer',
            border: selectedCategory === '纽扣电池充电器' ? '1px solid var(--accent-green)' : '1px solid var(--border-color)',
            background: selectedCategory === '纽扣电池充电器' ? 'var(--accent-gradient)' : 'rgba(255,255,255,0.05)',
            color: selectedCategory === '纽扣电池充电器' ? '#041410' : 'var(--text-muted)',
            transition: 'all 0.2s ease',
          }}
        >
          🔌 {t('filter_chargers')}
        </button>

        <button
          onClick={() => setSelectedCategory('可充电纽扣电池')}
          style={{
            padding: '10px 20px',
            borderRadius: '30px',
            fontSize: '0.9rem',
            fontWeight: 700,
            cursor: 'pointer',
            border: selectedCategory === '可充电纽扣电池' ? '1px solid var(--accent-cyan)' : '1px solid var(--border-color)',
            background: selectedCategory === '可充电纽扣电池' ? 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)' : 'rgba(255,255,255,0.05)',
            color: selectedCategory === '可充电纽扣电池' ? '#ffffff' : 'var(--text-muted)',
            transition: 'all 0.2s ease',
          }}
        >
          🔋 {t('filter_batteries')}
        </button>
      </div>

      {/* Loading state */}
      {loading ? (
        <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '60px' }}>
          {copy('loading')}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
          {copy('empty')}
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '32px',
        }}>
          {filteredProducts.map(product => {
            const localized = localizeProduct(product, lang);
            const translatedTitle = localized.title;
            const translatedTagline = localized.tagline;
            const translatedBadge = localized.badge;
            const translatedCategory = localized.category;

            return (
              <div
                key={product.id}
                className="glass-panel"
                style={{
                  borderRadius: '20px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  transition: 'transform 0.3s ease, border-color 0.3s ease',
                }}
              >
                {translatedBadge && (
                  <span className="badge badge-gold" style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    zIndex: 2,
                    fontSize: '0.7rem',
                  }}>
                    {translatedBadge}
                  </span>
                )}

                <div>
                  {/* Product Image (Square 1:1 Aspect Ratio) */}
                  <div style={{
                    width: '100%',
                    aspectRatio: '1 / 1',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    marginBottom: '20px',
                    background: '#ffffff',
                    border: '1px solid rgba(0,0,0,0.08)',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px',
                  }}>
                    <img
                      src={product.image_url}
                      alt={translatedTitle}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        background: '#ffffff',
                      }}
                    />
                  </div>

                  {/* Product Category Badge */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span className="badge badge-green" style={{ fontSize: '0.65rem', padding: '2px 8px' }}>
                      {translatedCategory || (product.is_starter_kit ? copy('chargerKit') : copy('product'))}
                    </span>
                  </div>

                  {/* Product Title */}
                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: 'var(--text-main)',
                    marginBottom: '8px',
                    lineHeight: 1.35,
                  }}>
                    {translatedTitle}
                  </h3>

                  {/* Rating follows the product's persisted visibility setting. */}
                  {product.show_reviews && <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={13} fill="#f59e0b" color="#f59e0b" />
                      ))}
                    </div>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      {product.rating ? product.rating.toFixed(2) : '—'}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#f97316', background: 'rgba(249, 115, 22, 0.12)', border: '1px solid rgba(249, 115, 22, 0.3)', padding: '1px 6px', borderRadius: '4px', fontWeight: 600 }}>
                      ✓ {product.review_count ? product.review_count.toLocaleString() : '0'} · Temu
                    </span>
                  </div>}

                  {/* Product Tagline */}
                  <p style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.9rem',
                    lineHeight: 1.5,
                    marginBottom: '16px',
                  }}>
                    {translatedTagline}
                  </p>

                  {/* B2B Wholesale MOQ & Price Quote Display */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: 'rgba(16, 185, 129, 0.12)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      color: 'var(--accent-green)',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                    }}>
                      <span>{copy('moq')}</span>
                    </div>
                    <span style={{ color: 'var(--accent-cyan)', fontSize: '0.85rem', fontWeight: 600 }}>
                      {copy('wholesaleOem')}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => openProductModal(product)}
                    className="btn-secondary"
                    style={{ flex: 1, padding: '10px 12px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}
                  >
                    <Info size={15} /> {copy('techSpecs')}
                  </button>

                  <button
                    onClick={() => onContactClick(translatedTitle)}
                    className="btn-primary"
                    style={{ flex: 1, padding: '10px 12px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}
                  >
                    <MessageSquare size={15} /> {copy('quote')}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Rich Product Detail Modal */}
      {selectedProduct && (() => {
        const galleryImages = (Array.isArray(selectedProduct.images) && selectedProduct.images.length > 0)
          ? selectedProduct.images
          : [selectedProduct.image_url];
        
        const currentGalleryImage = galleryImages[activeImageIndex] || selectedProduct.image_url;

        return (
          <div role="dialog" aria-modal="true" aria-label={selectedProduct.title} style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(16px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }} className="mobile-bottom-sheet">
            <div className="glass-panel mobile-bottom-sheet-content" style={{
              width: '100%',
              maxWidth: '880px',
              maxHeight: '92vh',
              overflowY: 'auto',
              padding: 'clamp(20px, 4vw, 36px)',
              borderRadius: '24px',
              position: 'relative',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4), var(--accent-glow)',
              color: 'var(--text-main)',
            }}>
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                aria-label={copy('close')}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-main)',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10,
                  transition: 'all 0.2s',
                }}
              >
                <X size={20} />
              </button>

              {/* Main Product Section: Gallery Carousel + Info */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '32px',
                marginBottom: '36px',
                alignItems: 'start'
              }}>
                {/* Product Main Image Carousel */}
                <div>
                  <div style={{
                    borderRadius: '20px',
                    overflow: 'hidden',
                    aspectRatio: '4 / 3',
                    maxHeight: '340px',
                    background: '#ffffff',
                    border: '1px solid var(--border-color)',
                    position: 'relative',
                    cursor: 'zoom-in',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 0,
                  }} onClick={() => openLightbox(galleryImages, activeImageIndex, selectedProduct.title)}>
                    <img
                      src={currentGalleryImage}
                      alt={selectedProduct.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.15)' }}
                    />
                    
                    {/* Zoom Hint */}
                    <div style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      background: 'var(--bg-card)',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      fontSize: '0.75rem',
                      color: 'var(--text-main)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      backdropFilter: 'blur(4px)',
                      border: '1px solid var(--border-color)',
                    }}>
                      <Maximize2 size={12} /> {copy('zoom')}
                    </div>

                    {/* Left/Right Arrows if multiple images */}
                    {galleryImages.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveImageIndex(prev => (prev === 0 ? galleryImages.length - 1 : prev - 1));
                          }}
                          style={{
                            position: 'absolute',
                            left: '8px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'rgba(10,13,20,0.85)',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-main)',
                            width: '34px',
                            height: '34px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                          }}
                        >
                          <ChevronLeft size={18} />
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveImageIndex(prev => (prev + 1) % galleryImages.length);
                          }}
                          style={{
                            position: 'absolute',
                            right: '8px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'rgba(10,13,20,0.85)',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-main)',
                            width: '34px',
                            height: '34px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                          }}
                        >
                          <ChevronRight size={18} />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Gallery Thumbnails Strip */}
                  {galleryImages.length > 1 && (
                    <div style={{ display: 'flex', gap: '10px', marginTop: '14px', overflowX: 'auto', paddingBottom: '4px' }}>
                      {galleryImages.map((imgUrl, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImageIndex(idx)}
                          style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            border: activeImageIndex === idx ? '2px solid var(--accent-green)' : '1px solid var(--border-color)',
                            padding: '0',
                            background: '#ffffff',
                            cursor: 'pointer',
                            opacity: activeImageIndex === idx ? 1 : 0.6,
                            transition: 'all 0.2s',
                            boxShadow: activeImageIndex === idx ? '0 0 12px rgba(0, 230, 153, 0.3)' : 'none',
                          }}
                        >
                          <img src={imgUrl} alt={`${selectedProduct.title} (${idx + 1})`} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.15)' }} />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Highlights use this product's translated data. */}
                  <div style={{ marginTop: '20px', padding: '18px', border: '1px solid var(--border-color)', borderRadius: '16px' }}>
                    <h5 style={{ fontSize: '0.88rem', marginBottom: '12px', color: 'var(--accent-green)' }}>{copy('overview')}</h5>
                    <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{selectedProduct.tagline}</p>
                    {(['battery_model', 'supported', 'packaging', 'warranty'] as const).filter(key => selectedProduct.specs?.[key]).map(key => (
                      <div key={key} style={{ marginTop: '12px', fontSize: '0.85rem' }}>
                        <strong>{copy(key)}</strong>
                        <p style={{ color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.6 }}>{selectedProduct.specs![key]}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Info Column */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                    <span className="badge badge-green" style={{ fontSize: '0.72rem', padding: '4px 10px' }}>
                      {selectedProduct.category || copy('product')}
                    </span>
                    {selectedProduct.badge && (
                      <span className="badge badge-gold" style={{ fontSize: '0.72rem', padding: '4px 10px' }}>
                        {selectedProduct.badge}
                      </span>
                    )}
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)',
                    fontWeight: 800,
                    marginBottom: '10px',
                    lineHeight: 1.35,
                    color: 'var(--text-main)',
                  }}>
                    {selectedProduct.title}
                  </h3>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '20px', lineHeight: 1.6 }}>
                    {selectedProduct.tagline}
                  </p>

                  {/* B2B MOQ & Customization Box */}
                  <div style={{
                    background: 'rgba(16, 185, 129, 0.06)',
                    border: '1px solid rgba(16, 185, 129, 0.25)',
                    padding: '16px 20px',
                    borderRadius: '16px',
                    marginBottom: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '12px',
                  }}>
                    <div>
                      <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-green)' }}>
                        {copy('moq')}
                      </span>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span className="badge badge-gold" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>
                        {copy('oem')}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const title = selectedProduct.title;
                      setSelectedProduct(null);
                      onContactClick(title);
                    }}
                    className="btn-primary"
                    style={{
                      width: '100%',
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      fontSize: '1rem',
                      fontWeight: 700,
                      boxShadow: 'var(--accent-glow)',
                    }}
                  >
                    <MessageSquare size={20} /> {copy('quote')}
                  </button>
                </div>
              </div>

              {/* Specs & Description Section */}
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '28px', marginBottom: '28px' }}>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)' }}>
                  <Zap size={20} color="var(--accent-green)" /> {copy('overview')}
                </h4>

                {/* Formatted Description Paragraphs */}
                <div style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: 1.8, marginBottom: '24px' }}>
                  {selectedProduct.description ? (
                    selectedProduct.description.split('\n').map((para, pIdx) => {
                      const trimmed = para.trim();
                      if (!trimmed) return null;
                      return (
                        <p key={pIdx} style={{ marginBottom: '12px' }}>
                          {trimmed}
                        </p>
                      );
                    })
                  ) : (
                    <p style={{ color: 'var(--text-dim)' }}>{copy('noDescription')}</p>
                  )}
                </div>

                {/* Technical Specs Table Grid */}
                {(() => {
                  const hasSpecs = selectedProduct.specs && Object.keys(selectedProduct.specs).length > 0;
                  if (!hasSpecs) return <p>{copy('noSpecs')}</p>;
                  const displaySpecs = selectedProduct.specs!;

                  return (
                    <div style={{
                      background: 'var(--bg-card)',
                      padding: '20px',
                      borderRadius: '16px',
                      border: '1px solid var(--border-color)',
                      marginBottom: '24px'
                    }}>
                      <h5 style={{ fontSize: '0.92rem', color: 'var(--accent-green)', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        📋 {copy('techSpecs')}
                      </h5>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                        {Object.entries(displaySpecs).filter(([key]) => !/certif/i.test(key)).map(([key, val]) => {
                          const uiKey = key === 'certifications' ? 'certificationSpec' : key;
                          const label = uiKey in productUi.en ? copy(uiKey as keyof typeof productUi.en) : key.replace(/_/g, ' ');
                          return (
                            <div
                              key={key}
                              style={{
                                background: 'var(--bg-card)',
                                padding: '12px 14px',
                                borderRadius: '10px',
                                borderLeft: '3px solid var(--accent-green)',
                                border: '1px solid var(--border-color)',
                              }}
                            >
                              <div style={{ color: 'var(--text-dim)', fontSize: '0.78rem', marginBottom: '4px' }}>
                                {label}
                              </div>
                              <div style={{ color: 'var(--text-main)', fontSize: '0.88rem', fontWeight: 600 }}>
                                {String(val)}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}
              </div>

              <section style={{borderTop:'1px solid var(--border-color)',paddingTop:24}}><h4>Model-specific documentation</h4><p>Match the charger design and report series. Battery documents depend on the model, capacity and version.</p><a href="/compliance">Find the relevant test summary →</a></section>
              {/* Global Customer Reviews Section */}
              {selectedProduct.show_reviews && <ReviewSection
                rating={selectedProduct.rating}
                sharedSource={Boolean(selectedProduct.review_group)}
                reviewCount={selectedProduct.review_count}
                temuLink={selectedProduct.temu_link}
                reviews={selectedProduct.reviews || []}
                productTitle={selectedProduct.title}
              />}

            </div>
          </div>
        );
      })()}

      {/* Fullscreen Lightbox Zoom Modal */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0,0,0,0.95)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
        >
          {/* Top Title & Close Button */}
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: 'absolute',
              top: '20px',
              left: '24px',
              right: '24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              zIndex: 10,
            }}
          >
            <span style={{ color: 'var(--text-main)', fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Maximize2 size={18} color="var(--accent-green)" /> {lightboxImage.title} ({lightboxIndex + 1} / {lightboxList.length})
            </span>
            <button
              onClick={() => setLightboxImage(null)}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                color: 'var(--text-main)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={24} />
            </button>
          </div>

          {/* Large Image Preview Container */}
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '80vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={lightboxImage.url}
              alt={lightboxImage.title}
              style={{
                maxWidth: '100%',
                maxHeight: '80vh',
                borderRadius: '16px',
                boxShadow: '0 25px 50px rgba(0,0,0,0.8)',
                objectFit: 'contain',
              }}
            />

            {/* Left/Right Navigation Arrows for Lightbox */}
            {lightboxList.length > 1 && (
              <>
                <button
                  onClick={prevLightboxImage}
                  style={{
                    position: 'absolute',
                    left: '-20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(10,13,20,0.8)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-main)',
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  onClick={nextLightboxImage}
                  style={{
                    position: 'absolute',
                    right: '-20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(10,13,20,0.8)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-main)',
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
