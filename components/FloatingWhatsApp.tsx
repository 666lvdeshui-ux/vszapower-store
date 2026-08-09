'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function FloatingWhatsApp() {
  const { lang } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    const waNumber = '85260716913';
    const message = encodeURIComponent('Hi VSZAPOWER Team, I am interested in OEM/ODM custom battery & charger wholesale solutions.');
    window.open(`https://wa.me/${waNumber}?text=${message}`, '_blank');
  };

  const getTooltipText = () => {
    switch (lang) {
      case 'zh-CN':
      case 'zh-HK':
      case 'zh-TW':
        return 'WhatsApp 在线咨询 (B2B 直连)';
      case 'de':
        return 'WhatsApp B2B-Direktkontakt';
      case 'ja':
        return 'WhatsApp B2B 直通相談';
      case 'es':
        return 'Contactar por WhatsApp';
      case 'fr':
        return 'Chatter sur WhatsApp';
      default:
        return 'WhatsApp B2B Wholesale Support';
    }
  };

  return (
    <>
      <style jsx global>{`
        @keyframes waPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.6);
          }
          70% {
            box-shadow: 0 0 0 16px rgba(37, 211, 102, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
          }
        }
        @keyframes greenDotPing {
          0% {
            transform: scale(0.95);
            opacity: 1;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.6;
          }
          100% {
            transform: scale(0.95);
            opacity: 1;
          }
        }
      `}</style>

      <div
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontFamily: 'var(--font-sans, system-ui, -apple-system, sans-serif)',
        }}
      >
        {/* Tooltip / Label */}
        <div
          style={{
            background: 'rgba(15, 23, 42, 0.92)',
            backdropFilter: 'blur(12px)',
            color: '#FFFFFF',
            fontSize: '0.85rem',
            fontWeight: 700,
            padding: '8px 16px',
            borderRadius: '20px',
            border: '1px solid rgba(37, 211, 102, 0.3)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
            whiteSpace: 'nowrap',
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateX(0) scale(1)' : 'translateX(10px) scale(0.95)',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#25D366',
              boxShadow: '0 0 8px #25D366',
              animation: 'greenDotPing 2s infinite ease-in-out',
            }}
          />
          {getTooltipText()}
        </div>

        {/* Floating WhatsApp Button */}
        <button
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label="Contact via WhatsApp"
          style={{
            position: 'relative',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
            boxShadow: '0 10px 25px rgba(37, 211, 102, 0.45)',
            animation: 'waPulse 2.5s infinite',
            transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transform: isHovered ? 'scale(1.1) translateY(-3px)' : 'scale(1)',
            padding: 0,
          }}
        >
          {/* Online Indicator Badge on Icon */}
          <span
            style={{
              position: 'absolute',
              top: '2px',
              right: '2px',
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              background: '#22c55e',
              border: '2px solid #0f172a',
              boxShadow: '0 0 6px rgba(34, 197, 94, 0.8)',
            }}
          />

          {/* Clean High-Res SVG WhatsApp Icon */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            style={{ margin: 'auto' }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.472 14.382C17.012 14.152 14.752 13.042 14.332 12.892C13.912 12.742 13.612 12.672 13.312 13.132C13.012 13.592 12.152 14.592 11.892 14.892C11.632 15.192 11.372 15.222 10.912 14.992C10.452 14.762 8.962 14.272 7.202 12.702C5.832 11.482 4.902 9.972 4.642 9.512C4.382 9.052 4.612 8.812 4.842 8.582C5.052 8.372 5.312 8.032 5.542 7.762C5.772 7.492 5.852 7.302 6.002 7.002C6.152 6.702 6.072 6.442 5.962 6.212C5.852 5.982 4.992 3.872 4.632 3.012C4.282 2.182 3.922 2.292 3.662 2.282C3.412 2.272 3.122 2.272 2.832 2.272C2.542 2.272 2.082 2.382 1.692 2.802C1.302 3.222 0.202 4.252 0.202 6.352C0.202 8.452 1.732 10.482 1.952 10.772C2.172 11.062 4.972 15.392 9.272 17.252C10.292 17.692 11.092 17.952 11.712 18.152C12.732 18.472 13.662 18.432 14.402 18.322C15.232 18.202 16.962 17.282 17.322 16.272C17.682 15.262 17.682 14.412 17.572 14.232C17.472 14.042 17.932 14.612 17.472 14.382Z"
              transform="translate(3, 2)"
              fill="#FFFFFF"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
