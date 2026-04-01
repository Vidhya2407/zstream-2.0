import type {
  ApiResponse,
  DashboardApiResponse,
  GamingApiResponse,
  HomeApiResponse,
  LiveApiResponse,
  MinisApiResponse,
  MusicApiResponse,
  SearchApiResponse,
  WatchApiResponse,
} from '@/types/api';
import { apiRoutes } from './routes';

const buildRelativeUrl = (path: string, params?: Record<string, string | number | undefined>) => {
  const searchParams = new URLSearchParams();

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== '') {
        searchParams.set(key, String(value));
      }
    }
  }

  const query = searchParams.toString();
  return query ? `${path}?${query}` : path;
};

const fetchBrowserJson = async <T extends ApiResponse<unknown>>(
  path: string,
  params?: Record<string, string | number | undefined>,
  signal?: AbortSignal,
): Promise<T> => {
  const response = await fetch(buildRelativeUrl(path, params), {
    headers: { Accept: 'application/json' },
    cache: 'no-store',
    signal,
  });

  const payload = (await response.json()) as T;

  if (!response.ok || !payload.success) {
    throw new Error(payload.error ?? `API request failed: ${response.status} ${response.statusText}`);
  }

  return payload;
};

export const fetchHomeBrowser = (lang?: string, signal?: AbortSignal) =>
  fetchBrowserJson<HomeApiResponse>(apiRoutes.home, { lang }, signal);
export const fetchSearchBrowser = (params?: Record<string, string | number | undefined>, signal?: AbortSignal) =>
  fetchBrowserJson<SearchApiResponse>(apiRoutes.search, params, signal);
export const fetchMusicBrowser = (lang?: string, genre?: string, signal?: AbortSignal) =>
  fetchBrowserJson<MusicApiResponse>(apiRoutes.music, { lang, genre }, signal);
export const fetchDashboardBrowser = (lang?: string, totalSaved?: number, signal?: AbortSignal) =>
  fetchBrowserJson<DashboardApiResponse>(apiRoutes.dashboard, { lang, totalSaved }, signal);
export const fetchLiveBrowser = (lang?: string, signal?: AbortSignal) =>
  fetchBrowserJson<LiveApiResponse>(apiRoutes.live, { lang }, signal);
export const fetchGamingBrowser = (lang?: string, signal?: AbortSignal) =>
  fetchBrowserJson<GamingApiResponse>(apiRoutes.gaming, { lang }, signal);
export const fetchMinisBrowser = (lang?: string, signal?: AbortSignal) =>
  fetchBrowserJson<MinisApiResponse>(apiRoutes.minis, { lang }, signal);
export const fetchWatchBrowser = (id: string, signal?: AbortSignal) =>
  fetchBrowserJson<WatchApiResponse>(apiRoutes.watch(id), undefined, signal);


