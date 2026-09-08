import covers from '@/content/battery-academy/image-covers.json';

type PostImage = { slug: string; cover_image: string };
const origin = 'https://www.vszapower.com';

/** Match metadata to the current image, so a later admin replacement stays authoritative. */
export function academyImage(post: PostImage) {
  let path = post.cover_image;
  try { path = new URL(path, origin).pathname; } catch {}
  return covers.find(image => image.slug === post.slug && image.file === path);
}

export function academyImageAlt(post: PostImage, lang: string, fallback: string) {
  const image = academyImage(post);
  return image ? (lang.startsWith('zh') ? image.alt.zh : image.alt.en) : fallback;
}

export function academyImageSources(post: PostImage, card = false) {
  const image = academyImage(post);
  if (image?.kind === 'owned-product-scene' && card) return `${image.file.replace('.webp', '-card-small.webp')} 512w, ${image.file.replace('.webp', '-card.webp')} 1024w`;
  if (image?.kind === 'owned-product' && card) return `${image.file.replace('.webp', '-small.webp')} 512w, ${image.file.replace('.webp', '-card.webp')} 1024w`;
  return image ? `${image.file.replace('.webp', '-small.webp')} 512w, ${image.file} 1280w` : undefined;
}

export function academyImageCaption(post: PostImage, lang: string) {
  if (academyImage(post)?.kind === 'owned-product-scene') {
    const labels: Record<string, string> = {
      en: 'AI-styled scene based on original VSZAPOWER product imagery',
      'zh-CN': '基于 VSZAPOWER 产品原图制作的 AI 场景图',
      'zh-TW': '基於 VSZAPOWER 產品原圖製作的 AI 場景圖',
      'zh-HK': '基於 VSZAPOWER 產品原圖製作的 AI 場景圖',
      de: 'KI-gestaltete Szene auf Basis originaler VSZAPOWER-Produktbilder',
      ja: 'VSZAPOWER の製品原画像を基にした AI シーン画像',
      es: 'Escena con IA basada en imágenes originales de productos VSZAPOWER',
      ko: 'VSZAPOWER 제품 원본 이미지를 기반으로 제작한 AI 장면',
      he: 'סצנה בעיצוב AI המבוססת על תמונות מוצר מקוריות של VSZAPOWER',
      ar: 'مشهد مصمم بالذكاء الاصطناعي استنادًا إلى صور منتجات VSZAPOWER الأصلية',
      fr: 'Scène créée avec IA à partir des images originales des produits VSZAPOWER',
      pt: 'Cena com IA baseada em imagens originais de produtos VSZAPOWER',
      ru: 'Сцена, созданная ИИ на основе оригинальных изображений продукции VSZAPOWER',
      vi: 'Cảnh AI dựa trên hình ảnh sản phẩm gốc của VSZAPOWER',
    };
    return labels[lang] || labels.en;
  }
  if (academyImage(post)?.kind !== 'concept') return null;
  const labels: Record<string, string> = {
    en: 'AI-generated concept illustration', 'zh-CN': 'AI 辅助概念示意图',
    'zh-TW': 'AI 輔助概念示意圖', 'zh-HK': 'AI 輔助概念示意圖',
    de: 'KI-generierte Konzeptillustration', ja: 'AI による概念イラスト',
    es: 'Ilustración conceptual generada por IA', ko: 'AI 생성 개념 일러스트',
    he: 'איור רעיוני שנוצר באמצעות AI', ar: 'رسم توضيحي مفاهيمي مولّد بالذكاء الاصطناعي',
    fr: 'Illustration conceptuelle générée par IA', pt: 'Ilustração conceitual gerada por IA',
    ru: 'Концептуальная иллюстрация, созданная ИИ', vi: 'Hình minh họa ý tưởng do AI tạo',
  };
  return labels[lang] || labels.en;
}
