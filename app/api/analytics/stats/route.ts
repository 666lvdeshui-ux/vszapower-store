import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { inMemoryTrafficLogs } from '@/lib/analyticsStore';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    let logs: Array<any> = [];

    if (supabase) {
      const { data, error } = await supabase
        .from('traffic_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5000);
      if (!error && data) {
        logs = data;
      }
    }

    // Merge Supabase logs with in-memory logs
    const combinedLogMap = new Map<string, any>();
    logs.forEach(l => combinedLogMap.set(l.id || l.created_at + l.session_id, l));
    inMemoryTrafficLogs.forEach(l => combinedLogMap.set(l.id || l.created_at + l.session_id, l));

    const realLogs = Array.from(combinedLogMap.values());
    const stats = calculateAnalytics(realLogs, new Date());

    return NextResponse.json({ success: true, data: stats });
  } catch (error: any) {
    console.error('Error fetching analytics stats:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

function calculateAnalytics(logs: Array<any>, now: Date) {
  const todayStr = now.toISOString().split('T')[0];

  // Date ranges
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  // Filtered real logs
  const todayLogs = logs.filter(l => l.created_at?.startsWith(todayStr));
  const logs7d = logs.filter(l => l.created_at && new Date(l.created_at) >= sevenDaysAgo);
  const logs30d = logs.filter(l => l.created_at && new Date(l.created_at) >= thirtyDaysAgo);

  // 1. Today Visits (100% Real)
  const todayPV = todayLogs.length;
  const todayUV = new Set(todayLogs.map(l => l.session_id)).size;

  // 2 & 3. 7D and 30D Visits Trend & Totals (100% Real)
  const daily30dMap: Record<string, { pv: number; uv: Set<string> }> = {};
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dStr = d.toISOString().split('T')[0];
    daily30dMap[dStr] = { pv: 0, uv: new Set() };
  }

  logs30d.forEach(l => {
    const dStr = l.created_at?.split('T')[0];
    if (dStr && daily30dMap[dStr]) {
      daily30dMap[dStr].pv += 1;
      if (l.session_id) daily30dMap[dStr].uv.add(l.session_id);
    }
  });

  const trend30d = Object.entries(daily30dMap).map(([date, val]) => ({
    date,
    shortDate: date.slice(5),
    pv: val.pv,
    uv: val.uv.size,
  }));

  const trend7d = trend30d.slice(-7);

  const totalPV30d = trend30d.reduce((sum, d) => sum + d.pv, 0);
  const totalUV30d = trend30d.reduce((sum, d) => sum + d.uv, 0);

  const totalPV7d = trend7d.reduce((sum, d) => sum + d.pv, 0);
  const totalUV7d = trend7d.reduce((sum, d) => sum + d.uv, 0);

  // 4. Average Page Depth (100% Real)
  const sessionPageCounts: Record<string, number> = {};
  logs30d.forEach(l => {
    if (l.session_id) {
      sessionPageCounts[l.session_id] = (sessionPageCounts[l.session_id] || 0) + 1;
    }
  });

  const totalSessions = Object.keys(sessionPageCounts).length;
  const avgPageDepth = totalSessions > 0
    ? (totalPV30d / totalSessions).toFixed(2)
    : '0.00';

  // 5. Last 30 days first-visit sources (100% Real)
  const referrerCounts: Record<string, number> = {};
  logs30d.forEach(l => {
    const src = l.first_visit_source || l.referrer || 'Direct / Bookmark';
    let cleanSrc = 'Direct / Bookmark';
    if (src.includes('google')) cleanSrc = 'Google Search';
    else if (src.includes('baidu')) cleanSrc = 'Baidu Search';
    else if (src.includes('tiktok')) cleanSrc = 'TikTok / Social';
    else if (src.includes('reddit')) cleanSrc = 'Reddit Forum';
    else if (src.includes('bing')) cleanSrc = 'Bing Search';
    else if (src.includes('temu')) cleanSrc = 'Temu Marketplace';
    else if (src.startsWith('http')) {
      try { cleanSrc = new URL(src).hostname; } catch (e) { cleanSrc = src; }
    } else {
      cleanSrc = src;
    }

    referrerCounts[cleanSrc] = (referrerCounts[cleanSrc] || 0) + 1;
  });

  const firstVisitSources30d = Object.entries(referrerCounts)
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count);

  // 6. Traffic by Country & Region (100% Real)
  const countryCounts: Record<string, number> = {};
  logs30d.forEach(l => {
    const c = l.country || 'Unknown';
    countryCounts[c] = (countryCounts[c] || 0) + 1;
  });

  const countryDistribution = Object.entries(countryCounts)
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count);

  // 7. Visitor Languages (100% Real)
  const languageCounts: Record<string, number> = {};
  logs30d.forEach(l => {
    const lang = l.language || 'en-US';
    languageCounts[lang] = (languageCounts[lang] || 0) + 1;
  });

  const visitorLanguages = Object.entries(languageCounts)
    .map(([language, count]) => ({ language, count }))
    .sort((a, b) => b.count - a.count);

  // 8. Most Viewed Pages (100% Real)
  const pageCounts: Record<string, { path: string; title: string; pv: number }> = {};
  logs30d.forEach(l => {
    const path = l.path || '/';
    if (!pageCounts[path]) {
      pageCounts[path] = { path, title: getPageTitle(path), pv: 0 };
    }
    pageCounts[path].pv += 1;
  });

  const mostViewedPages = Object.values(pageCounts).sort((a, b) => b.pv - a.pv);

  // 9. Peak Popularity Date (100% Real)
  let peakDate = trend30d[0] || { date: todayStr, pv: 0 };
  trend30d.forEach(d => {
    if (d.pv > peakDate.pv) {
      peakDate = d;
    }
  });

  // 10. Peak Popularity Time Slot (100% Real)
  const hourCounts: number[] = new Array(24).fill(0);
  logs30d.forEach(l => {
    if (l.created_at) {
      const hour = new Date(l.created_at).getHours();
      if (hour >= 0 && hour < 24) hourCounts[hour] += 1;
    }
  });

  let peakHourIndex = 0;
  hourCounts.forEach((cnt, h) => {
    if (cnt > hourCounts[peakHourIndex]) {
      peakHourIndex = h;
    }
  });

  const peakTimeSlot = logs30d.length > 0
    ? `${String(peakHourIndex).padStart(2, '0')}:00 - ${String((peakHourIndex + 1) % 24).padStart(2, '0')}:00`
    : '暂无数据';

  return {
    today: {
      pv: todayPV,
      uv: todayUV,
    },
    total7d: {
      pv: totalPV7d,
      uv: totalUV7d,
    },
    total30d: {
      pv: totalPV30d,
      uv: totalUV30d,
    },
    avgPageDepth,
    trend7d,
    trend30d,
    firstVisitSources30d,
    countryDistribution,
    visitorLanguages,
    mostViewedPages,
    peakPopularityDate: peakDate.pv > 0 ? peakDate : { date: todayStr, pv: 0 },
    peakTimeSlot,
    hourlyDistribution: hourCounts.map((count, hour) => ({
      hour: `${String(hour).padStart(2, '0')}:00`,
      count,
    })),
  };
}

function getPageTitle(path: string): string {
  if (path === '/') return 'VSZAPOWER 首页';
  if (path.includes('lir2032-starter-kit')) return 'LIR2032 智能充电器套装';
  if (path.includes('quad-pro-charger')) return '4槽 Type-C 纽扣电池充电座 Pro';
  if (path.includes('cr2032-vs-lir2032')) return 'CR2032 vs LIR2032 指南文章';
  if (path.includes('academy')) return '电池学院';
  return path;
}
