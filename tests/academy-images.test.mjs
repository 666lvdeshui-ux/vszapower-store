import fs from 'node:fs';
import test from 'node:test';
import assert from 'node:assert/strict';
import ts from 'typescript';
const compile = path => ts.transpileModule(fs.readFileSync(path, 'utf8'), {compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const load = source => import('data:text/javascript;base64,' + Buffer.from(source).toString('base64'));
const {imageIdentity, validateAcademyImage} = await load(compile('lib/academyImageValidation.ts'));
const covers = JSON.parse(fs.readFileSync('content/battery-academy/image-covers.json', 'utf8'));
const imageModule = compile('lib/academyImages.ts').replace(/^import covers .*;$/m, `const covers = ${JSON.stringify(covers)};`);
const {academyImageAlt, academyImageSources, academyImageCaption} = await load(imageModule);
const a = {id:'a',slug:'a',title:'A',cover_image:'/academy/images/example.webp',published:true};

test('rejects repeated covers including domain aliases and resize parameters',()=>{
 const b={...a,id:'b',slug:'b',cover_image:'https://vszapower.com/academy/images/example.webp?w=600&q=80#crop'};
 assert.throws(()=>validateAcademyImage(b,[a]),/Cover already used/);
 assert.equal(imageIdentity(a.cover_image),imageIdentity(b.cover_image));
});
test('allows editing the same article, unique images and unfinished drafts',()=>{
 assert.doesNotThrow(()=>validateAcademyImage(a,[a]));
 assert.doesNotThrow(()=>validateAcademyImage({...a,id:'b',slug:'b',cover_image:'/different.webp'},[a]));
 assert.doesNotThrow(()=>validateAcademyImage({...a,published:false,cover_image:''},[a]));
 assert.throws(()=>validateAcademyImage({...a,cover_image:''},[]),/unique article cover/);
});
test('preserves identity-bearing URL query parameters',()=>{
 assert.notEqual(imageIdentity('https://example.com/image?id=1'),imageIdentity('https://example.com/image?id=2'));
});
test('image descriptions and thumbnails follow the selected asset, not stale slug metadata',()=>{
 const concept=covers.find(x=>x.kind==='concept');const p={slug:concept.slug,cover_image:'https://www.vszapower.com'+concept.file};
 assert.equal(academyImageAlt(p,'zh-CN','fallback'),concept.alt.zh);
 assert.match(academyImageSources(p),/512w.*1280w/);
 assert.match(academyImageCaption(p,'de'),/KI/);
 const changed={...p,cover_image:'/admin-replacement.jpg'};
 assert.equal(academyImageAlt(changed,'en','replacement'), 'replacement');
 assert.equal(academyImageSources(changed),undefined);
 assert.equal(academyImageCaption(changed,'en'),null);
});
