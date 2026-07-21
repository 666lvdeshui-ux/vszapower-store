import React from 'react';
import Link from 'next/link';
import { getPosts } from '@/lib/supabase';
import { BookOpen, Clock, User, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Battery Academy | Rechargeable Coin Battery Guides & SEO Education',
  description: 'Learn everything about LIR2032, LIR2450, ML2032 coin batteries. Can you recharge CR2032? AirTag battery guide and electrochemistry specs.',
};

export const revalidate = 60;

export default async function AcademyListPage() {
  const posts = await getPosts();

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '60px 24px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <span className="badge badge-green" style={{ marginBottom: '12px' }}>
          BATTERY ACADEMY & SEO CONTENT HUB
        </span>
        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
          fontWeight: 800,
        }}>
          Rechargeable Coin Battery <br />
          <span className="gradient-text">Knowledge & Guides</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '640px', margin: '16px auto 0' }}>
          Authoritative technical breakdowns on LIR series cells, smart charging safety, and eco-friendly electrochemistry.
        </p>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '32px',
      }}>
        {posts.map((post) => (
          <article key={post.slug} className="glass-panel" style={{
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
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

            <div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <User size={14} /> {post.author}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={14} /> {post.read_time}
                  </span>
                </div>

                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 700, marginBottom: '12px', lineHeight: 1.4 }}>
                  <Link href={`/academy/${post.slug}`} style={{ color: '#fff', textDecoration: 'none' }}>
                    {post.title}
                  </Link>
                </h2>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '24px' }}>
                  {post.summary}
                </p>
              </div>

              <Link href={`/academy/${post.slug}`} className="btn-primary" style={{ padding: '12px 20px', fontSize: '0.9rem', width: 'fit-content' }}>
                Read Full Guide <ArrowRight size={16} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
