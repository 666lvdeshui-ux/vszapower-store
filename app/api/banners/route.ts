import { NextResponse } from 'next/server';
import { fetchAllBanners, saveBanner, removeBanner } from '@/lib/store';

export async function GET() {
  const banners = await fetchAllBanners();
  return NextResponse.json(banners);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const saved = await saveBanner(body);
    return NextResponse.json(saved);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save banner' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Missing banner ID' }, { status: 400 });
    }
    const success = await removeBanner(id);
    return NextResponse.json({ success });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete banner' }, { status: 500 });
  }
}
