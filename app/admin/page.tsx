'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AnalyticsManager from '@/components/admin/AnalyticsManager';
import InquiryManager from '@/components/admin/InquiryManager';
import ProductManager from '@/components/admin/ProductManager';
import VideoManager from '@/components/admin/VideoManager';
import BannerManager from '@/components/admin/BannerManager';
import PostManager from '@/components/admin/PostManager';
import {
  Shield,
  TrendingUp,
  MessageSquare,
  Package,
  Video,
  Image as ImageIcon,
  BookOpen,
  Settings,
  LogOut,
  ExternalLink,
  Lock,
  CheckCircle2,
  Database,
  BarChart3,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

type TabType = 'analytics' | 'inquiries' | 'products' | 'videos' | 'banners' | 'posts' | 'settings';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('analytics');
  const [todayInquiryCount, setTodayInquiryCount] = useState<number>(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dbStatus, setDbStatus] = useState<'checking' | 'connected' | 'mock'>('checking');

  useEffect(() => {
    const loadAdmin = async () => {
      try {
        const session = await fetch('/api/admin/session').then(res => res.json());
        if (!session.authenticated) {
          setIsAuthenticated(false);
          router.push('/admin/login');
          return;
        }

        setIsAuthenticated(true);
        const inquiries = await fetch('/api/inquiries').then(res => res.json());
        if (inquiries.todayCount !== undefined) setTodayInquiryCount(inquiries.todayCount);
        setDbStatus('connected');
      } catch {
        setDbStatus('mock');
      }
    };
    loadAdmin();
  }, [router]);

  const handleLogout = () => {
    fetch('/api/admin/session', { method: 'DELETE' }).finally(() => {
      setIsAuthenticated(false);
      router.push('/admin/login');
    });
  };

  if (isAuthenticated === null || isAuthenticated === false) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#04080c',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#94a3b8',
        fontFamily: 'system-ui, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <Shield size={36} color="#00ffb2" className="animate-bounce" style={{ margin: '0 auto 12px' }} />
          <div>正在验证安全管理口令并初始化端口...</div>
        </div>
      </div>
    );
  }

  const tabsConfig = [
    { id: 'analytics' as TabType, label: '流量监控', icon: BarChart3, badge: 'REALTIME' },
    { id: 'inquiries' as TabType, label: '询盘管理', icon: MessageSquare, badgeCount: todayInquiryCount },
    { id: 'products' as TabType, label: '产品中心', icon: Package },
    { id: 'videos' as TabType, label: '短视频 CMS', icon: Video },
    { id: 'banners' as TabType, label: 'Hero 轮播', icon: ImageIcon },
    { id: 'posts' as TabType, label: '电池学院 CMS', icon: BookOpen },
    { id: 'settings' as TabType, label: '系统与安全', icon: Settings },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at 50% 0%, #0d1b18 0%, #05080c 100%)',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* 1. Independent Top Admin Header */}
      <header style={{
        background: 'rgba(10, 15, 24, 0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        padding: '14px 24px'
      }}>
        <div style={{
          maxWidth: '1540px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Brand Logo & Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                display: 'none', // Mobile toggle
                background: 'transparent',
                border: 'none',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #00ffb2 0%, #00b8d4 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(0,255,178,0.3)'
              }}>
                <Shield size={20} color="#041410" strokeWidth={2.5} />
              </div>
              <span style={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.3px', color: '#fff' }}>
                VSZAPOWER <span style={{ color: '#00ffb2', fontSize: '0.85rem', fontWeight: 600 }}>CONTROL PORTAL</span>
              </span>
            </div>

            <div style={{
              background: 'rgba(0, 255, 178, 0.1)',
              border: '1px solid rgba(0, 255, 178, 0.25)',
              color: '#00ffb2',
              fontSize: '0.72rem',
              padding: '3px 10px',
              borderRadius: '20px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00ffb2' }} />
              独立控制台在线
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#e2e8f0',
                padding: '8px 14px',
                borderRadius: '10px',
                fontSize: '0.85rem',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              <ExternalLink size={15} color="#00ffb2" /> 查看前台商城
            </a>

            <button
              onClick={handleLogout}
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                color: '#f87171',
                padding: '8px 14px',
                borderRadius: '10px',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              <LogOut size={15} /> 退出登录
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Admin Layout Container (Sidebar + Content Body) */}
      <div style={{
        maxWidth: '1540px',
        width: '100%',
        margin: '0 auto',
        flex: 1,
        display: 'flex',
        padding: '24px'
      }}>
        {/* Left Sidebar Navigation */}
        <aside style={{
          width: '240px',
          flexShrink: 0,
          marginRight: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px'
        }}>
          <div style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#64748b',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            padding: '8px 12px',
            marginBottom: '4px'
          }}>
            后台管理模块
          </div>

          {tabsConfig.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: isActive ? '1px solid rgba(0, 255, 178, 0.3)' : '1px solid transparent',
                  background: isActive
                    ? 'linear-gradient(90deg, rgba(0, 255, 178, 0.12) 0%, rgba(0, 184, 212, 0.05) 100%)'
                    : 'transparent',
                  color: isActive ? '#00ffb2' : '#94a3b8',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icon size={18} color={isActive ? '#00ffb2' : '#64748b'} />
                  <span>{tab.label}</span>
                </div>

                {tab.badge && (
                  <span style={{
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    color: '#041410',
                    background: '#00ffb2',
                    padding: '2px 6px',
                    borderRadius: '4px'
                  }}>
                    {tab.badge}
                  </span>
                )}

                {tab.badgeCount !== undefined && tab.badgeCount > 0 && (
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: '#fff',
                    background: '#ef4444',
                    padding: '2px 8px',
                    borderRadius: '10px'
                  }}>
                    {tab.badgeCount}
                  </span>
                )}
              </button>
            );
          })}

          {/* Database Status Card in Sidebar */}
          <div style={{
            marginTop: 'auto',
            padding: '16px',
            borderRadius: '14px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)'
          }}>
            <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Database size={14} color="#00ffb2" /> 数据库状态
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#e2e8f0' }}>
              {dbStatus === 'connected' ? 'Supabase 云数据库已就绪' : '本地全能数据服务激活中'}
            </div>
          </div>
        </aside>

        {/* Right Main Content Area */}
        <main style={{ flex: 1, minWidth: 0 }}>
          {activeTab === 'analytics' && <AnalyticsManager />}

          {activeTab === 'inquiries' && <InquiryManager />}

          {activeTab === 'products' && <ProductManager />}

          {activeTab === 'videos' && <VideoManager />}

          {activeTab === 'banners' && <BannerManager />}

          {activeTab === 'posts' && <PostManager />}

          {activeTab === 'settings' && (
            <div className="glass-panel" style={{ padding: '32px', borderRadius: '20px' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Settings color="#00ffb2" size={24} /> 系统与安全配置
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '28px' }}>
                查看与维护 VSZAPOWER 独立后台管理口令、Supabase 云连接及 API 状态
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                <div style={{ padding: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px' }}>
                  <h4 style={{ color: '#fff', margin: '0 0 8px 0', fontSize: '1rem', fontWeight: 700 }}>独立登录口令设置</h4>
                  <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0 0 16px 0' }}>当前管理口令为系统的第一道安全防护线。</p>
                  <div style={{ fontSize: '0.9rem', color: '#00ffb2', fontFamily: 'monospace', background: 'rgba(0,0,0,0.4)', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(0,255,178,0.2)' }}>
                    已启用服务端会话验证
                  </div>
                </div>

                <div style={{ padding: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px' }}>
                  <h4 style={{ color: '#fff', margin: '0 0 8px 0', fontSize: '1rem', fontWeight: 700 }}>API 与数据库连接</h4>
                  <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0 0 16px 0' }}>Supabase PostgreSQL 服务与 Next.js API 接入点。</p>
                  <div style={{ fontSize: '0.88rem', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color="#38bdf8" /> 状态: {dbStatus === 'connected' ? '云数据库在线连接' : '高性能内置内存缓存就绪'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
