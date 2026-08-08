import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { inMemoryTrafficLogs } from '@/lib/analyticsStore';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      session_id = 'anon_' + Math.random().toString(36).substring(2, 9),
      path = '/',
      referrer = '',
      first_visit_source = 'Direct',
      language = 'en-US',
      country: clientCountry = '',
    } = body;

    // Detect country from Vercel / Cloudflare HTTP headers if available
    const headerCountry =
      req.headers.get('x-vercel-ip-country') ||
      req.headers.get('cf-ipcountry') ||
      req.headers.get('x-country-code') ||
      clientCountry ||
      'US';

    const userAgent = req.headers.get('user-agent') || '';
    const nowISO = new Date().toISOString();

    const logItem = {
      session_id,
      path: path.split('?')[0] || '/',
      referrer: referrer || 'Direct',
      first_visit_source: first_visit_source || 'Direct',
      country: headerCountry.toUpperCase(),
      language: language.slice(0, 10),
      user_agent: userAgent,
      created_at: nowISO,
    };

    // 1. Store in Memory
    inMemoryTrafficLogs.push({
      id: Math.random().toString(36).substring(2, 11),
      ...logItem,
    });
    // Keep max 10,000 items in memory
    if (inMemoryTrafficLogs.length > 10000) {
      inMemoryTrafficLogs.shift();
    }

    // 2. Async Persist to Supabase if configured
    if (supabase) {
      try {
        await supabase.from('traffic_logs').insert([logItem]);
      } catch (err: any) {
        console.error('Supabase traffic_logs insert error:', err);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error tracking analytics:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
