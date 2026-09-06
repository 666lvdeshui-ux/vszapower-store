'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, Sparkles, PhoneCall, CheckCircle2, Play } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { sectionText } from '@/lib/sectionI18n';
import UniversalVideoPlayer from '@/components/UniversalVideoPlayer';
import { supabase } from '@/lib/supabase';

interface HeroCarouselProps {
  onContactClick: (productName?: string) => void;
}

interface OEMHeroMedia {
  tile1_image: string;
  tile2_image: string;
  tile3_image: string;
  tile4_image: string;
}

const DEFAULT_MEDIA: OEMHeroMedia = {
  tile1_image: '/oem/oem_factory_assembly.png',
  tile2_image: '/oem/oem_charger_pcb.png',
  tile3_image: '/oem/oem_battery_testing.png',
  tile4_image: '/oem/oem_custom_packaging.png',
};

export default function HeroCarousel({ onContactClick }: HeroCarouselProps) {
  const { lang } = useLanguage();
  const [oemMedia, setOemMedia] = useState<OEMHeroMedia>(DEFAULT_MEDIA);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('vszapower_oem_hero_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          setOemMedia(prev => ({ ...prev, ...parsed }));
        }
      }
    } catch (e) {}

    // Direct Supabase query from browser client (Bypasses serverless proxy delays)
    if (supabase) {
      supabase
        .from('banners')
        .select('*')
        .eq('id', 'oem_hero_2x2')
        .single()
        .then(({ data, error }) => {
          if (!error && data && data.subtitle) {
            try {
              const parsed = JSON.parse(data.subtitle);
              if (parsed && typeof parsed === 'object') {
                setOemMedia(prev => ({ ...prev, ...parsed }));
                localStorage.setItem('vszapower_oem_hero_settings', JSON.stringify(parsed));
              }
            } catch (e) {}
          }
        });
    }

    fetch('/api/oem-hero')
      .then(res => res.json())
      .then(data => {
        if (data && typeof data === 'object') {
          setOemMedia(prev => ({
            ...prev,
            ...data,
          }));

          try {
            localStorage.setItem('vszapower_oem_hero_settings', JSON.stringify(data));
          } catch (e) {}
        }
      })
      .catch(err => console.warn('Failed to load dynamic OEM hero media:', err));
  }, []);

  const handlePrimaryClick = () => {
    onContactClick(sectionText('OEM/ODM Custom Battery & Charger Manufacturing Inquiry', lang));
  };

  const handleWhatsAppClick = () => {
    if (typeof window !== 'undefined') {
      const waNumber = '85260716913';
      window.open(`https://wa.me/${waNumber}?text=Hi%20VSZAPOWER%20Team%2C%20I%20am%20interested%20in%20OEM%2FODM%20custom%20battery%20and%20charger%20solutions.`, '_blank');
    }
  };

  const pillBadges = [
    'MOQ From 100 Pieces',
    '7-Day Silk Screen Branding OEM',
    'OEM / ODM Customization',
    'Private Label Packaging',
    'Worldwide Express Shipping',
    'Model-specific test documentation',
  ];

  return (
    <section style={{
      position: 'relative',
      maxWidth: '1280px',
      margin: '20px auto 40px',
      padding: '0 20px',
    }}>
      {/* VSZAPOWER Brand Theme OEM Manufacturing Hero Banner */}
      <div style={{
        position: 'relative',
        borderRadius: '32px',
        overflow: 'hidden',
        background: 'var(--bg-card, #121824)',
        border: '1px solid var(--border-glow, rgba(16, 185, 129, 0.3))',
        boxShadow: '0 24px 60px rgba(0, 0, 0, 0.35)',
        padding: '56px 48px',
        transition: 'all 0.3s ease-in-out',
      }} className="oem-hero-container">

        {/* Ambient Glow Gradient */}
        <div style={{
          position: 'absolute',
          top: '-100px',
          left: '-100px',
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }} />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: '48px',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}>
          {/* Left Column: Headline, Description & OEM Capabilities */}
          <div>
            {/* Top Subheader Tag */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--accent-green, #10b981)',
              fontSize: '0.9rem',
              fontWeight: 800,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>
              <Sparkles size={16} />
              {sectionText('OEM & ODM BATTERY & CHARGER MANUFACTURING', lang)}
            </div>

            {/* Main Headline */}
            <h1 style={{
              fontFamily: 'var(--font-heading, sans-serif)',
              fontSize: 'clamp(2.4rem, 4.2vw, 3.6rem)',
              fontWeight: 900,
              lineHeight: 1.12,
              letterSpacing: '-1.5px',
              color: 'var(--text-main, #f8fafc)',
              marginBottom: '20px',
            }}>
              Rechargeable Coin Cell Battery &amp; Charger Manufacturer
            </h1>

            {/* Description Paragraph */}
            <p style={{
              color: 'var(--text-muted, #94a3b8)',
              fontSize: '1.08rem',
              lineHeight: 1.65,
              marginBottom: '32px',
              maxWidth: '560px',
            }}>
              LIR2032 · LIR2025 · LIR2016 · LIR2450 · ML2032 · Coin Cell Chargers · OEM/ODM. Explore rechargeable coin cells and charger configurations for wholesale and private-label projects.
            </p>

            {/* Tag Pills Grid */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              marginBottom: '36px',
            }}>
              {pillBadges.map((badge, idx) => (
                <span
                  key={idx}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    borderRadius: '24px',
                    background: 'var(--bg-card-hover, rgba(255, 255, 255, 0.06))',
                    border: '1px solid var(--border-color, rgba(255, 255, 255, 0.12))',
                    color: 'var(--text-main, #f8fafc)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                  className="pill-badge"
                >
                  <CheckCircle2 size={14} style={{ color: 'var(--accent-green, #10b981)' }} />
                  {sectionText(badge, lang)}
                </span>
              ))}
            </div>

            {/* Action CTAs */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              flexWrap: 'wrap',
            }} className="mobile-stack-buttons">
              <button
                onClick={handlePrimaryClick}
                className="btn-oem-primary"
                style={{
                  padding: '16px 36px',
                  borderRadius: '30px',
                  background: 'var(--accent-gradient, linear-gradient(135deg, #10b981 0%, #06b6d4 100%))',
                  color: '#FFFFFF',
                  fontSize: '1.02rem',
                  fontWeight: 800,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 10px 25px rgba(16, 185, 129, 0.4)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'all 0.2s ease',
                }}
              >
                <MessageSquare size={18} />
                {sectionText('Get Free Quote', lang)}
              </button>

              <button
                onClick={handleWhatsAppClick}
                className="btn-oem-secondary"
                style={{
                  padding: '16px 30px',
                  borderRadius: '30px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  color: 'var(--text-main, #ffffff)',
                  fontSize: '1.02rem',
                  fontWeight: 800,
                  border: '1px solid var(--border-color, rgba(255, 255, 255, 0.2))',
                  cursor: 'pointer',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'all 0.2s ease',
                }}
              >
                <PhoneCall size={18} />
                {sectionText('WhatsApp Us', lang)}
              </button>
            </div>
          </div>

          {/* Right Column: 2x2 OEM Factory Showcase Grid Collage */}
          <div style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '1 / 1',
            maxHeight: '520px',
            borderRadius: '28px',
            overflow: 'hidden',
            boxShadow: '0 20px 45px rgba(0, 0, 0, 0.4)',
            border: '2px solid var(--border-glow, rgba(16, 185, 129, 0.3))',
            background: 'var(--bg-secondary, #121824)',
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gridTemplateRows: '1fr 1fr',
              gap: '6px',
              width: '100%',
              height: '100%',
              background: 'rgba(10, 13, 20, 0.8)',
              padding: '6px',
            }}>
              {/* Tile 1: Cleanroom Assembly Line (Image) */}
              <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '18px' }} className="collage-tile">
                <img
                  src={oemMedia.tile1_image || DEFAULT_MEDIA.tile1_image}
                  alt={sectionText('OEM Factory Assembly Line', lang)}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '10px',
                  background: 'rgba(10, 13, 20, 0.85)',
                  backdropFilter: 'blur(8px)',
                  color: '#FFFFFF',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '12px',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                }}>
                  {sectionText('Cleanroom Assembly', lang)}
                </div>
              </div>

              {/* Tile 2: SMT Charger PCB (Image) */}
              <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '18px' }} className="collage-tile">
                <img
                  src={oemMedia.tile2_image || DEFAULT_MEDIA.tile2_image}
                  alt={sectionText('SMT Charger Circuit Board Production', lang)}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '10px',
                  background: 'rgba(10, 13, 20, 0.85)',
                  backdropFilter: 'blur(8px)',
                  color: '#FFFFFF',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '12px',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                }}>
                  {sectionText('SMT Micro-Chip PCB', lang)}
                </div>
              </div>

              {/* Tile 3: Battery Quality QA (Image) */}
              <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '18px' }} className="collage-tile">
                <img
                  src={oemMedia.tile3_image || DEFAULT_MEDIA.tile3_image}
                  alt={sectionText('LIR Coin Cell Quality Testing', lang)}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '10px',
                  background: 'rgba(10, 13, 20, 0.85)',
                  backdropFilter: 'blur(8px)',
                  color: '#FFFFFF',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '12px',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                }}>
                  {sectionText('Precision Quality QA', lang)}
                </div>
              </div>

              {/* Tile 4: Custom Private Label Packaging (Image) */}
              <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '18px' }} className="collage-tile">
                <img
                  src={oemMedia.tile4_image || DEFAULT_MEDIA.tile4_image}
                  alt={sectionText('OEM Custom Packaging & Warehouse', lang)}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '10px',
                  background: 'rgba(10, 13, 20, 0.85)',
                  backdropFilter: 'blur(8px)',
                  color: '#FFFFFF',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '12px',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                }}>
                  {sectionText('OEM Export Box', lang)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .collage-tile:hover img,
        .collage-tile:hover video {
          transform: scale(1.08);
        }
        .btn-oem-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 30px rgba(16, 185, 129, 0.55) !important;
        }
        .btn-oem-secondary:hover {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.18) !important;
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.3) !important;
        }
        .pill-badge:hover {
          transform: translateY(-1px);
          border-color: var(--accent-green, #10b981) !important;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2) !important;
        }
      `}</style>
    </section>
  );
}
