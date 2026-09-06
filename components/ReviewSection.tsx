'use client';

import React, { useState } from 'react';
import { Star, CheckCircle, ThumbsUp, ShieldCheck, Filter, ExternalLink } from 'lucide-react';
import { ReviewItem } from '@/lib/store';
import { useLanguage } from '@/context/LanguageContext';
import reviewUi from '@/content/products/translations/review-ui.json';
import productUi from '@/content/products/translations/ui.json';

interface ReviewSectionProps {
  rating?: number;
  reviewCount?: number;
  temuLink?: string;
  reviews?: ReviewItem[];
  productTitle?: string;
  sharedSource?: boolean;
}

const COUNTRY_FLAGS: Record<string, { flag: string; name: string }> = {
  US: { flag: '🇺🇸', name: 'United States' },
  DE: { flag: '🇩🇪', name: 'Germany' },
  JP: { flag: '🇯🇵', name: 'Japan' },
  GB: { flag: '🇬🇧', name: 'United Kingdom' },
  FR: { flag: '🇫🇷', name: 'France' },
  CA: { flag: '🇨🇦', name: 'Canada' },
  MX: { flag: '🇲🇽', name: 'Mexico' },
  AU: { flag: '🇦🇺', name: 'Australia' },
  ES: { flag: '🇪🇸', name: 'Spain' },
  IT: { flag: '🇮🇹', name: 'Italy' },
  NL: { flag: '🇳🇱', name: 'Netherlands' },
  SE: { flag: '🇸🇪', name: 'Sweden' },
  KR: { flag: '🇰🇷', name: 'South Korea' },
  BR: { flag: '🇧🇷', name: 'Brazil' },
  NO: { flag: '🇳🇴', name: 'Norway' },
  CH: { flag: '🇨🇭', name: 'Switzerland' },
};

