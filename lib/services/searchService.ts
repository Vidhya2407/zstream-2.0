import type { SearchResultItem } from '../data/searchCatalog';
import { getOrSetCache } from '../cache/runtime';
import dbConnect from '../db/mongodb';
import Video from '../models/Video';
import {
  filterSearchResults,
  getSearchPageContent as getSearchPageFallbackContent,
  normalizeCatalogLanguage,
  sanitizeSearchQuery,
  type SearchPageContent,
} from './catalogService';
import type { ContentResolution } from './homeService';

const SEARCH_CACHE_TTL_SECONDS = 180;
const SEARCH_TYPE_LABELS: Record<string, string> = { live: 'Live', minis: 'Minis', music: 'Music', video: 'Movie' };
const SEARCH_LANGUAGE_LABELS: Record<string, string> = { de: 'German', en: 'English' };

function mapVideoToSearchResult(item: Record<string, unknown>, index: number): SearchResultItem {
  const contentType = typeof item.contentType === 'string' ? item.contentType : 'video';
  const metadata = typeof item.metadata === 'object' && item.metadata !== null ? item.metadata as Record<string, unknown> : {};
  const publishedAt = item.publishedAt instanceof Date ? item.publishedAt : new Date();

  return {
    id: String(item._id ?? index + 1),
    title: typeof item.title === 'string' ? item.title : 'Untitled',
    type: SEARCH_TYPE_LABELS[contentType] ?? 'Movie',
    genre: typeof item.category === 'string' && item.category ? item.category : 'Documentary',
    lang: SEARCH_LANGUAGE_LABELS[String(item.locale ?? 'en')] ?? 'English',
    carbon: typeof item.carbonFootprint === 'number' ? Math.max(0, Math.min(100, Math.round((1 - item.carbonFootprint) * 100))) : 80,
    year: publishedAt.getFullYear(),
    rating: typeof metadata.rating === 'number' ? metadata.rating : 8,
    thumb: typeof item.thumbnailUrl === 'string' && item.thumbnailUrl ? item.thumbnailUrl : '/api/placeholder/240/135',
  };
}

export async function getSearchPagePrimaryContent(language: string | null | undefined): Promise<SearchPageContent | null> {
  const locale = normalizeCatalogLanguage(language);
  const connection = await dbConnect();
  if (!connection) return null;

  const items = await Video.find({ locale, status: 'published', contentType: { $in: ['video', 'live', 'music', 'minis'] } })
    .sort({ publishedAt: -1, views: -1 })
    .limit(40)
    .lean();

  if (!items.length) return null;

  const fallback = getSearchPageFallbackContent();
  return {
    ...fallback,
    results: items.map((item, index) => mapVideoToSearchResult(item as unknown as Record<string, unknown>, index)),
  };
}

export async function resolveSearchPageContent(language: string | null | undefined): Promise<ContentResolution<SearchPageContent>> {
  const locale = normalizeCatalogLanguage(language);
  return getOrSetCache(`search:${locale}`, async () => {
    const primary = await getSearchPagePrimaryContent(locale);
    if (primary) {
      return { data: primary, source: 'primary', demoMode: false };
    }

    return { data: getSearchPageFallbackContent(), source: 'fallback', demoMode: true };
  }, SEARCH_CACHE_TTL_SECONDS);
}

export { filterSearchResults, getSearchPageFallbackContent as getSearchPageContent, sanitizeSearchQuery };
