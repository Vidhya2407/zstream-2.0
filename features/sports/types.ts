import type { Fixture, HighlightCard, LiveMatch } from '../../lib/data/sportsCatalog';

export type SportsTab = 'scores' | 'fixtures' | 'highlights';

export interface SportsFilterOption {
  id: string;
  label: string;
}

export interface LiveMatchesBySport {
  sport: string;
  matches: LiveMatch[];
}

export interface SportsViewModel {
  bgGradient: string;
  currentTab: SportsTab;
  filteredFixtures: Fixture[];
  filteredHighlights: HighlightCard[];
  isGerman: boolean;
  isLight: boolean;
  liveMatchesBySport: LiveMatchesBySport[];
  search: string;
  searchPlaceholder: string;
  sportFilter: string;
  sportFilters: SportsFilterOption[];
  toggleWatchlist: (id: string) => void;
  watchlist: Set<string>;
  watchlistLabel: string;
  showWatchlistOnly: boolean;
  setSearch: (value: string) => void;
  setSportFilter: (value: string) => void;
  setShowWatchlistOnly: (value: boolean | ((current: boolean) => boolean)) => void;
}


