'use client';

import React, { useState, useEffect } from 'react';
import { InquiryItem } from '@/lib/store';
import { MessageSquare, Calendar, CheckCircle2, Clock, Trash2, RefreshCw, Mail, Phone, Check, AlertCircle } from 'lucide-react';

export default function InquiryManager() {
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [todayCount, setTodayCount] = useState<number>(0);
  const [pendingCount, setPendingCount] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const loadInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/inquiries');
      const json = await res.json();

      let serverInquiries: InquiryItem[] = json.inquiries || [];

      // Read local storage inquiries
      let localInquiries: InquiryItem[] = [];
      try {
        const stored = localStorage.getItem('vszapower_inquiries_cache');
        if (stored) localInquiries = JSON.parse(stored);
      } catch (e) {}

      // Merge server & local by ID
      const map = new Map<string, InquiryItem>();
      serverInquiries.forEach(item => map.set(item.id, item));
      localInquiries.forEach(item => {
        if (!map.has(item.id)) map.set(item.id, item);
      });

      const merged = Array.from(map.values()).sort((a, b) => {
        return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
      });

      setInquiries(merged);

      // Save back to local storage
      try {
        localStorage.setItem('vszapower_inquiries_cache', JSON.stringify(merged));
      } catch (e) {}

      // Recalculate stats
      const todayStr = new Date().toISOString().split('T')[0];
      const todayInq = merged.filter(i => i.created_at && i.created_at.startsWith(todayStr));
      setTodayCount(todayInq.length);
      setPendingCount(merged.filter(i => i.status === 'new').length);
      setTotalCount(merged.length);
    } catch (e) {
      console.error('Failed to load inquiries:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const handleUpdateStatus = async (id: string, status: 'new' | 'contacted' | 'resolved') => {
    try {
      await fetch('/api/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      // Update local state and localStorage
      const updated = inquiries.map(item => item.id === id ? { ...item, status } : item);
      setInquiries(updated);
      localStorage.setItem('vszapower_inquiries_cache', JSON.stringify(updated));
    } catch (e) {
      alert('更新状态失败');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除此条咨询记录吗？')) return;
    try {
      await fetch(`/api/inquiries?id=${id}`, { method: 'DELETE' });
      const updated = inquiries.filter(item => item.id !== id);
      setInquiries(updated);
      localStorage.setItem('vszapower_inquiries_cache', JSON.stringify(updated));
    } catch (e) {
      alert('删除失败');
    }
  };

  const [testSending, setTestSending] = useState(false);

  const handleSendTestEmail = async () => {
    setTestSending(true);
    try {
      // 1. Direct browser client dispatch to FormSubmit for instant notification
      let clientMsg = '';
      try {
        const clientRes = await fetch('https://formsubmit.co/ajax/666lvdeshui@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            _subject: '【VSZAPOWER 测试邮件提醒】',
            _captcha: 'false',
            _template: 'table',
            email: '666lvdeshui@gmail.com',
            _replyto: '666lvdeshui@gmail.com',
            '客户姓名 Name': '系统自动测试客户',
            '联系方式 Contact': '666lvdeshui@gmail.com',
            '意向产品 Product': 'Vszapower Smart Coin Cell Charger Starter Kit',
            '留言内容 Message': '【测试邮件提醒】这是一条从 VSZAPOWER 网站发起的客户询价测试邮件。',
            '提交时间 Time': new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }),
          }),
        });
        const clientJson = await clientRes.json();
        clientMsg = clientJson.message || 'Direct browser dispatch succeeded';
      } catch (e) {
        console.warn('Browser test dispatch error:', e);
      }

      // 2. Persist in DB API & Admin Dashboard
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: '系统自动测试客户',
          contact: '666lvdeshui@gmail.com',
          product: 'Vszapower Smart Coin Cell Charger Starter Kit',
          message: '【测试邮件提醒】这是一条从 VSZAPOWER 网站发起的客户询价测试邮件。',
        }),
      });
      const json = await res.json();
      if (json.success) {
        alert(`测试咨询已成功保存并提交！\n浏览器直连发信结果: ${clientMsg}\n目标邮箱: 666lvdeshui@gmail.com\n(提示: 请在 Gmail 收件箱或垃圾箱中查收主题为【VSZAPOWER 测试邮件提醒】的即时邮件通知)`);
        loadInquiries();
      } else {
        alert('测试发送失败');
      }
    } catch (e) {
      alert('请求异常');
    } finally {
      setTestSending(false);
    }
  };

  const filteredInquiries = inquiries.filter(item => {
    if (filterStatus === 'all') return true;
    return item.status === filterStatus;
  });

  return (
    <div>
      {/* Header & Refresh */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '28px',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <MessageSquare size={24} color="var(--accent-green)" /> 客户咨询与询价管理 (Customer Inquiries)
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            系统会在收到客户咨询时自动向 <code>666lvdeshui@gmail.com</code> 发送邮件提醒。
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleSendTestEmail}
            disabled={testSending}
            className="btn-primary"
            style={{ padding: '10px 16px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Mail size={16} /> {testSending ? '发送测试邮件中...' : '测试邮件推送 (Send Test Email)'}
          </button>
          <button
            onClick={loadInquiries}
            className="btn-secondary"
            style={{ padding: '10px 16px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <RefreshCw size={16} /> 刷新咨询列表
          </button>
        </div>
      </div>

      {/* Stats Header Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '20px',
        marginBottom: '32px',
      }}>
        {/* Today's Count */}
        <div className="glass-panel" style={{
          padding: '24px',
          borderRadius: '16px',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(10, 13, 20, 0.6) 100%)',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '14px',
            background: 'var(--accent-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)',
          }}>
            <Calendar size={26} color="#041410" />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              今日咨询数量 (Today)
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--accent-green)', lineHeight: 1.1 }}>
              {todayCount} <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--accent-green)' }}>条</span>
            </div>
          </div>
        </div>

        {/* Pending Count */}
        <div className="glass-panel" style={{
          padding: '24px',
          borderRadius: '16px',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          background: 'rgba(10, 13, 20, 0.6)',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '14px',
            background: 'rgba(245, 158, 11, 0.15)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Clock size={26} color="#f59e0b" />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              待处理咨询 (Pending)
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#f59e0b', lineHeight: 1.1 }}>
              {pendingCount} <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#f59e0b' }}>条</span>
            </div>
          </div>
        </div>

        {/* Total Count */}
        <div className="glass-panel" style={{
          padding: '24px',
          borderRadius: '16px',
          border: '1px solid var(--border-color)',
          background: 'rgba(10, 13, 20, 0.6)',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '14px',
            background: 'rgba(59, 130, 246, 0.15)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <MessageSquare size={26} color="#3b82f6" />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              历史咨询总数 (Total)
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fff', lineHeight: 1.1 }}>
              {totalCount} <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-dim)' }}>条</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
        <button
          onClick={() => setFilterStatus('all')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: 'pointer',
            background: filterStatus === 'all' ? 'var(--accent-gradient)' : 'rgba(255,255,255,0.05)',
            color: filterStatus === 'all' ? '#041410' : 'var(--text-muted)',
            border: 'none',
          }}
        >
          全部咨询 ({inquiries.length})
        </button>

        <button
          onClick={() => setFilterStatus('new')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: 'pointer',
            background: filterStatus === 'new' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255,255,255,0.05)',
            color: filterStatus === 'new' ? '#f59e0b' : 'var(--text-muted)',
            border: filterStatus === 'new' ? '1px solid rgba(245, 158, 11, 0.4)' : 'none',
          }}
        >
          未处理 ({inquiries.filter(i => i.status === 'new').length})
        </button>

        <button
          onClick={() => setFilterStatus('contacted')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: 'pointer',
            background: filterStatus === 'contacted' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.05)',
            color: filterStatus === 'contacted' ? 'var(--accent-green)' : 'var(--text-muted)',
            border: filterStatus === 'contacted' ? '1px solid rgba(16, 185, 129, 0.4)' : 'none',
          }}
        >
          已联系处理 ({inquiries.filter(i => i.status === 'contacted' || i.status === 'resolved').length})
        </button>
      </div>

      {/* Inquiry Cards List */}
      {loading ? (
        <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px' }}>
          加载咨询数据中...
        </div>
      ) : filteredInquiries.length === 0 ? (
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
          暂无符合条件的咨询记录。
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredInquiries.map(item => (
            <div key={item.id} className="glass-panel" style={{
              padding: '24px',
              borderRadius: '16px',
              border: item.status === 'new' ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid var(--border-color)',
              background: item.status === 'new' ? 'rgba(245, 158, 11, 0.03)' : 'rgba(10, 13, 20, 0.6)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>
                    {item.name}
                  </h3>
                  <span className={`badge ${item.status === 'new' ? 'badge-gold' : 'badge-green'}`} style={{ fontSize: '0.7rem' }}>
                    {item.status === 'new' ? '🆕 待联系回复' : '✓ 已联系处理'}
                  </span>
                </div>

                <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                  提交时间: {new Date(item.created_at).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', fontSize: '0.9rem', background: 'rgba(255,255,255,0.03)', padding: '12px 16px', borderRadius: '10px' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>联系方式: </span>
                  <span style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>{item.contact}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>意向产品: </span>
                  <span style={{ color: '#fff', fontWeight: 600 }}>{item.product}</span>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>留言内容:</div>
                <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                  {item.message}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '10px', borderTop: '1px solid var(--border-color)' }}>
                {item.status === 'new' ? (
                  <button
                    onClick={() => handleUpdateStatus(item.id, 'contacted')}
                    className="btn-primary"
                    style={{ padding: '6px 14px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <CheckCircle2 size={14} /> 标记为已联系
                  </button>
                ) : (
                  <button
                    onClick={() => handleUpdateStatus(item.id, 'new')}
                    className="btn-secondary"
                    style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                  >
                    重置为未处理
                  </button>
                )}

                <button
                  onClick={() => handleDelete(item.id)}
                  style={{
                    background: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#ef4444',
                    padding: '6px 14px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Trash2 size={14} /> 删除记录
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
