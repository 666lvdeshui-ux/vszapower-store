import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.vszapower.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/admin/', '/api/inquiries'],
      },
      // Explicitly allow Googlebot & AI Crawlers (Generative Engine Optimization)
      {
        userAgent: [
          'Googlebot',
          'Google-Extended',
          'Bingbot',
          'GPTBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'Bytespider',
          'CCBot',
        ],
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
