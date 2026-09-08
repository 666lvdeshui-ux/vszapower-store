const origin = 'https://www.vszapower.com';
type Article = { id: string; slug: string; title: string; cover_image: string; published: boolean };

export function imageIdentity(value: string): string {
  if (!value?.trim()) return '';
  if (value.startsWith('data:')) return value;
  try {
    const url = new URL(value, origin);
    if (url.hostname === 'vszapower.com') url.hostname = 'www.vszapower.com';
    url.hash = '';
    for (const param of ['w', 'h', 'width', 'height', 'q', 'quality', 'fit', 'crop', 'auto']) url.searchParams.delete(param);
    url.searchParams.sort();
    return url.toString();
  } catch { return value.trim(); }
}

/** Publishing paths must allocate a distinct cover; drafts can remain unfinished. */
export function validateAcademyImage(article: Article, existing: Article[]): void {
  if (!article.published) return;
  const key = imageIdentity(article.cover_image);
  if (!key) throw new Error('请为文章选择独立封面图片 / Choose a unique article cover before publishing.');
  const duplicate = existing.find(p => p.published && p.id !== article.id && p.slug !== article.slug && imageIdentity(p.cover_image) === key);
  if (duplicate) throw new Error(`封面已被文章使用，请更换 / Cover already used by: ${duplicate.title}`);
}
