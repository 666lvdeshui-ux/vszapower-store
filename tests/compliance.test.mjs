import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const data=JSON.parse(fs.readFileSync('content/compliance/public.json','utf8'));
test('two VZ002 designs retain separate reports, standards and dates',()=>{
 const [a,b,c]=data.products; assert.equal(data.products.length,3);assert.equal(data.products.filter(p=>p.model==='VZ002').length,2);
 for(const p of data.products){assert.equal(p.documents.length,3);assert(p.documents.every(d=>d.number.startsWith(p.reportSeries)));assert(p.documents.every(d=>d.downloadUrl===null));}
 assert.deepEqual(a.documents.map(d=>d.issueDate),['2026-03-02','2026-03-02','2026-04-02']);
 assert.deepEqual(b.documents.map(d=>d.issueDate),['2026-06-01','2026-06-01','2026-05-27']);
 assert.deepEqual(c.documents.map(d=>d.issueDate),['2026-07-30','2026-07-30','2026-07-31']);
 assert.notDeepEqual(a.documents[0].standards,c.documents[0].standards);
});
test('public data contains no private inventory or unpublished battery evidence',()=>{
 const text=JSON.stringify(data);assert(!/ET-260|WCT-|WTC-|RED2|gmail|phone|signature|sourcePath|sourceLevel|supply/i.test(text));assert(data.products.every(p=>p.path.startsWith('/compliance/chargers/')));
 const source=fs.readFileSync('components/compliance/BatteryDocumentation.tsx','utf8');for(const model of ['LIR2032','LIR2016','LIR2025','LIR2450','ML2032'])assert(source.includes(model));
});
async function inquiryHandler(fails=false){
 const source=fs.readFileSync('app/api/inquiries/route.ts','utf8');const post=source.slice(source.indexOf('const recentRequests'),source.indexOf('export async function PATCH'));
 const code=ts.transpileModule(post,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}}).outputText;
 return import('data:text/javascript;base64,'+Buffer.from(`const NextResponse={json:(body,options)=>Response.json(body,options)};const saveInquiry=async input=>{${fails?"throw Error('storage unavailable')":"return {id:'saved-id'}"}};${code}`).toString('base64'));
}
test('inquiry acknowledges durable save and reports storage failure',async()=>{
 const req=()=>new Request('http://localhost/api/inquiries',{method:'POST',headers:{origin:'http://localhost'},body:JSON.stringify({contact:'buyer@example.invalid',product:'VZ002 single-slot',message:'Test'})});
 const good=await inquiryHandler();const res=await good.POST(req());assert.equal(res.status,200);assert.deepEqual(await res.json(),{success:true,id:'saved-id'});
 const bad=await inquiryHandler(true);const err=await bad.POST(req());assert.equal(err.status,503);assert.equal((await err.json()).success,undefined);
});
test('inquiry rejects empty contact, honeypot, oversized input and cross-origin submissions',async()=>{
 const {POST}=await inquiryHandler();for(const [body,origin,status] of [[{},'http://localhost',400],[{contact:'x',website:'spam'},'http://localhost',400],[{contact:'x',message:'x'.repeat(13000)},'http://localhost',413],[{contact:'x'},'https://unrelated.invalid',403]]){const r=await POST(new Request('http://localhost/api/inquiries',{method:'POST',headers:{origin},body:JSON.stringify(body)}));assert.equal(r.status,status);}
});
