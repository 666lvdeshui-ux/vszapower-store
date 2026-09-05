import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import ts from 'typescript';

const compile = file => ts.transpileModule(fs.readFileSync(new URL(file, import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const moduleUrl = source => 'data:text/javascript;base64,' + Buffer.from(source).toString('base64');
const localeModule = moduleUrl(compile('../lib/postI18n.ts'));
const { localizeProduct, normalizeProductTranslations } = await import(moduleUrl(compile('../lib/productI18n.ts').replace("'./postI18n'", JSON.stringify(localeModule))));
const source = {
  id: 'battery', title: 'Rechargeable LIR2032', tagline: 'Battery for compatible devices', description: 'First paragraph.\nSecond paragraph.',
  category: 'Battery', badge: 'New', price: 12, specs: { voltage: '3.6V', packaging: '2-Pack' },
  translations: { zh_CN: { title: 'LIR2032 可充电电池', tagline: '适用于兼容设备', description: '第一段。\n第二段。', category: '电池', badge: '新品', specs: { packaging: '2 枚装' } } },
};

test('switching locale changes title, full description and specs together, retaining technical values', () => {
  const chinese = localizeProduct(source, 'ZH_cn');
  assert.equal(chinese.title, 'LIR2032 可充电电池');
  assert.equal(chinese.description, '第一段。\n第二段。');
  assert.equal(chinese.tagline, '适用于兼容设备');
  assert.equal(chinese.category, '电池');
  assert.equal(chinese.badge, '新品');
  assert.deepEqual(chinese.specs, { voltage: '3.6V', packaging: '2 枚装' });
  assert.equal(chinese.price, 12);
  assert.equal(localizeProduct(source, 'en'), source);
  assert.equal(source.specs.packaging, '2-Pack');
});

test('empty or missing translations fall back to complete source fields without keyword replacement', () => {
  const product = { ...source, translations: { de: { title: ' ', description: '', specs: { voltage: '' } } } };
  const german = localizeProduct(product, 'de');
  assert.equal(german.title, source.title);
  assert.equal(german.description, source.description);
  assert.deepEqual(german.specs, source.specs);
  assert.equal(localizeProduct(product, 'ja'), product);
});

test('database translation normalization rejects malformed values and preserves stable spec keys', () => {
  assert.deepEqual(normalizeProductTranslations(null), {});
  assert.deepEqual(normalizeProductTranslations([]), {});
  assert.deepEqual(normalizeProductTranslations({ zh_TW: { title: '電池', description: 4, specs: { battery_model: 'LIR2032', malformed: {} } }, ja: [] }), { 'zh-TW': { title: '電池', specs: { battery_model: 'LIR2032' } } });
});
