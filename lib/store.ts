import { applyReviewDisplay } from './productReviews';
import { normalizeTranslations } from './postI18n';
import { MOCK_PRODUCTS, MOCK_POSTS, serverSupabase, supabase } from './supabase';
import { normalizeProductTranslations, ProductTranslation } from './productI18n';

// API route handlers run on the server and prefer the privileged client. The anon
// client remains as a local-development fallback until SUPABASE_SERVICE_ROLE_KEY is set.
const database = serverSupabase ?? supabase;

function getFsModule() {
  if (typeof window !== 'undefined') return null;
  try {
    return eval('require')('fs');
  } catch (e) {
    return null;
  }
}

function getPathModule() {
  if (typeof window !== 'undefined') return null;
  try {
    return eval('require')('path');
  } catch (e) {
    return null;
  }
}

function loadProductsFromFile(): ProductItem[] {
  const fs = getFsModule();
  const path = getPathModule();
  if (!fs || !path) return [];
  try {
    const tmpFile = path.join('/tmp', 'vszapower_store_products.json');
    if (fs.existsSync(tmpFile)) {
      const jsonStr = fs.readFileSync(tmpFile, 'utf8');
      const parsed = JSON.parse(jsonStr);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {}
  return [];
}

function saveProductsToFile(items: ProductItem[]) {
  const fs = getFsModule();
  const path = getPathModule();
  if (!fs || !path) return;
  try {
    const tmpFile = path.join('/tmp', 'vszapower_store_products.json');
    fs.writeFileSync(tmpFile, JSON.stringify(items, null, 2), 'utf8');
  } catch (e) {}
}

function getDeletedProductIds(): Set<string> {
  const set = new Set<string>();
  const fs = getFsModule();
  const path = getPathModule();
  if (!fs || !path) return set;
  try {
    const file = path.join('/tmp', 'vszapower_deleted_product_ids.json');
    if (fs.existsSync(file)) {
      const arr = JSON.parse(fs.readFileSync(file, 'utf8'));
      if (Array.isArray(arr)) arr.forEach((id: string) => set.add(id));
    }
  } catch (e) {}
  return set;
}

function saveDeletedProductId(id: string) {
  const fs = getFsModule();
  const path = getPathModule();
  if (!fs || !path) return;
  try {
    const file = path.join('/tmp', 'vszapower_deleted_product_ids.json');
    const set = getDeletedProductIds();
    set.add(id);
    fs.writeFileSync(file, JSON.stringify(Array.from(set)), 'utf8');
  } catch (e) {}
}

function removeDeletedProductId(id: string) {
  const fs = getFsModule();
  const path = getPathModule();
  if (!fs || !path) return;
  try {
    const file = path.join('/tmp', 'vszapower_deleted_product_ids.json');
    const set = getDeletedProductIds();
    set.delete(id);
    fs.writeFileSync(file, JSON.stringify(Array.from(set)), 'utf8');
  } catch (e) {}
}


export interface CertificationItem {
  name: string;
  image_url: string;
}

export interface ReviewItem {
  id: string;
  reviewer_name: string;
  avatar_url?: string;
  country_code: string;
  rating: number;
  title: string;
  content: string;
  verified_source: 'Verified Purchase' | 'Amazon' | 'Direct' | 'Temu';
  images?: string[];
  date: string;
  helpful_count?: number;
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
  translations?: Record<string, ProductTranslation>;
  rating?: number;
  review_count?: number;
  temu_link?: string;
  reviews?: ReviewItem[];
  show_reviews?: boolean;
  review_group?: string | null;
  created_at?: string;
}

export interface PostItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  tags?: string[];
  cover_image: string;
  author: string;
  read_time: string;
  content: string;
  published: boolean;
  translations?: Record<string, any>;
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
  country?: string;
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
  tiktok_url?: string;
  created_at?: string;
}

export const INITIAL_VIDEOS: VideoItem[] = [
  {
    id: 'vid_tiktok_1',
    title: 'VSZAPOWER TikTok 官方实测：智能双槽 LIR2032 充电器 30分钟极速快充与变色指示灯演示',
    duration: '00:45',
    video_url: 'https://assets.mixkit.co/videos/preview/mixkit-circuit-board-with-glowing-lines-41565-large.mp4',
    poster_url: 'https://images.unsplash.com/photo-1619725002198-6a689b72f41d?auto=format&fit=crop&w=800&q=80',
    tiktok_url: 'https://www.tiktok.com/@vszapower.3c',
    keywords: ['#TikTokViral', '#vszapower.3c', '#LIR2032快充', '#30分钟充满', '#车钥匙电池', '#安全防爆MCU'],
    description: 'TikTok 官方账号 @vszapower.3c 推荐产品：高清短视频展示 VSZAPOWER 智能双槽纽扣电池充电器的实际充电过程。插入 LIR2032 电池后红灯亮起启动快充，充满后芯片自动切断并转为绿灯。',
    created_at: new Date().toISOString(),
  },
  {
    id: 'vid_tiktok_2',
    title: 'VSZAPOWER TikTok 热门教程：Apple AirTag & 车钥匙电池替换实操 (LIR2032 替代一次性 CR2032)',
    duration: '00:58',
    video_url: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-with-green-screen-41544-large.mp4',
    poster_url: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
    tiktok_url: 'https://www.tiktok.com/@vszapower.3c',
    keywords: ['#vszapower.3c', '#AirTag续航教程', '#车钥匙遥控器电池', '#环保循环500次', '#告别一次性扣式电池'],
    description: 'TikTok 官方实操：手把手教您如何将 Apple AirTag、宝马/奔驰/丰田车钥匙中的耗尽 CR2032 一次性电池替换为 VSZAPOWER LIR2032 可充电电池，一次购买即可循环充电使用 500 次以上！',
    created_at: new Date().toISOString(),
  },
  {
    id: 'vid_tiktok_3',
    title: 'VSZAPOWER TikTok 旗舰拆箱：4-Slot Pro 4槽独立通道 Type-C 纽扣电池充电座混充测试',
    duration: '01:15',
    video_url: 'https://assets.mixkit.co/videos/preview/mixkit-macro-shot-of-a-circuit-board-41567-large.mp4',
    poster_url: 'https://images.unsplash.com/photo-1609592424074-954930b8098c?auto=format&fit=crop&w=800&q=80',
    tiktok_url: 'https://www.tiktok.com/@vszapower.3c',
    keywords: ['#vszapower.3c', '#4槽独立通道', '#TypeC快充输入', '#LIR2032/2025/2450混充', '#温控过充保护'],
    description: 'TikTok 官方演示 4 槽旗舰版充电座同时为 LIR2032、LIR2025、LIR2016 及 LIR2450 等不同型号电池混充。每槽独立 MCU 芯片独立检测控制，互不干扰。',
    created_at: new Date().toISOString(),
  },
  {
    id: 'vid_tiktok_4',
    title: 'VSZAPOWER TikTok 欧洲热销：LIR2025 / LIR2032 30分钟极速纽扣电池充电座',
    duration: '00:36',
    video_url: 'https://assets.mixkit.co/videos/preview/mixkit-circuit-board-with-glowing-lines-41565-large.mp4',
    poster_url: '/products/lir2025-30min-charger.jpg',
    tiktok_url: 'https://www.tiktok.com/@vszapower.3c',
    keywords: ['#vszapower.3c', '#LIR2025快充', '#CR2025Ersatz', '#Autoschlüssel', '#30MinSchnellladen'],
    description: 'TikTok 德语区热款：30 分钟极速纽扣电池充电器，专门适配 Autoschlüssel (车钥匙)、Fernbedienungen (遥控器) 及电子秤，高能循环替代 CR2025。',
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
    cta_text: 'Request Wholesale Quote',
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
    country: '中国 (China)',
    contact: 'zhang@liangtech.com / 13800138000',
    product: 'Vszapower Smart Coin Cell Charger + 4x LIR2032 Batteries Starter Kit',
    message: '需采购 200 套 LIR2032 套装用于共享气象传感器设备，请发送大货批发报价单及测试样品。',
    status: 'new',
    created_at: new Date().toISOString(),
  },
  {
    id: 'inq_2',
    name: 'David Smith',
    country: '美国 (United States)',
    contact: 'david.smith@iot-solutions.io',
    product: 'Vszapower Universal LIR/ML Coin Cell Smart Charger Dock',
    message: 'Inquiring about bulk shipping to California for LIR2450 dual-slot charger docks with CE/FCC certification.',
    status: 'new',
    created_at: new Date().toISOString(),
  }
];

// Global in-memory cache fallback for serverless execution
let productsCache: ProductItem[] = [...(MOCK_PRODUCTS as unknown as ProductItem[])];
const deletedProductIds = new Set<string>();

let postsCache: PostItem[] = [...(MOCK_POSTS as unknown as PostItem[])];
const deletedPostIds = new Set<string>();

let bannersCache: BannerItem[] = [...INITIAL_BANNERS];
const deletedBannerIds = new Set<string>();

let inquiriesCache: InquiryItem[] = [...INITIAL_INQUIRIES];
const deletedInquiryIds = new Set<string>();

let videosCache: VideoItem[] = [...INITIAL_VIDEOS];
const deletedVideoIds = new Set<string>();

export async function fetchAllVideos(): Promise<VideoItem[]> {
  if (database) {
    try {
      const { data, error } = await database.from('videos').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        return (data as VideoItem[]).filter(v => !deletedVideoIds.has(v.id));
      }
    } catch (e) {
      console.warn('Supabase fetch videos error, using local store:', e);
    }
  }
  return videosCache.filter(v => !deletedVideoIds.has(v.id));
}

