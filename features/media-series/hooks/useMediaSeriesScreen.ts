import React from 'react';
import { useNavigationStore } from '../../../lib/stores/navigationStore';
import { useThemeStore } from '../../../lib/stores/themeStore';
import { seriesCatalog, seriesSortOptions } from '../config';
import type { SeriesTab } from '../types';

export function useMediaSeriesScreen() {
  const { activeSubCategory, setSubCategory } = useNavigationStore();
  const { theme } = useThemeStore();
  const isLight = theme === 'light';
  const tab = (activeSubCategory as SeriesTab) || 'trending';
  const [activeGenre, setActiveGenre] = React.useState('All');
  const [sortBy, setSortBy] = React.useState<string>(seriesSortOptions[0]);
  const [search, setSearch] = React.useState('');
  const [watchlist, setWatchlist] = React.useState<Set<string>>(new Set());
  const [showWatchlistOnly, setShowWatchlistOnly] = React.useState(false);

  const toggleWatchlist = React.useCallback((id: string) => {
    setWatchlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const filtered = React.useMemo(
    () =>
      seriesCatalog
        .filter((item) => {
          if (tab === 'originals' && !item.isOriginal) return false;
          if (tab === 'continue' && !(item.progress > 0 && item.progress < 100)) return false;
          if (tab === 'genres' && activeGenre !== 'All' && item.genre !== activeGenre) return false;
          if (search && !item.title.toLowerCase().includes(search.toLowerCase()) && !item.genre.toLowerCase().includes(search.toLowerCase())) return false;
          if (showWatchlistOnly && !watchlist.has(item.id)) return false;
          return true;
        })
        .sort((a, b) => {
          if (sortBy === 'Top Rated') return parseFloat(b.rating) - parseFloat(a.rating);
          if (sortBy === 'Newest') return b.year - a.year;
          if (sortBy === 'Carbon Score') return a.carbonScore - b.carbonScore;
          return 0;
        }),
    [activeGenre, search, showWatchlistOnly, sortBy, tab, watchlist],
  );

  return {
    activeGenre,
    featured: seriesCatalog[0],
    filtered,
    isLight,
    search,
    setActiveGenre,
    setSearch,
    setShowWatchlistOnly,
    setSortBy,
    setSubCategory,
    showWatchlistOnly,
    sortBy,
    tab,
    toggleWatchlist,
    watchlist,
  };
}

