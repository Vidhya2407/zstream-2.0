import React from 'react';
import { useLanguageStore } from '../../../lib/stores/languageStore';
import { useThemeStore } from '../../../lib/stores/themeStore';
import {
  ZTUBE_AUTOCOMPLETE_SUGGESTIONS,
  ZTUBE_CREATORS,
  ZTUBE_TYPE_FILTERS,
  ZTUBE_VIDEOS,
  ZTUBE_TABS,
  translateZTube,
} from '../config';
import { fetchZtubeVideos } from '../api';
import type { ContentType, ZTubeTab } from '../types';

export function useZtubeScreen() {
  const [tab, setTab] = React.useState<ZTubeTab>('forYou');
  const [contentType, setContentType] = React.useState<ContentType>('all');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [videos, setVideos] = React.useState(ZTUBE_VIDEOS);
  const [loading, setLoading] = React.useState(true);
  const searchRef = React.useRef<HTMLDivElement>(null);
  const { theme } = useThemeStore();
  const { language } = useLanguageStore();
  const isGerman = language === 'de';
  const isLight = theme === 'light';

  React.useEffect(() => {
    const loadVideos = async () => {
      setLoading(true);
      const response = await fetchZtubeVideos(tab, contentType, searchQuery);
      setVideos(response.videos);
      setLoading(false);
    };

    loadVideos();
  }, [contentType, searchQuery, tab]);

  const suggestions = searchQuery.length > 1
    ? ZTUBE_AUTOCOMPLETE_SUGGESTIONS.filter((suggestion) => suggestion.includes(searchQuery.toLowerCase())).slice(0, 5)
    : [];

  React.useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return {
    bgGradient: isLight
      ? 'linear-gradient(135deg, #f0f4f7 0%, #f1f3f7 55%, #f0f4f7 100%)'
      : 'linear-gradient(135deg, #0A0F18 0%, #0A1018 55%, #0A0F18 100%)',
    contentType,
    creators: ZTUBE_CREATORS,
    filtered: videos,
    isGerman,
    isLight,
    loading,
    musicRow: ZTUBE_VIDEOS.filter((video) => video.type === 'music'),
    newRow: [...ZTUBE_VIDEOS].sort((a, b) => a.daysAgo - b.daysAgo).slice(0, 4),
    podcastRow: ZTUBE_VIDEOS.filter((video) => video.type === 'podcast'),
    searchQuery,
    searchRef,
    setContentType,
    setSearchQuery,
    setShowSuggestions,
    setTab,
    showSuggestions,
    suggestions,
    tab,
    tabs: ZTUBE_TABS,
    tr: (value: string) => translateZTube(value, isGerman),
    trendingRow: [...ZTUBE_VIDEOS].sort((a, b) => parseFloat(b.views) - parseFloat(a.views)).slice(0, 4),
    typeFilters: ZTUBE_TYPE_FILTERS,
  };
}
