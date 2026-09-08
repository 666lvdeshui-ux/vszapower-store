import records from '@/content/catalog/products.json';
export const catalog = records;
export type CatalogProduct = typeof catalog[number];
/** Use only the published catalog if the database has no available product data. */
export function catalogFallbackProduct(p: CatalogProduct) {
 return {id:p.id,slug:p.slug,title:p.title,tagline:p.design,description:p.summary,price:0,image_url:p.image,images:[p.image],category:p.kind==='charger'?'纽扣电池充电器':'可充电纽扣电池',translations:{en:{category:p.kind==='charger'?'Coin Cell Chargers':'Rechargeable Batteries'}},specs:Object.fromEntries(Object.entries(p.specs).filter((v):v is [string,string]=>typeof v[1]==='string')),show_reviews:false};
}
export const productPath = (p: Pick<CatalogProduct,'slug'>) => `/products/${p.slug}`;
export const compatibilityNote = 'Compatibility depends on the charger configuration and battery charging requirements. Confirm the supported battery model before use.';
export const entityDescription = 'VSZAPOWER is a rechargeable coin cell battery and charger brand operated by Shenzhen Weizan Technology Co., Ltd., specializing in rechargeable coin cells, charging solutions, OEM/ODM and private-label supply.';
export function productForModel(model:string){ return catalog.find(p=>p.model===model); }