export async function saveVideo(video: Partial<VideoItem>): Promise<VideoItem> {
  const newVideo: VideoItem = {
    id: video.id || `video_${Date.now()}`,
    title: video.title || 'Untitled Video',
    duration: video.duration || '00:30',
    video_url: video.video_url || 'https://assets.mixkit.co/videos/preview/mixkit-circuit-board-micro-controller-42862-large.mp4',
    poster_url: video.poster_url || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    keywords: Array.isArray(video.keywords) ? video.keywords : ['纽扣电池充电器', 'LIR2032'],
    description: video.description || '',
    created_at: video.created_at || new Date().toISOString(),
  };

  deletedVideoIds.delete(newVideo.id);

  if (database) {
    try {
      const { data, error } = await database.from('videos').upsert(newVideo).select().single();
      if (!error && data) return data as VideoItem;
    } catch (e) {
      console.warn('Supabase save video error, falling back to local store:', e);
    }
  }

  const index = videosCache.findIndex(v => v.id === newVideo.id);
  if (index >= 0) {
    videosCache[index] = newVideo;
  } else {
    videosCache.unshift(newVideo);
  }
  return newVideo;
}

export async function removeVideo(id: string): Promise<boolean> {
  deletedVideoIds.add(id);
  videosCache = videosCache.filter(v => v.id !== id);

  if (database) {
    try {
      await database.from('videos').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase delete video error:', e);
    }
  }
  return true;
}

