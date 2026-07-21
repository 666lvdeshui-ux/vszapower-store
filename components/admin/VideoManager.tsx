'use client';

import React, { useState } from 'react';
import { VideoItem, INITIAL_VIDEOS } from '@/components/VideoSection';
import ImageUploader from '@/components/admin/ImageUploader';
import { Plus, Edit2, Trash2, Video, Tag, Play, Check, RefreshCw } from 'lucide-react';

export default function VideoManager() {
  const [videos, setVideos] = useState<VideoItem[]>(INITIAL_VIDEOS);
  const [editingVideo, setEditingVideo] = useState<Partial<VideoItem> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [keywordsText, setKeywordsText] = useState('');

  const handleOpenAdd = () => {
    setEditingVideo({
      id: `vid_${Date.now()}`,
      title: '',
      duration: '00:30',
      video_url: 'https://assets.mixkit.co/videos/preview/mixkit-circuit-board-with-glowing-lines-41565-large.mp4',
      poster_url: '',
      keywords: ['#VSZAPOWER', '#纽扣电池充电器'],
      description: '',
    });
    setKeywordsText('#VSZAPOWER, #纽扣电池充电器');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (vid: VideoItem) => {
    setEditingVideo(vid);
    setKeywordsText(vid.keywords ? vid.keywords.join(', ') : '');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVideo || !editingVideo.title) return;

    const parsedKeywords = keywordsText
      .split(/[,，\n]/)
      .map(k => k.trim())
      .filter(Boolean)
      .map(k => k.startsWith('#') ? k : `#${k}`);

    const newVid: VideoItem = {
      id: editingVideo.id || `vid_${Date.now()}`,
      title: editingVideo.title,
      duration: editingVideo.duration || '00:30',
      video_url: editingVideo.video_url || '',
      poster_url: editingVideo.poster_url || '',
      keywords: parsedKeywords,
      description: editingVideo.description || '',
    };

    const index = videos.findIndex(v => v.id === newVid.id);
    if (index >= 0) {
      const updated = [...videos];
      updated[index] = newVid;
      setVideos(updated);
    } else {
      setVideos([newVid, ...videos]);
    }

    setIsModalOpen(false);
    alert('短视频发布/更新成功！');
  };

  const handleDelete = (id: string) => {
    if (!confirm('确定要删除该短视频吗？')) return;
    setVideos(videos.filter(v => v.id !== id));
  };

  return (
    <div>
      {/* Header & Add Button */}
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
            <Video size={24} color="#f59e0b" /> 产品短视频管理 (Short Video CMS)
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            管理首页“短视频”栏目，展示产品短视频、功能看点与多维标签关键词。
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="btn-primary"
          style={{ padding: '10px 18px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Plus size={18} /> 发布新短视频 (Add Short Video)
        </button>
      </div>

      {/* Video Cards Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {videos.map(vid => (
          <div
            key={vid.id}
            className="glass-panel"
            style={{
              padding: '20px',
              borderRadius: '16px',
              display: 'grid',
              gridTemplateColumns: '220px 1fr auto',
              gap: '20px',
              alignItems: 'center',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--border-color)',
            }}
          >
            {/* Poster Preview */}
            <div style={{
              height: '130px',
              borderRadius: '12px',
              overflow: 'hidden',
              background: '#090d16',
              position: 'relative',
              border: '1px solid var(--border-color)',
            }}>
              <img src={vid.poster_url || '/logo.svg'} alt={vid.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <span style={{
                position: 'absolute',
                bottom: '6px',
                right: '6px',
                background: 'rgba(0,0,0,0.85)',
                color: '#fff',
                fontSize: '0.7rem',
                padding: '2px 6px',
                borderRadius: '4px',
              }}>
                ⏱ {vid.duration}
              </span>
            </div>

            {/* Info */}
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
                {vid.title}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '10px', lineHeight: 1.4 }}>
                {vid.description}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {vid.keywords.map((kw, i) => (
                  <span key={i} style={{
                    background: 'rgba(6, 182, 212, 0.15)',
                    color: 'var(--accent-cyan)',
                    fontSize: '0.75rem',
                    padding: '2px 8px',
                    borderRadius: '12px',
                  }}>
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => handleOpenEdit(vid)}
                className="btn-secondary"
                style={{ padding: '6px 12px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <Edit2 size={14} /> 编辑
              </button>
              <button
                onClick={() => handleDelete(vid.id)}
                style={{
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#ef4444',
                  borderRadius: '8px',
                  padding: '6px 12px',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Editor */}
      {isModalOpen && editingVideo && (
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
            maxWidth: '650px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            borderRadius: '24px',
            padding: '32px',
            border: '1px solid var(--border-color)',
          }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '20px', color: '#fff' }}>
              {editingVideo.id ? '编辑短视频条目' : '发布新短视频条目'}
            </h3>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  视频标题 (Video Title)
                </label>
                <input
                  type="text"
                  required
                  placeholder="例: Vszapower 智能双槽 LIR2032 充电器 30分钟极速快充实测..."
                  value={editingVideo.title || ''}
                  onChange={e => setEditingVideo({ ...editingVideo, title: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid var(--border-color)',
                    color: '#fff',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                    视频时长 (Duration, 例: 00:45)
                  </label>
                  <input
                    type="text"
                    value={editingVideo.duration || '00:30'}
                    onChange={e => setEditingVideo({ ...editingVideo, duration: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid var(--border-color)',
                      color: '#fff',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                    视频文件/MP4 URL 链接
                  </label>
                  <input
                    type="text"
                    required
                    value={editingVideo.video_url || ''}
                    onChange={e => setEditingVideo({ ...editingVideo, video_url: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid var(--border-color)',
                      color: '#fff',
                    }}
                  />
                </div>
              </div>

              <ImageUploader
                label="视频封面/缩略图 (Poster Image Upload)"
                value={editingVideo.poster_url || ''}
                onChange={url => setEditingVideo({ ...editingVideo, poster_url: url })}
                placeholder="点击或拖拽上传视频封面图片"
              />

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  关键词列表 (用逗号分隔，如: #LIR2032快充, #车钥匙电池, #30分钟充满)
                </label>
                <input
                  type="text"
                  value={keywordsText}
                  onChange={e => setKeywordsText(e.target.value)}
                  placeholder="#LIR2032快充, #车钥匙电池, #智能指示灯"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid var(--border-color)',
                    color: '#fff',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  视频内容简介/看点说明 (Description)
                </label>
                <textarea
                  rows={3}
                  value={editingVideo.description || ''}
                  onChange={e => setEditingVideo({ ...editingVideo, description: e.target.value })}
                  placeholder="说明该视频展示的核心功能或体验点..."
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid var(--border-color)',
                    color: '#fff',
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-secondary"
                  style={{ padding: '10px 18px' }}
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ padding: '10px 24px', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Check size={16} /> 保存发布短视频
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
