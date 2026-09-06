import { catalog, productPath } from '@/lib/catalog';
import { complianceLocales, centerPath } from '@/lib/complianceLocale';
import { centerAlternates } from '@/lib/complianceCenterMetadata';
import { publicPaths, compliance } from '@/lib/compliance';
import { MetadataRoute } from 'next';
import { getPosts } from '@/lib/supabase';

export const revalidate = 3600; // Revalidate sitemap every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.vszapower.com';

  // Base routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/academy`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  routes.push(...['/rechargeable-coin-cell-batteries', ...catalog.map(productPath)].map(path=>({url:baseUrl+path,lastModified:new Date('2026-09-06')})));

  routes.push(...publicPaths.filter(p=>p!=='/compliance').map(path => ({ url: baseUrl + path, lastModified: new Date(compliance.contentReviewedAt), changeFrequency: 'monthly' as const, priority: 0.8 })));

  routes.push(...complianceLocales.map(l=>({url:baseUrl+centerPath(l),lastModified:new Date('2026-09-06'),alternates:{languages:centerAlternates}})));

  try {
    const posts = await getPosts().catch(() => []);

    const articleRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${baseUrl}/academy/${post.slug}`,
      lastModified: post.created_at ? new Date(post.created_at) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    return [...routes, ...articleRoutes];
  } catch (e) {
    console.error('Failed to generate dynamic sitemap:', e);
    return routes;
  }
}
