'use client';
import React from 'react';
import { useHydrated } from '@/hooks/useHydrated';
import { useThemeStore } from '../../lib/stores/themeStore';
import { useLanguageStore } from '../../lib/stores/languageStore';

export default function ClientInit() {
  const hydratedTheme = useHydrated(useThemeStore);
  const hydratedLanguage = useHydrated(useLanguageStore);
  const { theme } = useThemeStore();
  const { language } = useLanguageStore();

  React.useEffect(() => {
    const resolvedTheme = hydratedTheme ? theme : 'dark';

    if (resolvedTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [hydratedTheme, theme]);

  React.useEffect(() => {
    document.documentElement.lang = hydratedLanguage ? language : 'en';
  }, [hydratedLanguage, language]);

  React.useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {});
      });
    }
  }, []);

  return null;
}
