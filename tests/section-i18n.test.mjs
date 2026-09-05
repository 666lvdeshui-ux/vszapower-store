import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import ts from 'typescript';

const read = path => fs.readFileSync(new URL(path, import.meta.url), 'utf8');
const messages = JSON.parse(read('../content/sections/translations/messages.json'));
const compile = path => ts.transpileModule(read(path), { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const moduleUrl = source => 'data:text/javascript;base64,' + Buffer.from(source).toString('base64');
const { sectionText } = await import(moduleUrl(compile('../lib/sectionI18n.ts')
  .replace(/import messages from [^;]+;/, `const messages = ${JSON.stringify(messages)};`)
  .replace("'./postI18n'", JSON.stringify(moduleUrl(compile('../lib/postI18n.ts'))))));
const { SUPPORTED_LANGUAGES } = await import(moduleUrl(compile('../lib/i18n.ts')));

// Collect messages from the actual components, including data-driven cards and options.
const required = new Set();
for (const name of ['CustomizationSection', 'CertificationsSection', 'FactoryShowcase', 'HeroCarousel', 'Header']) {
  const source = read(`../components/${name}.tsx`);
  const ast = ts.createSourceFile(name, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  function visit(node) {
    if (ts.isCallExpression(node) && node.expression.getText(ast) === 'sectionText' && ts.isStringLiteral(node.arguments[0])) required.add(node.arguments[0].text);
    if (ts.isPropertyAssignment(node) && ['name', 'title', 'scope', 'description', 'verifiedStatus', 'code', 'desc', 'status', 'label'].includes(node.name.getText(ast)) && ts.isStringLiteral(node.initializer)) required.add(node.initializer.text);
    if (ts.isArrayLiteralExpression(node) && node.elements.every(ts.isStringLiteral)) node.elements.forEach(n => required.add(n.text));
    ts.forEachChild(node, visit);
  }
  visit(ast);
}

test('every supported language covers all OEM, factory and certification messages', () => {
  assert.deepEqual(Object.keys(messages).sort(), SUPPORTED_LANGUAGES.map(l => l.code).sort());
  for (const { code } of SUPPORTED_LANGUAGES) {
    for (const source of required) assert.ok(messages[code][source]?.trim(), `${code}: ${source}`);
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
