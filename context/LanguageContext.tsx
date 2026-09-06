'use client';

import { usePathname } from 'next/navigation';
import { isEvidenceRoute } from '@/lib/compliance';
import { normalizeLocale } from '@/lib/postI18n';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { detectBrowserLanguage, getTranslation, SUPPORTED_LANGUAGES, TranslationKey } from '@/lib/i18n';

interface LanguageContextType {
  lang: string;
  setLang: (code: string) => void;
  t: (key: TranslationKey) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'zh-CN',
  setLang: () => {},
  t: (key) => key,
  isRTL: false,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const fixedEnglish = isEvidenceRoute(pathname || '');
  const [lang, setLangState] = useState<string>('zh-CN');
  const [isRTL, setIsRTL] = useState<boolean>(false);

  useEffect(() => {
    // 1. Check saved language preference in localStorage
    let initialLang = 'zh-CN';
    try {
      const saved = localStorage.getItem('vszapower_lang');
      if (saved) {
        initialLang = saved;
      } else {
        // 2. Auto-detect browser system language
        initialLang = detectBrowserLanguage();
      }
    } catch (e) {
      initialLang = detectBrowserLanguage();
    }

    setLang(initialLang);
  }, []);

  const setLang = (requestedCode: string) => {
    const normalized = normalizeLocale(requestedCode);
    const code = SUPPORTED_LANGUAGES.some(l => l.code === normalized) ? normalized : 'en';
    setLangState(code);
    try {
      localStorage.setItem('vszapower_lang', code);
    } catch (e) {}

    // Check RTL direction
    const langObj = SUPPORTED_LANGUAGES.find(l => l.code === code);
    const rtl = langObj?.dir === 'rtl';
    setIsRTL(rtl);

    if (typeof document !== 'undefined') {
      document.documentElement.lang = code;
      document.documentElement.dir = rtl ? 'rtl' : 'ltr';
    }
  };

  useEffect(() => { document.documentElement.lang = fixedEnglish ? 'en' : lang; document.documentElement.dir = fixedEnglish ? 'ltr' : (isRTL ? 'rtl' : 'ltr'); }, [fixedEnglish, lang, isRTL]);

  const t = (key: TranslationKey): string => {
    return getTranslation(fixedEnglish ? 'en' : lang, key);
  };

  return (
    <LanguageContext.Provider value={{ lang: fixedEnglish ? 'en' : lang, setLang, t, isRTL: fixedEnglish ? false : isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
