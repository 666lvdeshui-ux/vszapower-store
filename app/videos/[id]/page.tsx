import { cache } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchAllVideos } from '@/lib/store';
import { videoInfo, videoSchema } from '@/lib/videoLibrary';
import VideoWatchClient from '@/components/VideoWatchClient';
export const dynamic='force-dynamic';
const getVideos=cache(fetchAllVideos);
export async function generateMetadata({params}:{params:{id:string}}):Promise<Metadata>{
 const videos=await getVideos(),video=videos.find(v=>v.id===params.id);if(!video)return {};
 const info=videoInfo(video),canonicalId=info&&videos.some(v=>v.id===info.canonicalId)?info.canonicalId:video.id;
 return {title:`${video.title} | VSZAPOWER`,description:video.description,alternates:{canonical:`https://www.vszapower.com/videos/${encodeURIComponent(canonicalId)}`},openGraph:{title:video.title,description:video.description,images:video.poster_url?[video.poster_url]:[]}};
}
export default async function Page({params}:{params:{id:string}}){
 const videos=await getVideos(),video=videos.find(v=>v.id===params.id);if(!video)notFound();
 const info=videoInfo(video),schema=videoSchema(video);
 const related=videos.filter(v=>v.id!==video.id&&videoInfo(v)?.category===info?.category).slice(0,4);
 return <>{schema&&<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/>}<VideoWatchClient video={video} related={related}/></>;
}
