import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const group=JSON.parse(fs.readFileSync('content/reviews/temu-606258002264728.json','utf8'));
const en=JSON.parse(fs.readFileSync('content/compliance/locales/en.json','utf8'));
test('all 14 locales cover the same UI and five scope questions',()=>{
 const locales=fs.readdirSync('content/compliance/locales').filter(p=>p.endsWith('.json'));assert.equal(locales.length,14);
 for(const file of locales){const c=JSON.parse(fs.readFileSync('content/compliance/locales/'+file,'utf8'));assert.deepEqual(Object.keys(c).sort(),Object.keys(en).sort(),file);assert.equal(c.questions.length,5);assert.equal(c.answers.length,5);for(const model of ['LIR2032','LIR2016','LIR2025','LIR2450','ML2032'])assert(c.batteryText.includes(model),file+model);if(file!=='en.json')assert.notEqual(c.lead,en.lead);}
});
test('shared charger reviews are capped at 50 and hidden products emit no ratings',async()=>{
 const source=fs.readFileSync('lib/productReviews.ts','utf8').replace(/^import .*$/mg,'');
 const code=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
 const {applyReviewDisplay}=await import('data:text/javascript;base64,'+Buffer.from('const group='+JSON.stringify(group)+';'+code).toString('base64'));
 assert.equal(group.reviews.length,50);assert.equal(new Set(group.reviews.map(r=>r.id)).size,50);
 for(const id of ['prod_1785144575937','prod_1785382687464','prod_1785382945991'])assert.equal(applyReviewDisplay({id,show_reviews:true,review_group:group.id}).reviews.length,50);
 const hidden=applyReviewDisplay({show_reviews:false,review_group:group.id,rating:5,reviews:group.reviews});assert.equal(hidden.reviews.length,0);assert.equal(hidden.rating,undefined);assert.equal(hidden.review_count,undefined);
});
test('saving products persists explicit review toggles and preserves omitted settings',async()=>{
 const source=fs.readFileSync('lib/store.ts','utf8');
 const fn=source.slice(source.indexOf('export async function saveProduct('),source.indexOf('export async function removeProduct('));
 const code=ts.transpileModule(fn,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
 const harness=`let written;const previous={show_reviews:true,review_group:'temu-606258002264728',translations:{de:{title:'Erhalten'}}};const database={from:()=>({select:()=>({eq:()=>({maybeSingle:async()=>({data:previous})})}),upsert:async p=>{written=p;return {};}})};const productsCache=[];const deletedProductIds=new Set();const removeDeletedProductId=()=>{};const normalizeProductTranslations=v=>v;const saveProductsToFile=()=>{};export const getWritten=()=>written;`;
 const m=await import('data:text/javascript;base64,'+Buffer.from(harness+code).toString('base64'));
 await m.saveProduct({id:'existing',title:'Charger',show_reviews:false});assert.equal(m.getWritten().show_reviews,false);assert.equal(m.getWritten().review_group,previousGroup());assert.equal(m.getWritten().translations.de.title,'Erhalten');
 await m.saveProduct({id:'existing',title:'Charger'});assert.equal(m.getWritten().show_reviews,true);
 function previousGroup(){return 'temu-606258002264728';}
});
