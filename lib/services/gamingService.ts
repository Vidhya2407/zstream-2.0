import dbConnect from '../db/mongodb';
import Video from '../models/Video';
import { getOrSetCache } from '../cache/runtime';
import { getGamingPageContent as getGamingPageFallbackContent, normalizeCatalogLanguage, type GamingPageContent } from './catalogService';
import type { ContentResolution } from './homeService';

const GAMING_CACHE_TTL_SECONDS = 180;
const GAMING_CATEGORY_MATCH = /(gaming|esports|racing|strategy|simulation|rpg|fps|battle)/i;

export async function getGamingPagePrimaryContent(language: string | null | undefined): Promise<GamingPageContent | null> {
  const locale = normalizeCatalogLanguage(language);
  const connection = await dbConnect();
  if (!connection) return null;

  const items = await Video.find({
    locale,
    status: 'published',
    $or: [
      { category: { $regex: GAMING_CATEGORY_MATCH } },
      { tags: { $in: ['gaming', 'esports'] } },
    ],
  })
    .sort({ publishedAt: -1, views: -1 })
    .limit(12)
    .lean();

  if (!items.length) return null;

  const fallback = getGamingPageFallbackContent(locale);
  const mappedGames = items.slice(0, 6).map((item, index) => {
    const fallbackGame = fallback.games[index % fallback.games.length];
    return {
      ...fallbackGame,
      id: fallbackGame.id,
      title: item.title || fallbackGame.title,
      genre: item.category || fallbackGame.genre,
      players: typeof item.views === 'number' ? new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(item.views) : fallbackGame.players,
      rating: typeof item.metadata?.rating === 'number' ? item.metadata.rating.toFixed(1) : fallbackGame.rating,
      carbonGPerHr: typeof item.carbonFootprint === 'number' ? Number((item.carbonFootprint * 100).toFixed(1)) : fallbackGame.carbonGPerHr,
    };
  });

  return {
    ...fallback,
    games: mappedGames,
    newGames: mappedGames.slice(0, 2).map((game, index) => ({ ...game, imageIdx: index % 2 })),
  };
}

export async function resolveGamingPageContent(language: string | null | undefined): Promise<ContentResolution<GamingPageContent>> {
  const locale = normalizeCatalogLanguage(language);
  return getOrSetCache(`gaming:${locale}`, async () => {
    const primary = await getGamingPagePrimaryContent(locale);
    if (primary) {
      return { data: primary, source: 'primary', demoMode: false };
    }

    return { data: getGamingPageFallbackContent(locale), source: 'fallback', demoMode: true };
  }, GAMING_CACHE_TTL_SECONDS);
}

export const getGamingPageContent = getGamingPageFallbackContent;


