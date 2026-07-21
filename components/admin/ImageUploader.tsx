'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Link as LinkIcon, Check, Loader2 } from 'lucide-react';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  placeholder?: string;
}

export default function ImageUploader({ value, onChange, label = '上传图片', placeholder = '点击或拖拽上传本地图片' }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await processFile(file);
  };

  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('请选择有效的图片文件 (PNG, JPG, WEBP, SVG 等)');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const json = await res.json();

      if (json.success && json.url) {
        onChange(json.url);
      } else {
        alert('图片上传失败，请重试');
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('图片上传发生异常');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  return (
    <div style={{ marginBottom: '16px' }}>
      {label && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>{label}</label>
          <button
            type="button"
            onClick={() => setShowUrlInput(!showUrlInput)}
            style={{
              background: 'none',
              border: 'none',
              color: showUrlInput ? 'var(--accent-green)' : 'var(--text-dim)',
              fontSize: '0.75rem',
              cursor: 'pointer',
            }}
          >
            {showUrlInput ? '✓ 隐藏 URL 输入框' : '🔗 输入网络 URL'}
          </button>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: 'none' }}
      />

      {/* Visual Box */}
      {value ? (
        <div style={{
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          overflow: 'hidden',
          background: '#0d121c',
          padding: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '8px',
            overflow: 'hidden',
            background: '#05080f',
            flexShrink: 0,
            border: '1px solid var(--border-color)',
          }}>
            <img src={value} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--accent-green)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Check size={14} /> 图片就绪 (已上传/选中)
            </div>
            
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="btn-primary"
                style={{
                  padding: '6px 12px',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                {uploading ? (
                  <>
                    <Loader2 size={12} className="animate-spin" /> 上传中...
                  </>
                ) : (
                  <>
                    <Upload size={12} /> 从电脑重新上传图片
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => onChange('')}
                style={{
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#ef4444',
                  borderRadius: '6px',
                  padding: '6px 10px',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                }}
              >
                移除
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Empty Upload Zone */
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={e => e.preventDefault()}
          onDrop={handleDrop}
          style={{
            border: '2px dashed var(--accent-green)',
            borderRadius: '12px',
            padding: '24px 16px',
            textAlign: 'center',
            background: 'rgba(16, 185, 129, 0.05)',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          {uploading ? (
            <div style={{ color: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Loader2 size={20} className="animate-spin" /> 正在读取并上传本地图片...
            </div>
          ) : (
            <div>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'var(--accent-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 10px',
                boxShadow: 'var(--accent-glow)',
              }}>
                <Upload size={22} color="#041410" />
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>
                📁 {placeholder}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                点击打开电脑相册，或将图片文件拖拽至此处 (PNG, JPG, WEBP, SVG)
              </div>
            </div>
          )}
        </div>
      )}

      {/* Optional URL Input if toggled */}
      {showUrlInput && (
        <div style={{ marginTop: '8px' }}>
          <input
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder="粘贴外部图片网络 URL 链接 (如 https://...)"
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--border-color)',
              color: '#fff',
              fontSize: '0.8rem',
            }}
          />
        </div>
      )}
    </div>
  );
}
