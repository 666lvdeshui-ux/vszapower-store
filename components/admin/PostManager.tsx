'use client';

import React, { useState, useEffect } from 'react';
import { PostItem } from '@/lib/store';
import { Plus, Edit3, Trash2, Eye, BookOpen, User, Clock, FileText, CheckCircle, XCircle } from 'lucide-react';

export default function PostManager() {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<Partial<PostItem> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/posts');
      const json = await res.json();
      if (json.success) {
        setPosts(json.data);
      }
    } catch (e) {
      console.error('Failed to load posts:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleOpenAdd = () => {
    setEditingPost({
      id: '',
      title: '',
      slug: '',
      summary: '',
      category: 'Battery Academy',
      cover_image: 'https://images.unsplash.com/photo-1619725002198-6a689b72f41d?auto=format&fit=crop&w=1200&q=80',
      author: 'Dr. Alex Vance, Electrochemistry Lead',
      read_time: '6 min read',
      published: true,
      content: `# Title of Your Article\n\nWrite your informative article about rechargeable coin cells, LIR vs CR series, or AirTag power optimization here...`,
    });
    setIsPreview(false);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (post: PostItem) => {
    setEditingPost({ ...post });
    setIsPreview(false);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    try {
      const res = await fetch(`/api/posts?id=${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        setPosts(prev => prev.filter(p => p.id !== id));
      }
    } catch (e) {
      console.error('Failed to delete post:', e);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;
    setSaveStatus('Publishing article...');
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingPost),
      });
      const json = await res.json();
      if (json.success) {
        setSaveStatus('Article published successfully!');
        setTimeout(() => setSaveStatus(null), 2000);
        setIsModalOpen(false);
        loadPosts();
      } else {
        setSaveStatus(`Error: ${json.error}`);
      }
    } catch (e) {
      setSaveStatus('Failed to save article');
    }
  };

  return (
    <div style={{ color: '#fff' }}>
      {/* Header Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
            Battery Academy Content Hub
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Write technical guides, SEO articles & battery comparison posts for customer education.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="btn-primary"
          style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Plus size={18} /> Write New Article
        </button>
      </div>

      {/* Post List */}
      {loading ? (
        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
          Loading articles...
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {posts.map(post => (
            <div key={post.id} className="glass-panel" style={{
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '20px',
              flexWrap: 'wrap'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1, minWidth: '300px' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  flexShrink: 0,
                  background: '#0d121c',
                  border: '1px solid var(--border-color)'
                }}>
                  <img src={post.cover_image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>
                      {post.category}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: post.published ? 'var(--accent-green)' : 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {post.published ? <CheckCircle size={12} /> : <XCircle size={12} />}
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '4px' }}>
                    {post.title}
                  </h3>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <span>By {post.author}</span>
                    <span>• {post.read_time}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <a
                  href={`/academy/${post.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                  style={{ padding: '8px 14px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Eye size={14} /> View Live
                </a>
                <button
                  onClick={() => handleOpenEdit(post)}
                  className="btn-secondary"
                  style={{ padding: '8px 14px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Edit3 size={14} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  style={{
                    background: 'rgba(239, 68, 68, 0.15)',
                    color: '#ef4444',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Editor Modal */}
      {isModalOpen && editingPost && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(8px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div className="glass-panel" style={{
            width: '100%',
            maxWidth: '850px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '32px',
            borderRadius: '16px',
            position: 'relative',
            background: 'rgba(10, 13, 20, 0.95)',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>
                {editingPost.id ? 'Edit Article' : 'Write New Academy Article'}
              </h3>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => setIsPreview(!isPreview)}
                  className="btn-secondary"
                  style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                >
                  {isPreview ? '✏️ Back to Edit' : '👁 Live Preview'}
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}
                >
                  ✕
                </button>
              </div>
            </div>

            {isPreview ? (
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '24px', borderRadius: '12px', color: '#fff', border: '1px solid var(--border-color)' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '12px' }}>{editingPost.title}</h1>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
                  By {editingPost.author} • {editingPost.read_time}
                </div>
                <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.7, color: 'var(--text-main)' }}>
                  {editingPost.content}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Article Title</label>
                  <input
                    type="text"
                    required
                    value={editingPost.title || ''}
                    onChange={e => setEditingPost({ ...editingPost, title: e.target.value })}
                    placeholder="e.g. CR2032 vs LIR2032: Can You Recharge Them?"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid var(--border-color)',
                      color: '#fff'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>URL Slug</label>
                    <input
                      type="text"
                      value={editingPost.slug || ''}
                      onChange={e => setEditingPost({ ...editingPost, slug: e.target.value })}
                      placeholder="cr2032-vs-lir2032-guide"
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid var(--border-color)',
                        color: '#fff'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Category</label>
                    <input
                      type="text"
                      value={editingPost.category || 'Battery Academy'}
                      onChange={e => setEditingPost({ ...editingPost, category: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid var(--border-color)',
                        color: '#fff'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Author Name & Title</label>
                    <input
                      type="text"
                      value={editingPost.author || ''}
                      onChange={e => setEditingPost({ ...editingPost, author: e.target.value })}
                      placeholder="Dr. Alex Vance, Electrochemistry Lead"
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid var(--border-color)',
                        color: '#fff'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Estimated Read Time</label>
                    <input
                      type="text"
                      value={editingPost.read_time || '5 min read'}
                      onChange={e => setEditingPost({ ...editingPost, read_time: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid var(--border-color)',
                        color: '#fff'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Cover Image URL</label>
                  <input
                    type="text"
                    value={editingPost.cover_image || ''}
                    onChange={e => setEditingPost({ ...editingPost, cover_image: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid var(--border-color)',
                      color: '#fff'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Article Summary / Excerpt</label>
                  <textarea
                    rows={2}
                    value={editingPost.summary || ''}
                    onChange={e => setEditingPost({ ...editingPost, summary: e.target.value })}
                    placeholder="Short summary for card previews..."
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid var(--border-color)',
                      color: '#fff',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Article Content (Markdown Supported)</label>
                  <textarea
                    rows={8}
                    required
                    value={editingPost.content || ''}
                    onChange={e => setEditingPost({ ...editingPost, content: e.target.value })}
                    placeholder="Write Markdown content..."
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid var(--border-color)',
                      color: '#fff',
                      fontFamily: 'monospace',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    id="publishedCheck"
                    checked={Boolean(editingPost.published)}
                    onChange={e => setEditingPost({ ...editingPost, published: e.target.checked })}
                    style={{ width: '18px', height: '18px', accentColor: 'var(--accent-green)' }}
                  />
                  <label htmlFor="publishedCheck" style={{ fontSize: '0.9rem', cursor: 'pointer' }}>
                    Publish Article Instantly to Battery Academy
                  </label>
                </div>

                {saveStatus && (
                  <div style={{ color: saveStatus.includes('Error') ? '#ef4444' : 'var(--accent-green)', fontSize: '0.85rem' }}>
                    {saveStatus}
                  </div>
                )}

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '12px' }}>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="btn-secondary"
                    style={{ padding: '10px 20px' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ padding: '10px 24px' }}
                  >
                    Publish Article
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
