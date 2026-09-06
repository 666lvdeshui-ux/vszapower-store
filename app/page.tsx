import HomePageClient from '@/components/HomePageClient';
import { getHomepageProducts, getHomepagePosts } from '@/lib/catalogServer';
import { pageMetadata } from '@/lib/compliance';
export const dynamic = 'force-dynamic';
export const metadata = pageMetadata('Rechargeable Coin Cell Battery & Charger Manufacturer | VSZAPOWER', 'VSZAPOWER manufactures rechargeable coin cell battery and charger solutions for wholesale, OEM/ODM and private-label projects. Explore models and test documentation.', '/');
export default async function HomePage(){ return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'WebPage','@id':'https://www.vszapower.com/#webpage',url:'https://www.vszapower.com/',name:'Rechargeable Coin Cell Battery & Charger Manufacturer | VSZAPOWER',inLanguage:'en',isPartOf:{'@id':'https://www.vszapower.com/#website'},about:{'@id':'https://www.vszapower.com/#organization'}})}}/><HomePageClient initialProducts={await getHomepageProducts()} initialPosts={await getHomepagePosts()}/></>; }
