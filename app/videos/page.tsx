import type { Metadata } from 'next';
import { fetchAllVideos } from '@/lib/store';
import VideoLibraryClient from '@/components/VideoLibraryClient';
export const dynamic='force-dynamic';
export const metadata:Metadata={title:'Product Video Library | VSZAPOWER Coin Cells & Chargers',description:'Watch VSZAPOWER product footage: USB clip and legacy slot chargers, LIR2016, LIR2025, LIR2450, ML2032 and primary alkaline coin cell packaging.',alternates:{canonical:'https://www.vszapower.com/videos'}};
export default async function Page(){return <VideoLibraryClient videos={await fetchAllVideos()}/>}