export function getCleanImageUrl(product: Partial<ProductItem>): string {
  const url = product.image_url || '';
  if (url) return url;
  return '/products/clip-dual-charger.png';
}

export function sanitizeProductList(list: ProductItem[]): ProductItem[] {
  return list.map(p => {
    const mainImg = p.image_url || '/products/clip-dual-charger.png';
    const imgList = (Array.isArray(p.images) && p.images.length > 0) ? p.images : [mainImg];
    return {
      ...applyReviewDisplay(p),
      image_url: mainImg,
      images: imgList,
    };
  });
}

export async function fetchAllProducts(): Promise<ProductItem[]> {
  const deletedSet = getDeletedProductIds();

  if (database) {
    try {
      const { data, error } = await database.from('products').select('*').order('created_at', { ascending: true });
      if (!error && data && data.length > 0) {
        const sbList = (data as ProductItem[]).filter(p => !deletedSet.has(p.id) && !deletedProductIds.has(p.id));
        const sanitized = sanitizeProductList(sbList);
        productsCache = sanitized;
        return sanitized;
      }
    } catch (e) {
      console.warn('Supabase fetch error, using local store:', e);
    }
  }

  const fileItems = loadProductsFromFile();
  if (fileItems.length > 0) {
    fileItems.forEach(item => {
      const idx = productsCache.findIndex(p => p.id === item.id);
      if (idx >= 0) {
        productsCache[idx] = item;
      } else {
        productsCache.unshift(item);
      }
    });
  }

  const result = productsCache.filter(p => !deletedSet.has(p.id) && !deletedProductIds.has(p.id));
  return sanitizeProductList(result);
}

