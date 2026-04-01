import type { WatchContent } from '../../data/watchContent';

export interface WatchContentDto {
  id: string;
  title: string;
  genre: string;
  year: number;
  duration: string;
  rating: string;
  ageRating: string;
  type: WatchContent['type'];
  carbonScore: number;
  imageUrl: string;
  backdropUrl: string;
  tags: string[];
  isPremium: boolean;
}

export const toWatchContentDto = (content: WatchContent): WatchContentDto => ({
  id: content.id,
  title: content.title,
  genre: content.genre,
  year: content.year,
  duration: content.duration,
  rating: content.rating,
  ageRating: content.ageRating,
  type: content.type,
  carbonScore: content.carbonScore,
  imageUrl: content.imageUrl,
  backdropUrl: content.backdropUrl,
  tags: [...content.tags],
  isPremium: content.isPremium,
});


