// Compare a fresh public /api/posts response against the archived 2026-09-05 backfill.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../content/battery-academy/translations/', import.meta.url));
const read = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const input = process.argv[2];
if (!input) throw new Error('Usage: node scripts/verify_article_translation_backfill.mjs <public-api-response.json>');
const response = read(input);
assert.equal(response.success, true);
const posts = response.data;
const source = read(path.join(root, 'source-posts.json')).data;
const locales = ['zh-CN', 'ja', 'de', 'es', 'ko', 'fr', 'ru', 'vi', 'ar', 'he', 'pt', 'zh-TW', 'zh-HK'];
const stable = value => value === null || typeof value !== 'object' ? JSON.stringify(value)
  : Array.isArray(value) ? '[' + value.map(stable).join(',') + ']'
    : '{' + Object.keys(value).sort().map(key => JSON.stringify(key) + ':' + stable(value[key])).join(',') + '}';
const fnv = text => {
  let hash = 2166136261;
  for (let i = 0; i < text.length; i++) hash = Math.imul(hash ^ text.charCodeAt(i), 16777619);
  return (hash >>> 0).toString(16);
};
const sort = rows => rows.sort((a, b) => a.id.localeCompare(b.id));
assert.equal(posts.length, 31);
assert.equal(new Set(posts.map(post => post.id)).size, 31);
for (const post of posts) {
  const { translations: actualTranslations, ...actual } = post;
  const original = source.find(item => item.id === post.id);
  assert(original, `Unexpected article ${post.id}`);
  const { translations: originalTranslations, ...expected } = original;
  assert.deepEqual(actual, expected, `Original fields changed: ${post.id}`);
}
const report = {
  verified_at: new Date().toISOString(), endpoint: 'https://www.vszapower.com/api/posts',
  source_articles: posts.length, original_fields_unchanged: true, locales: {}, total_translations: 0,
};
for (const locale of locales) {
  const saved = read(path.join(root, locale + '.json'));
  const actual = sort(posts.map(post => {
    const translation = post.translations[locale];
    assert(translation, `Missing ${post.id}/${locale}`);
    for (const field of ['title', 'summary', 'category', 'content']) {
      assert(typeof translation[field] === 'string' && translation[field].trim(), `Empty ${post.id}/${locale}/${field}`);
    }
    assert(Array.isArray(translation.tags));
    assert.notEqual(translation.content, post.content);
    const archived = saved.find(item => item.id === post.id);
    assert(archived);
    assert.equal(archived.source_md5, crypto.createHash('md5').update(post.content).digest('hex'));
    return { id: post.id, translation };
  }));
  assert.deepEqual(actual, sort(saved.map(({ id, translation }) => ({ id, translation }))), `Translation differs: ${locale}`);
  const serialized = stable(actual);
  report.locales[locale] = { articles: actual.length, fnv1a_utf16: fnv(serialized), sha256: crypto.createHash('sha256').update(serialized).digest('hex') };
  report.total_translations += actual.length;
}
assert.equal(report.total_translations, 403);
fs.writeFileSync(path.join(root, 'verification.json'), JSON.stringify(report, null, 2) + '\n');
console.log(`Verified ${posts.length} original articles and ${report.total_translations} translations across ${locales.length} locales.`);