export async function saveProduct(product: Partial<ProductItem>): Promise<ProductItem> {
  const targetId = (product.id && product.id.trim()) ? product.id.trim() : `prod_${Date.now()}`;
  let translations = product.translations;
  let showReviews = product.show_reviews;
  let reviewGroup = product.review_group;
  if ((translations === undefined || showReviews === undefined || reviewGroup === undefined) && product.id) {
    // Older clients may edit a product without sending its translations.
    if (database) {
      const { data, error } = await database.from('products').select('translations,show_reviews,review_group').eq('id', targetId).maybeSingle();
      if (error) throw new Error(`Product could not be loaded: ${error.message}`);
      translations ??= data?.translations;
      showReviews ??= data?.show_reviews;
      if(reviewGroup===undefined)reviewGroup=data?.review_group;
    } else {
      const previous=productsCache.find(p=>p.id===targetId);
      translations ??= previous?.translations;
      showReviews ??= previous?.show_reviews;
      if(reviewGroup===undefined)reviewGroup=previous?.review_group;
    }
  }
  const newProduct: ProductItem = {
    id: targetId,
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
    show_reviews: showReviews === true,
    review_group: reviewGroup ?? null,
    rating: product.rating ?? 0,
    review_count: product.review_count ?? 0,
    temu_link: product.temu_link || 'https://www.temu.com/goods.html?_bg_fs=1&goods_id=606258002264728',
    reviews: product.reviews || [],
    translations: normalizeProductTranslations(translations),
    created_at: product.created_at || new Date().toISOString(),
  };

  // Confirm database persistence before changing local state or reporting success.
  if (database) {
    try {
      const supabasePayload = {
        id: newProduct.id,
        slug: newProduct.slug,
        title: newProduct.title,
        tagline: newProduct.tagline,
        price: newProduct.price,
        compare_at_price: newProduct.compare_at_price,
        is_starter_kit: newProduct.is_starter_kit,
        category: newProduct.category,
        image_url: newProduct.image_url,
        images: newProduct.images,
        certifications: newProduct.certifications,
        badge: newProduct.badge,
        description: newProduct.description,
        translations: newProduct.translations,
        specs: newProduct.specs,
        show_reviews: newProduct.show_reviews,
        review_group: newProduct.review_group,
        created_at: newProduct.created_at,
      };

      const { error } = await database.from('products').upsert(supabasePayload);
      if (error) throw new Error(error.message);
    } catch (e) {
      throw new Error(`Product could not be saved: ${e instanceof Error ? e.message : String(e)}`);
    }
  }

  deletedProductIds.delete(newProduct.id);
  removeDeletedProductId(newProduct.id);
  const index = productsCache.findIndex(p => p.id === newProduct.id);
  if (index >= 0) productsCache[index] = newProduct;
  else productsCache.unshift(newProduct);
  saveProductsToFile(productsCache);

  return newProduct;
}

