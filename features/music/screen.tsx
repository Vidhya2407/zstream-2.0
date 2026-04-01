'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { contentImages } from '../../lib/images/unsplash';
import { calculateMusicImpact, formatMusicCo2, formatMusicEwaste, formatMusicWater } from '../../lib/impact/music';
import { MusicAlbumsGrid, MusicArtistsGrid, MusicPlaylistsGrid } from './components/MusicContentGrids';
import GemaModal from './components/GemaModal';
import MusicCarbonPanel from './components/MusicCarbonPanel';
import MusicFeaturedHero from './components/MusicFeaturedHero';
import MusicHeader from './components/MusicHeader';
import MusicLibraryFilters from './components/MusicLibraryFilters';
import MusicLibraryList from './components/MusicLibraryList';
import MusicTabBar from './components/MusicTabBar';
import { useMusicScreen } from './hooks/useMusicScreen';

export default function MusicPage() {
  const {
    activeGenre,
    albums,
    artists,
    bgGradient,
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
    pageTextMuted,
    pageTextPrimary,
    pageTextSecondary,
    playlists,
    setActiveGenre,
    setShowGema,
    setTab,
    showGema,
    tab,
    tabs,
    tracks,
  } = useMusicScreen();

  const selectedTrack = currentTrack ?? tracks[0] ?? null;
  const panelImpact = calculateMusicImpact(selectedTrack?.durationSeconds ?? 60, selectedTrack?.audioQuality ?? 'high');
  const runtimeLabel = selectedTrack ? `${selectedTrack.duration} track basis` : '1 min basis';
  const qualityLabel = `${panelImpact.qualityLabel} � ${panelImpact.kbps} kbps`;

  return (
    <main className="min-h-screen pb-24" style={{ background: bgGradient }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Image alt="" className="object-cover opacity-[0.07]" fill priority src={contentImages.music[0].url} />
        <div className="absolute inset-0" style={{ background: isLight ? 'linear-gradient(to bottom, rgba(240,244,247,0.72), rgba(240,244,247,0.9), rgba(245,247,250,1))' : 'linear-gradient(to bottom, rgba(10,15,24,0.7), rgba(10,15,24,0.85), rgba(10,15,24,1))' }} />
        <motion.div animate={{ scale: [1, 1.12, 1] }} className="absolute rounded-full" style={{ width: '520px', height: '520px', top: '-15%', left: '-8%', background: 'radial-gradient(circle, rgba(147,51,234,0.18) 0%, transparent 70%)', filter: 'blur(40px)' }} transition={{ duration: 9, repeat: Infinity }} />
        <motion.div animate={{ scale: [1, 1.18, 1] }} className="absolute rounded-full" style={{ width: '420px', height: '420px', bottom: '-10%', right: '-5%', background: 'radial-gradient(circle, rgba(0,229,186,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }} transition={{ duration: 11, repeat: Infinity, delay: 3 }} />
      </div>

      <div className="relative z-10 w-full px-8 py-10 lg:px-12">
        <MusicHeader isLight={isLight} onShowGema={() => setShowGema(true)} pageTextPrimary={pageTextPrimary} pageTextSecondary={pageTextSecondary} subtitle={labels?.pageSubtitle ?? 'Carbon-free streaming | GEMA licensed'} title={labels?.pageTitle ?? 'Music Library'} />
        <MusicFeaturedHero featuredStation={labels?.featuredStation ?? 'Featured Station'} featuredSubtitle={labels?.featuredSubtitle ?? '24/7 Carbon-Free Music | 8.4K listening'} featuredTitle={labels?.featuredTitle ?? 'Eco Beats Radio'} hasTracks={tracks.length > 0} isLight={isLight} listenNow={labels?.listenNow ?? 'Listen Now'} onPlay={() => tracks[0] && handlePlay(tracks[0])} />
        <MusicTabBar isLight={isLight} language={language} tab={tab} tabs={tabs} onTabChange={setTab} />

        <div className="mb-6 min-h-5">
          {isLoading && <p className="text-xs" style={{ color: pageTextMuted }}>Loading music library...</p>}
          {loadError && <p className="text-xs" style={{ color: '#ef4444' }}>{loadError}</p>}
        </div>

        <AnimatePresence mode="wait">
          {tab === 'library' && <motion.div key="library" animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} initial={{ opacity: 0, y: 8 }}><MusicLibraryFilters activeGenre={activeGenre} genres={genres} isLight={isLight} onGenreChange={setActiveGenre} /><MusicLibraryList currentTrack={currentTrack} filteredTracks={filteredTracks} handlePlay={handlePlay} isLight={isLight} isPlaying={isPlaying} language={language} pageTextMuted={pageTextMuted} pageTextPrimary={pageTextPrimary} pageTextSecondary={pageTextSecondary} /></motion.div>}
          {tab === 'artists' && <motion.div key="artists" animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} initial={{ opacity: 0, y: 8 }}><MusicArtistsGrid artists={artists} handlePlay={handlePlay} labels={labels} language={language} pageTextMuted={pageTextMuted} pageTextPrimary={pageTextPrimary} pageTextSecondary={pageTextSecondary} tracks={tracks} /></motion.div>}
          {tab === 'albums' && <motion.div key="albums" animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} initial={{ opacity: 0, y: 8 }}><MusicAlbumsGrid albums={albums} handlePlay={handlePlay} labels={labels} language={language} pageTextMuted={pageTextMuted} pageTextPrimary={pageTextPrimary} pageTextSecondary={pageTextSecondary} tracks={tracks} /></motion.div>}
          {tab === 'playlists' && <motion.div key="playlists" animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} initial={{ opacity: 0, y: 8 }}><MusicPlaylistsGrid handlePlay={handlePlay} labels={labels} language={language} pageTextMuted={pageTextMuted} pageTextPrimary={pageTextPrimary} pageTextSecondary={pageTextSecondary} playlists={playlists} tracks={tracks} /></motion.div>}
        </AnimatePresence>

        <MusicCarbonPanel
          carbonFreeDescription={labels?.carbonFreeDescription ?? 'Modeled with the music baseline from zstream-calc.html for platform-side audio delivery.'}
          carbonFreeTitle={labels?.carbonFreeTitle ?? 'Audio Impact Estimate'}
          co2Value={formatMusicCo2(panelImpact.estimatedCo2Grams)}
          waterValue={formatMusicWater(panelImpact.waterMl)}
          ewasteValue={formatMusicEwaste(panelImpact.ewasteMicrograms)}
          pageTextMuted={pageTextMuted}
          pageTextSecondary={pageTextSecondary}
          qualityLabel={qualityLabel}
          runtimeLabel={runtimeLabel}
        />
      </div>

      <GemaModal isLight={isLight} isOpen={showGema} onClose={() => setShowGema(false)} pageTextPrimary={pageTextPrimary} title={labels?.gemaNoticeTitle ?? 'GEMA Licensing Notice'} understoodLabel={labels?.understood ?? 'Understood'} />
    </main>
  );
}
