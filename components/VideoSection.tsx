'use client';

import React, { useState, useEffect } from 'react';
import { Play, Video, Tag, MessageSquare, ExternalLink, X } from 'lucide-react';
import { VideoItem, INITIAL_VIDEOS } from '@/lib/store';
import { useLanguage } from '@/context/LanguageContext';
import { translateDynamicContent } from '@/lib/dynamicI18n';

interface VideoSectionProps {
  onContactClick: (productName?: string) => void;
}

export default function VideoSection({ onContactClick }: VideoSectionProps) {
  const { lang, t } = useLanguage();
  const [videos, setVideos] = useState<VideoItem[]>(INITIAL_VIDEOS);
  const [activeVideoModal, setActiveVideoModal] = useState<VideoItem | null>(null);

  useEffect(() => {
    fetch('/api/videos')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setVideos(data.data);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <section id="videos" style={{
      padding: '60px 24px',
      maxWidth: '1280px',
      margin: '0 auto',
    }}>
      {/* Streamlined Section Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: '36px',
        flexWrap: 'wrap',
        gap: '20px',
      }}>
        <div>
          <span className="badge badge-gold" style={{ marginBottom: '10px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Video size={14} /> PRODUCT &amp; FACTORY DEMOS
          </span>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
            fontWeight: 800,
            lineHeight: 1.2,
          }}>
            Video Showcase &amp; Live Tests
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '6px', maxWidth: '580px' }}>
            Watch live micro-chip safety, AirTag battery replacement, and multi-slot charging demonstrations.
          </p>
        </div>

        <a
          href="https://www.tiktok.com/@vszapower.3c"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            borderRadius: '20px',
            background: 'rgba(255, 44, 85, 0.1)',
            border: '1px solid rgba(255, 44, 85, 0.3)',
            color: '#ff2c55',
            fontSize: '0.85rem',
            fontWeight: 700,
            textDecoration: 'none',
          }}
        >
          🎵 TikTok @vszapower.3c <ExternalLink size={13} />
        </a>
      </div>

      {/* Streamlined Grid Layout (3 Columns) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
        gap: '24px',
      }}>
        {videos.map(video => {
          const translatedTitle = translateDynamicContent(video.title, lang);

          return (
            <div
              key={video.id}
              className="glass-panel"
              style={{
                borderRadius: '16px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid var(--border-color)',
                transition: 'transform 0.2s ease, border-color 0.2s ease',
              }}
            >
              <div>
                {/* Video Thumbnail Box */}
                <div
                  onClick={() => setActiveVideoModal(video)}
                  style={{
                    position: 'relative',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    background: '#090d16',
                    aspectRatio: '16 / 9',
                    marginBottom: '14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <img
                    src={video.poster_url || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'}
                    alt={translatedTitle}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
                  />

                  {/* Play Button Icon */}
                  <div style={{
                    position: 'absolute',
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'rgba(0, 230, 153, 0.9)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 20px rgba(0, 230, 153, 0.5)',
                    transition: 'transform 0.2s ease',
                  }}>
                    <Play size={22} color="#041410" style={{ marginLeft: '3px' }} />
                  </div>

                  {/* Duration Badge */}
                  {video.duration && (
                    <span style={{
                      position: 'absolute',
                      bottom: '8px',
                      right: '8px',
                      background: 'rgba(0,0,0,0.75)',
                      color: 'var(--text-main)',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '2px 6px',
                      borderRadius: '4px',
                    }}>
                      {video.duration}
                    </span>
                  )}
                </div>

                {/* Video Title */}
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1rem',
                  fontWeight: 700,
                  marginBottom: '10px',
                  lineHeight: 1.4,
                  color: 'var(--text-main)',
                }}>
                  {translatedTitle}
                </h3>

                {/* Keywords Chips */}
                {video.keywords && video.keywords.length > 0 && (
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                    {video.keywords.slice(0, 3).map((kw, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '0.72rem',
                          color: 'var(--accent-green)',
                          background: 'rgba(0, 230, 153, 0.08)',
                          border: '1px solid rgba(0, 230, 153, 0.2)',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          fontWeight: 600,
                        }}
                      >
                        {translateDynamicContent(kw, lang)}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Button */}
              <button
                onClick={() => onContactClick(translatedTitle)}
                className="btn-secondary"
                style={{ width: '100%', padding: '8px 12px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <MessageSquare size={14} /> Inquire Solution
              </button>
            </div>
          );
        })}
      </div>

      {/* Video Modal Lightbox Player */}
      {activeVideoModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.9)',
          backdropFilter: 'blur(12px)',
          zIndex: 1050,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
        }} className="mobile-bottom-sheet">
          <div className="glass-panel mobile-bottom-sheet-content" style={{
            width: '100%',
            maxWidth: '800px',
            borderRadius: '20px',
            overflow: 'hidden',
            background: 'rgba(10,13,20,0.95)',
            position: 'relative',
            border: '1px solid var(--border-color)',
          }}>
            <button
              onClick={() => setActiveVideoModal(null)}
              style={{
                position: 'absolute',
                top: '16px', right: '16px',
                zIndex: 10,
                background: 'rgba(255,255,255,0.1)', border: 'none', color: 'var(--text-main)',
                width: '36px', height: '36px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              }}
            >
              <X size={20} />
            </button>

            <div style={{ width: '100%', aspectRatio: '16 / 9', background: '#000' }}>
              <video
                src={activeVideoModal.video_url}
                poster={activeVideoModal.poster_url}
                controls
                autoPlay
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>

            <div style={{ padding: '20px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
                {translateDynamicContent(activeVideoModal.title, lang)}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '16px' }}>
                {translateDynamicContent(activeVideoModal.description, lang)}
              </p>
              <button
                onClick={() => {
                  const title = activeVideoModal.title;
                  setActiveVideoModal(null);
                  onContactClick(title);
                }}
                className="btn-primary"
                style={{ padding: '10px 20px', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <MessageSquare size={16} /> Request Wholesale Quote for this Product
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
