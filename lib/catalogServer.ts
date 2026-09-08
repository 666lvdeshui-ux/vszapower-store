import { createHash } from 'node:crypto';
import imageReferences from '@/content/catalog/image-references.json';
import { localizeProduct } from './productI18n';
import { cache } from 'react';
import { fetchAllProducts, type ProductItem } from './store';
import { catalog, catalogFallbackProduct } from './catalog';
/** Database remains authoritative for published product edits and review visibility. */
export const getCatalogProducts = cache(async (): Promise<ProductItem[]> => {
 const stored = await fetchAllProducts();
 return catalog.map(p=>{
  const live=stored.find(x=>x.id===p.id);
 return live || catalogFallbackProduct(p);
 });
});

/** Keep the initial HTML small; full galleries and translations load through the existing API. */
export async function getHomepageProducts(): Promise<ProductItem[]> {
 return (await getCatalogProducts()).map(p=>{
  const en=localizeProduct(p,'en');
  const reference=(imageReferences as Record<string,string>)[createHash('sha256').update(p.image_url).digest('hex')];
  const image=reference||p.image_url;
  return {id:p.id,slug:p.slug,title:en.title,tagline:en.tagline,description:en.description,price:p.price,category:p.category,translations:{en:{category:en.category}},badge:en.badge,specs:en.specs,image_url:image,images:[image],show_reviews:p.show_reviews,review_group:p.review_group,rating:p.rating,review_count:p.review_count,reviews:p.reviews,temu_link:p.temu_link};
 });
}

export async function getHomepagePosts() {
 const { fetchAllPosts } = await import('./store');
 return (await fetchAllPosts()).filter(p=>p.published && !/[\u3400-\u9fff]/.test(p.title+' '+p.summary)).map(p=>({...p,content:'',translations:undefined,category:/[\u3400-\u9fff]/.test(p.category)?'Battery Academy':p.category,read_time:/[\u3400-\u9fff]/.test(p.read_time)?`${parseInt(p.read_time)||5} min read`:p.read_time}));
}
