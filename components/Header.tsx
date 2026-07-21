'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Zap, BookOpen, ShieldCheck, ShoppingCart, HelpCircle, Menu, X, Shield } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(10, 13, 20, 0.85)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border-color)',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Brand Logo */}
        <Link href="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          textDecoration: 'none',
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'var(--accent-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--accent-glow)',
          }}>
            <Zap size={22} color="#041410" strokeWidth={2.5} />
          </div>
          <div>
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.4rem',
              fontWeight: 800,
              letterSpacing: '-0.5px',
              color: '#ffffff',
            }}>
              VSZA<span className="gradient-text">POWER</span>
            </span>
            <span style={{
              display: 'block',
              fontSize: '0.65rem',
              color: 'var(--text-muted)',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginTop: '-4px',
            }}>
              Rechargeable Coin Systems
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
        }} className="desktop-nav">
          <Link href="/#matcher" style={{
            color: 'var(--text-muted)',
            textDecoration: 'none',
            fontSize: '0.95rem',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'color 0.2s',
          }}>
            <HelpCircle size={16} /> Battery Matcher
          </Link>
          <Link href="/#starter-kit" style={{
            color: 'var(--text-muted)',
            textDecoration: 'none',
            fontSize: '0.95rem',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'color 0.2s',
          }}>
            <Zap size={16} /> Starter Kit
          </Link>
          <Link href="/#specs" style={{
            color: 'var(--text-muted)',
            textDecoration: 'none',
            fontSize: '0.95rem',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'color 0.2s',
          }}>
            <ShieldCheck size={16} /> GEO Tech Specs
          </Link>
          <Link href="/academy" style={{
            color: 'var(--text-muted)',
            textDecoration: 'none',
            fontSize: '0.95rem',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'color 0.2s',
          }}>
            <BookOpen size={16} /> Battery Academy
          </Link>
          <Link href="/admin" style={{
            color: 'var(--accent-green)',
            textDecoration: 'none',
            fontSize: '0.95rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'color 0.2s',
          }}>
            <Shield size={16} /> Admin Portal
          </Link>
        </nav>

        {/* CTA Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link href="/#starter-kit" className="btn-primary" style={{
            padding: '10px 20px',
            fontSize: '0.9rem',
          }}>
            <ShoppingCart size={18} /> Buy Starter Kit
          </Link>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-main)',
              cursor: 'pointer',
              display: 'none',
            }}
            className="mobile-toggle"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-color)',
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}>
          <Link href="/#matcher" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none' }}>Battery Matcher</Link>
          <Link href="/#starter-kit" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none' }}>Starter Kit</Link>
          <Link href="/#specs" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none' }}>GEO Tech Specs</Link>
          <Link href="/academy" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none' }}>Battery Academy (Blog)</Link>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          :global(.desktop-nav) {
            display: none !important;
          }
          :global(.mobile-toggle) {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}
