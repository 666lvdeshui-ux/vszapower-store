import copy from '@/content/compliance/copy.json';
import { pageMetadata } from '@/lib/compliance';
import EditorialPage from '@/components/compliance/EditorialPage';
const content=copy.manufacturer;
export const metadata=pageMetadata(content.Title,content['Meta description'],'/coin-cell-charger-manufacturer');
export default function Page(){return <EditorialPage kind="manufacturer"/>;}
