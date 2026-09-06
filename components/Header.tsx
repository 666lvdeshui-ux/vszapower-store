'use client';

import { usePathname } from 'next/navigation';
import { isEvidenceRoute } from '@/lib/compliance';
import { centerLocale } from '@/lib/complianceLocale';
import React, { useState } from 'react';
import Link from 'next/link';
import { Zap, BookOpen, Home, MessageSquare, Menu, X, Video, Sparkles } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import { useLanguage } from '@/context/LanguageContext';
import { sectionText } from '@/lib/sectionI18n';

interface HeaderProps {
  onContactClick?: () => void;
}

export default function Header({ onContactClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, lang } = useLanguage();
  const pathname=usePathname() || '';
  const evidenceRoute = isEvidenceRoute(pathname) && !centerLocale(pathname);

  return (
    <header className="storefront-header" style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'var(--bg-header)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border-color)',
      transition: 'background 0.3s ease, border-color 0.3s ease',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Brand Logo & Certification Strip (Prevent Shrink) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flexShrink: 0 }}>
          <Link href="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
          }}>
            <img
              src="/logo.svg"
              alt="VSZAPOWER"
              style={{
                height: '30px',
                width: 'auto',
                display: 'block',
              }}
            />
          </Link>

          {/* Certifications Badges (2 Rows of 4 Items Each - Hidden on narrow mobile screens) */}
          <div className="header-cert-strip" style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginTop: '3px' }}>
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center', flexWrap: 'wrap' }}>
              {['Battery', 'CE', 'FCC', 'RoHS'].map((cert) => (
                <a
                  href="/compliance"
                  title="Documentation topic — confirm availability and scope for your model"
                  key={cert}
                  style={{
                    fontSize: '0.58rem',
                    fontWeight: 700,
                    color: 'var(--accent-green)',
                    background: 'rgba(0, 230, 153, 0.08)',
                    border: '1px solid rgba(0, 230, 153, 0.22)',
                    padding: '1px 5px',
                    borderRadius: '3px',
                    whiteSpace: 'nowrap',
                    lineHeight: '1.1',
                  }}
                >
                  {sectionText(cert, lang)}
                </a>
              ))}
            </div>

            <div className="header-cert-row2" style={{ display: 'flex', gap: '4px', alignItems: 'center', flexWrap: 'wrap' }}>
              {['CE-Battery', 'GPSR-Test Report', 'PSE', 'UN38.3'].map((cert) => (
                <a
                  href="/compliance"
                  title="Documentation topic — confirm availability and scope for your model"
                  key={cert}
                  style={{
                    fontSize: '0.58rem',
                    fontWeight: 700,
                    color: 'var(--accent-green)',
                    background: 'rgba(0, 230, 153, 0.08)',
                    border: '1px solid rgba(0, 230, 153, 0.22)',
                    padding: '1px 5px',
                    borderRadius: '3px',
                    whiteSpace: 'nowrap',
                    lineHeight: '1.1',
                  }}
                >
                  {sectionText(cert, lang)}
                </a>
              ))}
            </div>
          </div>
          <Link className="header-doc-link" href="/compliance" style={{fontSize:"0.6rem",color:"var(--text-muted)"}}>Documentation by model</Link>
        </div>

        {/* Navigation Tabs (Responsive & Multi-language Optimized) */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(6px, 1vw, 14px)',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          padding: '4px 8px',
          margin: '0 12px',
          flex: 1,
          minWidth: 0,
        }} className="desktop-nav custom-scrollbar-hidden">
          <Link href="/" style={{
            color: 'var(--text-main)',
            textDecoration: 'none',
            fontSize: 'clamp(0.78rem, 0.85vw, 0.9rem)',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            padding: '4px 8px',
            borderRadius: '6px',
            transition: 'all 0.2s',
          }}>
            <Home size={15} style={{ flexShrink: 0 }} /> {t('nav_home')}
          </Link>
          <Link href="/#products?cat=charger" style={{
            color: 'var(--text-muted)',
            textDecoration: 'none',
            fontSize: 'clamp(0.78rem, 0.85vw, 0.9rem)',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            padding: '4px 8px',
            borderRadius: '6px',
            transition: 'all 0.2s',
          }}>
            <Zap size={15} color="var(--accent-green)" style={{ flexShrink: 0 }} /> {t('nav_chargers')}
          </Link>
          <Link href="/#products?cat=battery" style={{
            color: 'var(--text-muted)',
            textDecoration: 'none',
            fontSize: 'clamp(0.78rem, 0.85vw, 0.9rem)',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            padding: '4px 8px',
            borderRadius: '6px',
            transition: 'all 0.2s',
          }}>
            <Zap size={15} color="var(--accent-cyan)" style={{ flexShrink: 0 }} /> {t('nav_batteries')}
          </Link>
          <Link href="/#customization" style={{
            color: 'var(--text-muted)',
            textDecoration: 'none',
            fontSize: 'clamp(0.78rem, 0.85vw, 0.9rem)',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            padding: '4px 8px',
            borderRadius: '6px',
            transition: 'all 0.2s',
          }}>
            <Sparkles size={15} color="var(--accent-green)" style={{ flexShrink: 0 }} /> {sectionText('OEM Customization', lang)}
          </Link>
          <Link href="/#factory" style={{
            color: 'var(--text-muted)',
            textDecoration: 'none',
            fontSize: 'clamp(0.78rem, 0.85vw, 0.9rem)',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            padding: '4px 8px',
            borderRadius: '6px',
            transition: 'all 0.2s',
          }}>
            <Zap size={15} color="var(--kraft-gold)" style={{ flexShrink: 0 }} /> {t('nav_factory')}
          </Link>
          <Link href="/compliance" style={{
            color: 'var(--text-muted)',
            textDecoration: 'none',
            fontSize: 'clamp(0.78rem, 0.85vw, 0.9rem)',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            padding: '4px 8px',
            borderRadius: '6px',
            transition: 'all 0.2s',
          }}>
            <Zap size={15} color="var(--accent-green)" style={{ flexShrink: 0 }} /> Compliance
          </Link>
          <Link href="/#contact" onClick={() => onContactClick && onContactClick()} style={{
            color: 'var(--text-muted)',
            textDecoration: 'none',
            fontSize: 'clamp(0.78rem, 0.85vw, 0.9rem)',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            padding: '4px 8px',
            borderRadius: '6px',
            transition: 'all 0.2s',
          }}>
            <MessageSquare size={15} style={{ flexShrink: 0 }} /> {t('nav_contact')}
          </Link>
        </nav>

        {/* Action Controls: Theme Toggle + Language Switcher + Contact Button (Prevent Shrink) */}
        <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0, position: 'relative', zIndex: 10, paddingLeft: '6px' }}>
          {/* Light / Dark Mode Manual Switcher */}
          <ThemeToggle />

          {/* Top-Right Language Switcher Dropdown */}
          {evidenceRoute ? <span lang="en" style={{fontSize:14,padding:"8px 12px"}}>English</span> : <LanguageSwitcher />}

          <button
            onClick={() => onContactClick ? onContactClick() : (window.location.href = '/#contact')}
            className="btn-primary"
            style={{ padding: '8px 18px', fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <MessageSquare size={16} /> {t('btn_contact')}
          </button>
        </div>
      </div>
    </header>
  );
}
