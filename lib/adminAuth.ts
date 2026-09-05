import { createHmac, timingSafeEqual } from 'crypto';
import { NextResponse } from 'next/server';

const COOKIE_NAME = 'vszapower_admin_session';
const SESSION_TTL_SECONDS = 60 * 60 * 8;

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || '';
}

function sign(value: string) {
  return createHmac('sha256', getSessionSecret()).update(value).digest('hex');
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

export function isAdminAuthConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD && getSessionSecret());
}

export function createAdminSession() {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = `admin.${expiresAt}`;
  return `${payload}.${sign(payload)}`;
}

export function isValidAdminPassword(password: unknown) {
  const expected = process.env.ADMIN_PASSWORD || '';
  return typeof password === 'string' && Boolean(expected) && safeEqual(password, expected);
}

export function isAdminRequest(request: Request) {
  if (!isAdminAuthConfigured()) return false;
  const cookie = request.headers.get('cookie') || '';
  const token = cookie.split(';').map(value => value.trim()).find(value => value.startsWith(`${COOKIE_NAME}=`))?.slice(COOKIE_NAME.length + 1);
  if (!token) return false;

  const [role, expiresAt, signature] = token.split('.');
  if (role !== 'admin' || !expiresAt || !signature || Number(expiresAt) < Math.floor(Date.now() / 1000)) return false;
  return safeEqual(signature, sign(`${role}.${expiresAt}`));
}

export function setAdminSession(response: NextResponse) {
  response.cookies.set(COOKIE_NAME, createAdminSession(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: SESSION_TTL_SECONDS,
    path: '/',
  });
}

export function clearAdminSession(response: NextResponse) {
  response.cookies.set(COOKIE_NAME, '', { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 0, path: '/' });
}

export function unauthorizedResponse() {
  return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
}
