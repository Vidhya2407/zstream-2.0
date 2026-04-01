import React from 'react';
import { toast } from 'sonner';
import { useApiResource } from '../../../hooks/useApiResource';
import { useThemeStore } from '../../../lib/stores/themeStore';
import { useAppTranslations } from '../../../lib/utils/translations';
import { fetchHomePageContent, getHomePageContent } from '../api';
import type { HomeScreenViewModel } from '../types';

export function useHomeScreen(): HomeScreenViewModel {
  const { language } = useAppTranslations();
  const { theme } = useThemeStore();
  const [selectedGenre, setSelectedGenre] = React.useState('All');

  const fallbackContent = React.useMemo(() => getHomePageContent(language), [language]);
  const loadHome = React.useCallback((signal: AbortSignal) => fetchHomePageContent(language, signal), [language]);
  const { data: response, isLoading, loadError } = useApiResource({ load: loadHome });

  React.useEffect(() => {
    if (loadError) {
      toast.error(loadError);
    }
  }, [loadError]);

  return {
    content: response?.data ?? fallbackContent,
    isLight: theme === 'light',
    isLoading,
    language,
    selectedGenre,
    setSelectedGenre,
  };
}


