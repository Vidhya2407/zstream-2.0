export interface SearchLabels {
  all: { en: string; de: string };
  search: { en: string; de: string };
  placeholder: { en: string; de: string };
  ariaSearch: { en: string; de: string };
  clear: { en: string; de: string };
  trending: { en: string; de: string };
  filters: { en: string; de: string };
  type: { en: string; de: string };
  genre: { en: string; de: string };
  language: { en: string; de: string };
  minCarbon: { en: string; de: string };
  minCarbonAria: { en: string; de: string };
  reset: { en: string; de: string };
  noResults: { en: string; de: string };
  tryAdjusting: { en: string; de: string };
  movie: { en: string; de: string };
  series: { en: string; de: string };
  music: { en: string; de: string };
  minis: { en: string; de: string };
  live: { en: string; de: string };
  ztube: { en: string; de: string };
  english: { en: string; de: string };
  german: { en: string; de: string };
  french: { en: string; de: string };
  spanish: { en: string; de: string };
  japanese: { en: string; de: string };
  korean: { en: string; de: string };
  result: { en: string; de: string };
  results: { en: string; de: string };
}

export interface SearchResultItem {
  id: string;
  title: string;
  type: string;
  genre: string;
  lang: string;
  carbon: number;
  year: number;
  rating: number;
  thumb: string;
}

export const SEARCH_GENRES = ['All', 'Action', 'Drama', 'Comedy', 'Sci-Fi', 'Documentary', 'Horror', 'Romance', 'Thriller', 'Animation'];
export const SEARCH_TYPES = ['All', 'Movie', 'Series', 'Music', 'Minis', 'Live', 'ZTube'];
export const SEARCH_LANGUAGES = ['All', 'English', 'German', 'French', 'Spanish', 'Japanese', 'Korean'];

export const SEARCH_LABELS: SearchLabels = {
  all: { en: 'All', de: 'Alle' },
  search: { en: 'Search', de: 'Suche' },
  placeholder: { en: 'Search movies, series, music, creators...', de: 'Filme, Serien, Musik und Creator suchen...' },
  ariaSearch: { en: 'Search content', de: 'Inhalte suchen' },
  clear: { en: 'Clear search', de: 'Suche leeren' },
  trending: { en: 'Trending searches', de: 'Trend-Suchen' },
  filters: { en: 'Filters', de: 'Filter' },
  type: { en: 'Type', de: 'Typ' },
  genre: { en: 'Genre', de: 'Genre' },
  language: { en: 'Language', de: 'Sprache' },
  minCarbon: { en: 'Min Carbon Score', de: 'Min. CO2-Score' },
  minCarbonAria: { en: 'Minimum carbon score filter', de: 'Filter fuer minimalen CO2-Score' },
  reset: { en: 'Reset filters', de: 'Filter zuruecksetzen' },
  noResults: { en: 'No results found', de: 'Keine Ergebnisse gefunden' },
  tryAdjusting: { en: 'Try adjusting filters or search terms', de: 'Passe Filter oder Suchbegriffe an' },
  movie: { en: 'Movie', de: 'Film' },
  series: { en: 'Series', de: 'Serie' },
  music: { en: 'Music', de: 'Musik' },
  minis: { en: 'Minis', de: 'Minis' },
  live: { en: 'Live', de: 'Live' },
  ztube: { en: 'ZTube', de: 'ZTube' },
  english: { en: 'English', de: 'Englisch' },
  german: { en: 'German', de: 'Deutsch' },
  french: { en: 'French', de: 'Franzoesisch' },
  spanish: { en: 'Spanish', de: 'Spanisch' },
  japanese: { en: 'Japanese', de: 'Japanisch' },
  korean: { en: 'Korean', de: 'Koreanisch' },
  result: { en: 'result', de: 'Ergebnis' },
  results: { en: 'results', de: 'Ergebnisse' },
};

export const SEARCH_RESULTS: SearchResultItem[] = [
  { id: '1', title: 'Planet Green Horizon', type: 'Movie', genre: 'Sci-Fi', lang: 'English', carbon: 94, year: 2024, rating: 8.2, thumb: '/api/placeholder/240/135' },
  { id: '2', title: 'Dark Forest', type: 'Series', genre: 'Thriller', lang: 'German', carbon: 87, year: 2023, rating: 7.9, thumb: '/api/placeholder/240/135' },
  { id: '3', title: 'Solar Beats', type: 'Music', genre: 'Documentary', lang: 'English', carbon: 99, year: 2024, rating: 9.1, thumb: '/api/placeholder/240/135' },
  { id: '4', title: 'Cosmic Drift', type: 'Movie', genre: 'Action', lang: 'English', carbon: 76, year: 2023, rating: 7.5, thumb: '/api/placeholder/240/135' },
  { id: '5', title: 'Cafe Roma', type: 'Minis', genre: 'Romance', lang: 'French', carbon: 91, year: 2024, rating: 8.7, thumb: '/api/placeholder/240/135' },
  { id: '6', title: 'Blade & Shadow', type: 'Movie', genre: 'Action', lang: 'English', carbon: 82, year: 2022, rating: 7.1, thumb: '/api/placeholder/240/135' },
  { id: '7', title: 'Planet Tomorrow Protocol', type: 'Movie', genre: 'Sci-Fi', lang: 'English', carbon: 89, year: 2024, rating: 8.5, thumb: '/api/placeholder/240/135' },
  { id: '8', title: 'Wald & Meer', type: 'Movie', genre: 'Documentary', lang: 'German', carbon: 97, year: 2023, rating: 8.8, thumb: '/api/placeholder/240/135' },
];

export const SEARCH_TRENDING = ['Climate fiction', 'Berlin noir', 'Zero emission docs', 'Eco animation', 'K-drama'];
