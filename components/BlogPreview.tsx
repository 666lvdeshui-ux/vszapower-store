'use client';
import { localizePost } from '@/lib/postI18n';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PostItem } from '@/lib/store';
import { BookOpen, Clock, ArrowRight, User, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translateDynamicContent } from '@/lib/dynamicI18n';

export default function BlogPreview({ posts: initialPosts = [] }: {posts?: PostItem[]}) {
  const { lang, t } = useLanguage();
  const [posts, setPosts] = useState<PostItem[]>(initialPosts as unknown as PostItem[]);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 3;

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

  const visiblePosts = lang === 'en' ? posts.filter(p => !/[\u3400-\u9fff]/.test(localizePost(p,lang).title+' '+localizePost(p,lang).summary)) : posts;
  const totalPages = Math.ceil(visiblePosts.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPosts = visiblePosts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const element = document.getElementById('blog-preview-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="blog-preview-section" style={{
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
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '6px' }}>
            {translateDynamicContent('Rechargeable coin cell selection, device voltage requirements and charger configuration guides.', lang)}
          </p>
        </div>

        <Link href="/academy" className="btn-secondary" style={{ padding: '10px 20px', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          {t('btn_read_more')} <ArrowRight size={16} />
        </Link>
      </div>

      {/* 3-Column Card Grid (3 Articles per Page) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
        gap: '24px',
        marginBottom: '40px',
      }}>
        {currentPosts.map((post) => {
          const localized = localizePost(post, lang);
            const translatedTitle = localized.title;
          const translatedSummary = localized.summary;
          const translatedCategory = lang==='en' && /[\u3400-\u9fff]/.test(localized.category) ? 'Battery Academy' : localized.category;

          return (
            <article
              key={post.slug}
              className="glass-panel"
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid var(--border-color)',
                boxShadow: '0 12px 30px rgba(0,0,0,0.3)',
                transition: 'transform 0.3s ease, border-color 0.3s ease',
              }}
            >
              <div>
                {/* Top Image Box with Badge */}
                <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '16 / 9', background: '#090d16' }}>
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
                    backdropFilter: 'blur(8px)',
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

                {/* Article Meta & Content */}
                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '10px', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-green)', fontWeight: 600 }}>
                      <Calendar size={13} /> {post.created_at ? new Date(post.created_at).toISOString().split('T')[0] : '2026-07-29'}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={13} style={{ color: 'var(--accent-cyan)' }} /> {lang==='en' && /[\u3400-\u9fff]/.test(post.read_time)?`${parseInt(post.read_time)||5} min read`:post.read_time}
                    </span>
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    marginBottom: '10px',
                    lineHeight: 1.4,
                  }}>
                    <Link href={`/academy/${post.slug}`} style={{ color: 'var(--text-main)', textDecoration: 'none' }} className="preview-title-link">
                      {translatedTitle}
                    </Link>
                  </h3>

                  <p style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.88rem',
                    lineHeight: 1.6,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                    {translatedSummary}
                  </p>
                </div>
              </div>

              {/* Card Footer Link */}
              <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255, 255, 255, 0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <User size={13} /> {post.author}
                </span>
                <Link
                  href={`/academy/${post.slug}`}
                  style={{
                    color: 'var(--accent-green)',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  {t('btn_read_more')} <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      {/* Homepage Pagination Controls Bar */}
      {totalPages > 1 && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          paddingTop: '20px',
          borderTop: '1px solid var(--border-color)',
        }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {translateDynamicContent(`Showing ${startIndex + 1}-${Math.min(startIndex + ITEMS_PER_PAGE, visiblePosts.length)} of ${visiblePosts.length} articles`, lang)}
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              style={{
                padding: '6px 14px',
                fontSize: '0.82rem',
                fontWeight: 600,
                borderRadius: '8px',
                background: currentPage === 1 ? 'rgba(255,255,255,0.03)' : 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                color: currentPage === 1 ? 'var(--text-dim)' : 'var(--text-main)',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <ChevronLeft size={14} /> Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  fontWeight: currentPage === page ? 700 : 500,
                  background: currentPage === page ? 'var(--accent-green)' : 'var(--bg-card)',
                  color: currentPage === page ? '#000' : 'var(--text-main)',
                  border: currentPage === page ? '1px solid var(--accent-green)' : '1px solid var(--border-color)',
                  cursor: 'pointer',
                  boxShadow: currentPage === page ? '0 0 10px rgba(16, 185, 129, 0.4)' : 'none',
                }}
              >
                {page}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              style={{
                padding: '6px 14px',
                fontSize: '0.82rem',
                fontWeight: 600,
                borderRadius: '8px',
                background: currentPage === totalPages ? 'rgba(255,255,255,0.03)' : 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                color: currentPage === totalPages ? 'var(--text-dim)' : 'var(--text-main)',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        .preview-title-link:hover {
          color: var(--accent-green) !important;
        }
        article:hover .preview-cover-img {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
}
