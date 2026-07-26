'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { PostItem } from '@/lib/store';
import { Search, Clock, User, ArrowRight, List, LayoutGrid, BookOpen } from 'lucide-react';

interface AcademyListClientProps {
  posts: PostItem[];
}

export default function AcademyListClient({ posts }: AcademyListClientProps) {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    posts.forEach(p => {
      if (p.category) set.add(p.category);
    });
    return ['全部', ...Array.from(set)];
  }, [posts]);

  // Filtered posts
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesCategory = selectedCategory === '全部' || post.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery = !q || 
        post.title.toLowerCase().includes(q) ||
        post.summary.toLowerCase().includes(q) ||
        (post.tags && post.tags.some(t => t.toLowerCase().includes(q)));
      return matchesCategory && matchesQuery;
    });
  }, [posts, selectedCategory, searchQuery]);

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '50px 24px 80px' }}>
      {/* Header / Hero Section */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <span className="badge badge-green" style={{ marginBottom: '14px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <BookOpen size={14} /> BATTERY ACADEMY & KNOWLEDGE HUB
        </span>
        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
          fontWeight: 800,
          lineHeight: 1.2,
          marginBottom: '16px',
        }}>
          可充电纽扣电池知识库 <br />
          <span className="gradient-text">与技术选型指南</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '680px', margin: '0 auto', lineHeight: 1.6 }}>
          为您提供 LIR2032 / LIR2450 系列扣式电池电化学解析、微电流脉冲智能充电原理、AirTag 等设备兼容性实测及环保降本方案。
        </p>
      </div>

      {/* Control Bar: Search, Category Filters & View Toggle */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(16px)',
        border: '1px solid var(--border-color)',
        borderRadius: '16px',
        padding: '20px 24px',
        marginBottom: '40px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
      }}>
        {/* Top Control Line: Search & View Switcher */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          {/* Search Box */}
          <div style={{
            position: 'relative',
            flex: '1 1 300px',
            maxWidth: '480px',
          }}>
            <Search size={18} style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)',
            }} />
            <input
              type="text"
              placeholder="搜索指南、设备关键词 (例: CR2032, AirTag, 充放电)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px 12px 42px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#fff',
                fontSize: '0.95rem',
                outline: 'none',
                transition: 'all 0.25s ease',
              }}
            />
          </div>

          {/* View Mode Toggle Buttons */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.04)',
            padding: '4px',
            borderRadius: '10px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}>
            <button
              onClick={() => setViewMode('list')}
              title="列表排版 (List View)"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '0.88rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                background: viewMode === 'list' ? 'var(--accent-green)' : 'transparent',
                color: viewMode === 'list' ? '#041410' : 'var(--text-muted)',
              }}
            >
              <List size={16} /> 列表式
            </button>
            <button
              onClick={() => setViewMode('grid')}
              title="网格排版 (Grid View)"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '0.88rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                background: viewMode === 'grid' ? 'var(--accent-green)' : 'transparent',
                color: viewMode === 'grid' ? '#041410' : 'var(--text-muted)',
              }}
            >
              <LayoutGrid size={16} /> 网格式
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, marginRight: '4px' }}>
            分类筛选：
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '6px 14px',
                borderRadius: '20px',
                border: '1px solid',
                borderColor: selectedCategory === cat ? 'var(--accent-green)' : 'rgba(255, 255, 255, 0.1)',
                background: selectedCategory === cat ? 'rgba(0, 230, 153, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                color: selectedCategory === cat ? 'var(--accent-green)' : 'var(--text-muted)',
                fontSize: '0.85rem',
                fontWeight: selectedCategory === cat ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          共找到 <strong style={{ color: 'var(--accent-green)' }}>{filteredPosts.length}</strong> 篇指南文章
        </p>
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '60px 24px' }}>
          <BookOpen size={48} style={{ color: 'var(--text-muted)', marginBottom: '16px', opacity: 0.5 }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>未找到相关技术指南</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            请尝试更换关键词或清除分类筛选条件。
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('全部'); }}
            className="btn-secondary"
            style={{ marginTop: '20px', padding: '8px 20px', fontSize: '0.9rem' }}
          >
            重置筛选条件
          </button>
        </div>
      )}

      {/* Articles Container - LIST VIEW (列表式排版) */}
      {viewMode === 'list' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="glass-panel academy-list-article"
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(240px, 320px) 1fr',
                gap: '0',
                borderRadius: '16px',
                overflow: 'hidden',
                transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                border: '1px solid var(--border-color)',
              }}
            >
              {/* Left Column: Image & Badge */}
              <div style={{ position: 'relative', overflow: 'hidden', minHeight: '220px' }}>
                <img
                  src={post.cover_image}
                  alt={post.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                  className="list-cover-img"
                />
                <span style={{
                  position: 'absolute',
                  top: '14px',
                  left: '14px',
                  background: 'rgba(10, 13, 20, 0.88)',
                  color: 'var(--accent-green)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  padding: '4px 12px',
                  borderRadius: '6px',
                  border: '1px solid rgba(0, 230, 153, 0.3)',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                }}>
                  {post.category}
                </span>
              </div>

              {/* Right Column: Article Details */}
              <div style={{
                padding: '28px 32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
                <div>
                  {/* Tags & Meta Row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                        <User size={14} style={{ color: 'var(--accent-green)' }} /> {post.author}
                      </span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                        <Clock size={14} style={{ color: 'var(--accent-green)' }} /> {post.read_time}
                      </span>
                    </div>

                    {/* Tag Pills */}
                    {post.tags && post.tags.length > 0 && (
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            style={{
                              fontSize: '0.75rem',
                              color: 'rgba(255, 255, 255, 0.65)',
                              background: 'rgba(255, 255, 255, 0.05)',
                              padding: '2px 8px',
                              borderRadius: '4px',
                              border: '1px solid rgba(255, 255, 255, 0.08)',
                            }}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h2 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.35rem',
                    fontWeight: 700,
                    marginBottom: '12px',
                    lineHeight: 1.4,
                  }}>
                    <Link
                      href={`/academy/${post.slug}`}
                      style={{
                        color: '#fff',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease',
                      }}
                      className="hover-green-text"
                    >
                      {post.title}
                    </Link>
                  </h2>

                  {/* Excerpt Summary */}
                  <p style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.95rem',
                    lineHeight: 1.65,
                    marginBottom: '20px',
                  }}>
                    {post.summary}
                  </p>
                </div>

                {/* Footer Action Button */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <Link
                    href={`/academy/${post.slug}`}
                    className="btn-primary"
                    style={{
                      padding: '10px 22px',
                      fontSize: '0.88rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    阅读完整指南 <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        /* ARTICLES CONTAINER - GRID VIEW (网格式排版) */
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '32px',
        }}>
          {filteredPosts.map((post) => (
            <article key={post.slug} className="glass-panel" style={{
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              borderRadius: '16px',
            }}>
              <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={post.cover_image}
                  alt={post.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  background: 'rgba(10, 13, 20, 0.85)',
                  color: 'var(--accent-green)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: '1px solid var(--border-color)',
                }}>
                  {post.category}
                </span>
              </div>

              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <User size={14} /> {post.author}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={14} /> {post.read_time}
                    </span>
                  </div>

                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px', lineHeight: 1.4 }}>
                    <Link href={`/academy/${post.slug}`} style={{ color: '#fff', textDecoration: 'none' }}>
                      {post.title}
                    </Link>
                  </h2>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '20px' }}>
                    {post.summary}
                  </p>
                </div>

                <Link href={`/academy/${post.slug}`} className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.88rem', width: 'fit-content' }}>
                  阅读完整指南 <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Inline Styles for List View Responsive behavior & hover states */}
      <style jsx global>{`
        @media (max-width: 768px) {
          article.academy-list-article {
            grid-template-columns: 1fr !important;
          }
          .list-cover-img {
            height: 200px !important;
          }
        }
        .hover-green-text:hover {
          color: var(--accent-green) !important;
        }
        article.glass-panel:hover {
          border-color: rgba(0, 230, 153, 0.4) !important;
          box-shadow: 0 12px 36px rgba(0, 230, 153, 0.08) !important;
        }
        article.glass-panel:hover .list-cover-img {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}
