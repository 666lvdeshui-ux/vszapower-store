import { notFound, permanentRedirect } from 'next/navigation';
import CenterPage from '@/components/compliance/CenterPage';
import { complianceLocales, isComplianceLocale } from '@/lib/complianceLocale';
import { centerMetadata } from '@/lib/complianceCenterMetadata';
export const dynamicParams=false;
export function generateStaticParams(){return complianceLocales.map(locale=>({locale}));}
export async function generateMetadata({params}:{params:{locale:string}}){if(!isComplianceLocale(params.locale))return {};return centerMetadata(params.locale);}
export default function Page({params}:{params:{locale:string}}){if(!isComplianceLocale(params.locale))notFound();if(params.locale==='en')permanentRedirect('/compliance');return <CenterPage locale={params.locale}/>;}
