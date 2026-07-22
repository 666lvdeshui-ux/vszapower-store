'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, Video, Tag, MessageSquare, ExternalLink, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { VideoItem, INITIAL_VIDEOS } from '@/lib/store';

interface VideoSectionProps {
  onContactClick: (productName?: string) => void;
}

export default function VideoSection({ onContactClick }: VideoSectionProps) {
  const [videos, setVideos] = useState<VideoItem[]>(INITIAL_VIDEOS);
  const [playingId, setPlayingId] = useState<string | null>(null);

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
      padding: '60px 24px 80px',
      maxWidth: '1280px',
      margin: '0 auto',
    }}>
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <span className="badge badge-gold" style={{ marginBottom: '12px', fontSize: '0.75rem' }}>
          🎬 SHORT VIDEO SHOWCASE
        </span>
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2rem, 4vw, 2.8rem)',
          fontWeight: 800,
          marginBottom: '12px',
        }}>
          产品 <span className="gradient-text">短视频展厅</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '640px', margin: '0 auto', marginBottom: '16px' }}>
          直观视频展示 VSZAPOWER 纽扣电池充电座的真实充放电效果、智能指示灯切断与多设备场景应用。
        </p>

        {/* TikTok Profile Badge */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <a
            href="https://www.tiktok.com/@vszapower.3c"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 18px',
              borderRadius: '30px',
              background: 'rgba(255, 44, 85, 0.12)',
              border: '1px solid rgba(255, 44, 85, 0.4)',
              color: '#ff2c55',
              fontSize: '0.85rem',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            🎵 关注 TikTok 官方账号 @vszapower.3c <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* Video Items List (Left Video, Right Title & Keywords) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {videos.map(video => (
          <div
            key={video.id}
            className="glass-panel"
            style={{
              borderRadius: '24px',
              padding: '28px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '32px',
              alignItems: 'center',
              border: '1px solid var(--border-color)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            }}
          >
            {/* Left Column: Short Video Player */}
            <div style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              background: '#090d16',
              border: '1px solid var(--border-color)',
              aspectRatio: '16 / 9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {playingId === video.id ? (
                <video
                  src={video.video_url}
                  poster={video.poster_url}
                  controls
                  autoPlay
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div
                  onClick={() => setPlayingId(video.id)}
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src={video.poster_url}
                    alt={video.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%)',
                  }} />

                  {/* Play Button Overlay */}
                  <div style={{
                    position: 'relative',
                    zIndex: 2,
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'var(--accent-gradient)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 30px rgba(16, 185, 129, 0.6)',
                    transition: 'transform 0.2s',
                  }}>
                    <Play size={28} fill="#041410" color="#041410" style={{ marginLeft: '4px' }} />
                  </div>

                  {/* Video Duration Badge */}
                  <span style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    zIndex: 2,
                    background: 'rgba(0,0,0,0.85)',
                    color: '#fff',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '4px 8px',
                    borderRadius: '6px',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}>
                    🎬 {video.duration} HD
                  </span>
                </div>
              )}
            </div>

            {/* Right Column: Title, Keywords & Action */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>
                  TikTok 视频
                </span>
              </div>

              {/* Title */}
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.35rem',
                fontWeight: 800,
                color: '#ffffff',
                marginBottom: '12px',
                lineHeight: 1.4,
              }}>
                {video.title}
              </h3>

              {/* Description */}
              <p style={{
                color: 'var(--text-muted)',
                fontSize: '0.9rem',
                lineHeight: 1.6,
                marginBottom: '18px',
              }}>
                {video.description}
              </p>

              {/* Keywords Tag List */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                marginBottom: '24px',
              }}>
                {video.keywords.map((kw, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: 'rgba(6, 182, 212, 0.12)',
                      border: '1px solid rgba(6, 182, 212, 0.3)',
                      color: 'var(--accent-cyan)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      padding: '4px 12px',
                      borderRadius: '20px',
                    }}
                  >
                    {kw}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => onContactClick(video.title)}
                  className="btn-primary"
                  style={{ padding: '10px 20px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <MessageSquare size={16} /> 点击咨询产品
                </button>
                <a
                  href={video.tiktok_url || 'https://www.tiktok.com/@vszapower.3c'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{
                    padding: '10px 20px',
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    textDecoration: 'none',
                    borderColor: 'rgba(255, 44, 85, 0.4)',
                    color: '#ff2c55',
                  }}
                >
                  <ExternalLink size={16} /> 在 TikTok 观看 (@vszapower.3c)
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
