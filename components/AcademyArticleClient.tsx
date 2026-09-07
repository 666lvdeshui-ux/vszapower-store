'use client';

import { catalog, productPath, compatibilityNote } from '@/lib/catalog';
import React from 'react';
import Link from 'next/link';
import { PostItem } from '@/lib/store';
import { ArrowLeft, Clock, User, Calendar, Zap, ShoppingBag } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { localizePost, originalNotice } from '@/lib/postI18n';
import { translateDynamicContent } from '@/lib/dynamicI18n';
import ArticleMarkdown from './ArticleMarkdown';

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
        url: 'https://www.vszapower.com/logo.svg',
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

      <nav aria-label="Product documentation" style={{display:'flex',flexWrap:'wrap',gap:16,marginBottom:24}}><a href="/compliance">Model-specific test documentation</a><a href="/coin-cell-charger-manufacturer">Charger manufacturing &amp; OEM</a></nav>
      {/* Content Rendering with Real-time i18n Translation */}
      {localized.showingOriginal && <p role="status">{originalNotice[lang] || originalNotice.en}</p>}
      <div className="markdown-content">
        <ArticleMarkdown content={localized.content} />
      </div>

      {/* Bottom CTA Card */}
      <div className="kraft-card" style={{ padding: '32px', marginTop: '60px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <Zap size={24} color="var(--accent-green)" />
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>
            {translateDynamicContent('Explore VSZAPOWER battery and charger solutions', lang)}
          </h3>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '20px', lineHeight: 1.6 }}>
          {compatibilityNote}
        </p>
        <nav className="evidence-related">{catalog.filter(p=>p.kind==='battery' && new RegExp(p.model,'i').test(post.title+' '+post.slug)).map(p=><Link key={p.id} href={productPath(p)}>{p.title}</Link>)}<Link href="/coin-cell-charger-manufacturer">Charger configuration guidance</Link><Link href={productPath(catalog[0])}>VZ002 single-slot charger specifications</Link><Link href="/compliance">Model-specific test documentation</Link></nav><Link href="/#contact" className="btn-primary" style={{ padding: '12px 24px' }}>
          <ShoppingBag size={18} /> {translateDynamicContent('点击联系商务询价 (Contact for Wholesale Quote)', lang)}
        </Link>
      </div>
    </article>
  );
}
