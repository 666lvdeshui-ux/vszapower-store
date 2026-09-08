import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import { catalogPageSchema } from '../lib/catalogPageSchema.ts';

const products = JSON.parse(fs.readFileSync(new URL('../content/catalog/products.json', import.meta.url), 'utf8'));
test('quote-only pages preserve each design and its facts without inventing commercial evidence', () => {
  const identities = new Set();
  for (const product of products) {
    const schema = catalogPageSchema('https://www.vszapower.com', product, product.title, product.summary, product.specs);
    const page = schema['@graph'][0];
    identities.add(page.mainEntity['@id']);
    assert.equal(page['@type'], 'ItemPage');
    assert(page.mainEntity.identifier.includes(product.id));
    assert(page.text.includes(product.kind === 'battery' ? product.specs.capacity : product.design));
    assert.equal(schema['@graph'][1].itemListElement[2].item, page.url);
    assert.doesNotMatch(JSON.stringify(schema), /"(?:Product|Offer|Review|AggregateRating)"|"(?:offers|aggregateRating|review)":/);
  }
  assert.equal(identities.size, 8);
});
