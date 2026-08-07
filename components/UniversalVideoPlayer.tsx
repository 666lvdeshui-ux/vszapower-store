'use client';

import React, { useState, useRef, useEffect } from 'react';

export function parseGoogleDriveFileId(url: string): string | null {
  if (!url) return null;
  const match =
    url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
    url.match(/[?&]id=([a-zA-Z0-9_-]+)/) ||
    url.match(/\/uc\?.*id=([a-zA-Z0-9_-]+)/) ||
    url.match(/drive\.google\.com\/.*\/([a-zA-Z0-9_-]{25,})/);
  return match ? match[1] : null;
}

export function parseYouTubeVideoId(url: string): string | null {
  if (!url) return null;
  const match =
    url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : null;
}

interface UniversalVideoPlayerProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  fallbackImage?: string;
}

export default function UniversalVideoPlayer({
  src,
  className = '',
  style = {},
  fallbackImage = '/oem/oem_charger_pcb.png',
}: UniversalVideoPlayerProps) {
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, [src]);

  if (!src) {
    return (
      <img
        src={fallbackImage}
        alt="OEM Charger Production"
        className={className}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.5s ease',
          ...style,
        }}
      />
    );
  }

  // 1. Google Drive Video Link Handler
  const googleDriveFileId = parseGoogleDriveFileId(src);
  if (googleDriveFileId) {
    const iframePreviewUrl = `https://drive.google.com/file/d/${googleDriveFileId}/preview`;
    return (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          background: '#0a0d14',
          borderRadius: '16px',
          ...style,
        }}
        className={className}
      >
        <iframe
          src={iframePreviewUrl}
          title="Google Drive Video Player"
          style={{
            width: '150%',
            height: '150%',
            position: 'absolute',
            top: '-25%',
            left: '-25%',
            border: 'none',
            pointerEvents: 'none',
          }}
          allow="autoplay; encrypted-media; picture-in-picture"
        />
      </div>
    );
  }

  // 2. YouTube Video Link Handler
  const youtubeId = parseYouTubeVideoId(src);
  if (youtubeId) {
    return (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          background: '#0a0d14',
          borderRadius: '16px',
          ...style,
        }}
        className={className}
      >
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeId}`}
          title="YouTube Video Player"
          style={{
            width: '140%',
            height: '140%',
            position: 'absolute',
            top: '-20%',
            left: '-20%',
            border: 'none',
            pointerEvents: 'none',
          }}
          allow="autoplay; encrypted-media"
        />
      </div>
    );
  }

  // 3. Direct HTML5 Uploaded Video File (MP4, WebM, MOV, Data URL, Supabase CDN)
  if (hasError) {
    return (
      <img
        src={fallbackImage}
        alt="Video Fallback Image"
        className={className}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.5s ease',
          ...style,
        }}
      />
    );
  }

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <video
      ref={(el) => {
        videoRef.current = el;
        if (el) {
          el.muted = true;
          el.play().catch(() => {});
        }
      }}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      onClick={handleVideoClick}
      onError={() => setHasError(true)}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        cursor: 'pointer',
        transition: 'transform 0.5s ease',
        ...style,
      }}
    />
  );
}
