import React from 'react';
import { getPostBySlug } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { User, Clock, Calendar, ArrowLeft, Zap, ShoppingBag } from 'lucide-react';
import type { Metadata } from 'next';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};

  const publishedTime = post.created_at ? new Date(post.created_at).toISOString() : new Date().toISOString();

  return {
    title: `${post.title} | Vszapower Battery Academy`,
    description: post.summary,
    authors: [{ name: post.author || 'Vszapower Tech Team' }],
    category: post.category || '纽扣电池充电器',
    keywords: post.tags || ['纽扣电池充电器', 'LIR2032', 'LIR2450', 'LIR2025', 'LIR2016', 'LIR1632', 'LIR1220', 'ML2032'],
    alternates: {
      canonical: `https://www.vszapower.com/academy/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      url: `https://www.vszapower.com/academy/${post.slug}`,
      siteName: 'Vszapower',
      images: [
        {
          url: post.cover_image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: 'article',
      publishedTime: publishedTime,
      authors: [post.author || 'Vszapower Tech Team'],
      tags: post.tags || ['纽扣电池充电器', 'LIR2032', 'LIR2450'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: [post.cover_image],
    },
  };
}

export default async function PostDetailPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const formattedDate = post.created_at
    ? new Date(post.created_at).toISOString().split('T')[0]
    : new Date().toISOString().split('T')[0];

  // Comprehensive Schema.org Article / TechArticle JSON-LD for Google & AI Search (GEO)
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.vszapower.com/academy/${post.slug}`,
    },
    headline: post.title,
    description: post.summary,
    image: [post.cover_image],
    datePublished: post.created_at || new Date().toISOString(),
    dateModified: post.updated_at || post.created_at || new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: post.author || 'Vszapower Tech Team',
      url: 'https://www.vszapower.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'VSZAPOWER',
      url: 'https://www.vszapower.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.vszapower.com/logo.png',
      },
    },
    articleSection: post.category || '纽扣电池充电器',
    keywords: post.tags ? post.tags.join(', ') : '纽扣电池充电器, LIR2032, LIR2450',
    inLanguage: 'zh-CN',
  };

  return (
    <article style={{ maxWidth: '860px', margin: '0 auto', padding: '60px 24px 100px' }}>
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
        <ArrowLeft size={16} /> 返回电池学院 (Back to Academy)
      </Link>

      {/* Title & Category Badge */}
      <div style={{ marginBottom: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <span className="badge badge-green">
          {post.category || '电池技术与指南'}
        </span>
      </div>

      <h1 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
        fontWeight: 800,
        lineHeight: 1.3,
        marginBottom: '20px',
        color: '#fff',
      }}>
        {post.title}
      </h1>

      {/* Publication Date, Author & Read Time Meta Row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        color: 'var(--text-muted)',
        fontSize: '0.9rem',
        paddingBottom: '20px',
        borderBottom: '1px solid var(--border-color)',
        marginBottom: '32px',
        flexWrap: 'wrap',
      }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--accent-green)', fontWeight: 600 }}>
          <Calendar size={16} /> 发布时间: <time dateTime={post.created_at || formattedDate}>{formattedDate}</time>
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <User size={16} color="var(--text-dim)" /> 作者: {post.author}
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
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
        background: '#070a12',
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
            选购 VSZAPOWER 纽扣电池专用智能充电器
          </h3>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '20px', lineHeight: 1.6 }}>
          支持 LIR2032 / LIR2450 / LIR2025 / LIR2016 / LIR1632 / LIR1220 / ML2032 全系列二次电池的 20mA 微电流安全充电与 4.2V Auto-Cut 防过充保护。
        </p>
        <Link href="/#contact" className="btn-primary" style={{ padding: '12px 24px' }}>
          <ShoppingBag size={18} /> 点击联系商务询价 (Contact for Wholesale Quote)
        </Link>
      </div>
    </article>
  );
}

// Markdown to HTML Formatter for blog posts
function formatMarkdown(content: string) {
  if (!content) return '';
  return content
    .replace(/^# (.*$)/gim, '<h1 style="font-size:1.8rem;font-weight:800;margin:28px 0 16px;color:#fff;">$1</h1>')
    .replace(/^## (.*$)/gim, '<h2 style="font-size:1.4rem;font-weight:700;margin:24px 0 14px;color:var(--accent-green);">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 style="font-size:1.15rem;font-weight:700;margin:20px 0 12px;color:#fff;">$1</h3>')
    .replace(/^> \[!WARNING\]\n> (.*$)/gim, '<blockquote style="border-left:4px solid #ef4444;background:rgba(239,68,68,0.1);padding:14px 18px;border-radius:8px;margin:20px 0;color:#fff;"><strong style="color:#ef4444;">⚠️ 安全警告 WARNING:</strong> $1</blockquote>')
    .replace(/^> \[!IMPORTANT\]\n> (.*$)/gim, '<blockquote style="border-left:4px solid var(--accent-green);background:rgba(0,230,153,0.1);padding:14px 18px;border-radius:8px;margin:20px 0;color:#fff;"><strong style="color:var(--accent-green);">💡 核心重点 IMPORTANT:</strong> $1</blockquote>')
    .replace(/^> (.*$)/gim, '<blockquote style="border-left:4px solid var(--accent-cyan);background:rgba(255,255,255,0.03);padding:14px 18px;border-radius:8px;margin:20px 0;">$1</blockquote>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong style="color:#fff;">$1</strong>')
    .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" style="color:var(--accent-green);font-weight:700;text-decoration:underline;">$1</a>')
    .replace(/\n\n/g, '<p style="margin-bottom:16px;line-height:1.8;color:var(--text-muted);"></p>');
}
