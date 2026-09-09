import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import ts from 'typescript';
import path from 'node:path';
import { createRequire } from 'node:module';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const read = path => fs.readFileSync(new URL(path, import.meta.url), 'utf8');
const messages = JSON.parse(read('../content/sections/translations/messages.json'));
const compile = path => ts.transpileModule(read(path), { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const moduleUrl = source => 'data:text/javascript;base64,' + Buffer.from(source).toString('base64');
const { sectionText } = await import(moduleUrl(compile('../lib/sectionI18n.ts')
  .replace(/import messages from [^;]+;/, `const messages = ${JSON.stringify(messages)};`)
  .replace("'./postI18n'", JSON.stringify(moduleUrl(compile('../lib/postI18n.ts'))))));
const { SUPPORTED_LANGUAGES } = await import(moduleUrl(compile('../lib/i18n.ts')));

// Collect messages from localized components, including data-driven cards and options.
const required = new Set();
const componentNames = ['CustomizationSection', 'FactoryShowcase', 'HeroCarousel', 'CertificationsSection', 'AnswerBlocks', 'Header', 'ContactSection', 'Footer'];
for (const name of componentNames) {
  const source = read(`../components/${name}.tsx`);
  const ast = ts.createSourceFile(name, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  function visit(node) {
    if (ts.isCallExpression(node) && node.expression.getText(ast) === 'sectionText' && ts.isStringLiteral(node.arguments[0])) required.add(node.arguments[0].text);
    if (ts.isPropertyAssignment(node) && ['name', 'title', 'scope', 'description', 'verifiedStatus', 'code', 'desc', 'status', 'label', 'q', 'a'].includes(node.name.getText(ast)) && ts.isStringLiteral(node.initializer) && node.initializer.text.trim()) required.add(node.initializer.text);
    if (ts.isArrayLiteralExpression(node) && node.elements.every(ts.isStringLiteral)) node.elements.filter(n => !n.text.startsWith('/')).forEach(n => required.add(n.text));
    ts.forEachChild(node, visit);
  }
  visit(ast);
}
const entityDescription = read('../lib/catalog.ts').match(/export const entityDescription = '([^']+)'/)[1];
required.add(entityDescription);

test('visible section prose and accessibility text cannot bypass localization', () => {
  for (const name of componentNames.filter(n => n !== 'ContactSection')) {
    const ast = ts.createSourceFile(name, read(`../components/${name}.tsx`), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    function visit(node) {
      if (ts.isJsxText(node)) {
        const text = node.text.replace(/&[a-z]+;/g, '').trim();
        // The language label for explicitly English evidence pages is intentional.
        assert.ok(!/[a-z]{3}/i.test(text) || (name === 'Header' && text === 'English'), `${name}: untranslated JSX text: ${text}`);
      }
      if (ts.isJsxAttribute(node) && ['title', 'alt', 'placeholder', 'aria-label'].includes(node.name.getText(ast)) && node.initializer && ts.isStringLiteral(node.initializer)) {
        const text = node.initializer.text;
        assert.ok(!/[a-z]{3}/i.test(text) || ['VSZAPOWER', 'Home'].includes(text), `${name}: untranslated ${node.name.getText(ast)}: ${text}`);
      }
      ts.forEachChild(node, visit);
    }
    visit(ast);
  }
});

test('every supported language covers all OEM, factory and certification messages', () => {
  assert.deepEqual(Object.keys(messages).sort(), SUPPORTED_LANGUAGES.map(l => l.code).sort());
  assert.deepEqual(JSON.parse(read('../content/sections/translations/en.json')), messages.en);
  for (const { code } of SUPPORTED_LANGUAGES) {
    for (const source of required) assert.ok(messages[code][source]?.trim(), `${code}: ${source}`);
  }
});

// Render the actual components with only routing and the locale provider replaced.
// This catches translations present in JSON but omitted from the rendered cards/FAQ.
const require = createRequire(import.meta.url);
const root = path.resolve('');
let currentLocale = 'en';
const cache = new Map();
function loadComponentModule(file) {
  if (cache.has(file)) return cache.get(file).exports;
  const module = { exports: {} };
  cache.set(file, module);
  const js = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
  function localRequire(id) {
    if (id === '@/context/LanguageContext') return { useLanguage: () => ({ lang: currentLocale, isRTL: ['ar', 'he'].includes(currentLocale), t: key => getTranslation(currentLocale, key) }) };
    if (id === 'next/navigation') return { usePathname: () => '/' };
    if (id === 'next/link') return { __esModule: true, default: ({ children, ...props }) => React.createElement('a', props, children) };
    if (id.startsWith('@/') || id.startsWith('.')) {
      const base = id.startsWith('@/') ? path.join(root, id.slice(2)) : path.resolve(path.dirname(file), id);
      if (base.endsWith('.json')) return JSON.parse(fs.readFileSync(base, 'utf8'));
      const resolved = [base, base + '.ts', base + '.tsx'].find(p => fs.existsSync(p) && fs.statSync(p).isFile());
      if (resolved) return loadComponentModule(resolved);
    }
    return require(id);
  }
  new Function('require', 'module', 'exports', js)(localRequire, module, module.exports);
  return module.exports;
}
const { getTranslation } = await import(moduleUrl(compile('../lib/i18n.ts')));
const markupText = text => renderToStaticMarkup(React.createElement('span', null, text)).slice(6, -7);

test('rendered certifications, OEM hero, factory, FAQ and navigation follow all 14 languages', () => {
  const components = Object.fromEntries(['CertificationsSection', 'HeroCarousel', 'FactoryShowcase', 'AnswerBlocks', 'Header', 'Footer'].map(name => [name, loadComponentModule(path.join(root, `components/${name}.tsx`)).default]));
  const { ThemeProvider } = loadComponentModule(path.join(root, 'context/ThemeContext.tsx'));
  const cardSources = [
    'IEC 62133-2 Safety Testing',
    'Request safety documentation for the selected rechargeable coin cell model, capacity and version. Public availability requires a matched, reviewed report.',
    'Request the applicable test report and test summary for the battery version. Shipment requirements also depend on packaging and configuration.',
    'Request safety data documentation for the selected battery model and version. An SDS is a safety information document, not a product certification.',
  ];
  for (const { code } of SUPPORTED_LANGUAGES) {
    currentLocale = code;
    const rendered = Object.fromEntries(Object.entries(components).map(([name, component]) => [name, renderToStaticMarkup(React.createElement(ThemeProvider, null, React.createElement(component)))]));
    const center = code === 'en' ? '/compliance' : `/${code}/compliance`;
    assert.equal((rendered.CertificationsSection.match(/<article /g) || []).length, 6, code);
    for (const source of cardSources) assert.ok(rendered.CertificationsSection.includes(markupText(sectionText(source, code))), `${code}: ${source}`);
    assert.equal((rendered.CertificationsSection.match(new RegExp(`href="${center}(?:#battery-documentation)?"`, 'g')) || []).length, 7, code);
    for (const name of ['Header', 'Footer']) assert.ok(rendered[name].includes(`href="${center}"`), `${code}: ${name} destination`);
    for (const [name, source] of [
      ['HeroCarousel', 'Rechargeable Coin Cell Battery & Charger Manufacturer'],
      ['FactoryShowcase', 'Charger manufacturing and OEM →'],
      ['AnswerBlocks', 'Does VSZAPOWER support OEM and private label?'],
      ['AnswerBlocks', entityDescription],
      ['Footer', entityDescription],
    ]) {
      assert.ok(rendered[name].includes(markupText(sectionText(source, code))), `${code}: ${name} content`);
      if (code !== 'en') assert.ok(!rendered[name].includes(markupText(source)), `${code}: ${name} English prose`);
    }
    for (const id of ['IEC 62133-2', 'UN 38.3', '2011/65/EU', '2015/863', '2014/30/EU', '2023/1542', 'MSDS / SDS']) assert.ok(rendered.CertificationsSection.includes(id), `${code}: ${id}`);
  }
});

test('locale changes resolve complete messages, including legacy Chinese locale names', () => {
  const title = 'Customize Coin Cell Batteries & Blister Card Packaging';
  assert.equal(sectionText(title, 'ZH_cn'), '定制纽扣电池与吸塑卡包装');
  assert.equal(sectionText(title, 'zh_TW'), '客製化鈕扣電池與吸塑卡包裝');
  assert.equal(sectionText(title, 'en'), title);
  assert.equal(sectionText(title, 'unsupported'), title);
  assert.equal(sectionText('Unlisted future message', 'de'), 'Unlisted future message');
  for (const { code } of SUPPORTED_LANGUAGES.filter(l => l.code !== 'en')) {
    for (const source of ['Reset', 'Japan Market Compliant', 'Target Scope', 'Request Official Certification PDF Copies', 'Selected Custom Configuration Summary']) {
      assert.notEqual(sectionText(source, code), source, `${code}: untranslated ${source}`);
    }
  }
});

test('translations preserve battery models, ratings and certification identifiers', () => {
  const technical = /\b(?:LIR\d+|ML\d+|CR\d+|\d+(?:\.\d+)?V|\d+mAh)\b/g;
  for (const [locale, entries] of Object.entries(messages)) {
    for (const [source, translated] of Object.entries(entries)) {
      if (/^(LIR|ML|CR)\d+/.test(source)) assert.deepEqual(translated.match(technical), source.match(technical), `${locale}: ${source}`);
    }
    for (const identifier of ['UN38.3', 'RoHS / REACH', 'CE-LVD & EMC', 'RoHS 2.0']) assert.equal(entries[identifier], identifier);
    assert.ok(entries['e.g. VSZAPOWER'].includes('VSZAPOWER'));
    assert.ok(entries['e.g. 2026.08 QC-01'].includes('2026.08 QC-01'));
  }
});
