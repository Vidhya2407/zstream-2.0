import type { HomePageContent } from '../../lib/services/homeService';

export interface HomeScreenViewModel {
  content: HomePageContent;
  isLight: boolean;
  isLoading: boolean;
  language: 'en' | 'de';
  selectedGenre: string;
  setSelectedGenre: (genre: string) => void;
}
