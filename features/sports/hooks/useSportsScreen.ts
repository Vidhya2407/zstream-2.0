import React from 'react';
import { useLanguageStore } from '../../../lib/stores/languageStore';
import { useNavigationStore } from '../../../lib/stores/navigationStore';
import { useThemeStore } from '../../../lib/stores/themeStore';
import { FIXTURES, HIGHLIGHTS, LIVE_MATCHES, SPORT_FILTERS, type HighlightCard } from '../../../lib/data/sportsCatalog';
import { SPORTS_STATIC_COPY } from '../config';
import type { LiveMatchesBySport, SportsTab, SportsViewModel } from '../types';

export function useSportsScreen(): SportsViewModel {
  const { activeSubCategory } = useNavigationStore();
  const { theme } = useThemeStore();
  const { language } = useLanguageStore();
  const [sportFilter, setSportFilter] = React.useState('All');
  const [search, setSearch] = React.useState('');
  const [watchlist, setWatchlist] = React.useState<Set<string>>(new Set());
  const [showWatchlistOnly, setShowWatchlistOnly] = React.useState(false);

  const isGerman = language === 'de';
  const isLight = theme === 'light';

  const bgGradient = isLight
    ? 'linear-gradient(135deg, #f0f4f7 0%, #e8ecf0 50%, #f0f4f7 100%)'
    : 'linear-gradient(135deg, #0A0F18 0%, #0F1A0A 55%, #0A0F18 100%)';

  const currentTab: SportsTab = activeSubCategory === 'live-now'
    ? 'scores'
    : activeSubCategory === 'upcoming'
      ? 'fixtures'
      : activeSubCategory === 'highlights'
        ? 'highlights'
        : 'scores';

  const toggleWatchlist = (id: string) => {
    setWatchlist((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const filterContent = (items: HighlightCard[]) =>
    items.filter((item) => {
      if (sportFilter !== 'All' && item.sport !== sportFilter) return false;
      if (search && !item.title.toLowerCase().includes(search.toLowerCase()) && !item.match.toLowerCase().includes(search.toLowerCase())) return false;
      if (showWatchlistOnly && !watchlist.has(item.id)) return false;
      return true;
    });

  const filteredHighlights = filterContent(HIGHLIGHTS);
  const filteredFixtures = FIXTURES.filter((fixture) => sportFilter === 'All' || fixture.sport === sportFilter);

  const sportsWithLive = Array.from(new Set(LIVE_MATCHES.map((match) => match.sport)));
  const liveMatchesBySport: LiveMatchesBySport[] = sportsWithLive
    .map((sport) => ({
      sport,
      matches: LIVE_MATCHES.filter((match) => match.sport === sport && (sportFilter === 'All' || match.sport === sportFilter)),
    }))
    .filter((group) => group.matches.length > 0);

  return {
    bgGradient,
    currentTab,
    filteredFixtures,
    filteredHighlights,
    isGerman,
    isLight,
    liveMatchesBySport,
    search,
    searchPlaceholder: isGerman ? SPORTS_STATIC_COPY.searchPlaceholder.de : SPORTS_STATIC_COPY.searchPlaceholder.en,
    sportFilter,
    sportFilters: SPORT_FILTERS.map((filter) => ({ id: filter, label: filter })),
    toggleWatchlist,
    watchlist,
    watchlistLabel: isGerman ? SPORTS_STATIC_COPY.watchlist.de : SPORTS_STATIC_COPY.watchlist.en,
    showWatchlistOnly,
    setSearch,
    setSportFilter,
    setShowWatchlistOnly,
  };
}


