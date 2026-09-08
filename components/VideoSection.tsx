'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { VideoItem } from '@/lib/store';
import { useLanguage } from '@/context/LanguageContext';
import { ownedVideos, videoCopy } from '@/lib/videoLibrary';
import { VideoCard } from './VideoLibraryClient';
export default function VideoSection({onContactClick}: {onContactClick:(productName?:string)=>void}) {
  const {lang,t}=useLanguage();const copy=videoCopy(lang);
  const [videos,setVideos]=useState<VideoItem[]>(ownedVideos);
  useEffect(()=>{fetch('/api/videos',{cache:'no-store'}).then(r=>r.json()).then(d=>{if(d.success&&Array.isArray(d.data))setVideos(d.data)}).catch(()=>{})},[]);
  const selected=['vs-20260723-01','vs-20260702-02','vs-20260702-03','vs-20260702-04','vs-20260723-14','vs-primary-01'];
  const featured=[...selected.map(id=>videos.find(v=>v.id===id)).filter((v):v is VideoItem=>!!v),...videos.filter(v=>!selected.includes(v.id))].slice(0,6);
  if(!videos.length)return null;
  return <section id="videos" style={{padding:'60px 24px',maxWidth:1280,margin:'0 auto'}}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'end',gap:20,flexWrap:'wrap',marginBottom:30}}>
      <div><span className="badge badge-gold">VSZAPOWER</span><h2 style={{fontFamily:'var(--font-heading)',fontSize:'clamp(1.8rem,3.5vw,2.5rem)',margin:'12px 0'}}>{copy.title}</h2><p style={{color:'var(--text-muted)'}}>{copy.intro}</p></div>
      <Link className="btn-secondary" href="/videos" style={{display:'inline-flex',alignItems:'center',gap:8}}>{copy.viewAll} <ArrowRight size={16}/></Link>
    </div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,290px),1fr))',gap:24}}>{featured.map(v=><VideoCard key={v.id} video={v}/>)}</div>
    <div style={{display:'flex',gap:16,flexWrap:'wrap',marginTop:24,alignItems:'center'}}><button className="btn-secondary" onClick={()=>onContactClick()}>{t('nav_contact')}</button><a href="https://www.tiktok.com/@vszapower.3c" target="_blank" rel="noopener noreferrer" style={{color:'var(--text-muted)'}}>TikTok @vszapower.3c</a></div>
  </section>;
}
