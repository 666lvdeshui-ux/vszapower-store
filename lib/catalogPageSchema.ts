import type { CatalogProduct } from './catalog';

/** Quote-only catalog pages have no public offer or model-specific review to mark up. */
export function catalogPageSchema(origin: string, product: CatalogProduct, title: string, summary: string, specs: Record<string, string | undefined>) {
  const url = `${origin}/products/${product.slug}`;
  const category = product.kind === 'battery'
    ? { name: 'Rechargeable coin cell batteries', path: '/rechargeable-coin-cell-batteries' }
    : { name: 'Coin cell chargers', path: '/coin-cell-charger-manufacturer' };
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ItemPage', '@id': `${url}#webpage`, url, name: title,
        description: summary, inLanguage: 'en', image: `${origin}${product.image}`,
        isPartOf: { '@id': `${origin}/#website` },
        publisher: { '@id': `${origin}/#organization` },
        about: { '@id': `${origin}/#brand` },
        mainEntity: {
          '@type': 'Thing', '@id': `${url}#product`, url, name: title,
          identifier: [product.model, product.id], description: summary,
          image: `${origin}${product.image}`, mainEntityOfPage: { '@id': `${url}#webpage` },
        },
        text: [summary, ...Object.entries(specs).filter(([, value]) => value).map(([name, value]) => `${name}: ${value}`)].join('\n'),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: origin },
          { '@type': 'ListItem', position: 2, name: category.name, item: origin + category.path },
          { '@type': 'ListItem', position: 3, name: title, item: url },
        ],
      },
    ],
  };
}
