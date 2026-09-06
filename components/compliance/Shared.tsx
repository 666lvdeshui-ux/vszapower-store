import Link from 'next/link';
import type { ReactNode } from 'react';
import { compliance, origin, companyId, type ComplianceProduct } from '@/lib/compliance';
export function PageIntro({title, lead, children}: {title:string;lead:string;children?:ReactNode}) {
 return <header className="evidence-intro"><span className="evidence-eyebrow">VSZAPOWER / PRODUCT DOCUMENTATION</span><h1>{title}</h1><p>{lead}</p>{children}</header>;
}
export function ScopeNote() { return <aside className="evidence-note"><strong>Sample-specific evidence</strong><p>{compliance.summaryNotice}</p></aside>; }
export function RelatedLinks() { return <nav className="evidence-related" aria-label="Related pages"><Link href="/compliance">Compliance Center</Link><Link href="/about-vszapower">About VSZAPOWER</Link><Link href="/coin-cell-charger-manufacturer">Coin Cell Charger Manufacturer</Link><Link href="/academy">Battery Academy</Link><Link href="/#products?cat=charger">Charger catalog</Link></nav>; }
export function PageSchema({title,path,type='WebPage',product}: {title:string;path:string;type?:string;product?:ComplianceProduct}) {
 const url=origin+path;
 const graph: object[]=[{'@type':type,'@id':url+'#webpage',url,name:title,inLanguage:'en',dateModified:compliance.contentReviewedAt,isPartOf:{'@id':origin+'/#website'},publisher:{'@id':companyId}}, {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:origin},...(product?[{'@type':'ListItem',position:2,name:'Compliance Center',item:origin+'/compliance'}]:[]),{'@type':'ListItem',position:product?3:2,name:title,item:url}]}];
 if(product) graph.push({'@type':'Product','@id':url+'#product',name:product.model+' '+product.design,model:product.model,productID:product.id,url,brand:{'@id':origin+'/#brand'},manufacturer:{'@id':companyId},description:`${product.design}; report series ${product.reportSeries}. Evidence applies to the identified sample and tests.`});
 return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@graph':graph}).replace(/</g,'\\u003c')}}/>;
}
export function EvidenceTable({product}: {product:ComplianceProduct}) {
 return <div className="evidence-table-wrap" tabIndex={0} role="region" aria-label="Test documentation table"><table className="evidence-table"><caption>{product.model} · {product.design} — report references</caption><thead><tr>{['Document / number','Laboratory / issue date','Standards and scope','Recorded result'].map(x=><th scope="col" key={x}>{x}</th>)}</tr></thead><tbody>{product.documents.map(d=><tr key={d.id}><th scope="row">{d.documentType}<br/><span className="report-number">{d.number}</span></th><td>{d.laboratory}<br/><time dateTime={d.issueDate}>{d.issueDate}</time></td><td>{d.standards.join('; ')}<p>{d.scope}</p></td><td>{d.recordedResult}</td></tr>)}</tbody></table></div>;
}
export function ProductCard({product:p}: {product:ComplianceProduct}) {
 return <article className="evidence-card"><figure className="evidence-sample"><img src={p.image} alt={`${p.model} ${p.design} test sample, ${p.reportSeries}`} loading="lazy" width="800" height="600"/><figcaption>Test sample · {p.reportSeries}</figcaption></figure><span className="evidence-eyebrow">{p.reportSeries}</span><h3>{p.model}<span>{p.design}</span></h3><p>{p.id==='vz002-single-slot'?'Elongated single-slot design':p.id==='vszapower-002'?'Square single-slot design':'Rectangular dual-slot design'} · DC 5V input</p><dl>{p.documents.filter(d=>d.documentType!=='Verification of Conformity').map(d=><div key={d.id}><dt>{d.documentType}</dt><dd>{d.number}<br/><time dateTime={d.issueDate}>{d.issueDate}</time></dd></div>)}</dl><p className="evidence-small">{p.documents[0].standards.join(' · ')}</p><Link className="evidence-link" href={p.path}>View test summary →</Link></article>;
}
