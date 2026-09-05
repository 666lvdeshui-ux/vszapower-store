import { NextResponse } from 'next/server';
import { isAdminRequest, unauthorizedResponse } from '@/lib/adminAuth';
import { fetchAllProducts, saveProduct, removeProduct } from '@/lib/store';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const products = await fetchAllProducts();
  return NextResponse.json({ success: true, data: products });
}

export async function POST(request: Request) {
  if (!isAdminRequest(request)) return unauthorizedResponse();
  try {
    const body = await request.json();
    const product = await saveProduct(body);
    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  if (!isAdminRequest(request)) return unauthorizedResponse();
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });

    await removeProduct(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
  }
}
