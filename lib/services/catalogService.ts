import type { HeroItem } from '../../components/home/HeroCarousel';
import type { ContentItem } from '../../components/home/ContentRow';
import {
  continueWatchingItems,
  featuredGridItems,
  features,
  heroItems,
  newReleaseItems,
  sectionCopy,
  trendingItems,
  watchHistoryItems,
} from '../data/homeCatalog';
import {
  BOT_MESSAGES_DE,
  BOT_MESSAGES_EN,
  LIVE_UI_TEXT,
  SEED_CHAT_DE,
  SEED_CHAT_EN,
  STREAMS_DE,
  STREAMS_EN,
  type BotMessage,
  type ChatMessage,
  type Stream,
} from '../data/liveCatalog';
import {
  DASHBOARD_QUICK_STATS,
  DASHBOARD_UI_TEXT,
  getContinueWatching,
  getWatchHistory,
  resolveDashboardText,
} from '../data/dashboardCatalog';
import {
  ESPORTS_EVENTS,
  GAMING_TABS,
  GAMING_UI_TEXT,
  LEADERBOARD,
  NEW_GAMES,
  REMIX_CLIPS,
  TOP_CREATORS,
  TOURNAMENT_BRACKET,
  getGames,
  resolveGamingText,
  type CloudGame,
  type GamingTab,
} from '../data/gamingCatalog';
import {
  GENRES as MUSIC_GENRES,
  LOCALIZED_ALBUMS,
  LOCALIZED_ARTISTS,
  LOCALIZED_PLAYLISTS,
  LOCALIZED_TRACKS,
  TABS as MUSIC_TABS,
  musicGenreLabel,
  musicText,
  resolveMusicText,
  toTrack,
  type MusicTab,
} from '../data/musicCatalog';
import { minis, type MiniCatalogItem } from '../data/minisCatalog';
import {
  SEARCH_GENRES,
  SEARCH_LABELS,
  SEARCH_LANGUAGES,
  SEARCH_RESULTS,
  SEARCH_TRENDING,
  SEARCH_TYPES,
  type SearchLabels,
  type SearchResultItem,
} from '../data/searchCatalog';
import type { SupportedLanguage } from '../types/content';
import type { Track } from '../../types/media';

export type CatalogLanguage = SupportedLanguage;

export interface HomeFeature {
  title: string;
  description: string;
}

export interface HomeFeaturedCard {
  title: string;
  subtitle: string;
  href: string;
  type: 'music' | 'video' | 'live';
  carbonScore: number;
  genre: string;
}

export interface HomeStat {
  value: string;
  label: string;
  color: string;
}

export interface HomeSectionCopy {
  why: string;
  builtFor: string;
  future: string;
  featureText: string;
  impact: string;
  savedToday: string;
  streamersLine: string;
  liveTracking: string;
  curated: string;
  topPicks: string;
  forYou: string;
  viewAll: string;
  commitment: string;
  everyStream: string;
  carbonNeutral: string;
  commitmentText: string;
  learnMore: string;
  getStarted: string;
  streamEverything: string;
  emitNothing: string;
  movement: string;
  startFree: string;
  pricing: string;
  stats: HomeStat[];
}

export interface HomePageContent {
  heroItems: HeroItem[];
  trendingItems: ContentItem[];
  continueWatchingItems: ContentItem[];
  newReleaseItems: ContentItem[];
  watchHistoryItems: ContentItem[];
  featuredGridItems: HomeFeaturedCard[];
  features: HomeFeature[];
  sectionCopy: HomeSectionCopy;
}

export interface SearchFilters {
  query: string;
  genre: string;
  type: string;
  language: string;
  minCarbon: number;
}

export interface SearchPageContent {
  genres: readonly string[];
  types: readonly string[];
  languages: readonly string[];
  labels: SearchLabels;
  trending: readonly string[];
  results: readonly SearchResultItem[];
}

export interface DashboardQuickStat {
  label: string;
  value: string;
  color: string;
  icon: string;
}

export interface DashboardPageContent {
  continueWatching: ReturnType<typeof getContinueWatching>;
  watchHistory: ReturnType<typeof getWatchHistory>;
  quickStats: DashboardQuickStat[];
  labels: {
    continueWatching: string;
    watchHistory: string;
    editProfile: string;
    shareStats: string;
    memberSince: string;
    impactTitle: string;
    methodology: string;
    watched: string;
    saved: string;
  };
}

