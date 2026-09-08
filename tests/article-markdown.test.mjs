import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import ts from 'typescript';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const source = fs.readFileSync(new URL('../components/ArticleMarkdown.tsx', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, jsx: ts.JsxEmit.React, target: ts.ScriptTarget.ES2022 } }).outputText
  .replace(/from ['"]([^'"]+)['"]/g, (_, name) => `from ${JSON.stringify(import.meta.resolve(name))}`);
const { default: ArticleMarkdown } = await import('data:text/javascript;base64,' + Buffer.from(compiled).toString('base64'));
const render = content => renderToStaticMarkup(React.createElement(ArticleMarkdown, { content }));

test('body headings do not duplicate the article template H1 or rewrite code examples', () => {
  const html = render('# Article body title\n\n## Section\n\n```markdown\n# Example heading\n```');
  assert.doesNotMatch(html, /<h1\b/);
  assert.match(html, /<h2 style="font-size:2em">Article body title<\/h2>/);
  assert.match(html, /<h2>Section<\/h2>/);
  assert.match(html, /# Example heading/);
});

test('technical tables and direct source links render as semantic HTML', () => {
  const html = render('## Parameters\n\n| Cell | Voltage |\n| --- | --- |\n| LIR2032 | 4.20 V |\n\n[Source](https://www.eemb.com/product-9)');
  assert.match(html, /<h2>Parameters<\/h2>/);
  assert.match(html, /class="markdown-table-wrapper"><table>/);
  assert.match(html, /<th>Voltage<\/th>/);
  assert.match(html, /<td>4.20 V<\/td>/);
  assert.match(html, /href="https:\/\/www.eemb.com\/product-9"/);
});

test('multiline warnings are highlighted while fenced examples stay literal', () => {
  const html = render('> [!WARNING]\n> Never recharge **CR2032**.\n> Check 4.20 V limits.\n\n```text\n> [!WARNING]\n**literal** <tag>\n```');
  assert.match(html, /<blockquote class="article-warning">/);
  assert.match(html, /⚠ WARNING: Never recharge <strong>CR2032<\/strong>/);
  assert.match(html, /&gt; \[!WARNING\]\n\*\*literal\*\* &lt;tag&gt;/);
});

test('untrusted HTML and unsafe link schemes cannot execute', () => {
  const html = render('<script>alert(1)</script>\n\n<img src=x onerror=alert(2)>\n\n[bad](javascript:alert%281%29)\n\n[Inquiry](/#contact)');
  assert.doesNotMatch(html, /<script|<img|onerror=|href="javascript:/);
  assert.match(html, /href="\/#contact"/);
});
