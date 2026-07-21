'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MessageSquare, Sparkles } from 'lucide-react';

export interface BannerSlide {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  image_url: string;
  cta_text?: string;
  cta_link?: string;
  highlight: string;
}

const DEFAULT_SLIDES: BannerSlide[] = [
  {
    id: '1',
    badge: 'SMART RECHARGE SYSTEM',
    title: 'Stop Throwing Away Button Batteries',
    subtitle: 'High precision LIR2032 / LIR2450 smart USB dual-slot charger dock. Eco-friendly kraft packaging, built for long lifecycle.',
    image_url: 'https://images.unsplash.com/photo-1619725002198-6a689b72f41d?auto=format&fit=crop&w=1400&q=80',
    highlight: '500+ Recharge Cycles • Auto 4.2V Cutoff',
    cta_text: '联系我们 (Contact Us)',
    cta_link: '/#contact',
  },
  {
    id: '2',
    badge: 'AIRTAG & KEY FOB POWERED',
    title: 'Rechargeable LIR2032 Starter Kit',
    subtitle: 'Perfect replacement for Apple AirTags, BMW/Audi/Toyota key fobs, and smart home sensors. Save money & eliminate e-waste.',
    image_url: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=1400&q=80',
    highlight: 'Includes 1x Charger Dock + 4x LIR2032 Cells',
    cta_text: '查看产品介绍',
    cta_link: '/#products',
  },
  {
    id: '3',
    badge: 'GLOBAL OEM / WHOLESALE',
    title: 'Certified Micro-Chip Protection',
    subtitle: 'Dual-color LED charging indicator, reverse polarity guard, and CE/FCC/RoHS global safety compliance.',
    image_url: 'https://images.unsplash.com/photo-1609592424074-954930b8098c?auto=format&fit=crop&w=1400&q=80',
    highlight: 'Factory Direct Wholesale & Custom Branding',
    cta_text: '联系我们 (Contact Us)',
    cta_link: '/#contact',
  },
];

interface HeroCarouselProps {
  onContactClick: (productName?: string) => void;
}

export default function HeroCarousel({ onContactClick }: HeroCarouselProps) {
  const [slides, setSlides] = useState<BannerSlide[]>(DEFAULT_SLIDES);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetch('/api/banners')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setSlides(data);
        }
      })
      .catch(err => console.warn('Failed to fetch dynamic banners:', err));
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides]);

  const prevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  if (slides.length === 0) return null;

  const activeIndex = currentSlide >= slides.length ? 0 : currentSlide;
  const slide = slides[activeIndex];

  const handleCtaClick = () => {
    if (slide.cta_link && slide.cta_link.startsWith('/#')) {
      const sectionId = slide.cta_link.replace('/#', '');
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    onContactClick(slide.title);
  };

  return (
    <section style={{
      position: 'relative',
      maxWidth: '1280px',
      margin: '24px auto 40px',
      padding: '0 24px',
    }}>
      <div className="glass-panel" style={{
        position: 'relative',
        borderRadius: '24px',
        overflow: 'hidden',
        minHeight: '440px',
        display: 'flex',
        alignItems: 'center',
        border: '1px solid var(--border-color)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
      }}>
        {/* Background Slide Image with overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
        }}>
          <img
            src={slide.image_url}
            alt={slide.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.35)',
              transition: 'all 0.8s ease-in-out',
            }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, rgba(10,13,20,0.95) 0%, rgba(10,13,20,0.6) 60%, transparent 100%)',
          }} />
        </div>

        {/* Content Box */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '640px',
          padding: '48px 40px',
          color: '#fff',
        }}>
          <div style={{ display: 'inline-block', marginBottom: '16px' }}>
            <span className="badge badge-green" style={{ fontSize: '0.8rem', padding: '6px 14px' }}>
              <Sparkles size={14} style={{ marginRight: '6px', display: 'inline' }} />
              {slide.badge}
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-1px',
            marginBottom: '16px',
          }}>
            {slide.title}
          </h1>

          <p style={{
            color: 'rgba(255,255,255,0.85)',
            fontSize: '1.1rem',
            lineHeight: 1.6,
            marginBottom: '28px',
          }}>
            {slide.subtitle}
          </p>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap',
          }}>
            <button
              onClick={handleCtaClick}
              className="btn-primary"
              style={{
                padding: '14px 28px',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <MessageSquare size={18} /> {slide.cta_text || '联系我们 (Contact Us)'}
            </button>

            {slide.highlight && (
              <span style={{
                fontSize: '0.85rem',
                color: 'var(--accent-green)',
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                padding: '8px 14px',
                borderRadius: '20px',
                fontWeight: 600,
              }}>
                {slide.highlight.startsWith('✓') ? slide.highlight : `✓ ${slide.highlight}`}
              </span>
            )}
          </div>
        </div>

        {/* Carousel Navigation Arrows */}
        {slides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              aria-label="Previous Slide"
              style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 2,
                background: 'rgba(10, 13, 20, 0.6)',
                backdropFilter: 'blur(10px)',
                border: '1px solid var(--border-color)',
                color: '#fff',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 2,
                background: 'rgba(10, 13, 20, 0.6)',
                backdropFilter: 'blur(10px)',
                border: '1px solid var(--border-color)',
                color: '#fff',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <ChevronRight size={24} />
            </button>

            {/* Indicator Dots */}
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 2,
              display: 'flex',
              gap: '8px',
            }}>
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  style={{
                    width: activeIndex === idx ? '28px' : '10px',
                    height: '10px',
                    borderRadius: '5px',
                    background: activeIndex === idx ? 'var(--accent-green)' : 'rgba(255,255,255,0.3)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
