'use client';

import React from 'react';
import Link from 'next/link';
import { PostItem } from '@/lib/store';
import { ArrowLeft, Clock, User, Calendar, Zap, ShoppingBag } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { localizePost, originalNotice } from '@/lib/postI18n';
import { translateDynamicContent } from '@/lib/dynamicI18n';

interface AcademyArticleClientProps {
  post: PostItem;
  formattedDate: string;
}

export default function AcademyArticleClient({ post, formattedDate }: AcademyArticleClientProps) {
  const { lang, t } = useLanguage();

  const localized = localizePost(post, lang);
  const translatedTitle = localized.title;
  const translatedSummary = localized.summary;
  const translatedCategory = localized.category;
  const formattedContentHtml = formatMarkdownWithI18n(localized.content, lang);


  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: translatedTitle,
    description: translatedSummary,
    image: [post.cover_image],
    datePublished: post.created_at || new Date().toISOString(),
    dateModified: post.created_at || new Date().toISOString(),
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
    articleSection: translatedCategory,
    keywords: post.tags ? post.tags.join(', ') : 'Coin Cell Charger, LIR2032, LIR2450',
    inLanguage: localized.showingOriginal ? (/[\u3400-\u9fff]/.test(post.content) ? 'zh-CN' : 'en') : lang,
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
        <ArrowLeft size={16} /> {t('btn_back_to_academy')}
      </Link>

      {/* Category Badge */}
      <div style={{ marginBottom: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <span className="badge badge-green">
          {translatedCategory || 'Battery Technology Guide'}
        </span>
      </div>

      <h1 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
        fontWeight: 800,
        lineHeight: 1.3,
        marginBottom: '20px',
        color: 'var(--text-main)',
      }}>
        {translatedTitle}
      </h1>

      {/* Meta Row */}
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
          <Calendar size={16} /> {translateDynamicContent('发布时间', lang)}: <time dateTime={post.created_at || formattedDate}>{formattedDate}</time>
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <User size={16} color="var(--text-dim)" /> {translateDynamicContent('作者', lang)}: {post.author}
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <Clock size={16} color="var(--accent-cyan)" /> {post.read_time}
        </span>
      </div>

      {/* Cover Image */}
      <div style={{
        borderRadius: '16px',
        overflow: 'hidden',
        width: '100%',
        aspectRatio: '16 / 9',
        marginBottom: '40px',
        border: '1px solid var(--border-color)',
        background: '#070a12',
      }}>
        <img
          src={post.cover_image}
          alt={translatedTitle}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Content Rendering with Real-time i18n Translation */}
      {localized.showingOriginal && <p role="status">{originalNotice[lang] || originalNotice.en}</p>}
      <div className="markdown-content">
        <div dangerouslySetInnerHTML={{ __html: formattedContentHtml }} />
      </div>

      {/* Bottom CTA Card */}
      <div className="kraft-card" style={{ padding: '32px', marginTop: '60px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <Zap size={24} color="var(--accent-green)" />
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>
            {translateDynamicContent('选购 VSZAPOWER 纽扣电池专用智能充电器', lang)}
          </h3>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '20px', lineHeight: 1.6 }}>
          {translateDynamicContent('支持 LIR2032 / LIR2450 / LIR2025 / LIR2016 / LIR1632 / LIR1220 / ML2032 全系列二次电池的 20mA 微电流安全充电与 4.2V Auto-Cut 防过充保护。', lang)}
        </p>
        <Link href="/#contact" className="btn-primary" style={{ padding: '12px 24px' }}>
          <ShoppingBag size={18} /> {translateDynamicContent('点击联系商务询价 (Contact for Wholesale Quote)', lang)}
        </Link>
      </div>
    </article>
  );
}

function formatMarkdownWithI18n(content: string, lang: string) {
  if (!content) return '';

  let html = content
    .replace(/^# (.*$)/gim, (_, m) => `<h1 style="font-size:1.8rem;font-weight:800;margin:28px 0 16px;color:#fff;">${m}</h1>`)
    .replace(/^## (.*$)/gim, (_, m) => `<h2 style="font-size:1.4rem;font-weight:700;margin:24px 0 14px;color:var(--accent-green);">${m}</h2>`)
    .replace(/^### (.*$)/gim, (_, m) => `<h3 style="font-size:1.15rem;font-weight:700;margin:20px 0 12px;color:#fff;">${m}</h3>`)
    .replace(/^> \[!WARNING\]\n> (.*$)/gim, (_, m) => `<blockquote style="border-left:4px solid #ef4444;background:rgba(239,68,68,0.1);padding:14px 18px;border-radius:8px;margin:20px 0;color:#fff;"><strong style="color:#ef4444;">⚠️ WARNING:</strong> ${m}</blockquote>`)
    .replace(/^> (.*$)/gim, (_, m) => `<blockquote style="border-left:4px solid var(--accent-green);background:rgba(0,230,153,0.08);padding:14px 18px;border-radius:8px;margin:20px 0;color:var(--text-muted);">${m}</blockquote>`)
    .replace(/```([\s\S]*?)```/g, '<pre style="background:#0b0f19;padding:18px;border-radius:12px;border:1px solid var(--border-color);overflow-x:auto;color:#38bdf8;font-family:monospace;margin:20px 0;"><code>$1</code></pre>')
    .replace(/`([^`]+)`/g, '<code style="background:rgba(255,255,255,0.1);padding:2px 6px;border-radius:4px;color:var(--accent-cyan);font-family:monospace;">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, (_, m) => `<strong>${m}</strong>`)
    .replace(/^- (.*$)/gim, (_, m) => `<li style="margin-bottom:8px;color:var(--text-muted);line-height:1.7;">${m}</li>`);

  // Wrap remaining paragraphs with translateDynamicContent
  const paragraphs = html.split('\n\n');
  html = paragraphs.map(p => {
    const trimmed = p.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('<h') || trimmed.startsWith('<blockquote') || trimmed.startsWith('<pre') || trimmed.startsWith('<li')) {
      return trimmed;
    }
    return `<p style="margin-bottom:18px;line-height:1.8;color:var(--text-muted);font-size:1.02rem;">${trimmed}</p>`;
  }).join('');

  return html;
}
