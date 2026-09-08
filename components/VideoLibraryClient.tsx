'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Play, Search, ArrowRight } from 'lucide-react';
import type { VideoItem } from '@/lib/store';
import { useLanguage } from '@/context/LanguageContext';
import { localizedVideo, videoCopy, videoInfo, videoPath } from '@/lib/videoLibrary';

export function VideoCard({ video }: { video: VideoItem }) {
  const { lang } = useLanguage();
  const copy = videoCopy(lang), text = localizedVideo(video, lang), info = videoInfo(video);
  return <article className="glass-panel" style={{ borderRadius:16, overflow:'hidden', display:'flex',flexDirection:'column' }}>
    <Link href={videoPath(video)} aria-label={`${copy.watch}: ${text.title}`} style={{display:'block',position:'relative',aspectRatio:'16 / 10',flexShrink:0,overflow:'hidden',background:'#090d16'}}>
      {video.poster_url && <img src={video.poster_url} alt={text.title} loading="lazy" decoding="async" style={{display:'block',position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'contain'}} />}
      <span style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:48,height:48,borderRadius:'50%',display:'grid',placeItems:'center',background:'var(--accent-green)',color:'#061710'}}><Play size={22}/></span>
      <span style={{position:'absolute',bottom:10,right:10,borderRadius:6,padding:'3px 7px',background:'#000b',color:'#fff',fontSize:12}}>{video.duration}</span>
    </Link>
    <div style={{padding:20,display:'flex',flexDirection:'column',gap:12,flex:1}}>
      <h3 style={{fontFamily:'var(--font-heading)',fontSize:'1.1rem',lineHeight:1.4}}><Link href={videoPath(video)} style={{color:'var(--text-main)',textDecoration:'none'}}>{text.title}</Link></h3>
      <p style={{color:'var(--text-muted)',fontSize:'.9rem',lineHeight:1.6}}>{text.description}</p>
      <div style={{display:'flex',gap:6,flexWrap:'wrap',marginTop:'auto'}}>{(info?.models || video.keywords || []).slice(0,4).map(x=><span className="badge badge-green" key={x}>{x}</span>)}</div>
      {info && <small style={{color:'var(--text-muted)'}}>{copy.audio}: {info.language === 'zh' ? '中文' : 'English'}{info.edited ? ` · ${copy.edited}` : ''}</small>}
    </div>
  </article>;
}
export default function VideoLibraryClient({ videos }: { videos: VideoItem[] }) {
  const {lang}=useLanguage(); const copy=videoCopy(lang);
  const [category,setCategory]=useState('all'), [query,setQuery]=useState('');
  const categories=['all','clip','legacy','battery','primary'] as const;
  const shown=videos.filter(v=>{
    const info=videoInfo(v),text=localizedVideo(v,lang);
    return (category==='all'||info?.category===category) && `${text.title} ${text.description} ${v.keywords.join(' ')}`.toLowerCase().includes(query.trim().toLowerCase());
  });
  return <div style={{maxWidth:1280,margin:'0 auto',padding:'56px 24px 80px'}}>
    <span className="badge badge-green">VSZAPOWER</span>
    <h1 style={{fontFamily:'var(--font-heading)',fontSize:'clamp(2rem,5vw,3.4rem)',lineHeight:1.15,margin:'20px 0'}}>{copy.title}</h1>
    <p style={{color:'var(--text-muted)',fontSize:'1.05rem',lineHeight:1.7}}>{copy.intro}</p>
    <p style={{color:'var(--text-muted)',lineHeight:1.7,margin:'12px 0 28px'}}>{copy.safety}</p>
    <div className="glass-panel" style={{padding:20,borderRadius:16,marginBottom:28,display:'flex',gap:18,flexWrap:'wrap',alignItems:'center'}}>
      <label style={{display:'flex',alignItems:'center',gap:10,flex:'1 1 220px'}}><Search size={18}/><input aria-label={copy.search} placeholder={copy.search} value={query} onChange={e=>setQuery(e.target.value)} style={{width:'100%',padding:12,borderRadius:8,background:'var(--bg-card)',color:'var(--text-main)',border:'1px solid var(--border-color)'}}/></label>
      <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>{categories.map(key=><button className={category===key?'btn-primary':'btn-secondary'} style={{padding:'8px 12px',fontSize:'.85rem'}} key={key} aria-pressed={category===key} onClick={()=>setCategory(key)}>{copy[key]}</button>)}</div>
    </div>
    <p aria-live="polite" style={{color:'var(--text-muted)',marginBottom:16}}>{shown.length} / {videos.length}</p>
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,290px),1fr))',gap:24}}>{shown.map(v=><VideoCard key={v.id} video={v}/>)}</div>
    {!shown.length&&<p>{copy.empty}</p>}
    <Link href="/compliance" className="btn-secondary" style={{marginTop:32,display:'inline-flex',gap:8,alignItems:'center'}}>Compliance &amp; documentation <ArrowRight size={16}/></Link>
  </div>;
}
