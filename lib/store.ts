import { MOCK_PRODUCTS, MOCK_POSTS, supabase } from './supabase';

export interface ProductItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  price: number;
  compare_at_price?: number;
  is_starter_kit?: boolean;
  category?: string;
  image_url: string;
  badge?: string;
  description: string;
  specs?: Record<string, string>;
  created_at?: string;
}

export interface PostItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  cover_image: string;
  author: string;
  read_time: string;
  content: string;
  published: boolean;
  created_at?: string;
}

export interface BannerItem {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  image_url: string;
  cta_text: string;
  cta_link: string;
  highlight: string;
  created_at?: string;
}

export const INITIAL_BANNERS: BannerItem[] = [
  {
    id: 'banner_1',
    badge: 'SMART RECHARGE SYSTEM',
    title: 'Stop Throwing Away Button Batteries',
    subtitle: 'High precision LIR2032 / LIR2450 smart USB dual-slot charger dock. Eco-friendly kraft packaging, built for long lifecycle.',
    image_url: 'https://images.unsplash.com/photo-1619725002198-6a689b72f41d?auto=format&fit=crop&w=1400&q=80',
    cta_text: '联系我们 (Contact Us)',
    cta_link: '/#contact',
    highlight: '✓ 500+ Recharge Cycles • Auto 4.2V Cutoff',
    created_at: new Date().toISOString(),
  },
  {
    id: 'banner_2',
    badge: 'AIRTAG & KEY FOB SOLUTION',
    title: 'Never Buy Disposable CR2032 Again',
    subtitle: 'Upgrade your Apple AirTags, car key fobs, and smart home sensors with reusable LIR2032 rechargeable coin cells.',
    image_url: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=1400&q=80',
    cta_text: '查看产品介绍',
    cta_link: '/#products',
    highlight: '✓ 100% AirTag & Key Fob Compatible',
    created_at: new Date().toISOString(),
  },
  {
    id: 'banner_3',
    badge: 'ECO-FRIENDLY KRAFT PACKAGING',
    title: 'Zero Waste Sustainable Power',
    subtitle: 'Our papercard packaging is plastic-free and FSC certified. Sustainable energy solutions for modern electronics.',
    image_url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1400&q=80',
    cta_text: '探索电池学院',
    cta_link: '/academy',
    highlight: '✓ FSC Plastic-Free Certified',
    created_at: new Date().toISOString(),
  }
];

// Global in-memory cache fallback for serverless execution
let productsCache: ProductItem[] = [...(MOCK_PRODUCTS as unknown as ProductItem[])];
let postsCache: PostItem[] = [...(MOCK_POSTS as unknown as PostItem[])];
let bannersCache: BannerItem[] = [...INITIAL_BANNERS];

export async function fetchAllProducts(): Promise<ProductItem[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: true });
      if (!error && data && data.length > 0) {
        return data as ProductItem[];
      }
    } catch (e) {
      console.warn('Supabase fetch error, using local store:', e);
    }
  }
  return productsCache;
}

export async function saveProduct(product: Partial<ProductItem>): Promise<ProductItem> {
  const newProduct: ProductItem = {
    id: product.id || `prod_${Date.now()}`,
    slug: product.slug || (product.title ? product.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : `item-${Date.now()}`),
    title: product.title || 'Untitled Product',
    tagline: product.tagline || '',
    price: Number(product.price) || 0,
    compare_at_price: product.compare_at_price ? Number(product.compare_at_price) : undefined,
    is_starter_kit: Boolean(product.is_starter_kit),
    category: product.category || '纽扣电池充电器',
    image_url: product.image_url || 'https://images.unsplash.com/photo-1619725002198-6a689b72f41d?auto=format&fit=crop&w=800&q=80',
    badge: product.badge || '',
    description: product.description || '',
    specs: product.specs || {},
    created_at: product.created_at || new Date().toISOString(),
  };

  if (supabase) {
    try {
      const { data, error } = await supabase.from('products').upsert(newProduct).select().single();
      if (!error && data) return data as ProductItem;
    } catch (e) {
      console.warn('Supabase save error, falling back to local store:', e);
    }
  }

  const index = productsCache.findIndex(p => p.id === newProduct.id);
  if (index >= 0) {
    productsCache[index] = newProduct;
  } else {
    productsCache.unshift(newProduct);
  }
  return newProduct;
}

