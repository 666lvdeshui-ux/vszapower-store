'use client';

import React from 'react';
import Link from 'next/link';
import { Zap, ShieldCheck, RefreshCw, Sparkles, ArrowRight, DollarSign } from 'lucide-react';

export default function HeroSection() {
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
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <span className="badge badge-green">
              <Sparkles size={14} style={{ display: 'inline', marginRight: '4px' }} />
              TikTok & SEO Viral Solution
            </span>
            <span className="badge badge-gold">
              Eco Kraft Packaging
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-1px',
            marginBottom: '20px',
          }}>
            Stop Throwing Away <br />
            <span className="gradient-text">Button Batteries!</span>
          </h1>

          <p style={{
            color: 'var(--text-muted)',
            fontSize: '1.15rem',
            lineHeight: 1.7,
            marginBottom: '32px',
          }}>
            How much money do you waste on car key fobs and Apple AirTags every year? Switch to <strong style={{ color: '#fff' }}>Vszapower Rechargeable LIR Coin Cells</strong> & Smart Micro-Chip Chargers. Buy once, reuse 500+ times.
          </p>

          {/* Quick Metrics */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            marginBottom: '36px',
          }}>
            <div className="glass-panel" style={{ padding: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-green)' }}>500+</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Recharge Cycles</div>
            </div>
            <div className="glass-panel" style={{ padding: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>3.6V-4.2V</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Smart Microchip</div>
            </div>
            <div className="glass-panel" style={{ padding: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--kraft-gold)' }}>45 Mins</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Fast USB Dock</div>
            </div>
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="#starter-kit" className="btn-primary" style={{ padding: '16px 32px', fontSize: '1.05rem' }}>
              Get Starter Kit (Save 37%) <ArrowRight size={20} />
            </Link>
            <Link href="#matcher" className="btn-secondary" style={{ padding: '16px 28px', fontSize: '1.05rem' }}>
              Find My Model
            </Link>
          </div>
        </div>

        {/* Right Column: Hero Visual Card with Kraft Card Aesthetic */}
        <div style={{ position: 'relative' }}>
          <div className="kraft-card" style={{ padding: '32px' }}>
            {/* Visual Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Zap color="var(--accent-green)" size={24} />
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.1rem', color: '#fff' }}>
                  STARTER KIT BUNDLE
                </span>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--kraft-gold)', border: '1px solid var(--kraft-border)', padding: '2px 8px', borderRadius: '6px' }}>
                MODEL: LIR2032-KIT
              </span>
            </div>

            {/* Product Image Mock */}
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
                alt="Vszapower Smart Coin Cell Charger and LIR2032 Batteries in Kraft Pack"
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

            {/* Price & Savings Badge */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: 'line-through', marginRight: '8px' }}>
                  $39.99 MSRP
                </span>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#fff' }}>
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
                <div style={{ color: 'var(--accent-green)', fontWeight: 800, fontSize: '0.9rem' }}>Includes:</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>1x Charger Dock + 4x LIR2032</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          :global(.hero-grid) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
