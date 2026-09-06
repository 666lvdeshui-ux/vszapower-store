 'use client';
import { useState } from 'react';
import { products } from '@/lib/compliance';
import { ProductCard } from './Shared';
export default function ModelSearch(){
 const [query,setQuery]=useState(''); const q=query.trim().toLowerCase();
 const results=products.filter(p=>[p.model,p.design,p.reportSeries,...p.documents.map(d=>d.number)].join(' ').toLowerCase().includes(q));
 return <><div className="evidence-search"><label htmlFor="model-search">Search by model or report number</label><div><input id="model-search" type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="VZ002 or A2601422"/><button type="button" onClick={()=>setQuery('')}>Clear filters</button></div></div><p role="status" className="evidence-small">{results.length} charger designs</p><div className="evidence-grid">{results.map(p=><ProductCard key={p.id} product={p}/>)}</div>{results.length===0&&<p>No matching charger documentation. Check the model or request documents below.</p>}</>;
}
