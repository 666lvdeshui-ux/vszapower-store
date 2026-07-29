'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MOCK_POSTS } from '@/lib/supabase';
import { PostItem } from '@/lib/store';
import { BookOpen, Clock, ArrowRight, User, Calendar } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translateDynamicContent } from '@/lib/dynamicI18n';

export default function BlogPreview({ posts: initialPosts = MOCK_POSTS }) {
  const { lang, t } = useLanguage();
  const [posts, setPosts] = useState<PostItem[]>(initialPosts as unknown as PostItem[]);

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(json => {
        if (json.success && json.data && json.data.length > 0) {
          setPosts(json.data.filter((p: PostItem) => p.published));
        }
      })
      .catch(console.error);
  }, []);

  return (
    <section style={{
      padding: '80px 24px',
      maxWidth: '1280px',
      margin: '0 auto',
    }}>
      {/* Section Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <span className="badge badge-green" style={{ marginBottom: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <BookOpen size={14} /> {t('nav_academy')}
          </span>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 4vw, 2.5rem)',
            fontWeight: 800,
          }}>
            {t('academy_title')}
          </h2>
        </div>

        <Link href="/academy" className="btn-secondary" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
          {t('btn_read_more')} <ArrowRight size={16} />
        </Link>
      </div>

      {/* Blog List Items (列表式排版) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {posts.map((post) => {
          const translatedTitle = translateDynamicContent(post.title, lang);
          const translatedSummary = translateDynamicContent(post.summary, lang);
          const translatedCategory = translateDynamicContent(post.category, lang);

          return (
            <article
              key={post.slug}
              className="glass-panel blog-preview-list-item"
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(220px, 300px) 1fr',
                gap: '0',
                borderRadius: '16px',
                overflow: 'hidden',
                transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                border: '1px solid var(--border-color)',
              }}
            >
              {/* Left Thumbnail */}
              <div style={{ position: 'relative', overflow: 'hidden', minHeight: '200px' }}>
                <img
                  src={post.cover_image}
                  alt={translatedTitle}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                  className="preview-cover-img"
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
                  {translatedCategory}
                </span>
              </div>

              {/* Right Details */}
              <div style={{
                padding: '24px 28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '12px', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-green)', fontWeight: 600 }}>
                      <Calendar size={14} /> {post.created_at ? new Date(post.created_at).toISOString().split('T')[0] : '2026-07-29'}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <User size={14} style={{ color: 'var(--text-dim)' }} /> {post.author}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={14} style={{ color: 'var(--accent-cyan)' }} /> {post.read_time}
                    </span>
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    marginBottom: '10px',
                    lineHeight: 1.4,
                  }}>
                    <Link href={`/academy/${post.slug}`} style={{ color: '#fff', textDecoration: 'none' }} className="preview-title-link">
                      {translatedTitle}
                    </Link>
                  </h3>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '16px' }}>
                    {translatedSummary}
                  </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <Link
                    href={`/academy/${post.slug}`}
                    style={{
                      color: 'var(--accent-green)',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    {t('btn_read_more')} <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          article.blog-preview-list-item {
            grid-template-columns: 1fr !important;
          }
          .preview-cover-img {
            height: 180px !important;
          }
        }
        .preview-title-link:hover {
          color: var(--accent-green) !important;
        }
        article.blog-preview-list-item:hover .preview-cover-img {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
}
