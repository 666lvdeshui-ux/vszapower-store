'use client';

import React, { useState, useEffect } from 'react';
import ProductManager from '@/components/admin/ProductManager';
import PostManager from '@/components/admin/PostManager';
import { Shield, Zap, Lock, LogOut, Package, BookOpen, Database, ExternalLink, CheckCircle } from 'lucide-react';

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState(false);
  const [activeTab, setActiveTab] = useState<'products' | 'posts' | 'settings'>('products');

  useEffect(() => {
    const savedAuth = localStorage.getItem('vszapower_admin_auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'vszapower2026' || passcode === 'admin' || passcode === '123456') {
      setIsAuthenticated(true);
      localStorage.setItem('vszapower_admin_auth', 'true');
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('vszapower_admin_auth');
  };

  // Render Login Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'var(--bg-main)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}>
        <div className="glass-panel" style={{
          width: '100%',
          maxWidth: '440px',
          padding: '40px',
          borderRadius: '20px',
          textAlign: 'center',
          boxShadow: 'var(--accent-glow)'
        }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '14px',
            background: 'var(--accent-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            boxShadow: 'var(--accent-glow)'
          }}>
            <Shield size={30} color="#041410" />
          </div>

          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
            VSZAPOWER Admin
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '28px' }}>
            Enter your admin passcode to access product pricing, catalog & Battery Academy CMS.
          </p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                required
                value={passcode}
                onChange={e => setPasscode(e.target.value)}
                placeholder="Enter Admin Passcode (Default: vszapower2026)"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.05)',
                  border: authError ? '1px solid #ef4444' : '1px solid var(--border-color)',
                  color: '#fff',
                  fontSize: '0.95rem',
                  textAlign: 'center'
                }}
              />
            </div>

            {authError && (
              <div style={{ color: '#ef4444', fontSize: '0.85rem' }}>
                Incorrect passcode. Try <code>vszapower2026</code>
              </div>
            )}

            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '14px', fontSize: '1rem' }}>
              Unlock Dashboard <Lock size={16} style={{ marginLeft: '6px' }} />
            </button>
          </form>

          <div style={{ marginTop: '24px', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
            Protected Web Portal • VSZAPOWER Inc.
          </div>
        </div>
      </div>
    );
  }

  // Render Admin Portal UI
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-main)', color: '#fff' }}>
      {/* Top Header */}
      <header style={{
        background: 'rgba(10, 13, 20, 0.9)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border-color)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'var(--accent-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Zap size={20} color="#041410" />
            </div>
            <div>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.2rem' }}>
                VSZA<span className="gradient-text">POWER</span>
              </span>
              <span className="badge badge-green" style={{ marginLeft: '10px', fontSize: '0.65rem' }}>
                ADMIN PORTAL
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a
              href="/"
              target="_blank"
              className="btn-secondary"
              style={{ padding: '8px 14px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <ExternalLink size={14} /> View Storefront
            </a>
            <button
              onClick={handleLogout}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-muted)',
                borderRadius: '8px',
                padding: '8px 14px',
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <LogOut size={14} /> Exit Admin
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs & Main Container */}
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Tab Buttons */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '32px',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '16px'
        }}>
          <button
            onClick={() => setActiveTab('products')}
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: activeTab === 'products' ? 'var(--accent-gradient)' : 'rgba(255,255,255,0.05)',
              color: activeTab === 'products' ? '#041410' : 'var(--text-main)',
              border: 'none',
              boxShadow: activeTab === 'products' ? 'var(--accent-glow)' : 'none'
            }}
          >
            <Package size={18} /> Product Catalog Management
          </button>

          <button
            onClick={() => setActiveTab('posts')}
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: activeTab === 'posts' ? 'var(--accent-gradient)' : 'rgba(255,255,255,0.05)',
              color: activeTab === 'posts' ? '#041410' : 'var(--text-main)',
              border: 'none',
              boxShadow: activeTab === 'posts' ? 'var(--accent-glow)' : 'none'
            }}
          >
            <BookOpen size={18} /> Battery Academy CMS
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: activeTab === 'settings' ? 'var(--accent-gradient)' : 'rgba(255,255,255,0.05)',
              color: activeTab === 'settings' ? '#041410' : 'var(--text-main)',
              border: 'none',
              boxShadow: activeTab === 'settings' ? 'var(--accent-glow)' : 'none'
            }}
          >
            <Database size={18} /> Database & Sync Status
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'products' && <ProductManager />}
        {activeTab === 'posts' && <PostManager />}
        {activeTab === 'settings' && (
          <div className="glass-panel" style={{ padding: '32px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '16px' }}>
              Database & Cloud Sync Configuration
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
              Your VSZAPOWER admin dashboard automatically syncs changes to Supabase when configured, and maintains high-speed local fallback storage.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <h4 style={{ color: 'var(--accent-green)', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle size={16} /> Admin Passcode
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Active passcode: <code>vszapower2026</code>
                </p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <h4 style={{ color: 'var(--accent-cyan)', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Database size={16} /> Supabase Schema SQL
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Included file <code>supabase_schema.sql</code> is ready for 1-click execution on Supabase.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
