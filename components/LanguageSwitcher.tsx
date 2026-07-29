'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { SUPPORTED_LANGUAGES } from '@/lib/i18n';
import { Globe, ChevronDown, Check } from 'lucide-react';

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === lang) || SUPPORTED_LANGUAGES.find(l => l.code === 'en')!;

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative', display: 'inline-block' }}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 14px',
          borderRadius: '10px',
          border: '1px solid var(--border-color)',
          background: 'rgba(15, 23, 42, 0.75)',
          color: '#ffffff',
          fontSize: '0.88rem',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          backdropFilter: 'blur(12px)',
        }}
        className="hover-green-border"
        title="Switch Language / 切换语言"
      >
        <Globe size={16} style={{ color: 'var(--accent-green)' }} />
        <span>{currentLangObj.nativeName}</span>
        <ChevronDown size={14} style={{
          color: 'var(--text-muted)',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease',
        }} />
      </button>

      {/* Dropdown Menu matching User Screenshot */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 8px)',
          right: 0,
          zIndex: 1000,
          width: '220px',
          maxHeight: '380px',
          overflowY: 'auto',
          background: 'rgba(11, 29, 38, 0.96)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(0, 230, 153, 0.3)',
          borderRadius: '12px',
          padding: '6px',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.6)',
        }} className="custom-scrollbar">
          {SUPPORTED_LANGUAGES.map((l) => {
            const isSelected = l.code === lang;
            return (
              <button
                key={l.code}
                onClick={() => {
                  setLang(l.code);
                  setIsOpen(false);
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: 'none',
                  background: isSelected ? '#3b82f6' : 'transparent', // Match blue highlight in screenshot
                  color: '#ffffff',
                  fontSize: '0.92rem',
                  fontWeight: isSelected ? 700 : 500,
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'background 0.15s ease',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) e.currentTarget.style.background = 'transparent';
                }}
              >
                {/* Checkmark icon if selected */}
                <span style={{ width: '16px', display: 'inline-flex', justifyContent: 'center' }}>
                  {isSelected && <Check size={16} style={{ color: '#ffffff' }} />}
                </span>
                <span>{l.nativeName}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
