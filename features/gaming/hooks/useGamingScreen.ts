import React from 'react';
import type { GamingApiResponse } from '../../../lib/api/contracts';
import { type GamingTab } from '../../../lib/data/gamingCatalog';
import { getGamingPageContent } from '../../../lib/services/catalogService';
import { useLanguageStore } from '../../../lib/stores/languageStore';
import { useNavigationStore } from '../../../lib/stores/navigationStore';
import { useThemeStore } from '../../../lib/stores/themeStore';
import { useApiResource } from '../../../hooks/useApiResource';
import { fetchGamingBrowser } from '../api';

export function useGamingScreen() {
  const { activeSubCategory, setSubCategory } = useNavigationStore();
  const [hoveredGame, setHoveredGame] = React.useState<number | null>(null);
  const { language } = useLanguageStore();
  const { theme } = useThemeStore();
  const tab = (activeSubCategory as GamingTab) || 'live-streams';
  const loadGaming = React.useCallback((signal: AbortSignal) => fetchGamingBrowser(language, signal), [language]);
  const { data: gamingResponse, isLoading, loadError } = useApiResource<GamingApiResponse>({ load: loadGaming });
  const fallbackGamingContent = React.useMemo(() => getGamingPageContent(language), [language]);
  const gamingContent = gamingResponse?.data ?? fallbackGamingContent;
  const isLight = theme === 'light';

  return {
    ...gamingContent,
    bgGradient: isLight
      ? 'linear-gradient(135deg, #f0f4f7 0%, #eef1f5 55%, #f0f4f7 100%)'
      : 'linear-gradient(135deg, #0A0F18 0%, #0A0A1F 55%, #0A0F18 100%)',
    border: isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.06)',
    hoveredGame,
    isLight,
    isLoading,
    loadError,
    language,
    pageTextPrimary: isLight ? '#0f172a' : '#f8fafc',
    pageTextSecondary: isLight ? '#64748b' : '#94a3b8',
    setHoveredGame,
    setSubCategory,
    shadow: isLight ? '0 12px 30px rgba(15,23,42,0.06)' : 'none',
    surface: isLight ? 'rgba(255,255,255,0.84)' : 'rgba(15,25,35,0.8)',
    surfaceAlt: isLight ? 'rgba(248,250,252,0.95)' : 'rgba(12,20,30,0.9)',
    tab,
  };
}
