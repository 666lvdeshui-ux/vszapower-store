import { MetadataRoute } from 'next';
import { getPosts, getProducts } from '@/lib/supabase';

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

  try {
    const [posts, products] = await Promise.all([
      getPosts().catch(() => []),
      getProducts().catch(() => []),
    ]);

    const articleRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${baseUrl}/academy/${post.slug}`,
      lastModified: post.created_at ? new Date(post.created_at) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    const productRoutes: MetadataRoute.Sitemap = products.map((prod) => ({
      url: `${baseUrl}/products/${prod.slug}`,
      lastModified: prod.created_at ? new Date(prod.created_at) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    }));

    return [...routes, ...productRoutes, ...articleRoutes];
  } catch (e) {
    console.error('Failed to generate dynamic sitemap:', e);
    return routes;
  }
}
