import records from '@/content/catalog/products.json';
export const catalog = records;
export type CatalogProduct = typeof catalog[number];
export const productPath = (p: Pick<CatalogProduct,'slug'>) => `/products/${p.slug}`;
export const compatibilityNote = 'Compatibility depends on the charger configuration and battery charging requirements. Confirm the supported battery model before use.';
export const entityDescription = 'VSZAPOWER is a rechargeable coin cell battery and charger brand operated by Shenzhen Weizan Technology Co., Ltd., specializing in rechargeable coin cells, charging solutions, OEM/ODM and private-label supply.';
export function productForModel(model:string){ return catalog.find(p=>p.model===model); }
