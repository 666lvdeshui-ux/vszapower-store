import { NextResponse } from 'next/server';
import group from '@/content/reviews/temu-606258002264728.json';
export async function GET(){
 return NextResponse.json({success:true,meta:{scope:'Shared Temu charger-listing reviews; not model-specific battery ratings',source_url:group.sourceUrl,checked_at:group.checkedAt,average_rating:group.rating,total_reviews_count:group.totalCount,sample_reviews_count:Math.min(50,group.reviews.length),provenance:group.provenance},data:group.reviews.slice(0,50)}, {headers:{'Cache-Control':'public, s-maxage=3600','Access-Control-Allow-Origin':'*'}});
}
