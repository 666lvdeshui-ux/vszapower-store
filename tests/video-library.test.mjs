import fs from 'node:fs';
import test from 'node:test';
import assert from 'node:assert/strict';
import ts from 'typescript';
const footage=JSON.parse(fs.readFileSync('content/video-library/public.json','utf8'));
const source=ts.transpileModule(fs.readFileSync('lib/videoLibrary.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText.replace(/^import footage .*;$/m,`const footage=${JSON.stringify(footage)};`);
const {videoSchema,localizedVideo,videoInfo,videoCopy}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
test('all 31 public videos have uploaded media and valid nonfuture watch-page schema',()=>{
 assert.equal(footage.length,31);assert.equal(new Set(footage.map(v=>v.id)).size,31);
 for(const v of footage){
  const schema=videoSchema(v);assert.ok(schema);assert.ok(v.durationSeconds>0);
  assert.match(v.video_url,/^https:\/\/opvfguxhmgxrgufyedlh.supabase.co\/storage\/v1\/object\/public\/product-media\/videos\//);
  assert.ok(Date.parse(schema.uploadDate)<=Date.now());
  assert.ok(footage.some(x=>x.id===v.canonicalId));
 }
});
test('admin replacement does not retain stale duration or translated content',()=>{
 const v=footage[0];const changed={...v,video_url:'https://example.com/replacement.mp4',title:'Replacement'};
 assert.equal(videoInfo(changed),undefined);assert.equal(videoSchema(changed),null);
 assert.equal(localizedVideo(changed,'zh_CN').title,'Replacement');
 assert.equal(localizedVideo({...v,title:'New title'},'zh_CN').title,'New title');
});
test('primary cells and ML2032 cannot inherit general LIR charging claims',()=>{
 for(const v of footage.filter(v=>v.category==='primary'))assert.match(v.description,/must not be recharged/);
 const ml=footage.find(v=>v.models.includes('ML2032'));assert.match(ml.description,/requires confirmation/);
});
test('video library UI covers all storefront languages',()=>{
 for(const lang of ['en','de','ja','es','ko','he','ar','fr','pt','ru','vi','zh_CN','zh_HK','zh_TW']){
  assert.ok(videoCopy(lang).safety);if(lang!=='en')assert.notEqual(videoCopy(lang).title,videoCopy('en').title);
 }
});