export interface GamingPageContent {
  tabs: { id: GamingTab; label: string; emoji: string }[];
  games: CloudGame[];
  leaderboard: typeof LEADERBOARD;
  tournamentBracket: typeof TOURNAMENT_BRACKET;
  creators: typeof TOP_CREATORS;
  esports: typeof ESPORTS_EVENTS;
  newGames: CloudGame[];
  remixClips: typeof REMIX_CLIPS;
  labels: {
    pageTitle: string;
    pageSubtitle: string;
    featuredChip: string;
    featuredTitle: string;
    featuredSubtitle: string;
    watchLive: string;
    libraryTitle: string;
    playing: string;
    creatorsTitle: string;
    esportsTitle: string;
    newGamesTitle: string;
    remixTitle: string;
  };
}

export interface LivePageContent {
  streams: Stream[];
  seedChat: ChatMessage[];
  botMessages: BotMessage[];
  labels: {
    heroTitle: string;
    heroSubtitle: string;
    offsetLabel: string;
    minLiveLabel: string;
    healthLabel: string;
    streamHealthLabel: string;
    watchLiveLabel: string;
    watchStatLabel: string;
    allChannelsLabel: string;
    liveChatLabel: string;
    saySomethingLabel: string;
    sendLabel: string;
    encryptedLabel: string;
  };
}

export interface MusicArtistView {
  id: number;
  name: string;
  genre: string;
  followers: string;
  tracks: number;
  imageUrl: string;
  verified: boolean;
}

export interface MusicAlbumView {
  id: number;
  title: string;
  artist: string;
  year: number;
  tracks: number;
  imageUrl: string;
  genre: string;
}

export interface MusicPlaylistView {
  id: number;
  title: string;
  description: string;
  tracks: number;
  duration: string;
  imageUrl: string;
  curator: string;
}

export interface MusicPageContent {
  tracks: Track[];
  artists: MusicArtistView[];
  albums: MusicAlbumView[];
  playlists: MusicPlaylistView[];
  genres: string[];
  tabs: { id: MusicTab; label: string; emoji: string }[];
  labels: {
    pageTitle: string;
    pageSubtitle: string;
    gemaButton: string;
    featuredStation: string;
    featuredTitle: string;
    featuredSubtitle: string;
    listenNow: string;
    followers: string;
    tracks: string;
    playAll: string;
    by: string;
    carbonFreeTitle: string;
    carbonFreeDescription: string;
    carbonFreeMetric: string;
    gemaNoticeTitle: string;
    understood: string;
  };
}

export interface MiniViewItem extends Omit<MiniCatalogItem, 'title' | 'description' | 'hashtags' | 'music'> {
  title: string;
  description: string;
  hashtags: readonly string[];
  music: string;
}

export interface MinisPageContent {
  items: MiniViewItem[];
}


const SUPPORTED_LANGUAGES: readonly CatalogLanguage[] = ['en', 'de'] as const;


export interface LiveApiResponse {
  language?: CatalogLanguage;
  data: LivePageContent;
  _demoMode?: boolean;
}

export interface HomeApiResponse {
  language?: CatalogLanguage;
  data: HomePageContent;
  _demoMode?: boolean;
}

export const fetchLiveBrowser = async (language: string | null | undefined, signal?: AbortSignal): Promise<LiveApiResponse> => {
  const locale = normalizeCatalogLanguage(language);
  try {
    const response = await fetch(`/api/live?lang=${locale}`, { signal });
    if (!response.ok) throw new Error('Failed to fetch live content');
    return await response.json();
  } catch (error) {
    if ((error as Error).name === 'AbortError') throw error;
    console.error('Live API fetch failed, falling back to static data:', error);
    return { data: getLivePageContent(language), _demoMode: true };
  }
};

export const normalizeCatalogLanguage = (language: string | null | undefined): CatalogLanguage => {
  if (language && SUPPORTED_LANGUAGES.includes(language as CatalogLanguage)) {
    return language as CatalogLanguage;
  }

  return 'en';
};

export const fetchHomePageContent = async (language: string | null | undefined): Promise<HomeApiResponse> => {
  const locale = normalizeCatalogLanguage(language);
  try {
    const response = await fetch(`/api/home?lang=${locale}`);
    if (!response.ok) throw new Error('Failed to fetch home content');
    return await response.json();
  } catch (error) {
    console.error('API fetch failed, falling back to static data:', error);
    return {
      language: locale,
      data: getHomePageContent(language),
      _demoMode: true,
    };
  }
};

export const getHomePageContent = (language: string | null | undefined): HomePageContent => {
  const locale = normalizeCatalogLanguage(language);

  return {
    heroItems: [...heroItems[locale]],
    trendingItems: [...trendingItems[locale]],
    continueWatchingItems: [...continueWatchingItems[locale]],
    newReleaseItems: [...newReleaseItems[locale]],
    watchHistoryItems: [...watchHistoryItems[locale]],
    featuredGridItems: [...featuredGridItems[locale]],
    features: [...features[locale]],
    sectionCopy: {
      ...sectionCopy[locale],
      stats: [...sectionCopy[locale].stats],
    },
  };
};

