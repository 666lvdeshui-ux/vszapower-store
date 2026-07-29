'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Zap, BookOpen, Home, MessageSquare, Menu, X, Video } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '@/context/LanguageContext';

interface HeaderProps {
  onContactClick?: () => void;
}

export default function Header({ onContactClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

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
        padding: '14px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Brand Logo & Certification Strip */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
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
                height: '32px',
                width: 'auto',
                display: 'block',
              }}
            />
          </Link>

          {/* Certifications Badges (2 Rows of 4 Items Each) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginTop: '3px' }}>
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              {['Battery', 'CE', 'FCC', 'RoHS'].map((cert) => (
                <span
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
                  {cert}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              {['CE-Battery', 'GPSR-Test Report', 'PSE Exempt', 'UN38.3'].map((cert) => (
                <span
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
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
        }} className="desktop-nav">
          <Link href="/" style={{
            color: '#ffffff',
            textDecoration: 'none',
            fontSize: '0.92rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'color 0.2s',
          }}>
            <Home size={16} /> {t('nav_home')}
          </Link>
          <Link href="/#products?cat=charger" style={{
            color: 'var(--text-muted)',
            textDecoration: 'none',
            fontSize: '0.92rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'color 0.2s',
          }}>
            <Zap size={16} color="var(--accent-green)" /> {t('nav_chargers')}
          </Link>
          <Link href="/#products?cat=battery" style={{
            color: 'var(--text-muted)',
            textDecoration: 'none',
            fontSize: '0.92rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'color 0.2s',
          }}>
            <Zap size={16} color="var(--accent-cyan)" /> {t('nav_batteries')}
          </Link>
          <Link href="/#videos" style={{
            color: 'var(--text-muted)',
            textDecoration: 'none',
            fontSize: '0.92rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'color 0.2s',
          }}>
            <Video size={16} color="#f59e0b" /> {t('nav_videos')}
          </Link>
          <Link href="/academy" style={{
            color: 'var(--text-muted)',
            textDecoration: 'none',
            fontSize: '0.92rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'color 0.2s',
          }}>
            <BookOpen size={16} /> {t('nav_academy')}
          </Link>
          <Link href="/#contact" onClick={() => onContactClick && onContactClick()} style={{
            color: 'var(--text-muted)',
            textDecoration: 'none',
            fontSize: '0.92rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'color 0.2s',
          }}>
            <MessageSquare size={16} /> {t('nav_contact')}
          </Link>
        </nav>

        {/* Action Controls: Language Switcher + Contact Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Top-Right Language Switcher Dropdown */}
          <LanguageSwitcher />

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
