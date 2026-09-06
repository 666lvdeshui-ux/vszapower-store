'use client';

import { entityDescription } from '@/lib/catalog';
import React from 'react';
import Link from 'next/link';
import { Shield, Heart, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { sectionText } from '@/lib/sectionI18n';

export default function Footer() {
  const { t, lang } = useLanguage();

  return (
    <footer style={{
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-color)',
      padding: '60px 24px 30px',
      marginTop: '80px',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '40px',
        paddingBottom: '40px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      }}>
        {/* Col 1: Brand Info */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <img src="/logo.svg" alt="VSZAPOWER" style={{ height: '30px', width: 'auto', display: 'block' }} />
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px', lineHeight: 1.6 }}>
            {entityDescription}
          </p>
          <div style={{ display: 'flex', gap: '10px', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
            <Shield size={16} color="var(--accent-green)" /> {sectionText('Certifications & Compliance', lang)}: {['Battery', 'CE', 'FCC', 'RoHS', 'CE-Battery', 'GPSR', 'PSE', 'UN38.3'].map(cert => sectionText(cert, lang)).join(' / ')}
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: 'var(--text-main)', marginBottom: '16px' }}>
            {t('nav_home')} &amp; {t('nav_contact')}
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
            <li><Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>{t('nav_home')}</Link></li>
            <li><Link href="/#products?cat=charger" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>{t('nav_chargers')}</Link></li>
            <li><Link href="/rechargeable-coin-cell-batteries" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>{t('nav_batteries')}</Link></li>
            <li><Link href="/academy" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>{t('nav_academy')}</Link></li>
            <li><Link href="/#contact" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>{t('nav_contact')}</Link></li>
            <li><Link href="/compliance" style={{color:'var(--text-muted)'}}>Compliance Center</Link></li>
            <li><Link href="/about-vszapower" style={{color:'var(--text-muted)'}}>About VSZAPOWER</Link></li>
            <li><Link href="/coin-cell-charger-manufacturer" style={{color:'var(--text-muted)'}}>Charger manufacturing &amp; OEM</Link></li>
          </ul>
        </div>

        {/* Col 3: Battery Academy */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: 'var(--text-main)', marginBottom: '16px' }}>
            {t('nav_academy')}
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
            <li>
              <Link href="/academy" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
                {t('academy_title')}
              </Link>
            </li>
            <li>
              <a href="https://reddit.com/r/electronic" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                Community Discussions <ExternalLink size={14} />
              </a>
            </li>
          </ul>
        </div>

        {/* Col 4: Technical Compliance & Certifications */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: 'var(--text-main)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Shield size={16} color="var(--accent-green)" /> {sectionText('Certifications & Compliance', lang)}
          </h4>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '12px', border: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
              {['Battery', 'CE', 'FCC', 'RoHS', 'CE-Battery', 'GPSR-Test Report', 'PSE', 'UN38.3'].map((cert) => (
                <span
                  key={cert}
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: 'var(--accent-green)',
                    background: 'rgba(0, 230, 153, 0.1)',
                    border: '1px solid rgba(0, 230, 153, 0.3)',
                    padding: '3px 8px',
                    borderRadius: '6px',
                  }}
                >
                  {sectionText(cert, lang)}
                </span>
              ))}
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', lineHeight: 1.4 }}>
              <span>Documentation topics. Availability and scope depend on the specific model and report. View the Compliance Center for published test summaries.</span>
            </p>
          </div>
        </div>
      </div>

      <div style={{
        maxWidth: '1280px',
        margin: '20px auto 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
        color: 'var(--text-dim)',
        fontSize: '0.85rem',
      }}>
        <div>
          {t('footer_copyright')}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <span style={{ color: 'var(--accent-green)', fontWeight: 600, fontSize: '0.8rem' }}>
            {['Battery', 'CE', 'FCC', 'RoHS', 'CE-Battery', 'GPSR-Test Report', 'PSE', 'UN38.3'].map(cert => sectionText(cert, lang)).join(' / ')}
          </span>
          <span>•</span>
          <span>Crafted with <Heart size={14} color="#ef4444" fill="#ef4444" style={{ display: 'inline' }} /> for Eco Electronics</span>
        </div>
      </div>
    </footer>
  );
}
