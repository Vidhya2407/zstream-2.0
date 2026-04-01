import dbConnect from '../db/mongodb';
import Video from '../models/Video';
import { getOrSetCache } from '../cache/runtime';
import {
  getMusicPageContent as getMusicPageFallbackContent,
  getMusicTracksByGenre,
  normalizeCatalogLanguage,
  type MusicPageContent,
} from './catalogService';
import type { Track } from '../../types/media';
import type { ContentResolution } from './homeService';

export interface ResolvedMusicPageContent extends MusicPageContent {
  filteredTracks: Track[];
}

const MUSIC_CACHE_TTL_SECONDS = 300;

export async function getMusicPagePrimaryContent(language: string | null | undefined): Promise<MusicPageContent | null> {
  const locale = normalizeCatalogLanguage(language);
  const connection = await dbConnect();
  if (!connection) return null;

  const items = await Video.find({ locale, status: 'published', contentType: 'music' })
    .sort({ publishedAt: -1, views: -1 })
    .limit(50)
    .lean();

  if (!items.length) return null;

  const fallback = getMusicPageFallbackContent(locale);
  const tracks: Track[] = items.map((item, index) => ({
    id: index + 1,
    title: item.title,
    artist: typeof item.metadata?.artist === 'string' ? item.metadata.artist : 'ZSTREAM Audio',
    album: typeof item.metadata?.album === 'string' ? item.metadata.album : 'Green Sessions',
    duration: item.duration || '3:00',
    durationSeconds: typeof item.metadata?.durationSeconds === 'number' ? item.metadata.durationSeconds : 180,
    genre: item.category || 'Ambient',
    imageUrl: item.thumbnailUrl || fallback.tracks[index % fallback.tracks.length]?.imageUrl || '',
    audioUrl: item.audioUrl || item.videoUrl || fallback.tracks[index % fallback.tracks.length]?.audioUrl || '',
    carbonPerMin: typeof item.metadata?.carbonPerMin === 'number' ? item.metadata.carbonPerMin : 0.002,
  }));

  return {
    ...fallback,
    tracks,
  };
}

export async function resolveMusicPageContent(language: string | null | undefined, genre?: string): Promise<ContentResolution<ResolvedMusicPageContent>> {
  const locale = normalizeCatalogLanguage(language);
  return getOrSetCache(`music:${locale}:${genre ?? 'all'}`, async () => {
    const primary = await getMusicPagePrimaryContent(locale);
    const base = primary ?? getMusicPageFallbackContent(locale);
    const filteredTracks = genre ? getMusicTracksByGenre(base.tracks, genre, locale) : base.tracks;

    return {
      data: { ...base, filteredTracks },
      source: primary ? 'primary' : 'fallback',
      demoMode: !primary,
    };
  }, MUSIC_CACHE_TTL_SECONDS);
}

export const getMusicPageContent = getMusicPageFallbackContent;
export { getMusicTracksByGenre };
export type { MusicPageContent };


