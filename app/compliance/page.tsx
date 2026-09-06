import copy from '@/content/compliance/copy.json';
import { pageMetadata } from '@/lib/compliance';
import EditorialPage from '@/components/compliance/EditorialPage';
const content=copy.center;
export const metadata=pageMetadata(content.Title,content['Meta description'],'/compliance');
export default function Page(){return <EditorialPage kind="center"/>;}
