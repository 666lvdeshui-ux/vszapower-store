'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Zap, BookOpen, Home, MessageSquare, Menu, X, Shield, Video } from 'lucide-react';

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
            alt="VSzapower"
            style={{
              height: '36px',
              width: 'auto',
              display: 'block',
            }}
          />
        </Link>

        {/* Navigation Tabs */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '28px',
        }} className="desktop-nav">
          <Link href="/" style={{
            color: '#ffffff',
            textDecoration: 'none',
            fontSize: '0.95rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'color 0.2s',
          }}>
            <Home size={16} /> 首页
          </Link>
          <Link href="/#products?cat=charger" style={{
            color: 'var(--text-muted)',
            textDecoration: 'none',
            fontSize: '0.95rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'color 0.2s',
          }}>
            <Zap size={16} color="var(--accent-green)" /> 纽扣电池充电器
          </Link>
          <Link href="/#products?cat=battery" style={{
            color: 'var(--text-muted)',
            textDecoration: 'none',
            fontSize: '0.95rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'color 0.2s',
          }}>
            <Zap size={16} color="var(--accent-cyan)" /> 可充电纽扣电池
          </Link>
          <Link href="/#videos" style={{
            color: 'var(--text-muted)',
            textDecoration: 'none',
            fontSize: '0.95rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'color 0.2s',
          }}>
            <Video size={16} color="#f59e0b" /> 短视频
          </Link>
          <Link href="/academy" style={{
            color: 'var(--text-muted)',
            textDecoration: 'none',
            fontSize: '0.95rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'color 0.2s',
          }}>
            <BookOpen size={16} /> 电池学院
          </Link>
          <Link href="/#contact" onClick={() => onContactClick && onContactClick()} style={{
            color: 'var(--text-muted)',
            textDecoration: 'none',
            fontSize: '0.95rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'color 0.2s',
          }}>
            <MessageSquare size={16} /> 联系我们
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
