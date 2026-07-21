import { NextResponse } from 'next/server';
import { fetchAllPosts, savePost, removePost } from '@/lib/store';

export async function GET() {
  const posts = await fetchAllPosts();
  return NextResponse.json({ success: true, data: posts });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const post = await savePost(body);
    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });

    await removePost(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
  }
}
