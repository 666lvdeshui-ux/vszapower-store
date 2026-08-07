'use client';

import React, { useState } from 'react';

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
  const [useIframeFallback, setUseIframeFallback] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (!src) {
    return (
      <img
        src={fallbackImage}
        alt="SMT Charger Circuit Board Production"
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
    const directVideoUrl = `https://drive.google.com/uc?export=download&id=${googleDriveFileId}`;
    const iframePreviewUrl = `https://drive.google.com/file/d/${googleDriveFileId}/preview?autoplay=1`;

    if (useIframeFallback) {
      return (
        <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', ...style }}>
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
            allow="autoplay; encrypted-media"
          />
        </div>
      );
    }

    return (
      <video
        src={directVideoUrl}
        autoPlay
        loop
        muted
        playsInline
        onError={() => setUseIframeFallback(true)}
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

  // 2. YouTube Video Link Handler
  const youtubeId = parseYouTubeVideoId(src);
  if (youtubeId) {
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', ...style }}>
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

  // 3. Direct HTML5 Video Link (MP4, WebM, Data URL)
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

  return (
    <video
      src={src}
      autoPlay
      loop
      muted
      playsInline
      onError={() => setHasError(true)}
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