export async function removeProduct(id: string): Promise<boolean> {
  deletedProductIds.add(id);
  saveDeletedProductId(id);
  productsCache = productsCache.filter(p => p.id !== id);
  saveProductsToFile(productsCache);

  if (database) {
    try {
      const { error } = await database.from('products').delete().eq('id', id);
      if (error) console.warn('Supabase delete error:', error.message);
    } catch (e) {
      console.warn('Supabase delete error:', e);
    }
  }

  return true;
}

export async function fetchAllPosts(): Promise<PostItem[]> {
  if (database) {
    try {
      const { data, error } = await database.from('posts').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        const postsList = (data as PostItem[]).map(p => ({
          ...p,
          translations: normalizeTranslations(p.translations),
        }));
        postsCache = postsList;
        return postsList.filter(p => !deletedPostIds.has(p.id));
      }
    } catch (e) {
      console.warn('Supabase fetch posts error, using local store:', e);
    }
  }
  return postsCache.filter(p => !deletedPostIds.has(p.id));
}

export async function getPostBySlug(slug: string): Promise<PostItem | null> {
  if (database) {
    try {
      const { data, error } = await database.from('posts').select('*').eq('slug', slug).single();
      if (!error && data) {
        const post = data as PostItem;
        return {
          ...post,
          translations: normalizeTranslations(post.translations),
        };
      }
    } catch (e) {
      console.warn('Supabase get post by slug error:', e);
    }
  }
  const post = postsCache.find(p => p.slug === slug && !deletedPostIds.has(p.id));
  return post || null;
}

export async function savePost(post: Partial<PostItem>): Promise<PostItem> {
  const newPost: PostItem = {
    id: post.id || `post_${Date.now()}`,
    slug: post.slug || (post.title ? post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : `post-${Date.now()}`),
    title: post.title || 'Untitled Article',
    summary: post.summary || '',
    content: post.content || '',
    category: post.category || 'Battery Academy',
    tags: Array.isArray(post.tags) ? post.tags : ['纽扣电池充电器', 'LIR2032'],
    cover_image: post.cover_image || 'https://images.unsplash.com/photo-1619725002198-6a689b72f41d?auto=format&fit=crop&w=1200&q=80',
    author: post.author || 'Vszapower Tech Team',
    read_time: post.read_time || '5 min read',
    published: post.published ?? true,
    translations: normalizeTranslations(post.translations),
    created_at: post.created_at || new Date().toISOString(),
  };


  // Persist complete translations with the article; fail visibly on database errors.
  if (database) {
    try {
      const supabasePostPayload = {
        id: newPost.id,
        slug: newPost.slug,
        title: newPost.title,
        summary: newPost.summary,
        content: newPost.content,
        translations: newPost.translations,
        category: newPost.category,
        tags: newPost.tags,
        cover_image: newPost.cover_image,
        author: newPost.author,
        read_time: newPost.read_time,
        published: newPost.published,
        created_at: newPost.created_at,
      };

      const { error } = await database.from('posts').upsert(supabasePostPayload);
      if (error) throw new Error(error.message);
    } catch (e) {
      throw new Error(`Article could not be saved: ${e instanceof Error ? e.message : String(e)}`);
    }
  }

  deletedPostIds.delete(newPost.id);
  // Update cache only after a successful database write.
  const index = postsCache.findIndex(p => p.id === newPost.id);
  if (index >= 0) {
    postsCache[index] = newPost;
  } else {
    postsCache.unshift(newPost);
  }

  return newPost;
}

export async function removePost(id: string): Promise<boolean> {
  deletedPostIds.add(id);
  postsCache = postsCache.filter(p => p.id !== id);

  if (database) {
    try {
      await database.from('posts').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase delete post error:', e);
    }
  }
  return true;
}

