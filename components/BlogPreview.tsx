'use client';

import React from 'react';
import Link from 'next/link';
import { MOCK_POSTS } from '@/lib/supabase';
import { BookOpen, Clock, ArrowRight, User } from 'lucide-react';

export default function BlogPreview({ posts = MOCK_POSTS }) {
  return (
    <section style={{
      padding: '80px 24px',
      maxWidth: '1280px',
      margin: '0 auto',
    }}>
      {/* Section Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <span className="badge badge-green" style={{ marginBottom: '12px' }}>
            BATTERY ACADEMY (CONTENT HUB)
          </span>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 4vw, 2.5rem)',
            fontWeight: 800,
          }}>
            Learn & Save: <span className="gradient-text">Latest Technical Guides</span>
          </h2>
        </div>

        <Link href="/academy" className="btn-secondary" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
          View All Academy Guides <ArrowRight size={16} />
        </Link>
      </div>

      {/* Blog Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '32px',
      }}>
        {posts.map((post) => (
          <article key={post.slug} className="glass-panel" style={{
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}>
            <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
              <img
                src={post.cover_image}
                alt={post.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <User size={14} /> {post.author}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={14} /> {post.read_time}
                  </span>
                </div>

                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 700, marginBottom: '10px', lineHeight: 1.4 }}>
                  <Link href={`/academy/${post.slug}`} style={{ color: '#fff', textDecoration: 'none' }}>
                    {post.title}
                  </Link>
                </h3>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px' }}>
                  {post.summary}
                </p>
              </div>

              <Link href={`/academy/${post.slug}`} style={{
                color: 'var(--accent-green)',
                fontWeight: 700,
                fontSize: '0.9rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}>
                Read Article <ArrowRight size={16} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
