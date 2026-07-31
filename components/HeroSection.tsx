'use client';

import React from 'react';
import Link from 'next/link';
import { Zap, Sparkles, ArrowRight, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section style={{
      position: 'relative',
      padding: '80px 24px 60px',
      maxWidth: '1280px',
      margin: '0 auto',
      overflow: 'hidden',
    }}>
      {/* Background Ambient Glow */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.18) 0%, rgba(6, 182, 212, 0.05) 50%, transparent 70%)',
        filter: 'blur(60px)',
        zIndex: 0,
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '48px',
        alignItems: 'center',
      }} className="hero-grid">
        
        {/* Left Column: Hooks & Value Prop */}
        <div>
          {/* Top Tagline Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <span className="badge badge-green">
              <Sparkles size={14} style={{ display: 'inline', marginRight: '4px' }} />
              {t('hero_badge')}
            </span>
            <span className="badge badge-gold">
              Eco Kraft Packaging
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.3rem, 5vw, 3.6rem)',
            fontWeight: 800,
            lineHeight: 1.18,
            letterSpacing: '-1px',
            marginBottom: '20px',
          }}>
            {t('hero_title_1')} <br />
            <span className="gradient-text">{t('hero_title_2')}</span>
          </h1>

          <p style={{
            color: 'var(--text-muted)',
            fontSize: '1.1rem',
            lineHeight: 1.7,
            marginBottom: '32px',
          }}>
            {t('hero_subtitle')}
          </p>

          {/* Quick Metrics */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            marginBottom: '36px',
          }}>
            <div className="glass-panel" style={{ padding: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-green)' }}>500+</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t('hero_highlight_1')}</div>
            </div>
            <div className="glass-panel" style={{ padding: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>3.6V-4.2V</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t('hero_highlight_2')}</div>
            </div>
            <div className="glass-panel" style={{ padding: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--kraft-gold)' }}>45 Mins</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Fast USB Dock</div>
            </div>
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="#contact" className="btn-primary" style={{ padding: '16px 32px', fontSize: '1.05rem' }}>
              {t('btn_contact')} <ArrowRight size={20} />
            </Link>
            <Link href="#matcher" className="btn-secondary" style={{ padding: '16px 28px', fontSize: '1.05rem' }}>
              {t('btn_view_products')}
            </Link>
          </div>
        </div>

        {/* Right Column: Hero Visual Card */}
        <div style={{ position: 'relative' }}>
          <div className="kraft-card" style={{ padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Zap color="var(--accent-green)" size={24} />
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-main)' }}>
                  {t('badge_starter_kit')}
                </span>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--kraft-gold)', border: '1px solid var(--kraft-border)', padding: '2px 8px', borderRadius: '6px' }}>
                MODEL: LIR2032-KIT
              </span>
            </div>

            <div style={{
              position: 'relative',
              height: '240px',
              borderRadius: '12px',
              overflow: 'hidden',
              marginBottom: '24px',
              background: '#0e131d',
              border: '1px solid var(--border-color)',
            }}>
              <img
                src="https://images.unsplash.com/photo-1619725002198-6a689b72f41d?auto=format&fit=crop&w=800&q=80"
                alt="VSZAPOWER Smart Coin Cell Charger and LIR2032 Batteries in Kraft Pack"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                bottom: '12px',
                left: '12px',
                background: 'rgba(10, 13, 20, 0.85)',
                backdropFilter: 'blur(10px)',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                color: 'var(--accent-green)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}>
                <RefreshCw size={14} className="pulse-bg" /> Active Dual LED Charging Dock
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: 'line-through', marginRight: '8px' }}>
                  $39.99 MSRP
                </span>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  $24.99
                </span>
              </div>
              <div style={{
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid var(--accent-green)',
                borderRadius: '10px',
                padding: '8px 16px',
                textAlign: 'right',
              }}>
                <div style={{ color: 'var(--accent-green)', fontWeight: 800, fontSize: '0.9rem' }}>{t('badge_best_seller')}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>1x Charger Dock + 4x LIR2032</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
