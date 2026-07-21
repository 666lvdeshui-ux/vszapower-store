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
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
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
          <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{label}</label>
          <div style={{ display: 'flex', gap: '8px', fontSize: '0.75rem' }}>
            <button
              type="button"
              onClick={() => setMode('upload')}
              style={{
                background: 'none',
                border: 'none',
                color: mode === 'upload' ? 'var(--accent-green)' : 'var(--text-dim)',
                fontWeight: mode === 'upload' ? 700 : 400,
                cursor: 'pointer',
              }}
            >
              📁 本地上传
            </button>
            <span style={{ color: 'var(--border-color)' }}>|</span>
            <button
              type="button"
              onClick={() => setMode('url')}
              style={{
                background: 'none',
                border: 'none',
                color: mode === 'url' ? 'var(--accent-cyan)' : 'var(--text-dim)',
                fontWeight: mode === 'url' ? 700 : 400,
                cursor: 'pointer',
              }}
            >
              🔗 网络 URL
            </button>
          </div>
        </div>
      )}

      {/* Mode 1: File Upload */}
      {mode === 'upload' ? (
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: 'none' }}
          />

          {value ? (
            <div style={{
              position: 'relative',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid var(--border-color)',
              background: '#0d121c',
              height: '140px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <img src={value} alt="Uploaded Preview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              
              <div style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                display: 'flex',
                gap: '6px',
              }}>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    background: 'rgba(10, 13, 20, 0.85)',
                    border: '1px solid var(--border-color)',
                    color: '#fff',
                    borderRadius: '6px',
                    padding: '4px 8px',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Upload size={12} /> 更换图片
                </button>
                <button
                  type="button"
                  onClick={() => onChange('')}
                  style={{
                    background: 'rgba(239, 68, 68, 0.85)',
                    border: 'none',
                    color: '#fff',
                    borderRadius: '6px',
                    width: '26px',
                    height: '26px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={e => e.preventDefault()}
              onDrop={handleDrop}
              style={{
                border: '2px dashed var(--border-color)',
                borderRadius: '12px',
                padding: '24px 16px',
                textAlign: 'center',
                background: 'rgba(255,255,255,0.02)',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {uploading ? (
                <div style={{ color: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Loader2 size={20} className="animate-spin" /> 上传处理中...
                </div>
              ) : (
                <div>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'rgba(16, 185, 129, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 10px',
                  }}>
                    <Upload size={20} color="var(--accent-green)" />
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff', marginBottom: '4px' }}>
                    {placeholder}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                    支持选图上传 PNG, JPG, WEBP, SVG 文件
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        /* Mode 2: Direct URL Input */
        <input
          type="url"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="https://..."
          style={{
            width: '100%',
            padding: '10px 14px',
            borderRadius: '10px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid var(--border-color)',
            color: '#fff',
            fontSize: '0.9rem',
          }}
        />
      )}
    </div>
  );
}
