'use client';

import { usePathname } from 'next/navigation';
import { isEvidenceRoute } from '@/lib/compliance';
import { centerLocale, centerPath } from '@/lib/complianceLocale';
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
  lang: 'en',
  setLang: () => {},
  t: (key) => key,
  isRTL: false,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const routeLocale = centerLocale(pathname || '');
  const fixedEnglish = !routeLocale && isEvidenceRoute(pathname || '');
  const effectiveLang = routeLocale || (fixedEnglish ? 'en' : null);
  const [lang, setLangState] = useState<string>('en');
  const [isRTL, setIsRTL] = useState<boolean>(false);

  useEffect(() => {
    // 1. Check saved language preference in localStorage
    let initialLang = 'en';
    try {
      const saved = localStorage.getItem('vszapower_lang');
      if (saved) {
        initialLang = saved;
      } else {
        // 2. Auto-detect browser system language
        initialLang = 'en';
      }
    } catch (e) {
      initialLang = 'en';
    }

    if(routeLocale){setLangState(routeLocale);setIsRTL(['ar','he'].includes(routeLocale));}else{setLang(initialLang);}
  }, []);

  const setLang = (requestedCode: string) => {
    const normalized = normalizeLocale(requestedCode);
    const code = SUPPORTED_LANGUAGES.some(l => l.code === normalized) ? normalized : 'en';
    if(routeLocale && routeLocale!==code){
      try { localStorage.setItem('vszapower_lang',code); } catch {} 
      window.location.assign(centerPath(code));
      return;
    }
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

  useEffect(() => { document.documentElement.lang = effectiveLang || lang; document.documentElement.dir = ['ar','he'].includes(effectiveLang || lang) ? 'rtl' : 'ltr'; }, [effectiveLang, lang, isRTL]);

  const t = (key: TranslationKey): string => {
    return getTranslation(effectiveLang || lang, key);
  };

  return (
    <LanguageContext.Provider value={{ lang: effectiveLang || lang, setLang, t, isRTL: ['ar','he'].includes(effectiveLang || lang) }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
