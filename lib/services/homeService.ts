import dbConnect from '../db/mongodb';
import Video from '../models/Video';
import { getOrSetCache } from '../cache/runtime';
import { fetchHomeBrowser } from '../api/browserClient';
import {
  getHomePageContent as getHomePageFallbackContent,
  normalizeCatalogLanguage,
  type HomePageContent,
} from './catalogService';
import type { HomeApiResponse } from '../api/contracts';

export interface ContentResolution<T> {
  data: T;
  source: 'primary' | 'fallback';
  demoMode: boolean;
}

const HOME_CACHE_TTL_SECONDS = 300;

export async function getHomePagePrimaryContent(language: string | null | undefined): Promise<HomePageContent | null> {
  const locale = normalizeCatalogLanguage(language);
  const baseData = getHomePageFallbackContent(locale);
  const fallbackTrending = baseData.trendingItems;

  const connection = await dbConnect();
  if (!connection) return null;

  const items = await Video.find({ locale, status: 'published', contentType: { $in: ['video', 'live', 'music', 'minis'] } })
    .sort({ publishedAt: -1, views: -1 })
    .limit(20)
    .lean();

  if (!items.length) return null;

  return {
    ...baseData,
    trendingItems: items.map((item, index) => {
      const fallbackItem = fallbackTrending[index % fallbackTrending.length];
      const rawType = item.contentType === 'live' ? 'live' : item.contentType === 'music' ? 'music' : 'video';
      const contentType = item.contentType === 'minis' ? 'video' : rawType;
      return {
        ...fallbackItem,
        id: fallbackItem.id,
        title: item.title,
        subtitle: `${(item.views ?? 0).toString()} views`,
        href: contentType === 'music' ? '/music' : contentType === 'live' ? '/live' : `/watch/${String(item._id)}`,
        genre: item.category || fallbackItem.genre,
        imageUrl: item.thumbnailUrl || fallbackItem.imageUrl,
        duration: item.duration || fallbackItem.duration,
        type: contentType,
      };
    }),
  };
}

export async function resolveHomePageContent(language: string | null | undefined): Promise<ContentResolution<HomePageContent>> {
  const locale = normalizeCatalogLanguage(language);
  return getOrSetCache(`home:${locale}`, async () => {
    const primary = await getHomePagePrimaryContent(locale);
    if (primary) {
      return { data: primary, source: 'primary', demoMode: false };
    }

    return { data: getHomePageFallbackContent(locale), source: 'fallback', demoMode: true };
  }, HOME_CACHE_TTL_SECONDS);
}

export const getHomePageContent = getHomePageFallbackContent;
export const fetchHomePageContent = fetchHomeBrowser;
export type { HomePageContent, HomeApiResponse };