export const getSearchPageContent = (): SearchPageContent => ({
  genres: SEARCH_GENRES,
  types: SEARCH_TYPES,
  languages: SEARCH_LANGUAGES,
  labels: SEARCH_LABELS,
  trending: SEARCH_TRENDING,
  results: SEARCH_RESULTS,
});

export const getDashboardPageContent = (language: string | null | undefined, totalSaved: number): DashboardPageContent => {
  const locale = normalizeCatalogLanguage(language);

  return {
    continueWatching: getContinueWatching(locale),
    watchHistory: getWatchHistory(locale),
    quickStats: DASHBOARD_QUICK_STATS.map((stat) => ({
      label: resolveDashboardText(stat.label, locale),
      value: stat.staticValue ?? `${(totalSaved * 1000).toFixed(2)} g`,
      color: stat.color,
      icon: stat.icon,
    })),
    labels: {
      continueWatching: resolveDashboardText(DASHBOARD_UI_TEXT.continueWatching, locale),
      watchHistory: resolveDashboardText(DASHBOARD_UI_TEXT.watchHistory, locale),
      editProfile: resolveDashboardText(DASHBOARD_UI_TEXT.editProfile, locale),
      shareStats: resolveDashboardText(DASHBOARD_UI_TEXT.shareStats, locale),
      memberSince: resolveDashboardText(DASHBOARD_UI_TEXT.memberSince, locale),
      impactTitle: resolveDashboardText(DASHBOARD_UI_TEXT.impactTitle, locale),
      methodology: resolveDashboardText(DASHBOARD_UI_TEXT.methodology, locale),
      watched: resolveDashboardText(DASHBOARD_UI_TEXT.watched, locale),
      saved: resolveDashboardText(DASHBOARD_UI_TEXT.saved, locale),
    },
  };
};

export const getGamingPageContent = (language: string | null | undefined): GamingPageContent => {
  const locale = normalizeCatalogLanguage(language);

  return {
    tabs: [...GAMING_TABS],
    games: getGames(locale),
    leaderboard: LEADERBOARD,
    tournamentBracket: TOURNAMENT_BRACKET,
    creators: TOP_CREATORS,
    esports: ESPORTS_EVENTS,
    newGames: NEW_GAMES.map(g => ({ ...g, title: resolveGamingText(g.title, locale), genre: resolveGamingText(g.genre, locale) })) as any,
    remixClips: REMIX_CLIPS,
    labels: {
      pageTitle: resolveGamingText(GAMING_UI_TEXT.pageTitle, locale),
      pageSubtitle: resolveGamingText(GAMING_UI_TEXT.pageSubtitle, locale),
      featuredChip: resolveGamingText(GAMING_UI_TEXT.featuredChip, locale),
      featuredTitle: resolveGamingText(GAMING_UI_TEXT.featuredTitle, locale),
      featuredSubtitle: resolveGamingText(GAMING_UI_TEXT.featuredSubtitle, locale),
      watchLive: resolveGamingText(GAMING_UI_TEXT.watchLive, locale),
      libraryTitle: resolveGamingText(GAMING_UI_TEXT.libraryTitle, locale),
      playing: resolveGamingText(GAMING_UI_TEXT.playing, locale),
      creatorsTitle: resolveGamingText(GAMING_UI_TEXT.creatorsTitle, locale),
      esportsTitle: resolveGamingText(GAMING_UI_TEXT.esportsTitle, locale),
      newGamesTitle: resolveGamingText(GAMING_UI_TEXT.newGamesTitle, locale),
      remixTitle: resolveGamingText(GAMING_UI_TEXT.remixTitle, locale),
    },
  };
};

