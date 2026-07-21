'use client';

import React, { useState } from 'react';
import { Play, Pause, Video, Tag, MessageSquare, ExternalLink, Sparkles, Volume2, VolumeX } from 'lucide-react';

export interface VideoItem {
  id: string;
  title: string;
  duration: string;
  video_url: string;
  poster_url: string;
  keywords: string[];
  description: string;
  related_product_id?: string;
  created_at?: string;
}

export const INITIAL_VIDEOS: VideoItem[] = [
  {
    id: 'vid_1',
    title: 'Vszapower 智能双槽 LIR2032 充电器 30分钟极速快充与变色指示灯实测演示',
    duration: '00:45',
    video_url: 'https://assets.mixkit.co/videos/preview/mixkit-circuit-board-with-glowing-lines-41565-large.mp4',
    poster_url: 'https://images.unsplash.com/photo-1619725002198-6a689b72f41d?auto=format&fit=crop&w=800&q=80',
    keywords: ['#LIR2032快充', '#30分钟充满', '#智能变色指示灯', '#车钥匙电池', '#安全防爆MCU'],
    description: '高清短视频展示 VSZAPOWER 智能双槽纽扣电池充电器的实际充电过程。插入 LIR2032 电池后红灯亮起启动快充，充满后芯片自动切断并转为绿灯。支持全系列 LIR 锂纽扣电池。',
  },
  {
    id: 'vid_2',
    title: 'VSZAPOWER 4-Slot Pro 4槽独立通道 Type-C 纽扣电池充电座拆箱与四卡槽混充测试',
    duration: '01:15',
    video_url: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-with-green-screen-41544-large.mp4',
    poster_url: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
    keywords: ['#4槽独立通道', '#TypeC快充输入', '#LIR2032/2025/2450混充', '#温控过充保护'],
    description: '演示 4 槽旗舰版充电座同时为 LIR2032、LIR2025、LIR2016 及 LIR2450 等不同型号电池混充。每槽独立 MCU 芯片独立检测控制，互不干扰。',
  },
  {
    id: 'vid_3',
    title: 'Apple AirTag & 车钥匙电池替换实操：用 LIR2032 可充电池替代一次性 CR2032',
    duration: '00:58',
    video_url: 'https://assets.mixkit.co/videos/preview/mixkit-macro-shot-of-a-circuit-board-41567-large.mp4',
    poster_url: 'https://images.unsplash.com/photo-1609592424074-954930b8098c?auto=format&fit=crop&w=800&q=80',
    keywords: ['#AirTag续航教程', '#车钥匙遥控器电池', '#环保循环500次', '#告别一次性扣式电池'],
    description: '手把手教您如何将 Apple AirTag、宝马/奔驰/丰田车钥匙中的耗尽 CR2032 一次性电池替换为 VSZAPOWER LIR2032 可充电电池，一次购买即可循环充电使用 500 次以上！',
  }
];

interface VideoSectionProps {
  onContactClick: (productName?: string) => void;
}

export default function VideoSection({ onContactClick }: VideoSectionProps) {
  const [playingId, setPlayingId] = useState<string | null>(null);

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
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '640px', margin: '0 auto' }}>
          直观视频展示 VSZAPOWER 纽扣电池充电座的真实充放电效果、智能指示灯切断与多设备场景应用。
        </p>
      </div>

      {/* Video Items List (Left Video, Right Title & Keywords) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {INITIAL_VIDEOS.map(video => (
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
                  产品短视频展示
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
                  href="#products"
                  className="btn-secondary"
                  style={{ padding: '10px 20px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}
                >
                  <Sparkles size={16} /> 查看对应产品
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
