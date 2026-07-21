'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingBag, CheckCircle, Package, Shield, Gift, Sparkles } from 'lucide-react';
import { ProductItem } from '@/lib/store';

export default function StarterKitBundle() {
  const [added, setAdded] = useState(false);
  const [product, setProduct] = useState<ProductItem | null>(null);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(json => {
        if (json.success && json.data && json.data.length > 0) {
          const starter = json.data.find((p: ProductItem) => p.is_starter_kit) || json.data[0];
          setProduct(starter);
        }
      })
      .catch(console.error);
  }, []);

  const price = product ? `$${product.price}` : '$24.99';
  const comparePrice = product?.compare_at_price ? `$${product.compare_at_price}` : '$39.99';
  const title = product?.title || 'Vszapower Smart Dock + 4x LIR2032 Pack';
  const imageUrl = product?.image_url || 'https://images.unsplash.com/photo-1619725002198-6a689b72f41d?auto=format&fit=crop&w=1000&q=80';
  const badge = product?.badge || '37% OFF BUNDLE';

  const handleOrder = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };

  return (
    <section id="starter-kit" style={{
      padding: '80px 24px',
      maxWidth: '1280px',
      margin: '0 auto',
    }}>
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <span className="badge badge-gold" style={{ marginBottom: '12px' }}>
          RECOMMENDED STARTER KIT
        </span>
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2rem, 4vw, 2.8rem)',
          fontWeight: 800,
        }}>
          Bundle & Save: <span className="gradient-text">Complete Recharge Kit</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '640px', margin: '12px auto 0' }}>
          Single chargers have low margins. Grab our all-in-one Starter Pack with 1 Smart Dual-Slot Dock + 4 Premium LIR2032 Rechargeable Coin Cells.
        </p>
      </div>

      <div className="glass-panel bundle-grid" style={{
        padding: '40px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '40px',
        alignItems: 'center',
      }}>
        
        {/* Left Column: Interactive Product Card */}
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            zIndex: 10,
            background: 'var(--accent-green)',
            color: '#041410',
            fontWeight: 800,
            fontSize: '0.75rem',
            padding: '4px 12px',
            borderRadius: '20px',
          }}>
            37% OFF BUNDLE
          </div>

          <div style={{
            borderRadius: '16px',
            overflow: 'hidden',
            height: '340px',
            background: '#0d121c',
            border: '1px solid var(--border-color)',
          }}>
            <img
              src="https://images.unsplash.com/photo-1619725002198-6a689b72f41d?auto=format&fit=crop&w=1000&q=80"
              alt="Vszapower LIR2032 Starter Pack"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Eco Kraft Badge */}
          <div style={{
            marginTop: '16px',
            background: 'rgba(229, 169, 104, 0.1)',
            border: '1px dashed var(--kraft-border)',
            borderRadius: '12px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            <Package size={24} color="var(--kraft-gold)" />
            <div style={{ fontSize: '0.85rem' }}>
              <strong style={{ color: 'var(--kraft-gold)' }}>Eco-Friendly Kraft Cardboard Packaging:</strong>
              <span style={{ color: 'var(--text-muted)', display: 'block' }}>Anti-static cardboard retail box. Perfect for tech gifts & unboxing videos.</span>
            </div>
          </div>
        </div>

        {/* Right Column: Bundle Details & Add to Cart */}
        <div>
          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.8rem',
            fontWeight: 800,
            marginBottom: '12px',
          }}>
            Vszapower Smart Dock + 4x LIR2032 Pack
          </h3>
          
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '24px' }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-green)' }}>
              $24.99
            </span>
            <span style={{ fontSize: '1.2rem', color: 'var(--text-dim)', textDecoration: 'line-through' }}>
              $39.99
            </span>
            <span style={{ color: 'var(--accent-cyan)', fontSize: '0.85rem', fontWeight: 600 }}>
              Free Global Shipping Available
            </span>
          </div>

          {/* Included Items Checklist */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle size={20} color="var(--accent-green)" />
              <span style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>
                <strong>1x Dual-Slot Smart USB Dock</strong> (Auto 3.6V-4.2V micro-chip cutoff)
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle size={20} color="var(--accent-green)" />
              <span style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>
                <strong>4x Grade-A LIR2032 Cells</strong> (3.7V 45mAh, 500+ recharge cycles)
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle size={20} color="var(--accent-green)" />
              <span style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>
                <strong>Anti-Reverse & Overcharge Protection</strong>
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle size={20} color="var(--accent-green)" />
              <span style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>
                <strong>Compatible with AirTags & 95%+ Car Key Fobs</strong>
              </span>
            </div>
          </div>

          {/* Action & Savings Callout */}
          <button 
            onClick={handleOrder}
            className="btn-primary" 
            style={{ width: '100%', padding: '18px', fontSize: '1.1rem' }}
          >
            {added ? (
              <>
                <CheckCircle size={22} /> Added to Cart! Proceeding...
              </>
            ) : (
              <>
                <ShoppingBag size={22} /> Order LIR2032 Starter Kit Now
              </>
            )}
          </button>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            marginTop: '20px',
            fontSize: '0.8rem',
            color: 'var(--text-dim)',
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Shield size={14} color="var(--accent-green)" /> 2-Year Warranty
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Gift size={14} color="var(--kraft-gold)" /> Papercard Pack
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Sparkles size={14} color="var(--accent-cyan)" /> 30-Day Money Back
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          :global(.bundle-grid) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
