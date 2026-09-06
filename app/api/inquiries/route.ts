import { NextResponse } from 'next/server';
import { isAdminRequest, unauthorizedResponse } from '@/lib/adminAuth';
import { fetchAllInquiries, saveInquiry, removeInquiry, updateInquiryStatus, InquiryItem } from '@/lib/store';
import fs from 'fs';
import path from 'path';

const INQUIRIES_FILE = path.join('/tmp', 'vszapower_inquiries.json');

function getStoredInquiries(): InquiryItem[] {
  try {
    if (fs.existsSync(INQUIRIES_FILE)) {
      const data = fs.readFileSync(INQUIRIES_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {}
  return [];
}

function persistInquiries(list: InquiryItem[]) {
  try {
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(list, null, 2), 'utf-8');
  } catch (e) {}
}

export async function GET(request: Request) {
  if (!isAdminRequest(request)) return unauthorizedResponse();
  const storeInquiries = await fetchAllInquiries();
  const fileInquiries = getStoredInquiries();

  // Merge by ID
  const map = new Map<string, InquiryItem>();
  storeInquiries.forEach(item => map.set(item.id, item));
  fileInquiries.forEach(item => map.set(item.id, item));

  const inquiries = Array.from(map.values()).sort((a, b) => {
    return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
  });

  // Calculate today's inquiry count
  const todayStr = new Date().toISOString().split('T')[0];
  const todayInquiries = inquiries.filter(item => {
    if (!item.created_at) return false;
    return item.created_at.startsWith(todayStr);
  });

  return NextResponse.json({
    inquiries,
    totalCount: inquiries.length,
    todayCount: todayInquiries.length,
    pendingCount: inquiries.filter(i => i.status === 'new').length,
  });
}

const recentRequests = new Map<string, number[]>();
export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin && origin !== 'https://www.vszapower.com') return NextResponse.json({error:'Invalid origin'}, {status:403});
  try {
    const raw = await request.text();
    if (raw.length > 12000) return NextResponse.json({error:'Request too large'}, {status:413});
    const body = JSON.parse(raw);
    if (!body || typeof body !== 'object' || body.website) return NextResponse.json({error:'Invalid request'}, {status:400});
    const fields = ['name','contact','company','country','product','message'] as const;
    if (fields.some(k => body[k] !== undefined && (typeof body[k] !== 'string' || body[k].length > (k === 'message' ? 5000 : 600))) || !body.contact?.trim()) return NextResponse.json({error:'Valid contact details are required'}, {status:400});
    const now = Date.now();
    recentRequests.forEach((times,key) => { if (!times.some(t=>now-t<60000)) recentRequests.delete(key); });
    const key = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
    const times = (recentRequests.get(key)||[]).filter(t=>now-t<60000);
    if(times.length >= 5) return NextResponse.json({error:'Please try again in a minute'}, {status:429,headers:{'Retry-After':'60'}});
    recentRequests.set(key,[...times,now]);
    const input = Object.fromEntries(fields.map(k=>[k,typeof body[k]==='string'?body[k].trim():'']));
    // Durable storage must succeed before acknowledging receipt.
    const saved = await saveInquiry({...input, message: [input.company && `Company: ${input.company}`, input.message].filter(Boolean).join('\n')});
    return NextResponse.json({success:true,id:saved.id});
  } catch {
    return NextResponse.json({error:'Unable to save your enquiry. Please try again later.'}, {status:503});
  }
}

export async function PATCH(request: Request) {
  if (!isAdminRequest(request)) return unauthorizedResponse();
  try {
    const { id, status } = await request.json();
    if (!id || !status) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }
    const success = await updateInquiryStatus(id, status);

    const currentList = getStoredInquiries();
    const item = currentList.find(i => i.id === id);
    if (item) {
      item.status = status;
      persistInquiries(currentList);
    }

    return NextResponse.json({ success });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!isAdminRequest(request)) return unauthorizedResponse();
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }
    const success = await removeInquiry(id);

    const currentList = getStoredInquiries().filter(i => i.id !== id);
    persistInquiries(currentList);

    return NextResponse.json({ success });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete inquiry' }, { status: 500 });
  }
}
