import { NextResponse } from 'next/server';
import { isAdminRequest, unauthorizedResponse } from '@/lib/adminAuth';
import { fetchOEMHeroMedia, saveOEMHeroMedia } from '@/lib/store';

export const dynamic = 'force-dynamic';

export async function GET() {
  const settings = await fetchOEMHeroMedia();
  return NextResponse.json(settings);
}

export async function POST(request: Request) {
  if (!isAdminRequest(request)) return unauthorizedResponse();
  try {
    const body = await request.json();
    const saved = await saveOEMHeroMedia(body);
    return NextResponse.json(saved);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save OEM hero media settings' }, { status: 500 });
  }
}