export async function removeProduct(id: string): Promise<boolean> {
  if (supabase) {
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (!error) return true;
    } catch (e) {
      console.warn('Supabase delete error:', e);
    }
  }

  productsCache = productsCache.filter(p => p.id !== id);
  return true;
}

export async function fetchAllPosts(): Promise<PostItem[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        return data as PostItem[];
      }
    } catch (e) {
      console.warn('Supabase fetch error, using local store:', e);
    }
  }
  return postsCache;
}

export async function savePost(post: Partial<PostItem>): Promise<PostItem> {
  const newPost: PostItem = {
    id: post.id || `post_${Date.now()}`,
    slug: post.slug || (post.title ? post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : `article-${Date.now()}`),
    title: post.title || 'Untitled Article',
    summary: post.summary || '',
    category: post.category || 'Battery Academy',
    cover_image: post.cover_image || 'https://images.unsplash.com/photo-1619725002198-6a689b72f41d?auto=format&fit=crop&w=1200&q=80',
    author: post.author || 'Vszapower Editorial Team',
    read_time: post.read_time || '5 min read',
    content: post.content || '# Article Title\n\nWrite your content here...',
    published: post.published !== undefined ? post.published : true,
    created_at: post.created_at || new Date().toISOString(),
  };

  if (supabase) {
    try {
      const { data, error } = await supabase.from('posts').upsert(newPost).select().single();
      if (!error && data) return data as PostItem;
    } catch (e) {
      console.warn('Supabase save post error, falling back to local store:', e);
    }
  }

  const index = postsCache.findIndex(p => p.id === newPost.id);
  if (index >= 0) {
    postsCache[index] = newPost;
  } else {
    postsCache.unshift(newPost);
  }
  return newPost;
}

export async function removePost(id: string): Promise<boolean> {
  if (supabase) {
    try {
      const { error } = await supabase.from('posts').delete().eq('id', id);
      if (!error) return true;
    } catch (e) {
      console.warn('Supabase delete post error:', e);
    }
  }

  postsCache = postsCache.filter(p => p.id !== id);
  return true;
}

export async function fetchAllBanners(): Promise<BannerItem[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('banners').select('*').order('created_at', { ascending: true });
      if (!error && data && data.length > 0) {
        return data as BannerItem[];
      }
    } catch (e) {
      console.warn('Supabase fetch banners error, using local store:', e);
    }
  }
  return bannersCache;
}

export async function saveBanner(banner: Partial<BannerItem>): Promise<BannerItem> {
  const newBanner: BannerItem = {
    id: banner.id || `banner_${Date.now()}`,
    badge: banner.badge || 'SMART RECHARGE SYSTEM',
    title: banner.title || 'Untitled Banner Slide',
    subtitle: banner.subtitle || '',
    image_url: banner.image_url || 'https://images.unsplash.com/photo-1619725002198-6a689b72f41d?auto=format&fit=crop&w=1400&q=80',
    cta_text: banner.cta_text || '联系我们 (Contact Us)',
    cta_link: banner.cta_link || '/#contact',
    highlight: banner.highlight || '✓ 500+ Recharge Cycles',
    created_at: banner.created_at || new Date().toISOString(),
  };

  if (supabase) {
    try {
      const { data, error } = await supabase.from('banners').upsert(newBanner).select().single();
      if (!error && data) return data as BannerItem;
    } catch (e) {
      console.warn('Supabase save banner error, falling back to local store:', e);
    }
  }

  const index = bannersCache.findIndex(b => b.id === newBanner.id);
  if (index >= 0) {
    bannersCache[index] = newBanner;
  } else {
    bannersCache.push(newBanner);
  }
  return newBanner;
}

export async function removeBanner(id: string): Promise<boolean> {
  if (supabase) {
    try {
      const { error } = await supabase.from('banners').delete().eq('id', id);
      if (!error) return true;
    } catch (e) {
      console.warn('Supabase delete banner error:', e);
    }
  }

  bannersCache = bannersCache.filter(b => b.id !== id);
  return true;
}
