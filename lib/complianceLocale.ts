export const complianceLocales = ['en','de','ja','es','ko','he','ar','fr','pt','ru','vi','zh-HK','zh-CN','zh-TW'] as const;
export type ComplianceLocale = typeof complianceLocales[number];
export type CenterCopy = typeof import('@/content/compliance/locales/en.json');
export function isComplianceLocale(value: string): value is ComplianceLocale { return (complianceLocales as readonly string[]).includes(value); }
export function centerPath(locale: string) { return locale === 'en' ? '/compliance' : `/${locale}/compliance`; }
export function centerLocale(path: string): ComplianceLocale | null {
 if(path==='/compliance')return 'en'; const m=path.match(/^\/([^/]+)\/compliance\/?$/);return m&&isComplianceLocale(m[1])?m[1]:null;
}
export async function getCenterCopy(locale: ComplianceLocale): Promise<CenterCopy> { return (await import(`@/content/compliance/locales/${locale}.json`)).default; }
