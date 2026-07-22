import { MOCK_PRODUCTS, MOCK_POSTS, supabase } from './supabase';

export interface CertificationItem {
  name: string;
  image_url: string;
}

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
  images?: string[];
  certifications?: CertificationItem[];
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

export interface InquiryItem {
  id: string;
  name: string;
  contact: string;
  product: string;
  message: string;
  status: 'new' | 'contacted' | 'resolved';
  created_at: string;
}

export interface VideoItem {
  id: string;
  title: string;
  duration: string;
  video_url: string;
  poster_url: string;
  keywords: string[];
  description: string;
  created_at?: string;
}

export const INITIAL_VIDEOS: VideoItem[] = [
  {
    id: 'vid_1',
    title: 'Vszapower 智能双槽 LIR2032 充电器 30分钟极速快充与变色指示灯实测演示',
    duration: '00:45',
    video_url: 'https://assets.mixkit.co/videos/preview/mixkit-circuit-board-with-glowing-lines-41565-large.mp4',
    poster_url: 'https://images.unsplash.com/photo-1619725002198-6a689b72f41d?auto=format&fit=crop&w=800&q=80',
    keywords: ['#LIR2032快充', '#30分钟充满', '#智能变色指示灯', '#车钥匙电池', '#安全防爆MCU'],
    description: '高清短视频展示 VSZAPOWER 智能双槽纽扣电池充电器的实际充电过程。插入 LIR2032 电池后红灯亮起启动快充，充满后芯片自动切断并转为绿灯。支持全系列 LIR 锂纽扣电池。',
    created_at: new Date().toISOString(),
  },
  {
    id: 'vid_2',
    title: 'VSZAPOWER 4-Slot Pro 4槽独立通道 Type-C 纽扣电池充电座拆箱与四卡槽混充测试',
    duration: '01:15',
    video_url: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-with-green-screen-41544-large.mp4',
    poster_url: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
    keywords: ['#4槽独立通道', '#TypeC快充输入', '#LIR2032/2025/2450混充', '#温控过充保护'],
    description: '演示 4 槽旗舰版充电座同时为 LIR2032、LIR2025、LIR2016 及 LIR2450 等不同型号电池混充。每槽独立 MCU 芯片独立检测控制，互不干扰。',
    created_at: new Date().toISOString(),
  },
  {
    id: 'vid_3',
    title: 'Apple AirTag & 车钥匙电池替换实操：用 LIR2032 可充电池替代一次性 CR2032',
    duration: '00:58',
    video_url: 'https://assets.mixkit.co/videos/preview/mixkit-macro-shot-of-a-circuit-board-41567-large.mp4',
    poster_url: 'https://images.unsplash.com/photo-1609592424074-954930b8098c?auto=format&fit=crop&w=800&q=80',
    keywords: ['#AirTag续航教程', '#车钥匙遥控器电池', '#环保循环500次', '#告别一次性扣式电池'],
    description: '手把手教您如何将 Apple AirTag、宝马/奔驰/丰田车钥匙中的耗尽 CR2032 一次性电池替换为 VSZAPOWER LIR2032 可充电电池，一次购买即可循环充电使用 500 次以上！',
    created_at: new Date().toISOString(),
  }
];

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

export const INITIAL_INQUIRIES: InquiryItem[] = [
  {
    id: 'inq_1',
    name: '张经理 (Liang Corp)',
    contact: 'zhang@liangtech.com / 13800138000',
    product: 'Vszapower Smart Coin Cell Charger + 4x LIR2032 Batteries Starter Kit',
    message: '需采购 200 套 LIR2032 套装用于共享气象传感器设备，请发送大货批发报价单及测试样品。',
    status: 'new',
    created_at: new Date().toISOString(),
  },
  {
    id: 'inq_2',
    name: 'David Smith',
    contact: 'david.smith@iot-solutions.io',
    product: 'Vszapower Universal LIR/ML Coin Cell Smart Charger Dock',
    message: 'Inquiring about bulk shipping to California for LIR2450 dual-slot charger docks with CE/FCC certification.',
    status: 'new',
    created_at: new Date().toISOString(),
  }
];

// Global in-memory cache fallback for serverless execution
let productsCache: ProductItem[] = [...(MOCK_PRODUCTS as unknown as ProductItem[])];
let postsCache: PostItem[] = [...(MOCK_POSTS as unknown as PostItem[])];
let bannersCache: BannerItem[] = [...INITIAL_BANNERS];
let inquiriesCache: InquiryItem[] = [...INITIAL_INQUIRIES];
let videosCache: VideoItem[] = [...INITIAL_VIDEOS];

