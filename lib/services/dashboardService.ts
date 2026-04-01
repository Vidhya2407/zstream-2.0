import dbConnect from '../db/mongodb';
import Video from '../models/Video';
import { getOrSetCache } from '../cache/runtime';
import { getDashboardPageContent as getDashboardPageFallbackContent, normalizeCatalogLanguage, type DashboardPageContent } from './catalogService';
import type { ContentResolution } from './homeService';

const DASHBOARD_CACHE_TTL_SECONDS = 120;

function mapDashboardType(contentType: string) {
  if (contentType === 'music') return 'music';
  if (contentType === 'live') return 'live';
  if (contentType === 'minis') return 'shorts';
  return 'video';
}

export async function getDashboardPagePrimaryContent(language: string | null | undefined, totalSaved: number): Promise<DashboardPageContent | null> {
  const locale = normalizeCatalogLanguage(language);
  const connection = await dbConnect();
  if (!connection) return null;

  const [items, totalStreams] = await Promise.all([
    Video.find({ locale, status: 'published', contentType: { $in: ['video', 'live', 'music', 'minis'] } })
      .sort({ publishedAt: -1, views: -1 })
      .limit(8)
      .lean(),
    Video.countDocuments({ locale, status: 'published' }),
  ]);

  if (!items.length) return null;

  const fallback = getDashboardPageFallbackContent(locale, totalSaved);

  return {
    ...fallback,
    continueWatching: items.slice(0, 5).map((item, index) => {
      const fallbackItem = fallback.continueWatching[index % fallback.continueWatching.length];
      return {
        ...fallbackItem,
        id: String(item._id),
        title: item.title || fallbackItem.title,
        subtitle: item.duration ? `${item.duration} remaining` : fallbackItem.subtitle,
        imageUrl: item.thumbnailUrl || fallbackItem.imageUrl,
        type: mapDashboardType(String(item.contentType ?? 'video')),
        co2: `${typeof item.carbonFootprint === 'number' ? item.carbonFootprint.toFixed(2) : '0.07'}g/hr`,
      };
    }),
    watchHistory: items.slice(0, 6).map((item, index) => {
      const fallbackItem = fallback.watchHistory[index % fallback.watchHistory.length];
      return {
        ...fallbackItem,
        id: String(item._id),
        title: item.title || fallbackItem.title,
        genre: item.category || fallbackItem.genre,
        watchedAt: locale === 'de' ? 'Gerade eben' : 'Just now',
        co2: `${typeof item.carbonFootprint === 'number' ? item.carbonFootprint.toFixed(2) : '0.09'}g`,
        imageUrl: item.thumbnailUrl || fallbackItem.imageUrl,
      };
    }),
    quickStats: fallback.quickStats.map((stat, index) => index === 1
      ? { ...stat, value: totalStreams.toLocaleString(locale === 'de' ? 'de-DE' : 'en-US') }
      : stat),
  };
}

export async function resolveDashboardPageContent(language: string | null | undefined, totalSaved: number): Promise<ContentResolution<DashboardPageContent>> {
  const locale = normalizeCatalogLanguage(language);
  return getOrSetCache(`dashboard:${locale}:${Math.round(totalSaved * 1000)}`, async () => {
    const primary = await getDashboardPagePrimaryContent(locale, totalSaved);
    if (primary) {
      return { data: primary, source: 'primary', demoMode: false };
    }

    return { data: getDashboardPageFallbackContent(locale, totalSaved), source: 'fallback', demoMode: true };
  }, DASHBOARD_CACHE_TTL_SECONDS);
}

export const getDashboardPageContent = getDashboardPageFallbackContent;


