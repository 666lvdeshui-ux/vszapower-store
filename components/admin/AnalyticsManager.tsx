'use client';

import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Users,
  Eye,
  Layers,
  Globe,
  Languages,
  Compass,
  Clock,
  Calendar,
  Sparkles,
  RefreshCw,
  ArrowUpRight,
  ShieldCheck,
  FileText
} from 'lucide-react';

interface AnalyticsData {
  today: { pv: number; uv: number };
  total7d: { pv: number; uv: number };
  total30d: { pv: number; uv: number };
  avgPageDepth: string;
  trend7d: Array<{ date: string; shortDate: string; pv: number; uv: number }>;
  trend30d: Array<{ date: string; shortDate: string; pv: number; uv: number }>;
  firstVisitSources30d: Array<{ source: string; count: number }>;
  countryDistribution: Array<{ country: string; count: number }>;
  visitorLanguages: Array<{ language: string; count: number }>;
  mostViewedPages: Array<{ path: string; title: string; pv: number }>;
  peakPopularityDate: { date: string; pv: number };
  peakTimeSlot: string;
  hourlyDistribution: Array<{ hour: string; count: number }>;
}

export default function AnalyticsManager() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [trendRange, setTrendRange] = useState<'7d' | '30d'>('30d');

  const fetchStats = () => {
    setLoading(true);
    fetch('/api/analytics/stats')
      .then(res => res.json())
      .then(res => {
        if (res.data) {
          setData(res.data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading && !data) {
    return (
      <div style={{ padding: '60px 0', textAlign: 'center', color: '#94a3b8' }}>
        <RefreshCw size={28} className="animate-spin" style={{ margin: '0 auto 12px' }} />
        <div>正在实时聚合计算全维度流量与来源数据...</div>
      </div>
    );
  }

  if (!data) return null;

  const currentTrend = trendRange === '7d' ? data.trend7d : data.trend30d;
  const maxTrendPV = Math.max(...currentTrend.map(t => t.pv), 1);
  const maxHourlyCount = Math.max(...data.hourlyDistribution.map(h => h.count), 1);

  const totalReferrerCount = data.firstVisitSources30d.reduce((sum, item) => sum + item.count, 0) || 1;
  const totalCountryCount = data.countryDistribution.reduce((sum, item) => sum + item.count, 0) || 1;
  const totalLangCount = data.visitorLanguages.reduce((sum, item) => sum + item.count, 0) || 1;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Top Title & Refresh */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <TrendingUp color="#00ffb2" size={26} /> 流量来源与访问监控控制台
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem', margin: '4px 0 0 0' }}>
            实时监控 VSZAPOWER 官方商城的全网访客来源、访问深度、地理区域与受访热度
          </p>
        </div>

        <button
          onClick={fetchStats}
          disabled={loading}
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: '#00ffb2',
            padding: '10px 18px',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '0.88rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} /> 刷新实时数据
        </button>
      </div>

      {/* 1. Top Key Metric Cards (Row of 6 KPIs) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '16px'
      }}>
        {/* Card 1: Today Visits */}
        <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px', border: '1px solid rgba(0, 255, 178, 0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600 }}>今日访问 (Today)</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(0, 255, 178, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Eye size={18} color="#00ffb2" />
            </div>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff' }}>{data.today.pv.toLocaleString()} <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 400 }}>PV</span></div>
          <div style={{ fontSize: '0.85rem', color: '#00ffb2', marginTop: '4px' }}>{data.today.uv.toLocaleString()} 独立访客 (UV)</div>
        </div>

        {/* Card 2: 7 Days Total */}
        <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600 }}>近 7 日访问 (7D)</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(56, 189, 248, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp size={18} color="#38bdf8" />
            </div>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff' }}>{data.total7d.pv.toLocaleString()} <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 400 }}>PV</span></div>
          <div style={{ fontSize: '0.85rem', color: '#38bdf8', marginTop: '4px' }}>{data.total7d.uv.toLocaleString()} UV</div>
        </div>

        {/* Card 3: 30 Days Total */}
        <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600 }}>近 30 日访问 (30D)</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(168, 85, 247, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={18} color="#a855f7" />
            </div>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff' }}>{data.total30d.pv.toLocaleString()} <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 400 }}>PV</span></div>
          <div style={{ fontSize: '0.85rem', color: '#a855f7', marginTop: '4px' }}>{data.total30d.uv.toLocaleString()} UV</div>
        </div>

        {/* Card 4: Avg Page Depth */}
        <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600 }}>平均浏览深度</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(251, 146, 60, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Layers size={18} color="#fb923c" />
            </div>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff' }}>{data.avgPageDepth} <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 400 }}>页/次</span></div>
          <div style={{ fontSize: '0.85rem', color: '#fb923c', marginTop: '4px' }}>受访交互深度高</div>
        </div>

        {/* Card 5: Peak Popularity Date */}
        <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600 }}>人气最高日期</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(244, 63, 94, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Calendar size={18} color="#f43f5e" />
            </div>
          </div>
          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff' }}>{data.peakPopularityDate.date.slice(5)}</div>
          <div style={{ fontSize: '0.85rem', color: '#f43f5e', marginTop: '4px' }}>最高单日 {data.peakPopularityDate.pv} PV</div>
        </div>

        {/* Card 6: Peak Time Slot */}
        <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600 }}>人气最高时间段</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(234, 179, 8, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={18} color="#eab308" />
            </div>
          </div>
          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff' }}>{data.peakTimeSlot}</div>
          <div style={{ fontSize: '0.85rem', color: '#eab308', marginTop: '4px' }}>全天流量峰值区间</div>
        </div>
      </div>

      {/* 2. Visit Trend Chart (7D / 30D Switchable) */}
      <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', margin: 0 }}>访问量趋势图</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '4px 0 0 0' }}>页面浏览量 (PV) 与 独立访客 (UV) 每日分布走势</p>
          </div>
          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '4px' }}>
            <button
              onClick={() => setTrendRange('7d')}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                border: 'none',
                background: trendRange === '7d' ? '#00ffb2' : 'transparent',
                color: trendRange === '7d' ? '#041410' : '#94a3b8',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer'
              }}
            >
              近 7 天
            </button>
            <button
              onClick={() => setTrendRange('30d')}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                border: 'none',
                background: trendRange === '30d' ? '#00ffb2' : 'transparent',
                color: trendRange === '30d' ? '#041410' : '#94a3b8',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer'
              }}
            >
              近 30 天
            </button>
          </div>
        </div>

        {/* Dynamic Bar Chart */}
        <div style={{ height: '220px', display: 'flex', alignItems: 'flex-end', gap: trendRange === '7d' ? '24px' : '6px', paddingTop: '20px' }}>
          {currentTrend.map((item, idx) => {
            const heightPercent = Math.max((item.pv / maxTrendPV) * 100, 8);
            return (
              <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ fontSize: '0.7rem', color: '#00ffb2', fontWeight: 600 }}>{item.pv}</div>
                <div
                  title={`${item.date}: ${item.pv} PV / ${item.uv} UV`}
                  style={{
                    width: '100%',
                    maxWidth: '32px',

                    height: `${heightPercent}%`,
                    background: 'linear-gradient(180deg, #00ffb2 0%, rgba(0, 184, 212, 0.4) 100%)',
                    borderRadius: '6px 6px 2px 2px',
                    transition: 'all 0.3s ease'
                  }}
                />
                <div style={{ fontSize: '0.72rem', color: '#64748b', whiteSpace: 'nowrap' }}>{item.shortDate}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Three-Column Grid: Referrers, Countries, Languages */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '20px'
      }}>
        {/* Column 1: 近30日首访来源 (First Visit Sources) */}
        <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
            <Compass size={20} color="#00ffb2" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', margin: 0 }}>近 30 日首访来源</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {data.firstVisitSources30d.map((src, idx) => {
              const pct = ((src.count / totalReferrerCount) * 100).toFixed(1);
              return (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                    <span style={{ color: '#e2e8f0', fontWeight: 500 }}>{src.source}</span>
                    <span style={{ color: '#00ffb2', fontWeight: 700 }}>{src.count.toLocaleString()} ({pct}%)</span>
                  </div>
                  <div style={{ width: '100%', height: '7px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: 'linear-gradient(90deg, #00ffb2, #00b8d4)', borderRadius: '4px' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Column 2: 流量国家与地区 (Traffic by Country) */}
        <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
            <Globe size={20} color="#38bdf8" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', margin: 0 }}>流量国家与地区</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {data.countryDistribution.map((item, idx) => {
              const pct = ((item.count / totalCountryCount) * 100).toFixed(1);
              return (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                    <span style={{ color: '#e2e8f0', fontWeight: 500 }}>{item.country}</span>
                    <span style={{ color: '#38bdf8', fontWeight: 700 }}>{item.count.toLocaleString()} ({pct}%)</span>
                  </div>
                  <div style={{ width: '100%', height: '7px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: 'linear-gradient(90deg, #38bdf8, #818cf8)', borderRadius: '4px' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Column 3: 访问语言 (Visitor Languages) */}
        <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
            <Languages size={20} color="#a855f7" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', margin: 0 }}>访问语言分布</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {data.visitorLanguages.map((lang, idx) => {
              const pct = ((lang.count / totalLangCount) * 100).toFixed(1);
              return (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                    <span style={{ color: '#e2e8f0', fontWeight: 500 }}>{lang.language}</span>
                    <span style={{ color: '#a855f7', fontWeight: 700 }}>{lang.count.toLocaleString()} ({pct}%)</span>
                  </div>
                  <div style={{ width: '100%', height: '7px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: 'linear-gradient(90deg, #a855f7, #ec4899)', borderRadius: '4px' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Two-Column Row: Hourly Peak Slot Histogram & Most Viewed Pages Ranking Table */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
        {/* Peak Hourly Slot Distribution Histogram */}
        <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={20} color="#eab308" />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', margin: 0 }}>24 小时访问高峰时段分布</h3>
            </div>
            <span style={{ fontSize: '0.8rem', color: '#eab308', background: 'rgba(234, 179, 8, 0.1)', padding: '4px 10px', borderRadius: '6px' }}>
              高峰期: {data.peakTimeSlot}
            </span>
          </div>

          <div style={{ height: '180px', display: 'flex', alignItems: 'flex-end', gap: '4px', paddingTop: '10px' }}>
            {data.hourlyDistribution.map((h, idx) => {
              const heightPct = Math.max((h.count / maxHourlyCount) * 100, 6);
              const isPeak = h.hour.startsWith(data.peakTimeSlot.split(':')[0]);
              return (
                <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                  <div
                    title={`${h.hour}: ${h.count} views`}
                    style={{
                      width: '100%',
                      height: `${heightPct}%`,
                      background: isPeak ? '#eab308' : 'rgba(255,255,255,0.15)',
                      borderRadius: '3px 3px 0 0',
                      transition: 'height 0.3s ease'
                    }}
                  />
                  {idx % 3 === 0 && (
                    <div style={{ fontSize: '0.65rem', color: '#64748b', marginTop: '4px' }}>{h.hour.slice(0, 2)}h</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Most Viewed Pages Top Ranking Table */}
        <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
            <FileText size={20} color="#00ffb2" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', margin: 0 }}>浏览最多的受访页面 (Top Pages)</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {data.mostViewedPages.map((page, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.05)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                  <span style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '6px',
                    background: idx === 0 ? '#00ffb2' : idx === 1 ? '#38bdf8' : idx === 2 ? '#a855f7' : 'rgba(255,255,255,0.1)',
                    color: idx < 3 ? '#041410' : '#94a3b8',
                    fontWeight: 800,
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {idx + 1}
                  </span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {page.title}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {page.path}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#00ffb2', fontWeight: 700, fontSize: '0.9rem', flexShrink: 0, marginLeft: '12px' }}>
                  {page.pv.toLocaleString()} <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 400 }}>PV</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