export async function fetchAllVideos(): Promise<VideoItem[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('videos').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        return data as VideoItem[];
      }
    } catch (e) {
      console.warn('Supabase fetch videos error, using local store:', e);
    }
  }
  return videosCache;
}

export async function saveVideo(video: Partial<VideoItem>): Promise<VideoItem> {
  const newVid: VideoItem = {
    id: video.id || `vid_${Date.now()}`,
    title: video.title || 'Untitled Short Video',
    duration: video.duration || '00:30',
    video_url: video.video_url || '',
    poster_url: video.poster_url || '',
    keywords: Array.isArray(video.keywords) ? video.keywords : ['#VSZAPOWER'],
    description: video.description || '',
    created_at: video.created_at || new Date().toISOString(),
  };

  if (supabase) {
    try {
      const { data, error } = await supabase.from('videos').upsert(newVid).select().single();
      if (!error && data) return data as VideoItem;
    } catch (e) {
      console.warn('Supabase save video error, falling back to local store:', e);
    }
  }

  const index = videosCache.findIndex(v => v.id === newVid.id);
  if (index >= 0) {
    videosCache[index] = newVid;
  } else {
    videosCache.unshift(newVid);
  }
  return newVid;
}

export async function removeVideo(id: string): Promise<boolean> {
  if (supabase) {
    try {
      const { error } = await supabase.from('videos').delete().eq('id', id);
      if (!error) return true;
    } catch (e) {
      console.warn('Supabase delete video error:', e);
    }
  }

  videosCache = videosCache.filter(v => v.id !== id);
  return true;
}

export async function fetchAllProducts(): Promise<ProductItem[]> {
  // Always ensure default catalog contains full vector product items
  if (productsCache.length === 0 || productsCache.length < MOCK_PRODUCTS.length) {
    productsCache = [...(MOCK_PRODUCTS as unknown as ProductItem[])];
  }

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
    images: Array.isArray(product.images) && product.images.length > 0 ? product.images : [product.image_url || 'https://images.unsplash.com/photo-1619725002198-6a689b72f41d?auto=format&fit=crop&w=800&q=80'],
    certifications: Array.isArray(product.certifications) ? product.certifications : [],
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

export async function fetchAllInquiries(): Promise<InquiryItem[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        return data as InquiryItem[];
      }
    } catch (e) {
      console.warn('Supabase fetch inquiries error, using local store:', e);
    }
  }
  return inquiriesCache;
}

export async function saveInquiry(inquiry: Partial<InquiryItem>): Promise<InquiryItem> {
  const newInquiry: InquiryItem = {
    id: inquiry.id || `inq_${Date.now()}`,
    name: inquiry.name || 'Anonymous User',
    contact: inquiry.contact || 'No contact provided',
    product: inquiry.product || 'General Product Inquiry',
    message: inquiry.message || 'No message content',
    status: inquiry.status || 'new',
    created_at: inquiry.created_at || new Date().toISOString(),
  };

  if (supabase) {
    try {
      const { data, error } = await supabase.from('inquiries').upsert(newInquiry).select().single();
      if (!error && data) return data as InquiryItem;
    } catch (e) {
      console.warn('Supabase save inquiry error, falling back to local store:', e);
    }
  }

  const existingIdx = inquiriesCache.findIndex(i => i.id === newInquiry.id);
  if (existingIdx >= 0) {
    inquiriesCache[existingIdx] = newInquiry;
  } else {
    inquiriesCache.unshift(newInquiry);
  }
  return newInquiry;
}

export async function removeInquiry(id: string): Promise<boolean> {
  if (supabase) {
    try {
      const { error } = await supabase.from('inquiries').delete().eq('id', id);
      if (!error) return true;
    } catch (e) {
      console.warn('Supabase delete inquiry error:', e);
    }
  }

  inquiriesCache = inquiriesCache.filter(i => i.id !== id);
  return true;
}

export async function updateInquiryStatus(id: string, status: 'new' | 'contacted' | 'resolved'): Promise<boolean> {
  if (supabase) {
    try {
      const { error } = await supabase.from('inquiries').update({ status }).eq('id', id);
      if (!error) return true;
    } catch (e) {
      console.warn('Supabase update inquiry status error:', e);
    }
  }

  const inq = inquiriesCache.find(i => i.id === id);
  if (inq) {
    inq.status = status;
  }
  return true;
}
