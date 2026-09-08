'use client';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import type { VideoItem } from '@/lib/store';
import { localizedVideo, videoCopy, videoInfo, videoPath } from '@/lib/videoLibrary';
export default function VideoWatchClient({video, related}:{video:VideoItem;related:VideoItem[]}){
 const {lang}=useLanguage(),copy=videoCopy(lang),text=localizedVideo(video,lang),info=videoInfo(video),zh=lang.startsWith('zh');
 const ml=info?.models.includes('ML2032');
 return <article style={{maxWidth:1100,margin:'0 auto',padding:'48px 24px 80px'}}>
  <Link href="/videos" style={{color:'var(--accent-green)'}}>← {copy.title}</Link>
  <h1 style={{fontFamily:'var(--font-heading)',fontSize:'clamp(1.8rem,4vw,2.8rem)',lineHeight:1.2,margin:'24px 0 16px'}}>{text.title}</h1>
  <p style={{color:'var(--text-muted)',lineHeight:1.7,marginBottom:20}}>{text.description}</p>
  {ml&&<div className="glass-panel" style={{padding:20,borderRadius:12,border:'1px solid #b98a2c',marginBottom:20,lineHeight:1.7}}>{zh?'ML2032 需使用与其规格匹配的充电电压和限流。本片没有展示或验证充电电路参数，不能据此使用 4.2V LIR 充电器为 ML2032 充电。请先确认专用配置。':'ML2032 needs its specified charging voltage and current limit. This footage does not demonstrate or verify the charging circuit parameters. Do not use it as a basis for charging ML2032 with a 4.2V LIR charger. Confirm the dedicated configuration first.'}</div>}
  <video key={video.video_url} controls playsInline preload="none" poster={video.poster_url} src={video.video_url} aria-label={text.title} style={{display:'block',width:'100%',height:'min(68vh,720px)',objectFit:'contain',background:'#070a10',borderRadius:16,border:'1px solid var(--border-color)'}}/>
  <p style={{color:'var(--text-muted)',margin:'12px 0 24px',fontSize:'.9rem'}}>{video.duration}{info?` · ${copy.audio}: ${info.language==='zh'?'中文':'English'}`:''}{info?.edited?` · ${copy.edited}`:''}</p>
  <div className="glass-panel" style={{padding:24,borderRadius:16,lineHeight:1.8}}>
   <p>{copy.safety}</p>
   <p style={{color:'var(--text-muted)',marginTop:12}}>{zh?'这是产品演示素材。原声中的充满时间、循环寿命、包装性能或设备兼容说法，不应当作独立测试结论或对所有配置的保证。':'This is product demonstration footage. Narrated charging times, cycle life, packaging performance and device compatibility are not independent test results or guarantees for every configuration.'}</p>
   {info?.category==='legacy'&&<p style={{marginTop:12}}>{zh?'本片为老款卡槽结构，使用红/绿灯；请勿套用新款夹式充电器的红/蓝灯说明。':'This legacy slot design uses red/green indicators. Its light states differ from the newer red/blue clip charger.'}</p>}
   <div style={{display:'flex',gap:12,flexWrap:'wrap',marginTop:20}}><Link className="btn-secondary" href="/compliance">{zh?'型号合规资料':'Model documentation'}</Link><Link className="btn-secondary" href="/#contact">{zh?'联系咨询':'Contact us'}</Link><Link className="btn-secondary" href="/academy">{zh?'电池学院':'Battery Academy'}</Link></div>
  </div>
  {!!related.length&&<nav style={{marginTop:32}} aria-label={copy.viewAll}><h2 style={{fontSize:'1.3rem',marginBottom:16}}>{zh?'相关视频':'Related videos'}</h2><ul style={{paddingLeft:20,lineHeight:2}}>{related.map(v=><li key={v.id}><Link href={videoPath(v)} style={{color:'var(--accent-green)'}}>{localizedVideo(v,lang).title}</Link></li>)}</ul></nav>}
 </article>;
}
