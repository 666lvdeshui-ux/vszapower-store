import assert from 'node:assert/strict';
import fs from 'node:fs';
const base=process.argv[2]||'http://localhost:3101';
const locales=fs.readdirSync('content/compliance/locales').map(x=>x.replace('.json',''));
for(const locale of locales){
 const path=locale==='en'?'/compliance':`/${locale}/compliance`;
 const res=await fetch(base+path),html=await res.text();assert.equal(res.status,200,path);
 const copy=JSON.parse(fs.readFileSync(`content/compliance/locales/${locale}.json`,'utf8'));
 assert(html.includes(copy.title),path+' translated H1');assert(html.includes('href="https://www.vszapower.com'+path+'"'),path+' canonical');assert.equal((html.match(/<h1[ >]/g)||[]).length,1,path+' H1');
 assert(html.includes(`lang="${locale}"`));
 for(const l of locales)assert(html.includes(`hrefLang="${l}"`)||html.includes(`hreflang="${l}"`),path+' alternate '+l);
 for(const report of ['A2601422-C01-R01','A2605238-C01-R01','A2607200-C01-R01'])assert(html.includes(report),path+report);
 for(const model of ['LIR2032','LIR2016','LIR2025','LIR2450','ML2032'])assert(html.includes(model));
 const schemas=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));assert(schemas.some(s=>s['@graph']?.some(n=>n.inLanguage===locale)));
}
assert.equal((await fetch(base+'/xx/compliance')).status,404);
const sitemap=await (await fetch(base+'/sitemap.xml')).text();for(const l of locales)assert(sitemap.includes('https://www.vszapower.com'+(l==='en'?'/compliance':`/${l}/compliance`)));
console.log('PASS: 14 localized server-rendered centers, canonical/hreflang/schema, report and battery IDs, sitemap and unknown-locale 404.');
