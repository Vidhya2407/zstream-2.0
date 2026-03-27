'use client';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { contentImages } from '../../lib/images/unsplash';
import GamingHeader from './components/GamingHeader';
import GamingLiveStreamsSection from './components/GamingLiveStreamsSection';
import { GamingCreatorsSection, GamingEsportsSection, GamingNewGamesSection, GamingRemixSection, GamingTournamentsSection } from './components/GamingSections';
import { useGamingScreen } from './hooks/useGamingScreen';

export default function GamingPage() {
  const {
    bgGradient,
    border,
    creators,
    esports,
    games,
    hoveredGame,
    isLight,
    isLoading,
    labels,
    loadError,
    newGames,
    pageTextPrimary,
    pageTextSecondary,
    remixClips,
    setHoveredGame,
    shadow,
    surface,
    surfaceAlt,
    tab,
    tournamentBracket,
  } = useGamingScreen();

  return (
    <main className="min-h-screen relative overflow-hidden" style={{ background: bgGradient }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Image alt="" className="object-cover opacity-[0.06]" fill src={contentImages.gaming[0].url} />
        <div className="absolute inset-0" style={{ background: isLight ? 'linear-gradient(to bottom, rgba(240,244,247,0.9), rgba(238,241,245,0.92), rgba(240,244,247,1))' : 'linear-gradient(to bottom, rgba(18,18,18,0.8), rgba(18,18,18,0.88), rgba(18,18,18,1))' }} />
        <motion.div animate={{ scale: [1, 1.12, 1] }} className="absolute rounded-full" style={{ width: '550px', height: '550px', top: '-18%', right: '-8%', background: 'radial-gradient(circle, rgba(0,200,80,0.1) 0%, transparent 70%)', filter: 'blur(60px)' }} transition={{ duration: 11, repeat: Infinity }} />
        <motion.div animate={{ scale: [1, 1.15, 1] }} className="absolute rounded-full" style={{ width: '400px', height: '400px', bottom: '-12%', left: '-5%', background: 'radial-gradient(circle, rgba(147,51,234,0.08) 0%, transparent 70%)', filter: 'blur(50px)' }} transition={{ duration: 9, repeat: Infinity, delay: 4 }} />
      </div>
      <div className="relative z-10 w-full px-8 lg:px-12 py-10">
        <div className="min-h-5 mb-3">
          {isLoading && <p className="text-xs text-gray-500">Loading gaming...</p>}
          {loadError && <p className="text-xs text-red-400">{loadError}</p>}
        </div>
        <GamingHeader pageSubtitle={labels.pageSubtitle} pageTextPrimary={pageTextPrimary} pageTextSecondary={pageTextSecondary} pageTitle={labels.pageTitle} />
        <AnimatePresence mode="wait">
          {tab === 'live-streams' && <GamingLiveStreamsSection border={border} featuredChip={labels.featuredChip} featuredSubtitle={labels.featuredSubtitle} featuredTitle={labels.featuredTitle} games={games} hoveredGame={hoveredGame} isLight={isLight} libraryTitle={labels.libraryTitle} pageTextPrimary={pageTextPrimary} pageTextSecondary={pageTextSecondary} playingLabel={labels.playing} setHoveredGame={setHoveredGame} shadow={shadow} surface={surface} watchLive={labels.watchLive} />}
          {tab === 'tournaments' && <GamingTournamentsSection border={border} featuredTitle={labels.featuredTitle} isLight={isLight} pageTextPrimary={pageTextPrimary} pageTextSecondary={pageTextSecondary} shadow={shadow} surface={surface} surfaceAlt={surfaceAlt} tournamentBracket={tournamentBracket} />}
          {tab === 'top-creators' && <GamingCreatorsSection border={border} creators={creators} creatorsTitle={labels.creatorsTitle} pageTextPrimary={pageTextPrimary} pageTextSecondary={pageTextSecondary} shadow={shadow} surface={surface} />}
          {tab === 'esports' && <GamingEsportsSection border={border} esports={esports} esportsTitle={labels.esportsTitle} pageTextPrimary={pageTextPrimary} pageTextSecondary={pageTextSecondary} shadow={shadow} surface={surface} />}
          {tab === 'new-games' && <GamingNewGamesSection newGames={newGames} newGamesTitle={labels.newGamesTitle} shadow={shadow} />}
          {tab === 'remix-clips' && <GamingRemixSection border={border} pageTextPrimary={pageTextPrimary} pageTextSecondary={pageTextSecondary} remixClips={remixClips} remixTitle={labels.remixTitle} shadow={shadow} surface={surface} />}
        </AnimatePresence>
      </div>
    </main>
  );
}
