'use client';

import React, { useState } from 'react';
import { Download, FileText, CheckCircle2, X, Lock } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translateDynamicContent } from '@/lib/dynamicI18n';

interface CatalogDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CatalogDownloadModal({ isOpen, onClose }: CatalogDownloadModalProps) {
  const { lang, t } = useLanguage();
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: email.split('@')[0],
          contact: email,
          company: company || '未填写公司 (Not Specified)',
          country: 'PDF Catalog Lead',
          product: '2026 Wholesale Product Catalog & Datasheets (PDF)',
          message: `【资料索取下载】买家申请了 2026 Wholesale Catalog (PDF 报价单)，公司: ${company || '未填写'}，邮箱: ${email}`,
        }),
      });
      if (!response.ok || !(await response.json()).success) throw new Error('Could not save request');

      // 2. Open official wholesale price quotation sheet in new tab
      // Documentation is shared after scope and privacy review.

      setDownloaded(true);
      setTimeout(() => {
        setDownloaded(false);
        onClose();
      }, 3000);
    } catch (err) {
      alert('Download error, please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(10px)',
      zIndex: 1100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    }} className="mobile-bottom-sheet">
      <div className="glass-panel mobile-bottom-sheet-content" style={{
        width: '100%',
        maxWidth: '520px',
        padding: '36px',
        borderRadius: '24px',
        position: 'relative',
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        boxShadow: '0 25px 50px rgba(0,0,0,0.3), var(--accent-glow)',
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-main)',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <X size={20} />
        </button>

        {downloaded ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <CheckCircle2 size={56} color="var(--accent-green)" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
              {translateDynamicContent('Catalog request received', lang)}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              {translateDynamicContent('Thank you. Our team will review your request and share the relevant product information.', lang)}
            </p>
          </div>
        ) : (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'rgba(16, 185, 129, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
              }}>
                <FileText size={28} color="var(--accent-green)" />
              </div>
              <span className="badge badge-green" style={{ marginBottom: '10px' }}>
                LEAD MAGNET • 2026 EDITION
              </span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {translateDynamicContent('Request Product Catalog & Datasheets', lang)}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '8px', lineHeight: 1.5 }}>
                {translateDynamicContent('Request technical specifications, wholesale pricing and OEM options for your selected model.', lang)}
              </p>
            </div>

            <form onSubmit={handleDownload} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>{t('contact_email')} *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="e.g. buyer@company.com"
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-main)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>{translateDynamicContent('Company Name (Optional)', lang)}</label>
                <input
                  type="text"
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  placeholder="e.g. Global Electronics Wholesale Ltd"
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-main)' }}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary"
                style={{ padding: '14px', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '8px' }}
              >
                <Download size={18} /> {submitting ? translateDynamicContent('Sending request...', lang) : translateDynamicContent('Request product catalog', lang)}
              </button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-dim)', textAlign: 'center' }}>
                <Lock size={12} /> {translateDynamicContent('Your business email is used to respond to this request.', lang)}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