export default function ReviewSection({
  rating = 0,
  reviewCount = 0,
  temuLink = 'https://www.temu.com/goods.html?_bg_fs=1&goods_id=606258002264728',
  reviews = [],
  productTitle = '',
  sharedSource = false,
}: ReviewSectionProps) {
  const { lang } = useLanguage();
  const copy = (key: keyof typeof reviewUi.en) => (reviewUi as Record<string, typeof reviewUi.en>)[lang]?.[key] || reviewUi.en[key];
  const reviewsLabel = (productUi as Record<string, typeof productUi.en>)[lang]?.reviews || productUi.en.reviews;
  const [selectedFilter, setSelectedFilter] = useState<'all' | '5star' | 'temu' | 'photos'>('all');
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, number>>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 10;

  const activeReviews = Array.isArray(reviews) ? reviews.slice(0,50) : [];

  const handleHelpfulClick = (reviewId: string, currentCount: number) => {
    setHelpfulVotes((prev) => ({
      ...prev,
      [reviewId]: (prev[reviewId] || currentCount) + 1,
    }));
  };

  const handleFilterChange = (filter: 'all' | '5star' | 'temu' | 'photos') => {
    setSelectedFilter(filter);
    setCurrentPage(1);
  };

  const fiveStarCount = activeReviews.filter((r) => Number(r.rating) >= 4).length;
  const temuCount = activeReviews.filter((r) => !!r.verified_source).length;
  const photoCount = activeReviews.filter((r) => Array.isArray(r.images) && r.images.length > 0).length;

  const filteredReviews = activeReviews.filter((r) => {
    if (selectedFilter === '5star') return Number(r.rating) >= 4;
    if (selectedFilter === 'temu') return !r.verified_source || String(r.verified_source).toLowerCase().includes('temu');
    if (selectedFilter === 'photos') return Array.isArray(r.images) && r.images.length > 0;
    return true;
  });

  const totalPages = Math.ceil(filteredReviews.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedReviews = filteredReviews.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div style={{ padding: '20px 0', borderTop: '1px solid var(--border-color)', marginTop: '24px' }}>
      {sharedSource && <p className="evidence-note" lang="en">50 historical reviews supplied by the store owner and attributed to one <a href={temuLink} target="_blank" rel="noopener noreferrer">Temu listing</a>, shared across our three charger pages. Listing rating: {rating.toFixed(1)}/5 from {reviewCount.toLocaleString()} reviews, checked 2026-09-06. The distribution below covers only the 50 displayed reviews. Reviews retain their original language. Individual review records have not been independently matched to the live listing. Buyer comments describe individual experiences, not compatibility specifications.</p>}
      {/* Top Rating Summary Card */}
      <div
        style={{
          background: 'var(--bg-secondary)',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid var(--border-color)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '24px',
          alignItems: 'center',
          marginBottom: '24px',
        }}
      >
        {/* Left Column: Big Rating Number */}
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-heading)' }}>
              {rating.toFixed(2)}
            </span>
            <span style={{ color: 'var(--text-dim)', fontSize: '1.1rem' }}>/ 5.0</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', margin: '4px 0 10px' }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={20} fill="#f59e0b" color="#f59e0b" />
            ))}
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            {copy('count').replace('{count}', reviewCount.toLocaleString(lang))}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '10px' }}>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                background: 'rgba(249, 115, 22, 0.15)',
                color: '#f97316',
                border: '1px solid rgba(249, 115, 22, 0.3)',
                padding: '3px 8px',
                borderRadius: '6px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <CheckCircle size={13} /> {reviewsLabel}
            </span>
          </div>
        </div>

        {/* Right Column: Rating Distribution Bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {[5,4,3,2,1].map(stars=>({stars:`${stars} ★`,pct:activeReviews.length?Math.round(activeReviews.filter(r=>Number(r.rating)===stars).length/activeReviews.length*100):0})).map((bar) => (
            <div key={bar.stars} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.82rem' }}>
              <span style={{ width: '55px', color: 'var(--text-muted)', textAlign: 'right' }}>{bar.stars}</span>
              <div style={{ flex: 1, height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${bar.pct}%`,
                    height: '100%',
                    background: bar.pct > 50 ? 'var(--accent-green)' : '#f59e0b',
                    borderRadius: '4px',
                  }}
                />
              </div>
              <span style={{ width: '45px', color: 'var(--text-dim)', textAlign: 'left' }}>{bar.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '4px', marginRight: '4px' }}>
          <Filter size={14} /> {copy('filter')}:
        </span>

        <button
          onClick={() => handleFilterChange('all')}
          style={{
            fontSize: '0.82rem',
            fontWeight: 600,
            padding: '6px 14px',
            borderRadius: '20px',
            border: selectedFilter === 'all' ? '1px solid var(--accent-green)' : '1px solid var(--border-color)',
            background: selectedFilter === 'all' ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-card)',
            color: selectedFilter === 'all' ? 'var(--accent-green)' : 'var(--text-muted)',
            cursor: 'pointer',
          }}
        >
          {copy('all')} ({activeReviews.length})
        </button>

        <button
          onClick={() => handleFilterChange('5star')}
          style={{
            fontSize: '0.82rem',
            fontWeight: 600,
            padding: '6px 14px',
            borderRadius: '20px',
            border: selectedFilter === '5star' ? '1px solid #f59e0b' : '1px solid var(--border-color)',
            background: selectedFilter === '5star' ? 'rgba(245, 158, 11, 0.15)' : 'var(--bg-card)',
            color: selectedFilter === '5star' ? '#f59e0b' : 'var(--text-muted)',
            cursor: 'pointer',
          }}
        >
          4–5 ★ ({fiveStarCount})
        </button>

        <button
          onClick={() => handleFilterChange('temu')}
          style={{
            fontSize: '0.82rem',
            fontWeight: 600,
            padding: '6px 14px',
            borderRadius: '20px',
            border: selectedFilter === 'temu' ? '1px solid #f97316' : '1px solid var(--border-color)',
            background: selectedFilter === 'temu' ? 'rgba(249, 115, 22, 0.15)' : 'var(--bg-card)',
            color: selectedFilter === 'temu' ? '#f97316' : 'var(--text-muted)',
            cursor: 'pointer',
          }}
        >
          ✓ Temu listing ({temuCount})
        </button>

        {photoCount > 0 && (
          <button
            onClick={() => handleFilterChange('photos')}
            style={{
              fontSize: '0.82rem',
              fontWeight: 600,
              padding: '6px 14px',
              borderRadius: '20px',
              border: selectedFilter === 'photos' ? '1px solid var(--accent-cyan)' : '1px solid var(--border-color)',
              background: selectedFilter === 'photos' ? 'rgba(6, 182, 212, 0.15)' : 'var(--bg-card)',
              color: selectedFilter === 'photos' ? 'var(--accent-cyan)' : 'var(--text-muted)',
              cursor: 'pointer',
            }}
          >
            📷 {copy('photos')} ({photoCount})
          </button>
        )}
      </div>

      <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '12px' }}>{copy('original')}</p>
      {/* Review List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredReviews.length === 0 ? (
          <div style={{ padding: '30px', textAlign: 'center', color: 'var(--text-dim)', background: 'var(--bg-card)', borderRadius: '12px' }}>
            {copy('empty')}
          </div>
        ) : (
          paginatedReviews.map((review) => {
            const countryInfo = COUNTRY_FLAGS[review.country_code] || { flag: '🌐', name: review.country_code };
            let countryName = countryInfo.name;
            try { countryName = new Intl.DisplayNames([lang], { type: 'region' }).of(review.country_code) || countryName; } catch {}
            const helpful = helpfulVotes[review.id] ?? (review.helpful_count || 0);

            return (
              <div
                key={review.id}
                style={{
                  background: 'var(--bg-card)',
                  padding: '20px',
                  borderRadius: '14px',
                  border: '1px solid var(--border-color)',
                  transition: 'border-color 0.2s ease',
                }}
              >
                {/* Reviewer Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
                        color: '#000',
                        fontWeight: 700,
                        fontSize: '0.95rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {review.reviewer_name.charAt(0)}
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <strong style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>{review.reviewer_name}</strong>
                        <span style={{ fontSize: '0.85rem' }} title={countryName}>
                          {countryInfo.flag}
                        </span>
                      </div>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                        {countryName} • {review.date}
                      </span>
                    </div>
                  </div>

                  {/* Verified Source Tag */}
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'var(--accent-green)',
                      background: 'rgba(16, 185, 129, 0.1)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      padding: '2px 8px',
                      borderRadius: '6px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <ShieldCheck size={13} /> Temu listing
                  </span>
                </div>

                {/* Stars Rating */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginBottom: '8px' }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={16}
                      fill={s <= review.rating ? '#f59e0b' : 'none'}
                      color={s <= review.rating ? '#f59e0b' : 'var(--text-dim)'}
                    />
                  ))}
                </div>

                {/* Title & Body */}
                <h5 data-user-content="review" style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
                  {review.title}
                </h5>
                <p data-user-content="review" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '12px' }}>
                  {review.content}
                </p>

                {/* Optional Customer Photos */}
                {Array.isArray(review.images) && review.images.length > 0 && (
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                    {review.images.map((imgUrl, i) => (
                      <img
                        key={i}
                        src={imgUrl}
                        alt={copy('photo')}
                        style={{
                          width: '70px',
                          height: '70px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                          border: '1px solid var(--border-color)',
                          cursor: 'pointer',
                        }}
                        onClick={() => window.open(imgUrl, '_blank')}
                      />
                    ))}
                  </div>
                )}

                {/* Helpful Button Footer */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <button
                    onClick={() => handleHelpfulClick(review.id, review.helpful_count || 0)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontSize: '0.78rem',
                      color: 'var(--text-muted)',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid var(--border-color)',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <ThumbsUp size={13} color="var(--accent-green)" /> {copy('helpful')} ({helpful})
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination Controls Bar */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, filteredReviews.length)} / {filteredReviews.length}
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              style={{
                fontSize: '0.82rem',
                fontWeight: 600,
                padding: '6px 14px',
                borderRadius: '8px',
                background: currentPage === 1 ? 'rgba(255,255,255,0.03)' : 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                color: currentPage === 1 ? 'var(--text-dim)' : 'var(--text-main)',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              }}
            >
              {copy('previous')}
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                style={{
                  fontSize: '0.82rem',
                  fontWeight: currentPage === page ? 700 : 500,
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: currentPage === page ? 'var(--accent-green)' : 'var(--bg-card)',
                  color: currentPage === page ? '#000' : 'var(--text-main)',
                  border: currentPage === page ? '1px solid var(--accent-green)' : '1px solid var(--border-color)',
                  cursor: 'pointer',
                  boxShadow: currentPage === page ? '0 0 10px rgba(16, 185, 129, 0.4)' : 'none',
                }}
              >
                {page}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              style={{
                fontSize: '0.82rem',
                fontWeight: 600,
                padding: '6px 14px',
                borderRadius: '8px',
                background: currentPage === totalPages ? 'rgba(255,255,255,0.03)' : 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                color: currentPage === totalPages ? 'var(--text-dim)' : 'var(--text-main)',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              }}
            >
              {copy('next')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
