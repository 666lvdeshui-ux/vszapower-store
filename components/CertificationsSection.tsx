'use client';

import React, { useState } from 'react';
import { ShieldCheck, FileCheck, ExternalLink, CheckCircle2, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translateDynamicContent } from '@/lib/dynamicI18n';

interface CertItem {
  code: string;
  title: string;
  scope: 'Charger' | 'Battery' | 'Packaging';
  description: string;
  verifiedStatus: string;
  badgeColor: string;
}

const CERTIFICATIONS_LIST: CertItem[] = [
  {
    code: 'CE-LVD & EMC',
    title: 'CE European Conformity Certificate',
    scope: 'Charger',
    description: 'Complies with EU Low Voltage Directive (LVD) & Electromagnetic Compatibility Directive.',
    verifiedStatus: 'Verified & Active',
    badgeColor: 'var(--accent-green)',
  },
  {
    code: 'FCC Part 15B',
    title: 'FCC Declaration of Conformity (USA)',
    scope: 'Charger',
    description: 'Certified for Class B digital device electromagnetic radiation safety in United States.',
    verifiedStatus: 'Verified & Active',
    badgeColor: 'var(--accent-cyan)',
  },
  {
    code: 'RoHS 2.0',
    title: 'RoHS Environmental Protection Directive',
    scope: 'Charger',
    description: 'Guarantees 100% lead-free, mercury-free, and non-hazardous materials in manufacturing.',
    verifiedStatus: 'Verified & Active',
    badgeColor: 'var(--accent-green)',
  },
  {
    code: 'UN38.3 Report',
    title: 'UN38.3 Lithium Battery Safety Appraisal',
    scope: 'Battery',
    description: 'Mandatory international standard for safe air & sea shipment of LIR series lithium cells.',
    verifiedStatus: 'Verified & Active',
    badgeColor: 'var(--kraft-gold)',
  },
  {
    code: 'MSDS Certificate',
    title: 'Material Safety Data Sheet (MSDS)',
    scope: 'Battery',
    description: 'Comprehensive chemical composition data sheet for international customs clearance.',
    verifiedStatus: 'Verified & Active',
    badgeColor: '#a855f7',
  },
  {
    code: '1.2m Drop Test',
    title: '1.2-Meter Packaging Drop Test Report',
    scope: 'Packaging',
    description: 'Verifies eco-kraft packaging durability against extreme transport shock & drop impacts.',
    verifiedStatus: 'Verified & Active',
    badgeColor: 'var(--kraft-gold)',
  },
  {
    code: 'PSE Exempt / UKCA',
    title: 'Japan PSE & UKCA Compliance',
    scope: 'Charger',
    description: 'Meets Japan Electrical Appliance Safety Law exemption & UK Conformity Assessed standard.',
    verifiedStatus: 'Verified & Active',
    badgeColor: 'var(--accent-cyan)',
  },
  {
    code: 'GPSR & CE-Battery',
    title: 'EU General Product Safety Regulation (GPSR)',
    scope: 'Battery',
    description: 'Full compliance with 2026 EU Battery Regulations and General Product Safety Directives.',
    verifiedStatus: 'Verified & Active',
    badgeColor: 'var(--accent-green)',
  },
];

export default function CertificationsSection() {
  const { lang, t } = useLanguage();
  const [activeCert, setActiveCert] = useState<CertItem | null>(null);

  return (
    <section id="certifications" style={{ padding: '80px 24px', maxWidth: '1280px', margin: '0 auto' }}>
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <span className="badge badge-green" style={{ marginBottom: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <ShieldCheck size={14} /> {translateDynamicContent('INTERNATIONAL COMPLIANCE & SAFETY', lang)}
        </span>
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2rem, 4vw, 2.8rem)',
          fontWeight: 800,
          color: 'var(--text-main)',
        }}>
          {translateDynamicContent('Global Safety & Transport Certifications', lang)}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '680px', margin: '12px auto 0', lineHeight: 1.6 }}>
          {translateDynamicContent('All VSZAPOWER charger docks and rechargeable button cells carry official international safety certifications required for Amazon FBA listing, customs clearance, and wholesale distribution.', lang)}
        </p>
      </div>

      {/* Certifications Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '24px',
      }}>
        {CERTIFICATIONS_LIST.map((cert) => (
          <div
            key={cert.code}
            className="glass-panel"
            onClick={() => setActiveCert(cert)}
            style={{
              padding: '24px',
              borderRadius: '16px',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, border-color 0.2s ease',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: cert.badgeColor,
                    background: 'rgba(255,255,255,0.06)',
                    border: `1px solid ${cert.badgeColor}`,
                    padding: '3px 8px',
                    borderRadius: '6px',
                  }}
                >
                  ✓ {cert.code}
                </span>

                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '4px' }}>
                  {translateDynamicContent(cert.scope, lang)}
                </span>
              </div>

              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
                {translateDynamicContent(cert.title, lang)}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '16px' }}>
                {translateDynamicContent(cert.description, lang)}
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: '0.8rem' }}>
              <span style={{ color: 'var(--accent-green)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle2 size={14} /> {translateDynamicContent(cert.verifiedStatus, lang)}
              </span>
              <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                {translateDynamicContent('View Preview', lang)} <ExternalLink size={12} />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Preview */}
      {activeCert && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(10px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
        }}>
          <div className="glass-panel" style={{
            width: '100%',
            maxWidth: '480px',
            padding: '32px',
            borderRadius: '20px',
            position: 'relative',
            background: 'rgba(10,13,20,0.95)',
          }}>
            <button
              onClick={() => setActiveCert(null)}
              style={{
                position: 'absolute', top: '16px', right: '16px',
                background: 'rgba(255,255,255,0.1)', border: 'none', color: 'var(--text-main)',
                width: '32px', height: '32px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              }}
            >
              <X size={18} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <ShieldCheck size={48} color={activeCert.badgeColor} style={{ margin: '0 auto 12px' }} />
              <span className="badge badge-green" style={{ marginBottom: '8px' }}>{activeCert.code}</span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>{translateDynamicContent(activeCert.title, lang)}</h3>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', marginBottom: '20px', fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--text-muted)' }}>
              <p style={{ marginBottom: '8px' }}><strong>Target Scope:</strong> {translateDynamicContent(activeCert.scope, lang)} Assembly</p>
              <p style={{ marginBottom: '8px' }}><strong>Inspection Agency:</strong> International Accredited Testing Lab</p>
              <p style={{ marginBottom: '8px' }}><strong>Status:</strong> {translateDynamicContent(activeCert.verifiedStatus, lang)} for 2026 Export</p>
              <p>{translateDynamicContent(activeCert.description, lang)}</p>
            </div>

            <button
              onClick={() => {
                setActiveCert(null);
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary"
              style={{ width: '100%', padding: '12px', fontSize: '0.95rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            >
              <FileCheck size={16} /> {translateDynamicContent('Request Official Certification PDF Copies', lang)}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
