import dbConnect from '../db/mongodb';
import Video from '../models/Video';
import { getOrSetCache } from '../cache/runtime';
import {
  fetchLiveBrowser,
  getLivePageContent as getLivePageFallbackContent,
  normalizeCatalogLanguage,
  type LivePageContent,
} from './catalogService';
import type { ContentResolution } from './homeService';
import type { LiveApiResponse } from '../api/contracts';

const LIVE_CACHE_TTL_SECONDS = 60;

export async function getLivePagePrimaryContent(language: string | null | undefined): Promise<LivePageContent | null> {
  const locale = normalizeCatalogLanguage(language);
  const connection = await dbConnect();
  if (!connection) return null;

  const items = await Video.find({ locale, status: 'published', contentType: 'live' })
    .sort({ publishedAt: -1, views: -1 })
    .limit(12)
    .lean();

  if (!items.length) return null;

  const fallback = getLivePageFallbackContent(locale);

  return {
    ...fallback,
    streams: items.map((item, index) => ({
      id: index,
      title: item.title,
      viewers: item.views ?? 0,
      category: item.category || 'Live',
      imageIdx: typeof item.metadata?.imageIdx === 'number' ? item.metadata.imageIdx : index % 2,
      bitrate: typeof item.metadata?.bitrate === 'number' ? item.metadata.bitrate : 4.8,
      fps: typeof item.metadata?.fps === 'number' ? item.metadata.fps : 60,
      latency: typeof item.metadata?.latency === 'number' ? item.metadata.latency : 18,
      quality: typeof item.metadata?.quality === 'string' ? item.metadata.quality : '1080p',
      carbonOffset: typeof item.metadata?.carbonOffset === 'number' ? item.metadata.carbonOffset : 0,
    })),
  };
}

export async function resolveLivePageContent(language: string | null | undefined): Promise<ContentResolution<LivePageContent>> {
  const locale = normalizeCatalogLanguage(language);
  return getOrSetCache(`live:${locale}`, async () => {
    const primary = await getLivePagePrimaryContent(locale);
    if (primary) {
      return { data: primary, source: 'primary', demoMode: false };
    }

    return { data: getLivePageFallbackContent(locale), source: 'fallback', demoMode: true };
  }, LIVE_CACHE_TTL_SECONDS);
}

export const getLivePageContent = getLivePageFallbackContent;
export { fetchLiveBrowser };
export type { LiveApiResponse, LivePageContent };
