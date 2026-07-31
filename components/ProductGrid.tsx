'use client';

import React, { useState, useEffect } from 'react';
import { ProductItem, CertificationItem } from '@/lib/store';
import { MessageSquare, Info, Zap, X, Filter, ShieldCheck, ChevronLeft, ChevronRight, Maximize2, Award, Star, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translateDynamicContent } from '@/lib/dynamicI18n';
import ReviewSection from './ReviewSection';

interface ProductGridProps {
  onContactClick: (productName?: string) => void;
}

export default function ProductGrid({ onContactClick }: ProductGridProps) {
  const { lang, t } = useLanguage();
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
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
    setLightboxImage({ url: urlList[index], title: title || '查看大图' });
  };

  const nextLightboxImage = () => {
    if (lightboxList.length <= 1) return;
    const nextIdx = (lightboxIndex + 1) % lightboxList.length;
    setLightboxIndex(nextIdx);
    setLightboxImage({ url: lightboxList[nextIdx], title: lightboxImage?.title || '查看大图' });
  };

  const prevLightboxImage = () => {
    if (lightboxList.length <= 1) return;
    const prevIdx = (lightboxIndex - 1 + lightboxList.length) % lightboxList.length;
    setLightboxIndex(prevIdx);
    setLightboxImage({ url: lightboxList[prevIdx], title: lightboxImage?.title || '查看大图' });
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
          VSZAPOWER PRODUCT CATALOG
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
      }}>
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
          Loading product catalog...
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
          该分类下暂无产品，请选择其他分类。
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '32px',
        }}>
          {filteredProducts.map(product => {
            const translatedTitle = product.translations?.[lang]?.title || translateDynamicContent(product.title, lang);
            const translatedTagline = product.translations?.[lang]?.tagline || translateDynamicContent(product.tagline, lang);
            const translatedBadge = product.translations?.[lang]?.badge || translateDynamicContent(product.badge, lang);
            const translatedCategory = product.translations?.[lang]?.category || translateDynamicContent(product.category, lang);

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
                    background: '#0a0e17',
                    border: '1px solid var(--border-color)',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <img
                      src={product.image_url}
                      alt={translatedTitle}
                      style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '12px' }}
                    />
                  </div>

                  {/* Product Category Badge */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span className="badge badge-green" style={{ fontSize: '0.65rem', padding: '2px 8px' }}>
                      {translatedCategory || (product.is_starter_kit ? 'Charger Kit' : 'Product')}
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

                  {/* Temu Star Rating & Reviews Badge */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={13} fill="#f59e0b" color="#f59e0b" />
                      ))}
                    </div>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      {product.rating ? product.rating.toFixed(2) : '4.93'}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#f97316', background: 'rgba(249, 115, 22, 0.12)', border: '1px solid rgba(249, 115, 22, 0.3)', padding: '1px 6px', borderRadius: '4px', fontWeight: 600 }}>
                      ✓ {product.review_count ? product.review_count.toLocaleString() : '1,480'}+ Temu Reviews
                    </span>
                  </div>

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
                      <span>MOQ: 100 Pcs</span>
                    </div>
                    <span style={{ color: 'var(--accent-cyan)', fontSize: '0.85rem', fontWeight: 600 }}>
                      Wholesale &amp; OEM Quote
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
                    <Info size={15} /> Tech Specs
                  </button>

                  <button
                    onClick={() => onContactClick(translatedTitle)}
                    className="btn-primary"
                    style={{ flex: 1, padding: '10px 12px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}
                  >
                    <MessageSquare size={15} /> Wholesale Quote
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
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(4, 7, 13, 0.92)',
            backdropFilter: 'blur(16px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}>
            <div className="glass-panel" style={{
              width: '100%',
              maxWidth: '880px',
              maxHeight: '92vh',
              overflowY: 'auto',
              padding: 'clamp(20px, 4vw, 36px)',
              borderRadius: '24px',
              position: 'relative',
              background: 'rgba(10, 14, 23, 0.98)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 230, 153, 0.08)',
              color: '#fff',
            }}>
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                aria-label="Close modal"
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#fff',
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
                    background: '#070a12',
                    border: '1px solid var(--border-color)',
                    position: 'relative',
                    cursor: 'zoom-in',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '16px',
                  }} onClick={() => openLightbox(galleryImages, activeImageIndex, selectedProduct.title)}>
                    <img
                      src={currentGalleryImage}
                      alt={selectedProduct.title}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                    
                    {/* Zoom Hint */}
                    <div style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      background: 'rgba(0,0,0,0.75)',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      fontSize: '0.75rem',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      backdropFilter: 'blur(4px)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}>
                      <Maximize2 size={12} /> 点击全屏放大
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
                            color: '#fff',
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
                            color: '#fff',
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
                            padding: '4px',
                            background: '#070a12',
                            cursor: 'pointer',
                            opacity: activeImageIndex === idx ? 1 : 0.6,
                            transition: 'all 0.2s',
                            boxShadow: activeImageIndex === idx ? '0 0 12px rgba(0, 230, 153, 0.3)' : 'none',
                          }}
                        >
                          <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Multi-Scenario Real-World Highlights Card */}
                  <div
                    style={{
                      marginTop: '20px',
                      background: 'rgba(16, 185, 129, 0.04)',
                      border: '1px solid rgba(16, 185, 129, 0.2)',
                      borderRadius: '16px',
                      padding: '16px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <h5 style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Sparkles size={16} color="var(--accent-green)" /> {translateDynamicContent('全场景高频买家口碑体验 (Real-World Use Cases)', lang)}
                      </h5>
                      <span style={{ fontSize: '0.72rem', background: 'rgba(249, 115, 22, 0.15)', color: '#f97316', border: '1px solid rgba(249, 115, 22, 0.3)', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                        ★ 99.2% Satisfied
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.82rem' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', background: 'rgba(10, 13, 20, 0.6)', padding: '8px 10px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                        <span style={{ fontSize: '1rem' }}>🏷️</span>
                        <div>
                          <strong style={{ color: 'var(--accent-green)', display: 'block', fontSize: '0.82rem' }}>
                            {translateDynamicContent('Apple AirTag 防丢器专属配合', lang)}
                          </strong>
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                            {translateDynamicContent('35分钟充满LIR2032，替代CR2032无缝使用，电量识别精准不弹窗警告。', lang)}
                          </span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', background: 'rgba(10, 13, 20, 0.6)', padding: '8px 10px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                        <span style={{ fontSize: '1rem' }}>🔑</span>
                        <div>
                          <strong style={{ color: 'var(--accent-green)', display: 'block', fontSize: '0.82rem' }}>
                            {translateDynamicContent('汽车智能钥匙 / 车遥控器', lang)}
                          </strong>
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                            {translateDynamicContent('摆脱一次性纽扣电池高频消耗，随时循环充电，高寒恶劣天气下续航稳定。', lang)}
                          </span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', background: 'rgba(10, 13, 20, 0.6)', padding: '8px 10px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                        <span style={{ fontSize: '1rem' }}>🏠</span>
                        <div>
                          <strong style={{ color: 'var(--accent-green)', display: 'block', fontSize: '0.82rem' }}>
                            {translateDynamicContent('Smart Home / IoT 传感器', lang)}
                          </strong>
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                            {translateDynamicContent('支持 Smart Lock 智能门锁、血糖仪、门窗传感器及温湿度计，微流保护不烧板。', lang)}
                          </span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', background: 'rgba(10, 13, 20, 0.6)', padding: '8px 10px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                        <span style={{ fontSize: '1rem' }}>🛡️</span>
                        <div>
                          <strong style={{ color: 'var(--accent-green)', display: 'block', fontSize: '0.82rem' }}>
                            {translateDynamicContent('4.2V MCU 微芯片自动断电', lang)}
                          </strong>
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                            {translateDynamicContent('独立通道防过充/防反接，全天过夜充电不发烫，通过 UN38.3 & CE-battery 认证。', lang)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Info Column */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                    <span className="badge badge-green" style={{ fontSize: '0.72rem', padding: '4px 10px' }}>
                      {selectedProduct.category || '纽扣电池充电器'}
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
                    color: '#fff',
                  }}>
                    {selectedProduct.title}
                  </h3>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '20px', lineHeight: 1.6 }}>
                    {selectedProduct.tagline}
                  </p>

                  {/* Price Section Box */}
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-color)',
                    padding: '16px 20px',
                    borderRadius: '16px',
                    marginBottom: '24px',
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                  }}>
                    <div>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', display: 'block', marginBottom: '2px' }}>
                        批发出厂特惠价 / Wholesale Price
                      </span>
                      <span style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--accent-green)' }}>
                        ${selectedProduct.price}
                      </span>
                      {selectedProduct.compare_at_price && (
                        <span style={{ fontSize: '1.05rem', color: 'var(--text-dim)', textDecoration: 'line-through', marginLeft: '10px' }}>
                          ${selectedProduct.compare_at_price}
                        </span>
                      )}
                    </div>
                    {selectedProduct.is_starter_kit && (
                      <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>
                        ALL-IN-ONE KIT
                      </span>
                    )}
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
                    <MessageSquare size={20} /> {translateDynamicContent('点击联系商务询价 (Contact for Wholesale Quote)', lang)}
                  </button>
                </div>
              </div>

              {/* Specs & Description Section */}
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '28px', marginBottom: '28px' }}>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#fff' }}>
                  <Zap size={20} color="var(--accent-green)" /> {translateDynamicContent('产品概述与详情描述 (Product Overview & Details)', lang)}
                </h4>

                {/* Formatted Description Paragraphs */}
                <div style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: 1.8, marginBottom: '24px' }}>
                  {selectedProduct.description ? (
                    selectedProduct.description.split('\n').map((para, pIdx) => {
                      const trimmed = para.trim();
                      if (!trimmed) return null;
                      return (
                        <p key={pIdx} style={{ marginBottom: '12px' }}>
                          {translateDynamicContent(trimmed, lang)}
                        </p>
                      );
                    })
                  ) : (
                    <p style={{ color: 'var(--text-dim)' }}>暂无详细描述信息。</p>
                  )}
                </div>

                {/* Technical Specs Table Grid */}
                {selectedProduct.specs && Object.keys(selectedProduct.specs).length > 0 && (
                  <div style={{
                    background: 'rgba(255,255,255,0.025)',
                    padding: '20px',
                    borderRadius: '16px',
                    border: '1px solid var(--border-color)'
                  }}>
                    <h5 style={{ fontSize: '0.92rem', color: 'var(--accent-green)', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      📋 {translateDynamicContent('技术参数规格表 (Technical Parameters & Specifications)', lang)}
                    </h5>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                      {Object.entries(selectedProduct.specs).map(([key, val]) => {
                        const specLabels: Record<string, string> = {
                          voltage: '输入/输出电压',
                          supported: '适配电池型号',
                          safety: '安全保护机制',
                          packaging: '环保包装形式',
                          warranty: '质保售后服务',
                        };
                        const label = specLabels[key.toLowerCase()] || key.replace(/_/g, ' ');
                        return (
                          <div
                            key={key}
                            style={{
                              background: 'rgba(10, 13, 20, 0.6)',
                              padding: '12px 14px',
                              borderRadius: '10px',
                              borderLeft: '3px solid var(--accent-green)',
                            }}
                          >
                            <div style={{ color: 'var(--text-dim)', fontSize: '0.78rem', marginBottom: '4px' }}>
                              {translateDynamicContent(label, lang)}
                            </div>
                            <div style={{ color: '#fff', fontSize: '0.88rem', fontWeight: 600 }}>
                              {translateDynamicContent(String(val), lang)}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Certifications & Qualifications Section */}
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '28px' }}>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#fff' }}>
                  <Award size={20} color="var(--accent-cyan)" /> 资质与质量检测认证 (Qualifications &amp; Certifications)
                </h4>

                {(!selectedProduct.certifications || selectedProduct.certifications.length === 0) ? (
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.88rem' }}>
                    该产品符合 GCC, Battery, CE, FCC, RoHS 及 UN38.3 锂电池国际通用安全检测认证。
                  </div>
                ) : (
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '12px',
                  }}>
                    {selectedProduct.certifications.map((cert, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          background: 'rgba(0, 230, 153, 0.08)',
                          border: '1px solid rgba(0, 230, 153, 0.3)',
                          borderRadius: '10px',
                          padding: '10px 16px',
                          color: '#fff',
                          fontSize: '0.9rem',
                          fontWeight: 700,
                          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                        }}
                      >
                        <ShieldCheck size={18} color="var(--accent-green)" />
                        <span>{cert.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Temu Global Customer Reviews Section */}
              <ReviewSection
                rating={selectedProduct.rating || 4.93}
                reviewCount={selectedProduct.review_count || 1480}
                temuLink={selectedProduct.temu_link}
                reviews={selectedProduct.reviews || []}
                productTitle={selectedProduct.title}
              />
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
            <span style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Maximize2 size={18} color="var(--accent-green)" /> {lightboxImage.title} ({lightboxIndex + 1} / {lightboxList.length})
            </span>
            <button
              onClick={() => setLightboxImage(null)}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                color: '#fff',
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
                    color: '#fff',
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
                    color: '#fff',
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
