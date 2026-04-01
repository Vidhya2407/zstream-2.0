import type { SeriesItem, SeriesTab } from './types';

export const seriesGenres = ['All', 'Documentary', 'Sci-Fi', 'Nature', 'Drama', 'Thriller'] as const;
export const seriesSortOptions = ['Most Popular', 'Top Rated', 'Newest', 'Carbon Score'] as const;
export const seriesTabs: { id: SeriesTab; label: string; emoji: string }[] = [
  { id: 'trending', label: 'Trending', emoji: 'T' },
  { id: 'originals', label: 'ZSTREAM Originals', emoji: 'O' },
  { id: 'continue', label: 'Continue Watching', emoji: 'C' },
  { id: 'genres', label: 'By Genre', emoji: 'G' },
];

export const seriesCatalog: SeriesItem[] = [
  { id: 's1', averageEpisodeMinutes: 48, title: 'Planet: A New Hope', genre: 'Documentary', seasons: 2, episodes: 12, rating: '9.4', year: 2024, status: 'Ongoing', imageIdx: 0, carbonScore: 0.07, isPremium: false, isOriginal: true, progress: 62, description: 'A groundbreaking series exploring humanity\'s path to a sustainable future through six continents and dozens of stories.', studio: 'EcoLens Films', language: 'EN', tags: ['Environment', 'Science', 'Hope'] },
  { id: 's2', averageEpisodeMinutes: 55, title: 'Quantum Forest', genre: 'Sci-Fi', seasons: 1, episodes: 8, rating: '8.9', year: 2024, status: 'Complete', imageIdx: 1, carbonScore: 0.06, isPremium: true, isOriginal: true, progress: 20, description: 'When a forest begins communicating via quantum signals, a team of scientists must race to decode the message before it\'s too late.', studio: 'Aurora Pictures', language: 'EN', tags: ['Sci-Fi', 'Nature', 'Technology'] },
  { id: 's3', averageEpisodeMinutes: 44, title: 'Ocean Warriors', genre: 'Nature', seasons: 3, episodes: 24, rating: '9.1', year: 2023, status: 'Ongoing', imageIdx: 0, carbonScore: 0.08, isPremium: false, isOriginal: false, progress: 0, description: 'Marine conservationists battle industrial fishing, pollution, and climate change to protect the last great reef systems.', studio: 'Blue Planet Studio', language: 'EN/DE', tags: ['Nature', 'Conservation', 'Ocean'] },
  { id: 's4', averageEpisodeMinutes: 50, title: 'Future Cities', genre: 'Sci-Fi', seasons: 1, episodes: 6, rating: '8.7', year: 2024, status: 'Complete', imageIdx: 1, carbonScore: 0.07, isPremium: true, isOriginal: true, progress: 100, description: 'Six architects. Six cities. One radical vision of what carbon-neutral urban life could look like by 2060.', studio: 'Urban Vision', language: 'DE/EN', tags: ['Architecture', 'Future', 'Urban'] },
  { id: 's5', averageEpisodeMinutes: 42, title: 'EcoTech Summit', genre: 'Documentary', seasons: 1, episodes: 5, rating: '8.5', year: 2024, status: 'Complete', imageIdx: 0, carbonScore: 0.05, isPremium: false, isOriginal: false, progress: 55, description: 'Inside the world\'s most ambitious green technology summit and the startups changing the planet from their garages.', studio: 'Green Screen Studios', language: 'EN', tags: ['Technology', 'Entrepreneurship', 'Climate'] },
  { id: 's6', averageEpisodeMinutes: 47, title: 'Rewild Chronicles', genre: 'Nature', seasons: 2, episodes: 16, rating: '9.3', year: 2023, status: 'Ongoing', imageIdx: 1, carbonScore: 0.09, isPremium: false, isOriginal: false, progress: 0, description: 'Documenting Europe\'s largest rewilding project returning 300,000 hectares of land to wilderness over a decade.', studio: 'Wild Europa', language: 'EN/FR', tags: ['Nature', 'Conservation', 'Europe'] },
  { id: 's7', averageEpisodeMinutes: 52, title: 'Solar Pioneers', genre: 'Drama', seasons: 1, episodes: 10, rating: '8.8', year: 2024, status: 'Ongoing', imageIdx: 0, carbonScore: 0.06, isPremium: true, isOriginal: true, progress: 78, description: 'A drama series following the engineers, politicians, and activists who made Germany\'s solar energy revolution possible.', studio: 'ZStream Originals', language: 'DE/EN', tags: ['Drama', 'Energy', 'Germany'] },
  { id: 's8', averageEpisodeMinutes: 49, title: 'The Carbon Code', genre: 'Thriller', seasons: 2, episodes: 18, rating: '9.0', year: 2023, status: 'Complete', imageIdx: 1, carbonScore: 0.07, isPremium: true, isOriginal: true, progress: 35, description: 'A financial thriller about a whistleblower exposing the corporate conspiracy behind a fraudulent carbon credit scheme.', studio: 'ZStream Originals', language: 'EN', tags: ['Thriller', 'Finance', 'Crime'] },
  { id: 's9', averageEpisodeMinutes: 46, title: 'Kelp & Carbon', genre: 'Documentary', seasons: 1, episodes: 4, rating: '9.2', year: 2025, status: 'Ongoing', imageIdx: 0, carbonScore: 0.04, isPremium: false, isOriginal: false, progress: 0, description: 'Scientists discover that ocean kelp forests may be humanity\'s greatest untapped tool in the fight against climate change.', studio: 'Ocean Science Media', language: 'EN', tags: ['Science', 'Ocean', 'Climate'] },
];


