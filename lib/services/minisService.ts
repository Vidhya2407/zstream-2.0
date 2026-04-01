import dbConnect from '../db/mongodb';
import Video from '../models/Video';
import { getOrSetCache } from '../cache/runtime';
import { getMinisPageContent as getMinisPageFallbackContent, normalizeCatalogLanguage, type MiniViewItem, type MinisPageContent } from './catalogService';
import type { ContentResolution } from './homeService';

const MINIS_CACHE_TTL_SECONDS = 180;
const formatCompactViews = (value: number) => new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(value);

export async function getMinisPagePrimaryContent(language: string | null | undefined): Promise<MinisPageContent | null> {
  const locale = normalizeCatalogLanguage(language);
  const connection = await dbConnect();
  if (!connection) return null;

  const items = await Video.find({ locale, status: 'published', contentType: 'minis' })
    .sort({ publishedAt: -1, views: -1 })
    .limit(20)
    .lean();

  if (!items.length) return null;

  const fallback = getMinisPageFallbackContent(locale).items;
  const mapped: MiniViewItem[] = items.map((item, index) => {
    const fallbackItem = fallback[index % fallback.length];
    const metadata = typeof item.metadata === 'object' && item.metadata !== null ? item.metadata as Record<string, unknown> : {};

    return {
      ...fallbackItem,
      id: index + 1,
      title: item.title || fallbackItem.title,
      description: item.description || fallbackItem.description,
      creator: typeof metadata.creatorDisplay === 'string' ? metadata.creatorDisplay : fallbackItem.creator,
      views: typeof item.views === 'number' ? formatCompactViews(item.views) : fallbackItem.views,
      appreciations: typeof item.likes === 'number' ? item.likes : fallbackItem.appreciations,
      shares: typeof metadata.shares === 'number' ? metadata.shares : fallbackItem.shares,
      recycles: typeof metadata.recycles === 'number' ? metadata.recycles : fallbackItem.recycles,
      co2SavedTotal: typeof metadata.co2SavedTotal === 'number' ? metadata.co2SavedTotal : fallbackItem.co2SavedTotal,
      waterSavedTotal: typeof metadata.waterSavedTotal === 'number' ? metadata.waterSavedTotal : fallbackItem.waterSavedTotal,
      energySavedTotal: typeof metadata.energySavedTotal === 'number' ? metadata.energySavedTotal : fallbackItem.energySavedTotal,
      hashtags: Array.isArray(item.tags) && item.tags.length ? item.tags.map(String) : fallbackItem.hashtags,
      music: typeof metadata.music === 'string' ? metadata.music : fallbackItem.music,
    };
  });

  return { items: mapped };
}

export async function resolveMinisPageContent(language: string | null | undefined): Promise<ContentResolution<MinisPageContent>> {
  const locale = normalizeCatalogLanguage(language);
  return getOrSetCache(`minis:${locale}`, async () => {
    const primary = await getMinisPagePrimaryContent(locale);
    if (primary) {
      return { data: primary, source: 'primary', demoMode: false };
    }

    return { data: getMinisPageFallbackContent(locale), source: 'fallback', demoMode: true };
  }, MINIS_CACHE_TTL_SECONDS);
}

export const getMinisPageContent = getMinisPageFallbackContent;


