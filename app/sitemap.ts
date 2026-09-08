import { fetchAllVideos } from '@/lib/store';
import { videoInfo } from '@/lib/videoLibrary';
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

  routes.push({url:baseUrl+'/videos',lastModified:new Date('2026-09-08')});
  const videos = await fetchAllVideos();
  routes.push(...videos.filter(v => !videoInfo(v) || videoInfo(v)?.canonicalId === v.id).map(v => ({url:baseUrl+'/videos/'+encodeURIComponent(v.id),lastModified:new Date(v.created_at || '2026-09-08')})));

  routes.push({url:baseUrl+'/rechargeable-coin-cell-batteries',lastModified:new Date('2026-09-06')});
  // Product page structured data was updated on this date, not on every sitemap request.
  routes.push(...catalog.map(p=>({url:baseUrl+productPath(p),lastModified:new Date('2026-09-08')})));

  routes.push(...publicPaths.filter(p=>p!=='/compliance').map(path => ({ url: baseUrl + path, lastModified: new Date(compliance.contentReviewedAt), changeFrequency: 'monthly' as const, priority: 0.8 })));

  routes.push(...complianceLocales.map(l=>({url:baseUrl+centerPath(l),lastModified:new Date('2026-09-06'),alternates:{languages:centerAlternates}})));

  try {
    const posts = await getPosts().catch(() => []);

    const articleRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${baseUrl}/academy/${post.slug}`,
      // The article template's metadata and heading hierarchy were updated on September 8.
      lastModified: new Date(Math.max(new Date('2026-09-08').getTime(), post.created_at ? new Date(post.created_at).getTime() : 0)),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    return [...routes, ...articleRoutes];
  } catch (e) {
    console.error('Failed to generate dynamic sitemap:', e);
    return routes;
  }
}
