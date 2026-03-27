import React from 'react';
import { useApiResource } from '../../../hooks/useApiResource';
import type { MinisApiResponse } from '../../../lib/api/contracts';
import { useLanguageStore } from '../../../lib/stores/languageStore';
import { useThemeStore } from '../../../lib/stores/themeStore';
import { MINIS_VIDEO_DURATION } from '../config';
import type { MiniInteractions } from '../types';
import { fetchMinisBrowser } from '../api';

const DEFAULT_INTERACTIONS: MiniInteractions = { appreciated: false, recycled: false, saved: false, shared: false };

export function useMinisScreen() {
  const { theme } = useThemeStore();
  const { language } = useLanguageStore();
  const isLight = theme === 'light';
  const loadMinis = React.useCallback((signal: AbortSignal) => fetchMinisBrowser(language, signal), [language]);
  const { data: minisResponse, isLoading, loadError } = useApiResource<MinisApiResponse>({ load: loadMinis });
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [watchTime, setWatchTime] = React.useState(0);
  const [watchProgress, setWatchProgress] = React.useState(0);
  const [interactions, setInteractions] = React.useState<MiniInteractions>(DEFAULT_INTERACTIONS);

  const minis = minisResponse?.data?.items ?? [];
  const currentMini = minis[currentIndex] ?? null;

  React.useEffect(() => {
    if (currentIndex >= minis.length && minis.length > 0) setCurrentIndex(0);
  }, [currentIndex, minis.length]);

  React.useEffect(() => {
    setWatchTime(0);
    setWatchProgress(0);
    setInteractions(DEFAULT_INTERACTIONS);
  }, [currentIndex, language]);

  React.useEffect(() => {
    if (!currentMini) return;
    const timer = setInterval(() => {
      setWatchTime((prev) => {
        const next = prev + 0.1;
        setWatchProgress((next / MINIS_VIDEO_DURATION) * 100);
        return next;
      });
    }, 100);
    return () => clearInterval(timer);
  }, [currentMini]);

  const handleSwipe = React.useCallback((direction: 'up' | 'down') => {
    if (direction === 'up' && currentIndex < minis.length - 1) setCurrentIndex((prev) => prev + 1);
    if (direction === 'down' && currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  }, [currentIndex, minis.length]);

  return {
    currentIndex,
    currentMini,
    handleSwipe,
    interactions,
    isLight,
    isLoading,
    language,
    loadError,
    minis,
    setInteractions,
    watchProgress,
    watchTime,
  };
}
