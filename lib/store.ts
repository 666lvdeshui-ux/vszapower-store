import { MOCK_PRODUCTS, MOCK_POSTS, supabase } from './supabase';

export interface ProductItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  price: number;
  compare_at_price?: number;
  is_starter_kit?: boolean;
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

// Global in-memory cache fallback for serverless execution
let productsCache: ProductItem[] = [...(MOCK_PRODUCTS as unknown as ProductItem[])];
let postsCache: PostItem[] = [...(MOCK_POSTS as unknown as PostItem[])];

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
