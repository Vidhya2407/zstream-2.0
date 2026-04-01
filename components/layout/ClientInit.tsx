'use client';
import React from 'react';
import { useHydrated } from '@/hooks/useHydrated';
import { useThemeStore } from '../../lib/stores/themeStore';
import { useLanguageStore } from '../../lib/stores/languageStore';
import { useSettingsStore } from '../../lib/stores/settingsStore';

export default function ClientInit() {
  const hydratedTheme = useHydrated(useThemeStore);
  const hydratedLanguage = useHydrated(useLanguageStore);
  const hydratedSettings = useHydrated(useSettingsStore);
  const { theme } = useThemeStore();
  const { language } = useLanguageStore();
  const { reducedMotion, highContrast } = useSettingsStore();

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
    const useReducedMotion = hydratedSettings ? reducedMotion : false;
    const useHighContrast = hydratedSettings ? highContrast : false;

    document.documentElement.toggleAttribute('data-reduced-motion', useReducedMotion);
    if (useHighContrast) {
      document.documentElement.setAttribute('data-contrast', 'high');
    } else {
      document.documentElement.removeAttribute('data-contrast');
    }
  }, [hydratedSettings, reducedMotion, highContrast]);

  React.useEffect(() => {
    if (!('serviceWorker' in navigator)) {
      return;
    }

    if (process.env.NODE_ENV !== 'production') {
      void navigator.serviceWorker.getRegistrations().then((registrations) =>
        Promise.all(registrations.map((registration) => registration.unregister()))
      );

      if ('caches' in window) {
        void caches.keys().then((keys) =>
          Promise.all(keys.filter((key) => key.startsWith('zstream-')).map((key) => caches.delete(key)))
        );
      }

      return;
    }

    const register = () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    };

    window.addEventListener('load', register);
    return () => window.removeEventListener('load', register);
  }, []);

  return null;
}
