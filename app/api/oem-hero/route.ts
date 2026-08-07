import { NextResponse } from 'next/server';
import { fetchOEMHeroMedia, saveOEMHeroMedia, getOEMVideoBuffer } from '@/lib/store';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const isVideo = searchParams.get('video');

  if (isVideo === 'true') {
    const videoData = getOEMVideoBuffer();
    if (videoData) {
      return new Response(new Uint8Array(videoData.buffer), {
        status: 200,
        headers: {
          'Content-Type': videoData.mimeType || 'video/mp4',
          'Content-Length': String(videoData.buffer.length),
          'Accept-Ranges': 'bytes',
          'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
        },
      });
    }

    const settings = await fetchOEMHeroMedia();
    if (settings.tile2_video && settings.tile2_video.startsWith('data:video/')) {
      try {
        const base64Parts = settings.tile2_video.split(',');
        const mimeType = base64Parts[0].match(/:(.*?);/)?.[1] || 'video/mp4';
        const buffer = Buffer.from(base64Parts[1], 'base64');

        return new Response(new Uint8Array(buffer), {
          status: 200,
          headers: {
            'Content-Type': mimeType,
            'Content-Length': String(buffer.length),
            'Accept-Ranges': 'bytes',
            'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
          },
        });
      } catch (e) {
        console.error('Failed to stream video bytes:', e);
      }
    }
  }

  const settings = await fetchOEMHeroMedia();
  return NextResponse.json(settings);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const saved = await saveOEMHeroMedia(body);
    return NextResponse.json(saved);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save OEM hero media settings' }, { status: 500 });
  }
}
