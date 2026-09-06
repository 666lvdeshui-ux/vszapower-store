import copy from '@/content/compliance/copy.json';
import { pageMetadata } from '@/lib/compliance';
import EditorialPage from '@/components/compliance/EditorialPage';
const content=copy.about;
export const metadata=pageMetadata(content.Title,content['Meta description'],'/about-vszapower');
export default function Page(){return <EditorialPage kind="about"/>;}
