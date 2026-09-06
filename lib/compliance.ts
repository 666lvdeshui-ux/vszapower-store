import data from '@/content/compliance/public.json';
import type { Metadata } from 'next';
export const compliance = data;
export const products = data.products;
export type ComplianceProduct = typeof products[number];
export const origin = data.canonicalOrigin;
export const companyId = `${origin}/#organization`;
export function pageMetadata(title: string, description: string, path: string): Metadata {
 return { title, description, alternates: { canonical: origin + path }, openGraph: { title, description, url: origin + path, type: 'website', locale: 'en_US' }, twitter: { card: 'summary', title, description } };
}
export const publicPaths = ['/compliance', '/about-vszapower', '/coin-cell-charger-manufacturer', ...products.map(p => p.path)];
export function isEvidenceRoute(path: string) { return path.startsWith('/products/') || path === '/rechargeable-coin-cell-batteries' || path.startsWith('/compliance') || path === '/about-vszapower' || path === '/coin-cell-charger-manufacturer'; }
