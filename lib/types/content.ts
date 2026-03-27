export type ContentKind = 'video' | 'music' | 'live' | 'gaming' | 'shorts' | 'series' | 'meeting' | 'marketplace';
export type SupportedLanguage = 'en' | 'de';

export interface LocalizedText {
  en: string;
  de: string;
}

export interface LocalizedStringArray {
  en: readonly string[];
  de: readonly string[];
}

export interface PlaybackSourceSet {
  primary: string;
  hls?: string;
  dash?: string;
}

export interface ContentArtwork {
  posterUrl: string;
  backdropUrl?: string;
  thumbnailUrl?: string;
}

export interface CatalogMetadata {
  genre?: string;
  year?: number;
  durationLabel?: string;
  durationMinutes?: number;
  rating?: string;
  ageRating?: string;
  carbonScore?: number;
  tags?: readonly string[];
}

export interface BaseCatalogContent {
  id: string;
  slug?: string;
  kind: ContentKind;
  title: string | LocalizedText;
  description?: string | LocalizedText;
  artwork?: ContentArtwork;
  playback?: PlaybackSourceSet;
  metadata?: CatalogMetadata;
  isPremium?: boolean;
}

export interface PlayableContent {
  id: string;
  title: string;
  kind: ContentKind;
  artworkUrl?: string;
  playbackUrl?: string;
  durationLabel?: string;
  carbonScore?: number;
  isPremium?: boolean;
}

export const resolveLocalizedText = (value: string | LocalizedText, language: SupportedLanguage): string =>
  typeof value === 'string' ? value : value[language] ?? value.en;

export const resolveLocalizedStringArray = (value: readonly string[] | LocalizedStringArray, language: SupportedLanguage): readonly string[] => {
  if (Array.isArray(value)) {
    return value;
  }

  const localizedValue = value as LocalizedStringArray;
  return localizedValue[language] ?? localizedValue.en;
};

export const toPlayableContent = (content: BaseCatalogContent, language: SupportedLanguage = 'en'): PlayableContent => ({
  id: content.id,
  title: resolveLocalizedText(content.title, language),
  kind: content.kind,
  artworkUrl: content.artwork?.posterUrl ?? content.artwork?.thumbnailUrl,
  playbackUrl: content.playback?.primary,
  durationLabel: content.metadata?.durationLabel,
  carbonScore: content.metadata?.carbonScore,
  isPremium: content.isPremium,
});


