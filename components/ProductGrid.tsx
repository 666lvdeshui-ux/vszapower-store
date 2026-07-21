'use client';

import React, { useState, useEffect } from 'react';
import { ProductItem } from '@/lib/store';
import { MessageSquare, Info, Zap, X, Filter } from 'lucide-react';

interface ProductGridProps {
  onContactClick: (productName?: string) => void;
}

export default function ProductGrid({ onContactClick }: ProductGridProps) {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

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
                {/* Product Image */}
                <div style={{
                  height: '220px',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  marginBottom: '20px',
                  background: '#0d121c',
                  border: '1px solid var(--border-color)',
                  position: 'relative',
                }}>
                  <img
                    src={product.image_url}
                    alt={product.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
                  onClick={() => setSelectedProduct(product)}
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

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(10px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
        }}>
          <div className="glass-panel" style={{
            width: '100%',
            maxWidth: '720px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '36px',
            borderRadius: '24px',
            position: 'relative',
            background: 'rgba(10, 13, 20, 0.95)',
            border: '1px solid var(--border-color)',
            color: '#fff',
          }}>
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
              }}
            >
              <X size={20} />
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px', marginBottom: '24px' }}>
              <div style={{ borderRadius: '16px', overflow: 'hidden', height: '240px', background: '#0d121c', border: '1px solid var(--border-color)' }}>
                <img src={selectedProduct.image_url} alt={selectedProduct.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              <div>
                {selectedProduct.badge && (
                  <span className="badge badge-gold" style={{ fontSize: '0.7rem', marginBottom: '10px', display: 'inline-block' }}>
                    {selectedProduct.badge}
                  </span>
                )}
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '8px', lineHeight: 1.3 }}>
                  {selectedProduct.title}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>
                  {selectedProduct.tagline}
                </p>

                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-green)', marginBottom: '16px' }}>
                  ${selectedProduct.price}
                </div>

                <button
                  onClick={() => {
                    const title = selectedProduct.title;
                    setSelectedProduct(null);
                    onContactClick(title);
                  }}
                  className="btn-primary"
                  style={{ width: '100%', padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  <MessageSquare size={18} /> 点击联系 (Contact Us for Product)
                </button>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '10px' }}>Product Overview &amp; Specs</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '20px' }}>
                {selectedProduct.description}
              </p>

              {selectedProduct.specs && Object.keys(selectedProduct.specs).length > 0 && (
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                  <h5 style={{ fontSize: '0.9rem', color: 'var(--accent-green)', fontWeight: 700, marginBottom: '10px' }}>Technical Parameters</h5>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.85rem' }}>
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
          </div>
        </div>
      )}
    </section>
  );
}
