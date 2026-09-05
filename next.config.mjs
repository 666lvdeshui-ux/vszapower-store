/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // ─── Canonical URL Redirects (SEO Critical) ────────────────────────────────
  // Force HTTPS + www to establish a single canonical origin for Google.
  // Fixes GSC "Page is not served over HTTPS" warning.
  async redirects() {
    return [
      // http://vszapower.com/* → https://www.vszapower.com/*
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'vszapower.com' }],
        destination: 'https://www.vszapower.com/:path*',
        permanent: true,
      },
      // http://www.vszapower.com/* → https://www.vszapower.com/*
      {
        source: '/:path*',
        has: [
          { type: 'host', value: 'www.vszapower.com' },
          { type: 'header', key: 'x-forwarded-proto', value: 'http' },
        ],
        destination: 'https://www.vszapower.com/:path*',
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        // ── Security + HTTPS Signal Headers (all pages) ──────────────────────
        source: '/(.*)',
        headers: [
          {
            // HSTS: Tell browsers (and Google) this site is HTTPS-only for 1 year
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        // 静态打包产物 (JS/CSS) 强缓存 1 年
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // 公共静态媒体/字体/文件 强缓存 1 年
        source: '/:path*.{png,jpg,jpeg,gif,webp,svg,ico,woff,woff2,ttf,otf,css,js}',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // API 路由强行禁用缓存，确保实时性
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
