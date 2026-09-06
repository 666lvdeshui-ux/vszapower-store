'use client';
import { useState } from 'react';
import Link from 'next/link';
import { products } from '@/lib/compliance';
import type { CenterCopy } from '@/lib/complianceLocale';
export default function CenterSearch({copy:c}:{copy:CenterCopy}) {
 const [query,setQuery]=useState(''); const names=[c.single,c.square,c.dual];
 const results=products.filter((p,i)=>[p.model,p.design,names[i],p.reportSeries,...p.documents.map(d=>d.number)].join(' ').toLowerCase().includes(query.trim().toLowerCase()));
 return <><div className="evidence-search"><label htmlFor="model-search">{c.search}</label><div><input id="model-search" type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="VZ002 / A2601422"/><button type="button" onClick={()=>setQuery('')}>{c.clear}</button></div></div><p role="status" className="evidence-small">{c.designs}: {results.length}</p><div className="evidence-grid">{results.map(p=><article className="evidence-card" key={p.id}><figure className="evidence-sample"><img src={p.image} alt={`${p.model} — ${names[products.indexOf(p)]} — ${p.reportSeries}`} width="800" height="600" loading="lazy"/><figcaption>{c.sample} · <bdi>{p.reportSeries}</bdi></figcaption></figure><h3><bdi>{p.model}</bdi><span>{names[products.indexOf(p)]}</span></h3><dl>{p.documents.filter(d=>d.documentType!=='Verification of Conformity').map(d=><div key={d.id}><dt>{d.documentType.includes('EMC')?c.emc:c.rohs}</dt><dd><bdi>{d.number}</bdi><br/><time dateTime={d.issueDate}>{d.issueDate}</time></dd></div>)}</dl><p className="evidence-small" dir="ltr">{p.documents[0].standards.join(' · ')}</p><Link href={p.path} className="evidence-link" hrefLang="en">{c.details} →</Link></article>)}</div>{results.length===0&&<p>{c.noResults}</p>}</>;
}
