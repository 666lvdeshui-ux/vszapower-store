'use client';

import React, { useState, useEffect } from 'react';
import { BannerItem } from '@/lib/store';
import { Plus, Edit2, Trash2, Image, Sparkles, RefreshCw, Video, CheckCircle2, Save } from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';
import MediaUploader from '@/components/admin/MediaUploader';

interface OEMHeroMediaSettings {
  tile1_image: string;
  tile2_video: string;
  tile3_image: string;
  tile4_image: string;
}

const DEFAULT_OEM_MEDIA: OEMHeroMediaSettings = {
  tile1_image: '/oem/oem_factory_assembly.png',
  tile2_video: '',
  tile3_image: '/oem/oem_battery_testing.png',
  tile4_image: '/oem/oem_custom_packaging.png',
};

export default function BannerManager() {
  const [banners, setBanners] = useState<BannerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBanner, setEditingBanner] = useState<Partial<BannerItem> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  // OEM 2x2 Collage Media State
  const [oemMedia, setOemMedia] = useState<OEMHeroMediaSettings>(DEFAULT_OEM_MEDIA);
  const [savingOemMedia, setSavingOemMedia] = useState(false);
  const [oemMediaSavedMessage, setOemMediaSavedMessage] = useState(false);

  const fetchBanners = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/banners');
      const data = await res.json();
      if (Array.isArray(data)) {
        setBanners(data);
      }
    } catch (e) {
      console.error('Failed to fetch banners:', e);
    } finally {
      setLoading(false);
    }
  };

  const fetchOEMMedia = async () => {
    try {
      const res = await fetch('/api/oem-hero');
      const data = await res.json();
      if (data && typeof data === 'object') {
        setOemMedia(prev => ({ ...prev, ...data }));
      }
    } catch (e) {
      console.error('Failed to fetch OEM hero media settings:', e);
    }
  };

  useEffect(() => {
    fetchBanners();
    fetchOEMMedia();
  }, []);

  const handleSaveOEMMedia = async () => {
    setSavingOemMedia(true);
    try {
      const res = await fetch('/api/oem-hero', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(oemMedia),
      });
      if (res.ok) {
        setOemMediaSavedMessage(true);
        setTimeout(() => setOemMediaSavedMessage(false), 3000);
      } else {
        alert('保存 OEM 媒体设置失败');
      }
    } catch (e) {
      alert('保存发生网络异常');
    } finally {
      setSavingOemMedia(false);
    }
  };

  const handleCreateNew = () => {
    setEditingBanner({
      badge: 'SMART RECHARGE SYSTEM',
      title: '',
      subtitle: '',
      image_url: 'https://images.unsplash.com/photo-1619725002198-6a689b72f41d?auto=format&fit=crop&w=1400&q=80',
      cta_text: '联系我们 (Contact Us)',
      cta_link: '/#contact',
      highlight: '✓ 500+ Recharge Cycles • Auto 4.2V Cutoff',
    });
    setIsModalOpen(true);
  };

  const handleEdit = (banner: BannerItem) => {
    setEditingBanner({ ...banner });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除此轮播图幻灯片吗？')) return;
    try {
      await fetch(`/api/banners?id=${id}`, { method: 'DELETE' });
      fetchBanners();
    } catch (e) {
      alert('删除失败，请重试');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBanner?.title || !editingBanner?.image_url) {
      alert('请填写轮播图大标题与图片 URL');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/banners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingBanner),
      });
      if (res.ok) {
        setIsModalOpen(false);
        setEditingBanner(null);
        fetchBanners();
      } else {
        alert('保存失败');
      }
    } catch (e) {
      alert('网络提交异常');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      {/* SECTION 1: OEM 2x2 HERO COLLAGE & 1:1 VIDEO MANAGER */}
      <div className="glass-panel" style={{
        padding: '28px',
        borderRadius: '24px',
        marginBottom: '36px',
        border: '1px solid var(--accent-green)',
        boxShadow: '0 10px 30px rgba(16, 185, 129, 0.15)',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Video size={24} color="var(--accent-green)" /> 首页 OEM 2x2 实景媒体与 1:1 视频管理 (OEM Hero Collage & 1:1 Video)
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
              在此实时更新首页右上角 2x2 拼图中的 1:1 SMT 贴片视频及其余 3 位置实景图片，修改后立即在网站首页生效。
            </p>
          </div>

          <button
            onClick={handleSaveOEMMedia}
            disabled={savingOemMedia}
            className="btn-primary"
            style={{
              padding: '12px 24px',
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              borderRadius: '20px',
            }}
          >
            <Save size={18} />
            {savingOemMedia ? '保存中...' : '💾 保存 OEM 2x2 媒体设置'}
          </button>
        </div>

        {oemMediaSavedMessage && (
          <div style={{
            padding: '10px 16px',
            borderRadius: '10px',
            background: 'rgba(16, 185, 129, 0.2)',
            border: '1px solid var(--accent-green)',
            color: 'var(--accent-green)',
            fontSize: '0.88rem',
            fontWeight: 700,
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <CheckCircle2 size={16} /> ✅ OEM 首页 2x2 实景媒体与 1:1 视频设置已成功保存并同步！
          </div>
        )}

        {/* 2x2 Media Slots Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {/* Position 1 (Top Left Image) */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            padding: '16px',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
          }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#fff', marginBottom: '10px' }}>
              📍 位置 1 (左上图): 无尘组装车间图片
            </div>
            <MediaUploader
              label="位置 1 实景图片 (Cleanroom Assembly)"
              value={oemMedia.tile1_image}
              onChange={url => setOemMedia({ ...oemMedia, tile1_image: url })}
              placeholder="点击上传位置 1 工厂组装车间图片"
              mediaType="image"
            />
          </div>

          {/* Position 2 (Top Right 1:1 Video) */}
          <div style={{
            background: 'rgba(16, 185, 129, 0.08)',
            padding: '16px',
            borderRadius: '16px',
            border: '2px solid var(--accent-green)',
          }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--accent-green)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Video size={16} /> 📍 位置 2 (右上 1:1 视频): SMT 贴片芯片展示视频
            </div>
            <MediaUploader
              label="位置 2 1:1 展示视频 (SMT Micro-Chip PCB 1:1 Video)"
              value={oemMedia.tile2_video}
              onChange={url => setOemMedia({ ...oemMedia, tile2_video: url })}
              placeholder="点击上传 1:1 视频文件 (MP4/WebM) 或输入视频 URL"
              mediaType="video"
            />
          </div>

          {/* Position 3 (Bottom Left Image) */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            padding: '16px',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
          }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#fff', marginBottom: '10px' }}>
              📍 位置 3 (左下图): 电池质检与焊接图片
            </div>
            <MediaUploader
              label="位置 3 实景图片 (Precision Quality QA)"
              value={oemMedia.tile3_image}
              onChange={url => setOemMedia({ ...oemMedia, tile3_image: url })}
              placeholder="点击上传位置 3 电池检测图片"
              mediaType="image"
            />
          </div>

          {/* Position 4 (Bottom Right Image) */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            padding: '16px',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
          }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#fff', marginBottom: '10px' }}>
              📍 位置 4 (右下图): OEM 私有品牌打包出货图片
            </div>
            <MediaUploader
              label="位置 4 实景图片 (OEM Export Box)"
              value={oemMedia.tile4_image}
              onChange={url => setOemMedia({ ...oemMedia, tile4_image: url })}
              placeholder="点击上传位置 4 打包仓库图片"
              mediaType="image"
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: OTHER HERO BANNERS MANAGEMENT */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '28px',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Image size={22} color="var(--accent-cyan)" /> 品牌宣传 Carousel 幻灯片管理
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            在此添加或修改品牌备用 Carousel 幻灯片列表。
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={fetchBanners}
            className="btn-secondary"
            style={{ padding: '10px 16px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <RefreshCw size={16} /> 刷新列表
          </button>
          <button
            onClick={handleCreateNew}
            className="btn-primary"
            style={{ padding: '10px 20px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Plus size={18} /> 添加新幻灯片 (Add Banner Slide)
          </button>
        </div>
      </div>

      {/* Banner Grid List */}
      {loading ? (
        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
          加载轮播图列表中...
        </div>
      ) : banners.length === 0 ? (
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
          暂无轮播图，点击右上角“添加新幻灯片”创建备用幻灯片。
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '24px' }}>
          {banners.map((banner) => (
            <div key={banner.id} className="glass-panel" style={{
              borderRadius: '16px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid var(--border-color)',
            }}>
              {/* Slide Image Preview */}
              <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                <img
                  src={banner.image_url}
                  alt={banner.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.5)' }}
                />
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  background: 'rgba(10,13,20,0.85)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--accent-green)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}>
                  <Sparkles size={12} /> {banner.badge}
                </div>
              </div>

              {/* Slide Details */}
              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', marginBottom: '8px', lineHeight: 1.3 }}>
                    {banner.title}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '14px' }}>
                    {banner.subtitle}
                  </p>
                  <div style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', marginBottom: '16px' }}>
                    {banner.highlight}
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '14px',
                  borderTop: '1px solid var(--border-color)',
                }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                    按钮: {banner.cta_text || '联系我们'}
                  </span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleEdit(banner)}
                      className="btn-secondary"
                      style={{ padding: '6px 12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Edit2 size={14} /> 编辑
                    </button>
                    <button
                      onClick={() => handleDelete(banner.id)}
                      style={{
                        background: 'rgba(239, 68, 68, 0.15)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        color: '#ef4444',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <Trash2 size={14} /> 删除
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit / Create Modal */}
      {isModalOpen && editingBanner && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: 'rgba(5, 8, 15, 0.85)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
        }}>
          <div className="glass-panel" style={{
            maxWidth: '620px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            borderRadius: '24px',
            padding: '32px',
            border: '1px solid var(--border-color)',
            boxShadow: '0 25px 50px rgba(0,0,0,0.6)',
          }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: '20px' }}>
              {editingBanner.id ? '编辑轮播图 (Edit Banner Slide)' : '添加新轮播图 (Add New Banner Slide)'}
            </h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  角标标签 (Badge Text, 例: SMART RECHARGE SYSTEM)
                </label>
                <input
                  type="text"
                  required
                  value={editingBanner.badge || ''}
                  onChange={e => setEditingBanner({ ...editingBanner, badge: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid var(--border-color)',
                    color: '#fff',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  轮播大标题 (Hero Title)
                </label>
                <input
                  type="text"
                  required
                  placeholder="例: Stop Throwing Away Button Batteries"
                  value={editingBanner.title || ''}
                  onChange={e => setEditingBanner({ ...editingBanner, title: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid var(--border-color)',
                    color: '#fff',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  轮播副标题/描述 (Subtitle & Description)
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="例: High precision LIR2032 / LIR2450 smart USB dual-slot charger dock..."
                  value={editingBanner.subtitle || ''}
                  onChange={e => setEditingBanner({ ...editingBanner, subtitle: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid var(--border-color)',
                    color: '#fff',
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              <ImageUploader
                label="轮播大图背景图片 (Banner Slide Image)"
                value={editingBanner.image_url || ''}
                onChange={url => setEditingBanner({ ...editingBanner, image_url: url })}
                placeholder="点击或拖拽上传轮播图背景图片"
              />

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  亮眼卖点标签 (Highlight Tag, 例: 500+ Recharge Cycles • Auto 4.2V Cutoff)
                </label>
                <input
                  type="text"
                  placeholder="✓ 500+ Recharge Cycles"
                  value={editingBanner.highlight || ''}
                  onChange={e => setEditingBanner({ ...editingBanner, highlight: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid var(--border-color)',
                    color: '#fff',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                    按钮显示文字 (CTA Button Text)
                  </label>
                  <input
                    type="text"
                    value={editingBanner.cta_text || ''}
                    onChange={e => setEditingBanner({ ...editingBanner, cta_text: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid var(--border-color)',
                      color: '#fff',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                    按钮跳转链接 (CTA Link, 例: /#contact)
                  </label>
                  <input
                    type="text"
                    value={editingBanner.cta_link || ''}
                    onChange={e => setEditingBanner({ ...editingBanner, cta_link: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid var(--border-color)',
                      color: '#fff',
                    }}
                  />
                </div>
              </div>

              {/* Form Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-secondary"
                  style={{ padding: '10px 20px', fontSize: '0.9rem' }}
                >
                  取消
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary"
                  style={{ padding: '10px 24px', fontSize: '0.9rem' }}
                >
                  {saving ? '保存中...' : '保存轮播图'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
