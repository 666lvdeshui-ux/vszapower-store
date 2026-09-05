/** Stored article translations are authoritative; keyword replacement is not translation. */
export function normalizeLocale(locale: string): string {
  const value = locale.replace(/_/g, '-');
  const chinese = ['zh-CN', 'zh-HK', 'zh-TW'].find(code => code.toLowerCase() === value.toLowerCase());
  return chinese || value.toLowerCase();
}

type Translation = { title?: string; summary?: string; content?: string; category?: string; tags?: string[] };
type Article = { title: string; summary: string; content: string; category: string; tags?: string[]; translations?: Record<string, Translation> };

export function normalizeTranslations(translations: Record<string, Translation> = {}) {
  const result: Record<string, Translation> = {};
  for (const [key, value] of Object.entries(translations)) {
    if (value && typeof value === 'object') result[normalizeLocale(key)] = { ...result[normalizeLocale(key)], ...value };
  }
  return result;
}

export function localizePost<T extends Article>(post: T, locale: string) {
  const lang = normalizeLocale(locale);
  const translation = normalizeTranslations(post.translations)[lang];
  // Legacy generators copied the original body into every locale. Do not label these as translated.
  const hasTranslatedContent = !!translation?.content?.trim() && translation.content.trim() !== post.content.trim();
  const sourceIsChinese = /[\u3400-\u9fff]/.test(post.content);
  const isSourceLanguage = sourceIsChinese ? lang === 'zh-CN' : lang === 'en';
  return {
    ...post,
    title: translation?.title?.trim() || post.title,
    summary: translation?.summary?.trim() || post.summary,
    category: translation?.category?.trim() || post.category,
    tags: translation?.tags || post.tags,
    content: hasTranslatedContent ? translation!.content! : post.content,
    showingOriginal: !hasTranslatedContent && !isSourceLanguage,
  };
}

export const originalNotice: Record<string, string> = {
  en: 'Translation is not yet available. Showing the original article.',
  'zh-CN': '当前语言的全文译文尚未提供，以下显示原文。',
  'zh-HK': '目前尚未提供此語言的全文譯文，以下顯示原文。',
  'zh-TW': '目前尚未提供此語言的全文譯文，以下顯示原文。',
  de: 'Die Übersetzung ist noch nicht verfügbar. Der Originalartikel wird angezeigt.',
  ja: 'この言語の全文翻訳はまだありません。原文を表示しています。',
  ko: '전체 번역이 아직 없습니다. 원문을 표시합니다.',
  es: 'La traducción aún no está disponible. Se muestra el artículo original.',
  fr: 'La traduction est indisponible. L’article original est affiché.',
  pt: 'A tradução ainda não está disponível. Exibindo o artigo original.',
  ru: 'Перевод пока недоступен. Показан оригинал статьи.',
  vi: 'Chưa có bản dịch đầy đủ. Đang hiển thị bài viết gốc.',
  ar: 'الترجمة غير متوفرة بعد. يتم عرض المقال الأصلي.',
  he: 'התרגום עדיין אינו זמין. המאמר המקורי מוצג.',
};