export const getLivePageContent = (language: string | null | undefined): LivePageContent => {
  const locale = normalizeCatalogLanguage(language);
  const streams = locale === 'de' ? STREAMS_DE : STREAMS_EN;
  const seedChat = locale === 'de' ? SEED_CHAT_DE : SEED_CHAT_EN;
  const botMessages = locale === 'de' ? BOT_MESSAGES_DE : BOT_MESSAGES_EN;

  return {
    streams: [...streams],
    seedChat: [...seedChat],
    botMessages: [...botMessages],
    labels: {
      heroTitle: LIVE_UI_TEXT.heroTitle[locale],
      heroSubtitle: LIVE_UI_TEXT.heroSubtitle[locale],
      offsetLabel: LIVE_UI_TEXT.offsetLabel[locale],
      minLiveLabel: LIVE_UI_TEXT.minLiveLabel[locale],
      healthLabel: LIVE_UI_TEXT.healthLabel[locale],
      streamHealthLabel: LIVE_UI_TEXT.streamHealthLabel[locale],
      watchLiveLabel: LIVE_UI_TEXT.watchLiveLabel[locale],
      watchStatLabel: LIVE_UI_TEXT.watchStatLabel[locale],
      allChannelsLabel: LIVE_UI_TEXT.allChannelsLabel[locale],
      liveChatLabel: LIVE_UI_TEXT.liveChatLabel[locale],
      saySomethingLabel: LIVE_UI_TEXT.saySomethingLabel[locale],
      sendLabel: LIVE_UI_TEXT.sendLabel[locale],
      encryptedLabel: LIVE_UI_TEXT.encryptedLabel[locale],
    },
  };
};

export const getMusicPageContent = (language: string | null | undefined): MusicPageContent => {
  const locale = normalizeCatalogLanguage(language);

  return {
    tracks: LOCALIZED_TRACKS.map((track) => toTrack(track, locale)),
    artists: LOCALIZED_ARTISTS.map((artist) => ({
      ...artist,
      name: resolveMusicText(artist.name, locale),
      genre: resolveMusicText(artist.genre, locale),
    })),
    albums: LOCALIZED_ALBUMS.map((album) => ({
      ...album,
      title: resolveMusicText(album.title, locale),
      artist: resolveMusicText(album.artist, locale),
      genre: musicGenreLabel(album.genre, locale),
    })),
    playlists: LOCALIZED_PLAYLISTS.map((playlist) => ({
      ...playlist,
      title: resolveMusicText(playlist.title, locale),
      description: resolveMusicText(playlist.description, locale),
      curator: resolveMusicText(playlist.curator, locale),
    })),
    genres: MUSIC_GENRES.map((genre) => musicGenreLabel(genre, locale)),
    tabs: MUSIC_TABS.map((tab) => ({ ...tab, label: musicText(tab.label, locale) })),
    labels: {
      pageTitle: musicText('Music Library', locale),
      pageSubtitle: musicText('Carbon-free streaming - GEMA licensed', locale),
      gemaButton: musicText('GEMA Licensed', locale),
      featuredStation: musicText('Featured Station', locale),
      featuredTitle: musicText('Eco Beats Radio', locale),
      featuredSubtitle: musicText('24/7 Carbon-Free Music - 8.4K listening', locale),
      listenNow: musicText('Listen Now', locale),
      followers: musicText('followers', locale),
      tracks: musicText('tracks', locale),
      playAll: musicText('Play All', locale),
      by: musicText('by', locale),
      carbonFreeTitle: musicText('Carbon-Free Audio Streaming', locale),
      carbonFreeDescription: musicText('Audio uses 94% less energy than video. Every minute saves 0.002g CO2.', locale),
      carbonFreeMetric: musicText('CO2/min saved', locale),
      gemaNoticeTitle: musicText('GEMA Licensing Notice', locale),
      understood: musicText('Understood', locale),
    },
  };
};

export const getMusicTracksByGenre = (tracks: readonly Track[], genre: string, language: string | null | undefined): Track[] => {
  const locale = normalizeCatalogLanguage(language);
  if (musicGenreLabel('All', locale) === genre) {
    return [...tracks];
  }

  return tracks.filter((track) => musicGenreLabel(track.genre, locale) === genre);
};

export const getMinisPageContent = (language: string | null | undefined): MinisPageContent => {
  const locale = normalizeCatalogLanguage(language);

  return {
    items: minis.map((item) => ({
      ...item,
      title: item.title[locale],
      description: item.description[locale],
      hashtags: item.hashtags[locale],
      music: item.music[locale],
    })),
  };
};


export const sanitizeSearchQuery = (query: string): string => query.trim().slice(0, 120);

export const filterSearchResults = (results: readonly SearchResultItem[], filters: SearchFilters): SearchResultItem[] => {
  const normalizedQuery = sanitizeSearchQuery(filters.query).toLowerCase();

  return results.filter((result) => {
    if (normalizedQuery && !result.title.toLowerCase().includes(normalizedQuery)) {
      return false;
    }

    if (filters.genre !== 'All' && result.genre !== filters.genre) {
      return false;
    }

    if (filters.type !== 'All' && result.type !== filters.type) {
      return false;
    }

    if (filters.language !== 'All' && result.lang !== filters.language) {
      return false;
    }

    if (result.carbon < filters.minCarbon) {
      return false;
    }

    return true;
  });
};




