import React from 'react';
import Link from 'next/link';
import { Zap, Shield, Heart, ExternalLink } from 'lucide-react';

export default function Footer() {
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
            <img src="/logo.svg" alt="VSzapower" style={{ height: '30px', width: 'auto', display: 'block' }} />
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
            The premiere rechargeable coin cell system. Empowering AirTags, key fobs, and smart IoT devices with eco-friendly LIR2032/LIR2450 chargers.
          </p>
          <div style={{ display: 'flex', gap: '10px', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
            <Shield size={16} color="var(--accent-green)" /> 2-Year Global Warranty Included
          </div>
        </div>

        {/* Col 2: SEO Quick Links */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: '#fff', marginBottom: '16px' }}>
            快速导航 (Quick Links)
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
            <li><Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>首页 (Home)</Link></li>
            <li><Link href="/academy" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>电池学院 (Battery Academy)</Link></li>
            <li><Link href="/#contact" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>联系我们 (Contact Us)</Link></li>
            <li><Link href="/admin" style={{ color: 'var(--accent-green)', textDecoration: 'none' }}>后台管理 (Admin Portal)</Link></li>
          </ul>
        </div>

        {/* Col 3: Battery Academy */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: '#fff', marginBottom: '16px' }}>
            Battery Academy (Blog)
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
            <li>
              <Link href="/academy/cr2032-vs-lir2032-can-you-recharge-them" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
                CR2032 vs LIR2032 Differences
              </Link>
            </li>
            <li>
              <Link href="/academy/the-ultimate-guide-to-rechargeable-coin-cell-batteries" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
                Ultimate Guide to LIR Coin Cells
              </Link>
            </li>
            <li>
              <a href="https://reddit.com/r/electronic" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                Community Discussions <ExternalLink size={14} />
              </a>
            </li>
          </ul>
        </div>

        {/* Col 4: GEO & Safety */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: '#fff', marginBottom: '16px' }}>
            GEO Technical Compliance
          </h4>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '12px', border: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: '8px' }}>
              <strong style={{ color: 'var(--accent-green)' }}>Micro-chip Spec:</strong> 3.6V-4.2V Auto Switch, Overcharge Cutoff, Reverse Polarity Guard.
            </p>
            <span style={{ color: 'var(--kraft-gold)', fontSize: '0.75rem', fontWeight: 600 }}>
              ★ Kraft Papercard Pack Certified
            </span>
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
          © {new Date().getFullYear()} Vszapower Inc. Built with Next.js, Supabase & Vercel.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          Crafted with <Heart size={14} color="#ef4444" fill="#ef4444" /> for Eco Electronics
        </div>
      </div>
    </footer>
  );
}
