import type { Track } from '@/types/media';
import type { CatalogLanguage, DashboardPageContent, GamingPageContent, HomePageContent, LivePageContent, MinisPageContent, MusicPageContent, SearchPageContent } from '@/lib/services/catalogService';
import type { WatchPageContent } from '@/lib/services/watchService';

export interface ApiResponseMeta {
  filters?: Record<string, string | number>;
  language?: CatalogLanguage;
  _demoMode?: boolean;
}

export interface ApiResponse<T> extends ApiResponseMeta {
  success: boolean;
  data: T | null;
  error: string | null;
  timestamp: string;
}

export interface MusicApiData extends MusicPageContent {
  filteredTracks: Track[];
}

export type HomeApiResponse = ApiResponse<HomePageContent>;
export type SearchApiResponse = ApiResponse<SearchPageContent>;
export type MusicApiResponse = ApiResponse<MusicApiData>;
export type LiveApiResponse = ApiResponse<LivePageContent>;
export type MinisApiResponse = ApiResponse<MinisPageContent>;
export type DashboardApiResponse = ApiResponse<DashboardPageContent>;
export type GamingApiResponse = ApiResponse<GamingPageContent>;
export type WatchApiResponse = ApiResponse<WatchPageContent>;

export interface RegisterResponseData {
  message: string;
  userId?: string;
}

export type RegisterApiResponse = ApiResponse<RegisterResponseData>;


