import CenterPage from '@/components/compliance/CenterPage';
import { centerMetadata } from '@/lib/complianceCenterMetadata';
export function generateMetadata(){return centerMetadata('en');}
export default function Page(){return <CenterPage/>;}
