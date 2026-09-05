import { normalizeLocale } from './postI18n';

export interface ProductTranslation {
  title?: string;
  tagline?: string;
  description?: string;
  category?: string;
  badge?: string;
  specs?: Record<string, string>;
}

type LocalizableProduct = ProductTranslation & { translations?: Record<string, ProductTranslation> };
const fields = ['title', 'tagline', 'description', 'category', 'badge'] as const;

export function normalizeProductTranslations(input: unknown): Record<string, ProductTranslation> {
  const result: Record<string, ProductTranslation> = {};
  if (!input || typeof input !== 'object' || Array.isArray(input)) return result;
  for (const [locale, value] of Object.entries(input)) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) continue;
    const translation: ProductTranslation = {};
    for (const field of fields) {
      if (typeof value[field] === 'string') translation[field] = value[field];
    }
    if (value.specs && typeof value.specs === 'object' && !Array.isArray(value.specs)) {
      translation.specs = Object.fromEntries(Object.entries(value.specs).filter((entry): entry is [string, string] => typeof entry[1] === 'string'));
    }
    const code = normalizeLocale(locale);
    result[code] = { ...result[code], ...translation };
  }
  return result;
}

/** Resolve every product surface from the same stored translation, on each render. */
export function localizeProduct<T extends LocalizableProduct>(product: T, locale: string): T {
  const translation = normalizeProductTranslations(product.translations)[normalizeLocale(locale)];
  if (!translation) return product;
  const localized = { ...product };
  for (const field of fields) {
    if (translation[field]?.trim()) localized[field] = translation[field]!;
  }
  // Specification keys are stable identifiers. Translate values without losing partial specs.
  localized.specs = { ...product.specs };
  for (const [key, value] of Object.entries(translation.specs || {})) {
    if (value.trim()) localized.specs[key] = value;
  }
  return localized;
}
