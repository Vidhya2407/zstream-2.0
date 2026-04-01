export type SeriesTab = 'trending' | 'originals' | 'continue' | 'genres';

export interface SeriesItem {
  carbonScore: number;
  description: string;
  episodes: number;
  genre: string;
  id: string;
  imageIdx: number;
  isOriginal: boolean;
  isPremium: boolean;
  language: string;
  progress: number;
  rating: string;
  seasons: number;
  status: 'Ongoing' | 'Complete';
  studio: string;
  tags: string[];
  title: string;
  year: number;
}