export async function fetchAllBanners(): Promise<BannerItem[]> {
  if (database) {
    try {
      const { data, error } = await database.from('banners').select('*').order('created_at', { ascending: true });
      if (!error && data && data.length > 0) {
        return (data as BannerItem[]).filter(b => !deletedBannerIds.has(b.id));
      }
    } catch (e) {
      console.warn('Supabase fetch banners error, using local store:', e);
    }
  }
  return bannersCache.filter(b => !deletedBannerIds.has(b.id));
}

export async function saveBanner(banner: Partial<BannerItem>): Promise<BannerItem> {
  const newBanner: BannerItem = {
    id: banner.id || `banner_${Date.now()}`,
    badge: banner.badge || 'SMART RECHARGE SYSTEM',
    title: banner.title || 'Untitled Banner Slide',
    subtitle: banner.subtitle || '',
    image_url: banner.image_url || 'https://images.unsplash.com/photo-1619725002198-6a689b72f41d?auto=format&fit=crop&w=1400&q=80',
    cta_text: banner.cta_text || 'Request Wholesale Quote',
    cta_link: banner.cta_link || '/#contact',
    highlight: banner.highlight || '✓ 500+ Recharge Cycles',
    created_at: banner.created_at || new Date().toISOString(),
  };

  deletedBannerIds.delete(newBanner.id);

  if (database) {
    try {
      const { data, error } = await database.from('banners').upsert(newBanner).select().single();
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
  deletedBannerIds.add(id);
  bannersCache = bannersCache.filter(b => b.id !== id);

  if (database) {
    try {
      await database.from('banners').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase delete banner error:', e);
    }
  }
  return true;
}

export async function fetchAllInquiries(): Promise<InquiryItem[]> {
  if (database) {
    try {
      const { data, error } = await database.from('inquiries').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        return (data as InquiryItem[]).filter(i => !deletedInquiryIds.has(i.id));
      }
    } catch (e) {
      console.warn('Supabase fetch inquiries error, using local store:', e);
    }
  }
  return inquiriesCache.filter(i => !deletedInquiryIds.has(i.id));
}

export async function saveInquiry(inquiry: Partial<InquiryItem>): Promise<InquiryItem> {
  const newInquiry: InquiryItem = {
    id: crypto.randomUUID(),
    name: inquiry.name || 'Anonymous User',
    country: inquiry.country || '未指定 (Not Specified)',
    contact: inquiry.contact || 'No contact provided',
    product: inquiry.product || 'General Product Inquiry',
    message: inquiry.message || 'No message content',
    status: inquiry.status || 'new',
    created_at: inquiry.created_at || new Date().toISOString(),
  };

  if (!serverSupabase) throw new Error('Inquiry database is not configured');
  const { data, error } = await serverSupabase.from('inquiries').insert(newInquiry).select().single();
  if (error || !data) throw new Error('Inquiry could not be persisted');
  return data as InquiryItem;
}

export async function removeInquiry(id: string): Promise<boolean> {
  deletedInquiryIds.add(id);
  inquiriesCache = inquiriesCache.filter(i => i.id !== id);

  if (database) {
    try {
      await database.from('inquiries').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase delete inquiry error:', e);
    }
  }
  return true;
}

export async function updateInquiryStatus(id: string, status: 'new' | 'contacted' | 'resolved'): Promise<boolean> {
  if (database) {
    try {
      const { error } = await database.from('inquiries').update({ status }).eq('id', id);
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

export interface OEMHeroMediaSettings {
  tile1_image: string;
  tile2_image: string;
  tile3_image: string;
  tile4_image: string;
}

export const DEFAULT_OEM_HERO_MEDIA: OEMHeroMediaSettings = {
  tile1_image: '/oem/oem_factory_assembly.png',
  tile2_image: '/oem/oem_charger_pcb.png',
  tile3_image: '/oem/oem_battery_testing.png',
  tile4_image: '/oem/oem_custom_packaging.png',
};

let oemHeroCache: OEMHeroMediaSettings = { ...DEFAULT_OEM_HERO_MEDIA };
let oemVideoBuffer: { buffer: Buffer; mimeType: string } | null = null;

function loadOEMHeroFromFile(): OEMHeroMediaSettings {
  const fs = getFsModule();
  const path = getPathModule();
  if (!fs || !path) return DEFAULT_OEM_HERO_MEDIA;
  try {
    const tmpFile = path.join('/tmp', 'vszapower_oem_hero_media.json');
    if (fs.existsSync(tmpFile)) {
      const jsonStr = fs.readFileSync(tmpFile, 'utf8');
      const parsed = JSON.parse(jsonStr);
      if (parsed && typeof parsed === 'object') return { ...DEFAULT_OEM_HERO_MEDIA, ...parsed };
    }
  } catch (e) {}
  return DEFAULT_OEM_HERO_MEDIA;
}

function saveOEMHeroToFile(settings: OEMHeroMediaSettings) {
  const fs = getFsModule();
  const path = getPathModule();
  if (!fs || !path) return;
  try {
    const tmpFile = path.join('/tmp', 'vszapower_oem_hero_media.json');
    fs.writeFileSync(tmpFile, JSON.stringify(settings, null, 2), 'utf8');
  } catch (e) {}
}

export function getOEMVideoBuffer(): { buffer: Buffer; mimeType: string } | null {
  if (oemVideoBuffer) return oemVideoBuffer;

  const fs = getFsModule();
  const path = getPathModule();
  if (fs && path) {
    try {
      const tmpVideo = path.join('/tmp', 'vszapower_oem_video.bin');
      const tmpMime = path.join('/tmp', 'vszapower_oem_video_mime.txt');

      if (fs.existsSync(tmpVideo)) {
        const buffer = fs.readFileSync(tmpVideo);
        const mimeType = fs.existsSync(tmpMime) ? fs.readFileSync(tmpMime, 'utf8') : 'video/mp4';
        oemVideoBuffer = { buffer, mimeType };
        return oemVideoBuffer;
      }
    } catch (e) {}
  }
  return null;
}


export async function fetchOEMHeroMedia(): Promise<OEMHeroMediaSettings> {
  if (database) {
    try {
      const { data, error } = await database.from('banners').select('*').eq('id', 'oem_hero_2x2').single();
      if (!error && data && data.subtitle) {
        const parsed = JSON.parse(data.subtitle);
        if (parsed && typeof parsed === 'object') {
          oemHeroCache = { ...DEFAULT_OEM_HERO_MEDIA, ...parsed };
          saveOEMHeroToFile(oemHeroCache);
          return oemHeroCache;
        }
      }
    } catch (e) {
      console.warn('Supabase fetch OEM hero media warning:', e);
    }
  }

  const fromFile = loadOEMHeroFromFile();
  oemHeroCache = { ...DEFAULT_OEM_HERO_MEDIA, ...fromFile, ...oemHeroCache };
  return oemHeroCache;
}

export async function saveOEMHeroMedia(media: Partial<OEMHeroMediaSettings>): Promise<OEMHeroMediaSettings> {
  oemHeroCache = {
    ...oemHeroCache,
    ...media,
  };

  saveOEMHeroToFile(oemHeroCache);

  if (database) {
    try {
      const payload = {
        id: 'oem_hero_2x2',
        badge: 'OEM HERO MEDIA',
        title: 'OEM Hero 2x2 Collage Settings',
        subtitle: JSON.stringify(oemHeroCache),
        image_url: oemHeroCache.tile2_image || oemHeroCache.tile1_image || DEFAULT_OEM_HERO_MEDIA.tile1_image,
        cta_text: 'OEM Quote',
        cta_link: '/#contact',
        highlight: '✓ Factory Media',
        created_at: new Date().toISOString(),
      };
      await database.from('banners').upsert(payload);
    } catch (e) {
      console.warn('Supabase save OEM hero media error:', e);
    }
  }

  return oemHeroCache;
}
