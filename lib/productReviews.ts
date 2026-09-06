import group from '@/content/reviews/temu-606258002264728.json';
import type { ProductItem, ReviewItem } from './store';
export function applyReviewDisplay(product:ProductItem):ProductItem {
 if(product.show_reviews!==true)return {...product,show_reviews:false,rating:undefined,review_count:undefined,reviews:[]};
 if(product.review_group===group.id)return {...product,rating:group.rating,review_count:group.totalCount,temu_link:group.sourceUrl,reviews:group.reviews.slice(0,50) as ReviewItem[]};
 return {...product,reviews:(product.reviews||[]).slice(0,50)};
}
