import { origin } from './compliance';
import { centerPath, complianceLocales, getCenterCopy, type ComplianceLocale } from './complianceLocale';
import type { Metadata } from 'next';
export const centerAlternates=Object.fromEntries([...complianceLocales.map(l=>[l,origin+centerPath(l)]),['x-default',origin+'/compliance']]);
export async function centerMetadata(locale:ComplianceLocale):Promise<Metadata>{const c=await getCenterCopy(locale);return {title:c.title,description:c.description,alternates:{canonical:origin+centerPath(locale),languages:centerAlternates},openGraph:{title:c.title,description:c.description,url:origin+centerPath(locale),type:'website',locale:locale.replace('-','_')},twitter:{card:'summary',title:c.title,description:c.description}};}
