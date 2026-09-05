import messages from '../content/sections/translations/messages.json';
import { normalizeLocale } from './postI18n';

const translations: Record<string, Record<string, string>> = messages;

/** Resolve complete OEM, factory and certification messages on every language change. */
export function sectionText(source: string, locale: string): string {
  return translations[normalizeLocale(locale)]?.[source]?.trim() || source;
}
