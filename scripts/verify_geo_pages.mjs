import assert from 'node:assert/strict';
import fs from 'node:fs';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
const run=promisify(execFile);
const base=process.argv[2]||'http://localhost:3101';
const staged=process.argv.includes('--vercel');
const output=process.argv.find(x=>x.startsWith('--output='))?.slice(9);
const catalog=JSON.parse(fs.readFileSync('content/catalog/products.json'));
const evidence=JSON.parse(fs.readFileSync('content/compliance/public.json'));
const origin='https://www.vszapower.com';
async function get(path){
 if(!staged){const r=await fetch(base+path);return {status:r.status,html:await r.text(),headers:Object.fromEntries(r.headers)};}
 const {stdout}=await run('vercel',['curl',path,'--deployment',base,'--','--silent','--include'],{maxBuffer:32*1024*1024});
 const split=stdout.indexOf('\r\n\r\n');const head=stdout.slice(0,split);return {status:Number(head.match(/HTTP\/[\d.]+ (\d+)/)?.[1]),html:stdout.slice(split+4),headers:Object.fromEntries(head.split('\r\n').slice(1).map(x=>{const i=x.indexOf(':');return [x.slice(0,i).toLowerCase(),x.slice(i+1).trim()]}))};
}
const sitemap=(await get('/sitemap.xml')).html;
const robots=(await get('/robots.txt')).html;
assert(robots.includes('Sitemap: '+origin+'/sitemap.xml'));
// CDN-managed rules can target training crawlers separately from search crawlers.
// Combine matching groups, prefer specific agents, then longest path (Allow wins ties).
function canCrawl(bot,path){
 const groups=[];let group={agents:[],rules:[]};
 for(const raw of robots.split(/\r?\n/)){
  const line=raw.split('#')[0].trim();const m=line.match(/^(user-agent|allow|disallow):\s*(.*)$/i);if(!m)continue;
  const field=m[1].toLowerCase(),value=m[2].trim();
  if(field==='user-agent'){if(group.rules.length){groups.push(group);group={agents:[],rules:[]};}group.agents.push(value.toLowerCase());}
  else if(group.agents.length&&value)group.rules.push({allow:field==='allow',path:value});
 }groups.push(group);
 const exact=groups.filter(g=>g.agents.includes(bot.toLowerCase()));
 const rules=(exact.length?exact:groups.filter(g=>g.agents.includes('*'))).flatMap(g=>g.rules).filter(r=>path.startsWith(r.path)).sort((a,b)=>b.path.length-a.path.length||Number(b.allow)-Number(a.allow));
 return rules[0]?.allow??true;
}
for(const bot of ['Googlebot','Bingbot','OAI-SearchBot','ChatGPT-User','PerplexityBot'])for(const path of ['/','/compliance','/products/','/rechargeable-coin-cell-batteries','/about-vszapower','/coin-cell-charger-manufacturer'])assert(canCrawl(bot,path),bot+' '+path);
const paths=['/','/coin-cell-charger-manufacturer','/compliance','/about-vszapower','/rechargeable-coin-cell-batteries',...catalog.map(p=>'/products/'+p.slug),...evidence.products.map(p=>p.path)];
const results=[];
async function checkPage(path){
 const {status,html,headers}=await get(path);assert.equal(status,200,path);
 if(!staged)assert(!/noindex/i.test(headers['x-robots-tag']||''),path+' header indexability');
 assert(!/<meta[^>]+(?:name="robots"[^>]+content="[^"]*noindex|content="[^"]*noindex[^>]+name="robots")/i.test(html),path+' robots meta');
 const body=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'');
 const main=body.match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1]||'';assert(!/[\u3400-\u9fff]/.test(main.replace(/<(h5|p)[^>]*data-user-content="review"[^>]*>[\s\S]*?<\/\1>/g,'').replace(/<nav class="evidence-languages"[^>]*>[\s\S]*?<\/nav>/g,'').replace(/<[^>]+>/g,'')),path+' English core content');
 const h1=[...body.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)];assert.equal(h1.length,1,path+' one H1');
 const title=html.match(/<title>([\s\S]*?)<\/title>/)?.[1];assert(title,path+' title');
 const meta=html.match(/<meta name="description" content="([^"]+)"/);assert(meta,path+' description');
 const canonical=html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];assert.equal(canonical?.replace(/\/$/,''),(origin+path).replace(/\/$/,''),path+' canonical');
 assert(sitemap.includes(origin+(path==='/'?'':path)),path+' sitemap');
 const schemas=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(x=>JSON.parse(x[1])).flatMap(x=>x['@graph']||[x]);
 const org=schemas.find(x=>x['@type']==='Organization');assert.equal(org.name,'VSZAPOWER');assert.equal(org.legalName,'Shenzhen Weizan Technology Co., Ltd.');
 assert(!/aggregateRating|AggregateRating/.test(html));
 assert(!/ET-260|WCT-260|LIR2023|45mAh/.test(body),path+' report boundary');
 assert(!/Verified Reviews|Verified purchase|authentic verified|4\.93\/5|1,480/.test(body),path+' unsupported trust claim');
 assert(body.includes('href="/compliance"')&&body.includes('href="/about-vszapower"'),path+' navigation');
 const p=catalog.find(p=>'/products/'+p.slug===path);
 if(p){assert(schemas.some(x=>x['@type']==='Product'));for(const section of ['Specifications','Applications','Compliance documentation','OEM / Private Label','Frequently asked questions','Related Battery Academy articles'])assert(body.includes(section),path+' '+section);assert(body.includes('Confirm the supported battery model before use.'));if(p.kind==='battery'){assert(!body.includes('Listing rating:'));assert(body.includes(p.specs.capacity));}else{const e=evidence.products.find(x=>x.id===p.complianceId);for(const d of e.documents)assert(body.includes(d.number));}}
 else assert(!schemas.some(x=>x['@type']==='Product'),path+' Product scope');
 if(path==='/'){for(const p of catalog)assert(body.includes('href="/products/'+p.slug+'"'),p.model+' SSR link');assert(body.includes('32mAh'));}
 results.push({path,status,title,h1:h1[0][1].replace(/<[^>]+>/g,''),description:meta[1],canonical,bytes:Buffer.byteLength(html)});console.log('PASS',path);
}
for(let i=0;i<paths.length;i+=4){const batch=await Promise.allSettled(paths.slice(i,i+4).map(checkPage));for(const r of batch)if(r.status==='rejected')throw r.reason;}
assert.equal((await get('/products/not-a-real-product')).status,404);
if(output)fs.writeFileSync(output,JSON.stringify({checkedAt:new Date().toISOString(),base,results,robots},null,2));
console.log(`PASS: ${results.length} core pages, model-specific evidence, SSR, schemas, metadata, sitemap, robots and unknown-product 404.`);
