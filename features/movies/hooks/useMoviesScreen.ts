import React from 'react';
import { GENRES, MOVIES, SORT_OPTIONS, trGenre, trMovieTitle } from '../../../lib/data/moviesCatalog';
import { useLanguageStore } from '../../../lib/stores/languageStore';
import { useNavigationStore } from '../../../lib/stores/navigationStore';
import { useThemeStore } from '../../../lib/stores/themeStore';

export function useMoviesScreen() {
  const { activeSubCategory } = useNavigationStore();
  const { theme } = useThemeStore();
  const { language } = useLanguageStore();
  const tab = activeSubCategory || 'trending';
  const isLight = theme === 'light';
  const isGerman = language === 'de';
  const [activeGenre, setActiveGenre] = React.useState<string>('All');
  const [sortBy, setSortBy] = React.useState<string>('Most Popular');
  const [watchlist, setWatchlist] = React.useState<Set<string>>(new Set());
  const [search, setSearch] = React.useState('');
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [showWatchlistOnly, setShowWatchlistOnly] = React.useState(false);

  const toggleWatchlist = React.useCallback((id: string) => {
    setWatchlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const filtered = React.useMemo(() => {
    return MOVIES.filter((m) => {
      if (tab === 'originals' && !m.isOriginal) return false;
      if (tab === 'top-rated' && parseFloat(m.rating) < 9.0) return false;
      if (tab === 'recently-added' && m.year < 2025) return false;
      if (tab === 'climate-stories' && !m.tags.includes('Climate') && !m.tags.includes('Environment')) return false;
      if (tab === 'continue-watching' && !['m1', 'm2'].includes(m.id)) return false;
      if (showWatchlistOnly && !watchlist.has(m.id)) return false;
      if (activeGenre !== 'All' && m.genre !== activeGenre) return false;

      const translatedTitle = trMovieTitle(m, language).toLowerCase();
      const translatedGenre = trGenre(m.genre, language).toLowerCase();
      const normalizedSearch = search.toLowerCase();

      if (search && !translatedTitle.includes(normalizedSearch) && !translatedGenre.includes(normalizedSearch)) return false;
      return true;
    }).sort((a, b) => {
      if (tab === 'top-rated' || sortBy === 'Top Rated') return parseFloat(b.rating) - parseFloat(a.rating);
      if (tab === 'recently-added' || sortBy === 'Newest') return b.year - a.year;
      if (sortBy === 'Carbon Score') return a.carbonScore - b.carbonScore;
      return 0;
    });
  }, [activeGenre, language, search, showWatchlistOnly, sortBy, tab, watchlist]);

  return {
    activeGenre,
    featured: MOVIES[6],
    filtered,
    genres: GENRES,
    isGerman,
    isLight,
    language,
    search,
    setActiveGenre,
    setSearch,
    setShowWatchlistOnly,
    setSortBy,
    setViewMode,
    showWatchlistOnly,
    sortBy,
    sortOptions: SORT_OPTIONS,
    tab,
    toggleWatchlist,
    viewMode,
    watchlist,
  };
}
