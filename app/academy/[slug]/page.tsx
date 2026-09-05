import React from 'react';
import { getPostBySlug } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import AcademyArticleClient from '@/components/AcademyArticleClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

  return <AcademyArticleClient post={post} formattedDate={formattedDate} />;
}
