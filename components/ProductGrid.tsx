'use client';

import React, { useState, useEffect } from 'react';
import { ProductItem, CertificationItem } from '@/lib/store';
import { MessageSquare, Info, Zap, X, Filter, Shield, ChevronLeft, ChevronRight, Maximize2, Award } from 'lucide-react';

interface ProductGridProps {
  onContactClick: (productName?: string) => void;
}

export default function ProductGrid({ onContactClick }: ProductGridProps) {
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
      padding: '40px 24px 80px',
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
          Featured <span className="gradient-text">Product Series &amp; Kits</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '640px', margin: '12px auto 0' }}>
          Explore our smart coin cell chargers, LIR rechargeable batteries, and starter kits.
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
          <Filter size={14} style={{ marginRight: '6px', display: 'inline' }} /> 全部产品 (All Products)
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
          🔌 纽扣电池充电器 (Coin Cell Chargers)
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
          🔋 可充电纽扣电池 (Rechargeable Batteries)
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
          {filteredProducts.map(product => (
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
              {product.badge && (
                <span className="badge badge-gold" style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  zIndex: 2,
                  fontSize: '0.7rem',
                }}>
                  {product.badge}
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
                    alt={product.title}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '12px' }}
                  />
                </div>

                {/* Product Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span className="badge badge-green" style={{ fontSize: '0.65rem', padding: '2px 8px' }}>
                    {product.category || (product.is_starter_kit ? '纽扣电池充电器' : '产品')}
                  </span>
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: '#fff',
                  marginBottom: '8px',
                  lineHeight: 1.35,
                }}>
                  {product.title}
                </h3>

                <p style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.9rem',
                  lineHeight: 1.5,
                  marginBottom: '20px',
                }}>
                  {product.tagline}
                </p>

                {/* Price Display */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '24px' }}>
                  <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-green)' }}>
                    ${product.price}
                  </span>
                  {product.compare_at_price && (
                    <span style={{ fontSize: '1rem', color: 'var(--text-dim)', textDecoration: 'line-through' }}>
                      ${product.compare_at_price}
                    </span>
                  )}
                  {product.is_starter_kit && (
                    <span className="badge badge-green" style={{ fontSize: '0.65rem', marginLeft: 'auto' }}>
                      ALL-IN-ONE KIT
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <button
                  onClick={() => openProductModal(product)}
                  className="btn-secondary"
                  style={{
                    padding: '12px 14px',
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  <Info size={16} /> 查看介绍
                </button>

                <button
                  onClick={() => onContactClick(product.title)}
                  className="btn-primary"
                  style={{
                    padding: '12px 14px',
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  <MessageSquare size={16} /> 点击联系
                </button>
              </div>
            </div>
          ))}
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
            background: 'rgba(5, 8, 15, 0.88)',
            backdropFilter: 'blur(12px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}>
            <div className="glass-panel" style={{
              width: '100%',
              maxWidth: '840px',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '36px',
              borderRadius: '24px',
              position: 'relative',
              background: 'rgba(10, 13, 20, 0.96)',
              border: '1px solid var(--border-color)',
              color: '#fff',
            }}>
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                aria-label="Close modal"
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  color: '#fff',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10,
                }}
              >
                <X size={20} />
              </button>

              {/* Main Product Section: Gallery Carousel + Info */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '28px' }}>
                {/* Product Main Image Carousel */}
                <div>
                  <div style={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    height: '280px',
                    background: '#0d121c',
                    border: '1px solid var(--border-color)',
                    position: 'relative',
                    cursor: 'zoom-in',
                  }} onClick={() => openLightbox(galleryImages, activeImageIndex, selectedProduct.title)}>
                    <img
                      src={currentGalleryImage}
                      alt={selectedProduct.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    
                    {/* Zoom Hint */}
                    <div style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      background: 'rgba(0,0,0,0.7)',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      fontSize: '0.75rem',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
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
                            background: 'rgba(10,13,20,0.7)',
                            border: '1px solid var(--border-color)',
                            color: '#fff',
                            width: '32px',
                            height: '32px',
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
                            background: 'rgba(10,13,20,0.7)',
                            border: '1px solid var(--border-color)',
                            color: '#fff',
                            width: '32px',
                            height: '32px',
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
                    <div style={{ display: 'flex', gap: '8px', marginTop: '12px', overflowX: 'auto', paddingBottom: '4px' }}>
                      {galleryImages.map((imgUrl, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImageIndex(idx)}
                          style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            border: activeImageIndex === idx ? '2px solid var(--accent-green)' : '1px solid var(--border-color)',
                            padding: 0,
                            background: '#0d121c',
                            cursor: 'pointer',
                            opacity: activeImageIndex === idx ? 1 : 0.6,
                            transition: 'all 0.2s',
                          }}
                        >
                          <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Info Column */}
                <div>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
                    <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>
                      {selectedProduct.category || '核心产品'}
                    </span>
                    {selectedProduct.badge && (
                      <span className="badge badge-gold" style={{ fontSize: '0.7rem' }}>
                        {selectedProduct.badge}
                      </span>
                    )}
                  </div>

                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px', lineHeight: 1.3 }}>
                    {selectedProduct.title}
                  </h3>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '16px', lineHeight: 1.5 }}>
                    {selectedProduct.tagline}
                  </p>

                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-green)', marginBottom: '20px' }}>
                    ${selectedProduct.price}
                    {selectedProduct.compare_at_price && (
                      <span style={{ fontSize: '1rem', color: 'var(--text-dim)', textDecoration: 'line-through', marginLeft: '10px' }}>
                        ${selectedProduct.compare_at_price}
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
                    style={{ width: '100%', padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.95rem' }}
                  >
                    <MessageSquare size={18} /> 点击联系 (Contact Us for Inquiries)
                  </button>
                </div>
              </div>

              {/* Specs & Description Section */}
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '24px', marginBottom: '24px' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Zap size={18} color="var(--accent-green)" /> 产品概述与规格描述 (Product Overview &amp; Specs)
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '20px' }}>
                  {selectedProduct.description}
                </p>

                {selectedProduct.specs && Object.keys(selectedProduct.specs).length > 0 && (
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px 20px', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
                    <h5 style={{ fontSize: '0.9rem', color: 'var(--accent-green)', fontWeight: 700, marginBottom: '12px' }}>
                      技术参数规格表 (Technical Parameters)
                    </h5>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', fontSize: '0.88rem' }}>
                      {Object.entries(selectedProduct.specs).map(([key, val]) => (
                        <div key={key}>
                          <span style={{ color: 'var(--text-muted)', textTransform: 'capitalize' }}>{key}: </span>
                          <span style={{ color: '#fff', fontWeight: 600 }}>{String(val)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Certifications & Qualifications Section */}
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '24px' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#fff' }}>
                  <Award size={20} color="var(--accent-cyan)" /> 资质与质量检测认证 (Qualifications &amp; Certifications)
                </h4>

                {(!selectedProduct.certifications || selectedProduct.certifications.length === 0) ? (
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.88rem' }}>
                    该产品符合 ISO9001, CE, FCC, RoHS 及 UN38.3 锂电池国际通用安全检测认证。
                  </div>
                ) : (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                    gap: '16px',
                  }}>
                    {selectedProduct.certifications.map((cert, idx) => (
                      <div
                        key={idx}
                        onClick={() => openLightbox(selectedProduct.certifications!.map(c => c.image_url), idx, cert.name)}
                        style={{
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid var(--border-color)',
                          borderRadius: '14px',
                          overflow: 'hidden',
                          cursor: 'zoom-in',
                          transition: 'transform 0.2s, border-color 0.2s',
                        }}
                      >
                        <div style={{ height: '120px', background: '#0d121c', position: 'relative' }}>
                          <img src={cert.image_url} alt={cert.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(180deg, transparent 50%, rgba(10,13,20,0.8) 100%)',
                          }} />
                          <span style={{
                            position: 'absolute',
                            bottom: '6px',
                            right: '6px',
                            background: 'rgba(0,0,0,0.7)',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            fontSize: '0.7rem',
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '2px',
                          }}>
                            <Maximize2 size={10} /> 放大
                          </span>
                        </div>
                        <div style={{ padding: '10px 12px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', textAlign: 'center' }}>
                          {cert.name}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
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
