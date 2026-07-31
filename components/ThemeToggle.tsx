'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      title={theme === 'dark' ? '切换为亮色模式 (Light Mode)' : '切换为暗色模式 (Dark Mode)'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '38px',
        height: '38px',
        borderRadius: '10px',
        background: theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.08)',
        border: '1px solid var(--border-color)',
        color: theme === 'dark' ? '#fbbf24' : '#3b82f6',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        backdropFilter: 'blur(10px)',
        boxShadow: theme === 'dark' ? '0 2px 8px rgba(251, 191, 36, 0.15)' : '0 2px 8px rgba(59, 130, 246, 0.15)',
      }}
    >
      {theme === 'dark' ? (
        <Sun size={18} style={{ transform: 'rotate(0deg)', transition: 'transform 0.5s ease' }} />
      ) : (
        <Moon size={18} style={{ transform: 'rotate(0deg)', transition: 'transform 0.5s ease' }} />
      )}
    </button>
  );
}
