import React from 'react';
import { getPosts } from '@/lib/supabase';
import AcademyListClient from '@/components/AcademyListClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '电池学院 Battery Academy | 可充电扣式电池选型指南与技术专区',
  description: '权威分析 LIR2032、LIR2450、LIR2025、ML2032 等可充电扣式电池，剖析 3.7V 电压兼容性、AirTag 续航实测及微电流智能脉冲安全充电原理解析。',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AcademyListPage() {
  const posts = await getPosts();

  return <AcademyListClient posts={posts} />;
}
