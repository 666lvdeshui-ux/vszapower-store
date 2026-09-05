'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Lock, ArrowLeft, CheckCircle2, AlertCircle, KeyRound } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch('/api/admin/session')
      .then(response => response.json())
      .then(data => {
        if (data.authenticated) router.push('/admin');
      })
      .catch(() => undefined);
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    fetch('/api/admin/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: passcode }),
    })
      .then(async response => ({ ok: response.ok, body: await response.json() }))
      .then(({ ok, body }) => {
        if (ok) {
          router.push('/admin');
          return;
        }
        setError(body.error || '登录失败，请重试。');
      })
      .catch(() => {
        setError('无法连接到认证服务，请稍后重试。');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at 50% 30%, #0a1b18 0%, #04080c 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      color: '#fff',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '460px',
        background: 'rgba(15, 23, 30, 0.75)',
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '24px',
        padding: '40px 32px',
        boxShadow: '0 20px 60px rgba(0, 255, 178, 0.08), 0 0 1px rgba(255,255,255,0.2)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Ambient Top Glow */}
        <div style={{
          position: 'absolute',
          top: '-100px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '260px',
          height: '260px',
          background: 'radial-gradient(circle, rgba(0,255,178,0.25) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none'
        }} />

        {/* Brand Shield Logo */}
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '18px',
          background: 'linear-gradient(135deg, #00ffb2 0%, #00b8d4 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
          boxShadow: '0 8px 24px rgba(0, 255, 178, 0.35)',
          transform: 'scale(1)',
          transition: 'transform 0.3s ease'
        }}>
          <Shield size={32} color="#041410" strokeWidth={2.5} />
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: '1.75rem',
          fontWeight: 800,
          color: '#ffffff',
          marginBottom: '8px',
          letterSpacing: '-0.5px'
        }}>
          VSZAPOWER 独立管理后台
        </h1>
        <p style={{
          color: '#94a3b8',
          fontSize: '0.9rem',
          marginBottom: '32px',
          lineHeight: '1.5'
        }}>
          安全控制台端口 • 请输入管理员独立验证口令访问流量监控与 CMS 引擎
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ textAlign: 'left' }}>
            <label style={{
              display: 'block',
              fontSize: '0.8rem',
              fontWeight: 600,
              color: '#cbd5e1',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              后台通行口令 (Admin Passcode)
            </label>

            <div style={{ position: 'relative' }}>
              <input
                type="password"
                required
                value={passcode}
                onChange={e => setPasscode(e.target.value)}
                placeholder="请输入管理员口令"
                style={{
                  width: '100%',
                  padding: '14px 16px 14px 44px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.06)',
                  border: error ? '1px solid #ef4444' : '1px solid rgba(255,255,255,0.15)',
                  color: '#fff',
                  fontSize: '0.95rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'all 0.2s ease'
                }}
              />
              <KeyRound
                size={18}
                color="#64748b"
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
              />
            </div>
          </div>

          {error && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#f87171',
              padding: '10px 14px',
              borderRadius: '10px',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <AlertCircle size={16} color="#f87171" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #00ffb2 0%, #00b8d4 100%)',
              border: 'none',
              color: '#041410',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(0, 255, 178, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'opacity 0.2s ease'
            }}
          >
            {isSubmitting ? '验证口令中...' : '解锁管理面板'} <Lock size={18} />
          </button>
        </form>

        {/* Footer Actions */}
        <div style={{
          marginTop: '32px',
          paddingTop: '20px',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.85rem',
          color: '#64748b'
        }}>
          <a
            href="/"
            style={{
              color: '#00ffb2',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 500
            }}
          >
            <ArrowLeft size={16} /> 返回前台商城
          </a>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748b' }}>
            <CheckCircle2 size={14} color="#00ffb2" /> 256-Bit SSL 加密
          </div>
        </div>
      </div>
    </div>
  );
}
