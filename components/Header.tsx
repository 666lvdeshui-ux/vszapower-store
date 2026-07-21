'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Zap, BookOpen, Home, MessageSquare, Menu, X, Shield } from 'lucide-react';

interface HeaderProps {
  onContactClick?: () => void;
}

export default function Header({ onContactClick }: HeaderProps) {
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
          <img
            src="/logo.svg"
            alt="VSZAPOWER Smart Recharge Tech"
            style={{
              height: '38px',
              width: 'auto',
              display: 'block',
            }}
          />
        </Link>

        {/* Simplified 3-Tab Desktop Navigation */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '36px',
        }} className="desktop-nav">
          <Link href="/" style={{
            color: '#ffffff',
            textDecoration: 'none',
            fontSize: '1rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'color 0.2s',
          }}>
            <Home size={18} /> 首页 (Home)
          </Link>
          <Link href="/academy" style={{
            color: 'var(--text-muted)',
            textDecoration: 'none',
            fontSize: '1rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'color 0.2s',
          }}>
            <BookOpen size={18} /> 电池学院 (Academy)
          </Link>
          <Link href="/#contact" onClick={() => onContactClick && onContactClick()} style={{
            color: 'var(--text-muted)',
            textDecoration: 'none',
            fontSize: '1rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'color 0.2s',
          }}>
            <MessageSquare size={18} /> 联系我们 (Contact)
          </Link>
        </nav>

        {/* Action Button & Admin Link */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link href="/admin" style={{
            color: 'var(--text-dim)',
            textDecoration: 'none',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}>
            <Shield size={14} /> 后台
          </Link>
          <button
            onClick={() => onContactClick ? onContactClick() : (window.location.href = '/#contact')}
            className="btn-primary"
            style={{ padding: '10px 20px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <MessageSquare size={18} /> 点击联系
          </button>
        </div>
      </div>
    </header>
  );
}
