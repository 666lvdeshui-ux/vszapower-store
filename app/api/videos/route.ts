import { NextResponse } from 'next/server';
import { fetchAllVideos, saveVideo, removeVideo } from '@/lib/store';

export async function GET() {
  try {
    const data = await fetchAllVideos();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const video = await saveVideo(body);
    return NextResponse.json({ success: true, data: video });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save video' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Missing video ID' }, { status: 400 });
    }
    const success = await removeVideo(id);
    return NextResponse.json({ success });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete video' }, { status: 500 });
  }
}
