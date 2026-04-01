import React from 'react';
import { useApiResource } from '../../../hooks/useApiResource';
import type { DashboardApiResponse } from '../../../lib/api/contracts';
import { useCarbonStore } from '../../../lib/stores/carbonStore';
import { useLanguageStore } from '../../../lib/stores/languageStore';
import { fetchDashboardBrowser } from '../api';

export function useDashboardScreen() {
  const { totalSaved } = useCarbonStore();
  const { language } = useLanguageStore();
  const [historyTab, setHistoryTab] = React.useState<'continue' | 'history'>('continue');
  const initialTotalSavedRef = React.useRef(totalSaved);
  const loadDashboard = React.useCallback(
    (signal: AbortSignal) => fetchDashboardBrowser(language, initialTotalSavedRef.current, signal),
    [language],
  );
  const { data: dashboardResponse, isLoading, loadError } = useApiResource<DashboardApiResponse>({ load: loadDashboard });

  const dashboardContent = dashboardResponse?.data;

  return {
    continueWatching: dashboardContent?.continueWatching ?? [],
    historyTab,
    isLoading,
    labels: dashboardContent?.labels,
    language,
    loadError,
    quickStats: dashboardContent?.quickStats ?? [],
    setHistoryTab,
    watchHistory: dashboardContent?.watchHistory ?? [],
  };
}


