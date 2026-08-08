'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    // Exclude tracking inside admin dashboard pages to keep public stats clean
    if (pathname.startsWith('/admin')) {
      return;
    }

    // Prevent duplicate track calls on same path render
    if (lastTrackedPath.current === pathname) {
      return;
    }
    lastTrackedPath.current = pathname;

    try {
      // 1. Manage Persistent Session ID for Session/Depth Tracking
      let sessionId = sessionStorage.getItem('vszapower_session_id');
      if (!sessionId) {
        sessionId = 'sess_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 7);
        sessionStorage.setItem('vszapower_session_id', sessionId);
      }

      // 2. Manage Initial Referrer Source for First-time Visit attribution
      let firstVisitSource = sessionStorage.getItem('vszapower_first_visit_source');
      if (!firstVisitSource) {
        const rawReferrer = document.referrer || '';
        if (rawReferrer) {
          if (rawReferrer.includes('google')) firstVisitSource = 'Google Search';
          else if (rawReferrer.includes('baidu')) firstVisitSource = 'Baidu Search';
          else if (rawReferrer.includes('tiktok')) firstVisitSource = 'TikTok Social';
          else if (rawReferrer.includes('reddit')) firstVisitSource = 'Reddit Forum';
          else if (rawReferrer.includes('temu')) firstVisitSource = 'Temu Marketplace';
          else firstVisitSource = new URL(rawReferrer).hostname;
        } else {
          firstVisitSource = 'Direct / Bookmark';
        }
        sessionStorage.setItem('vszapower_first_visit_source', firstVisitSource);
      }

      // 3. Post Track Payload asynchronously
      const payload = {
        session_id: sessionId,
        path: pathname,
        referrer: document.referrer || '',
        first_visit_source: firstVisitSource,
        language: navigator.language || 'en-US',
      };

      fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(err => {
        // Silent catch to never block UI
      });
    } catch (e) {
      // Ignore client tracking errors
    }
  }, [pathname]);

  return null; // Invisible component
}
