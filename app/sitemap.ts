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
    {
      url: `${baseUrl}/api/reviews`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/admin`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.1,
    },
  ];

  // Dynamic Academy Article routes for Google & Search Engine indexing
  try {
    const posts = await getPosts();
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
