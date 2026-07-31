'use client';

import React from 'react';
import { Factory, ShieldCheck, Cpu, PackageCheck, Wrench, Sparkles, Send } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface FactoryShowcaseProps {
  onContactClick?: (productName?: string) => void;
}

export default function FactoryShowcase({ onContactClick }: FactoryShowcaseProps) {
  const { t } = useLanguage();

  const handleInquireOEM = () => {
    if (onContactClick) {
      onContactClick('OEM/ODM Custom Branding & Bulk Wholesale');
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="factory" style={{ padding: '80px 24px', maxWidth: '1280px', margin: '0 auto' }}>
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <span className="badge badge-gold" style={{ marginBottom: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <Factory size={14} /> FACTORY &amp; OEM/ODM CAPACITY
        </span>
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2rem, 4vw, 2.8rem)',
          fontWeight: 800,
          color: 'var(--text-main)',
        }}>
          Direct Manufacturer &amp; Customization Power
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '680px', margin: '12px auto 0', lineHeight: 1.6 }}>
          VSZAPOWER operates dedicated automated SMT lines, micro-current IC testing labs, and eco-friendly packaging workshops to support global distributors and OEM/ODM clients.
        </p>
      </div>

      {/* Metric Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '24px',
        marginBottom: '56px',
      }}>
        <div className="glass-panel" style={{ padding: '28px', borderRadius: '18px', textAlign: 'center' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <Factory size={24} color="var(--accent-green)" />
          </div>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '4px' }}>10,000+ m²</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Modern Production Facility</p>
        </div>

        <div className="glass-panel" style={{ padding: '28px', borderRadius: '18px', textAlign: 'center' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(6, 182, 212, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <Cpu size={24} color="var(--accent-cyan)" />
          </div>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '4px' }}>500,000+ Pcs</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Monthly Charger Dock Capacity</p>
        </div>

        <div className="glass-panel" style={{ padding: '28px', borderRadius: '18px', textAlign: 'center' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <ShieldCheck size={24} color="var(--kraft-gold)" />
          </div>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '4px' }}>100% QC Test</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Aging &amp; Auto 4.2V Cutoff Inspection</p>
        </div>

        <div className="glass-panel" style={{ padding: '28px', borderRadius: '18px', textAlign: 'center' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(147, 51, 234, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <PackageCheck size={24} color="#a855f7" />
          </div>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '4px' }}>50+ Countries</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Global Express &amp; Freight Export</p>
        </div>
      </div>

      {/* OEM / ODM Service Box */}
      <div className="glass-panel" style={{
        borderRadius: '24px',
        padding: '40px',
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(6, 182, 212, 0.08) 100%)',
        border: '1px solid var(--border-color)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
          alignItems: 'center',
        }}>
          <div>
            <span className="badge badge-green" style={{ marginBottom: '12px' }}>CUSTOM BRANDING &amp; OEM</span>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
              Tailored OEM / ODM Solutions for Distributors
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '20px' }}>
              Whether you need customized silk-screen logos on charger housing, specialized kraft packaging with FBA barcodes, or customized voltage cut-off parameters, our engineering team provides end-to-end support.
            </p>
            <button
              onClick={handleInquireOEM}
              className="btn-primary"
              style={{ padding: '12px 24px', fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <Send size={16} /> Request OEM / ODM Proposal
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ background: 'rgba(255,255,255,0.04)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <Wrench size={20} color="var(--accent-green)" style={{ marginBottom: '8px' }} />
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>Custom Logo</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Precision laser etching or silk-screen branding.</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.04)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <PackageCheck size={20} color="var(--accent-cyan)" style={{ marginBottom: '8px' }} />
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>Custom Packaging</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Kraft papercard box with custom artwork &amp; barcode.</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.04)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <Cpu size={20} color="var(--kraft-gold)" style={{ marginBottom: '8px' }} />
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>Custom Micro-Chip</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Specialized 3.6V / 4.2V MCU cutoff profiles.</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.04)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <Sparkles size={20} color="#a855f7" style={{ marginBottom: '8px' }} />
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>Sample Fast Track</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Customized sample delivery in 3 - 5 business days.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
