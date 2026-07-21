import React from 'react';
import HeroSection from '@/components/HeroSection';
import StarterKitBundle from '@/components/StarterKitBundle';
import BatteryMatcher from '@/components/BatteryMatcher';
import GeoTechSpecs from '@/components/GeoTechSpecs';
import BlogPreview from '@/components/BlogPreview';
import { getPosts } from '@/lib/supabase';

export const revalidate = 60; // ISR revalidate every 60 seconds

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <>
      <HeroSection />
      <StarterKitBundle />
      <BatteryMatcher />
      <GeoTechSpecs />
      <BlogPreview posts={posts} />
    </>
  );
}
