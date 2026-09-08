import fs from 'node:fs';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import ts from 'typescript';

const manifest = JSON.parse(fs.readFileSync('content/battery-academy/image-manifest.json', 'utf8'));
const hashes = new Set(), files = new Set(), slugs = new Set();
let totalBytes = 0;
for (const entry of manifest.entries) {
  assert(!slugs.has(entry.slug), `Duplicate article: ${entry.slug}`); slugs.add(entry.slug);
  assert(!files.has(entry.file), `Reused cover: ${entry.file}`); files.add(entry.file);
  const data = fs.readFileSync('public' + entry.file);
  const hash = createHash('sha256').update(data).digest('hex');
  assert(!hashes.has(hash), `Identical image bytes: ${entry.file}`); hashes.add(hash);
  assert(data.length < 300_000, `Oversized cover: ${entry.file}`);
  assert(fs.existsSync('public' + entry.file.replace('.webp', '-small.webp')), 'Missing thumbnail');
  assert(entry.alt.en && entry.alt.zh && entry.source, 'Missing image description/provenance');
  if (entry.kind === 'concept') assert(entry.generatedFile && entry.scene, 'Missing generation record');
  else if (entry.kind === 'owned-product-scene') {
    assert(entry.sourceAsset && entry.sourceSha256 && entry.generatedFile && entry.editPrompt, 'Scene requires an owner reference and edit provenance');
    assert(fs.existsSync('public' + entry.file.replace('.webp', '-card.webp')) && fs.existsSync('public' + entry.file.replace('.webp', '-card-small.webp')), 'Missing complete-product scene thumbnails');
  }
  else {
    assert(entry.sourceAsset && !entry.generatedFile, 'Product image must come from the owner');
    assert(fs.existsSync('public' + entry.file.replace('.webp', '-card.webp')), 'Missing uncropped product card');
  }
  totalBytes += data.length;
}
// Include fallback routes, which are absent from the database API.
const source = fs.readFileSync('lib/supabase.ts', 'utf8');
const ast = ts.createSourceFile('supabase.ts', source, ts.ScriptTarget.Latest, true);
function walk(n) {
  if (ts.isVariableDeclaration(n) && n.name.getText(ast) === 'MOCK_POSTS') {
    for (const obj of n.initializer.elements) {
      const get = name => obj.properties.find(p => p.name?.getText(ast) === name)?.initializer.text;
      const entry = manifest.entries.find(e => e.slug === get('slug'));
      assert(entry && get('cover_image') === 'https://www.vszapower.com' + entry.file, `Unallocated fallback: ${get('slug')}`);
    }
  }
  ts.forEachChild(n, walk);
}
walk(ast);
console.log(JSON.stringify({articles: slugs.size, uniqueImages: hashes.size, totalBytes, meanBytes: Math.round(totalBytes/slugs.size)}, null, 2));
