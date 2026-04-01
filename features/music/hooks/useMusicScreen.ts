import React from 'react';
import { useApiResource } from '../../../hooks/useApiResource';
import type { MusicApiResponse } from '../../../lib/api/contracts';
import { useLanguageStore } from '../../../lib/stores/languageStore';
import { useMusicStore, type Track } from '../../../lib/stores/musicStore';
import { useThemeStore } from '../../../lib/stores/themeStore';
import type { MusicTab } from '../../../lib/data/musicCatalog';
import { fetchMusicBrowser } from '../api';

export function useMusicScreen() {
  const { currentTrack, isPlaying, setTrack } = useMusicStore();
  const { theme } = useThemeStore();
  const { language } = useLanguageStore();
  const [tab, setTab] = React.useState<MusicTab>('library');
  const [activeGenre, setActiveGenre] = React.useState('All');
  const [showGema, setShowGema] = React.useState(false);

  const loadMusic = React.useCallback((signal: AbortSignal) => fetchMusicBrowser(language, activeGenre, signal), [activeGenre, language]);
  const { data: musicResponse, isLoading, loadError } = useApiResource<MusicApiResponse>({ load: loadMusic });

  const musicContent = musicResponse?.data;
  const tracks = musicContent?.tracks ?? [];
  const artists = musicContent?.artists ?? [];
  const albums = musicContent?.albums ?? [];
  const playlists = musicContent?.playlists ?? [];
  const genres = React.useMemo(() => musicContent?.genres ?? [], [musicContent]);
  const tabs = musicContent?.tabs ?? [];
  const labels = musicContent?.labels;
  const filteredTracks = musicContent?.filteredTracks ?? [];

  React.useEffect(() => {
    if (!genres.length) return;
    if (!genres.includes(activeGenre)) {
      setActiveGenre(genres[0] ?? 'All');
    }
  }, [activeGenre, genres]);

  const handlePlay = React.useCallback((track: Track) => setTrack(track, tracks), [setTrack, tracks]);
  const isLight = theme === 'light';

  return {
    activeGenre,
    albums,
    artists,
    bgGradient: isLight
      ? 'linear-gradient(135deg, #f0f4f7 0%, #eef2f6 50%, #f5f7fa 100%)'
      : 'linear-gradient(135deg, #0A0F18 0%, #0D1B2A 50%, #0A1522 100%)',
    cardBg: isLight ? 'rgba(255,255,255,0.82)' : 'rgba(15,25,35,0.8)',
    cardBorder: isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.06)',
    currentTrack,
    filteredTracks,
    genres,
    handlePlay,
    isLight,
    isLoading,
    isPlaying,
    labels,
    language,
    loadError,
    pageTextMuted: isLight ? '#64748b' : '#6b7280',
    pageTextPrimary: isLight ? '#0f172a' : '#ffffff',
    pageTextSecondary: isLight ? '#475569' : '#9ca3af',
    playlists,
    setActiveGenre,
    setShowGema,
    setTab,
    showGema,
    tab,
    tabs,
    tracks,
  };
}


