import { NextResponse } from 'next/server';
import { clearAdminSession, isAdminAuthConfigured, isAdminRequest, isValidAdminPassword, setAdminSession } from '@/lib/adminAuth';

export async function GET(request: Request) {
  return NextResponse.json({ authenticated: isAdminRequest(request), configured: isAdminAuthConfigured() });
}

export async function POST(request: Request) {
  if (!isAdminAuthConfigured()) {
    return NextResponse.json({ success: false, error: 'Admin authentication is not configured' }, { status: 503 });
  }

  const { password } = await request.json();
  if (!isValidAdminPassword(password)) {
    return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  setAdminSession(response);
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  clearAdminSession(response);
  return response;
}
