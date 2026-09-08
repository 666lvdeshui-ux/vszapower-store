import { NextResponse } from 'next/server';
import { isAdminRequest, unauthorizedResponse } from '@/lib/adminAuth';
import { serverSupabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
const bucket = 'product-media';
const maxBytes = 50 * 1024 * 1024;
const types: Record<string, string> = { mp4: 'video/mp4', jpg: 'image/jpeg', webp: 'image/webp', vtt: 'text/vtt' };

// Only authenticated administrators can issue object-scoped upload credentials.
// The browser uploads directly to Storage; service credentials stay on the server.
export async function POST(request: Request) {
  if (!isAdminRequest(request)) return unauthorizedResponse();
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) {
    return NextResponse.json({ error: 'Invalid origin' }, { status: 403 });
  }
  if (!serverSupabase) return NextResponse.json({ error: 'Media storage is not configured' }, { status: 503 });
  try {
    const { path, size, contentType } = await request.json();
    const match = typeof path === 'string' && /^videos\/[a-z0-9][a-z0-9-]{0,79}\/[a-z0-9][a-z0-9-]{0,79}\.(mp4|jpg|webp|vtt)$/.exec(path);
    if (!match || types[match[1]] !== contentType || !Number.isSafeInteger(size) || size <= 0 || size > maxBytes) {
      return NextResponse.json({ error: 'Invalid media path, type or size (maximum 50 MB)' }, { status: 400 });
    }
    const existing = await serverSupabase.storage.getBucket(bucket);
    if (existing.error) {
      if (String(existing.error.statusCode) !== '404') throw existing.error;
      const created = await serverSupabase.storage.createBucket(bucket, {
        public: true,
        fileSizeLimit: maxBytes,
        allowedMimeTypes: Object.values(types),
      });
      if (created.error && String(created.error.statusCode) !== '409') throw created.error;
    }
    const { data, error } = await serverSupabase.storage.from(bucket).createSignedUploadUrl(path);
    if (error) throw error;
    const { data: publicData } = serverSupabase.storage.from(bucket).getPublicUrl(path);
    return NextResponse.json({ success: true, signedUrl: data.signedUrl, publicUrl: publicData.publicUrl }, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch {
    return NextResponse.json({ error: 'Unable to prepare media upload' }, { status: 500 });
  }
}
