import React from 'react';
import { getPostBySlug, getPosts } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { User, Clock, ArrowLeft, Zap, ShieldCheck, ShoppingBag } from 'lucide-react';
import type { Metadata } from 'next';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: `${post.title} | Vszapower Academy`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      images: [post.cover_image],
    },
  };
}

export default async function PostDetailPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  // JSON-LD Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: post.title,
    description: post.summary,
    image: post.cover_image,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Vszapower',
      logo: {
        '@type': 'ImageObject',
        url: 'https://vszapower.vercel.app/logo.png',
      },
    },
    datePublished: post.created_at,
  };

  return (
    <article style={{ maxWidth: '860px', margin: '0 auto', padding: '60px 24px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Back Button */}
      <Link href="/academy" style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        color: 'var(--text-muted)',
        textDecoration: 'none',
        fontSize: '0.9rem',
        marginBottom: '30px',
      }}>
        <ArrowLeft size={16} /> Back to Battery Academy
      </Link>

      {/* Title & Metadata */}
      <span className="badge badge-green" style={{ marginBottom: '16px' }}>
        {post.category}
      </span>
      <h1 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 'clamp(2rem, 4vw, 3rem)',
        fontWeight: 800,
        lineHeight: 1.2,
        marginBottom: '20px',
      }}>
        {post.title}
      </h1>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        color: 'var(--text-muted)',
        fontSize: '0.9rem',
        paddingBottom: '24px',
        borderBottom: '1px solid var(--border-color)',
        marginBottom: '40px',
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <User size={16} color="var(--accent-green)" /> {post.author}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Clock size={16} color="var(--accent-cyan)" /> {post.read_time}
        </span>
      </div>

      {/* Cover Image */}
      <div style={{
        borderRadius: '16px',
        overflow: 'hidden',
        height: '380px',
        marginBottom: '40px',
        border: '1px solid var(--border-color)',
      }}>
        <img
          src={post.cover_image}
          alt={post.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Content Rendering */}
      <div className="markdown-content">
        <div dangerouslySetInnerHTML={{ __html: formatMarkdown(post.content) }} />
      </div>

      {/* In-Article Conversion Card (Product Callout) */}
      <div className="kraft-card" style={{ padding: '32px', marginTop: '60px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <Zap size={24} color="var(--accent-green)" />
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>
            Ready to switch to LIR2032 Rechargeable Batteries?
          </h3>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '20px' }}>
          Get the official Vszapower Smart Dock + 4x LIR2032 batteries starter kit with eco kraft gift packaging and 2-year warranty protection.
        </p>
        <Link href="/#contact" className="btn-primary">
          <ShoppingBag size={18} /> 联系我们 (Contact Us for Starter Kit)
        </Link>
      </div>
    </article>
  );
}

// Simple Markdown to HTML Formatter for blog posts
function formatMarkdown(content: string) {
  return content
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^> \[!WARNING\]\n> (.*$)/gim, '<blockquote style="border-color:#ef4444;background:rgba(239,68,68,0.1);"><strong style="color:#ef4444;">WARNING:</strong> $1</blockquote>')
    .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
    .replace(/\*\*(.* vast majority.*)\*\*/gim, '<strong style="color:var(--accent-green);">$1</strong>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" style="color:var(--accent-green);font-weight:700;">$1</a>')
    .replace(/\n\n/g, '<p></p>');
}
