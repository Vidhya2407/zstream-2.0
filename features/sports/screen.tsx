'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { contentImages } from '../../lib/images/unsplash';
import { SPORTS_EMPTY_STATE_COPY } from './config';
import { SportsEmptyState, SportsFilters, SportsFixturesGrid, SportsHeader, SportsHighlightCard, SportsScoreCard } from './components';
import { useSportsScreen } from './hooks/useSportsScreen';

export default function SportsPage() {
  const {
    bgGradient,
    currentTab,
    filteredFixtures,
    filteredHighlights,
    isGerman,
    isLight,
    liveMatchesBySport,
    search,
    searchPlaceholder,
    sportFilter,
    sportFilters,
    toggleWatchlist,
    watchlist,
    watchlistLabel,
    showWatchlistOnly,
    setSearch,
    setSportFilter,
    setShowWatchlistOnly,
  } = useSportsScreen();

  const emptyCopy = isGerman ? SPORTS_EMPTY_STATE_COPY.de : SPORTS_EMPTY_STATE_COPY.en;

  return (
    <main className="relative min-h-screen overflow-hidden" style={{ background: bgGradient }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Image alt="" className="object-cover opacity-[0.05]" fill priority src={contentImages.sports[0].url} />
        <div className="absolute inset-0" style={{ background: isLight ? 'linear-gradient(to bottom, rgba(240,244,247,0.85), rgba(240,244,247,0.97))' : 'linear-gradient(to bottom, rgba(10,15,24,0.85), rgba(10,15,24,0.97))' }} />
        <motion.div animate={{ scale: [1, 1.1, 1] }} className="absolute rounded-full" style={{ width: '600px', height: '600px', top: '-20%', right: '-10%', background: 'radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }} transition={{ duration: 12, repeat: Infinity }} />
        <motion.div animate={{ scale: [1, 1.15, 1] }} className="absolute rounded-full" style={{ width: '400px', height: '400px', bottom: '-10%', left: '-5%', background: 'radial-gradient(circle, rgba(0,229,186,0.08) 0%, transparent 70%)', filter: 'blur(50px)' }} transition={{ duration: 9, repeat: Infinity, delay: 3 }} />
      </div>

      <div className="relative z-10 w-full px-8 py-10 lg:px-12">
        <SportsHeader isGerman={isGerman} isLight={isLight} />
        <SportsFilters currentTab={currentTab} isGerman={isGerman} search={search} searchPlaceholder={searchPlaceholder} showWatchlistOnly={showWatchlistOnly} sportFilter={sportFilter} sportFilters={sportFilters} watchlistCount={watchlist.size} watchlistLabel={watchlistLabel} onSearchChange={setSearch} onSportFilterChange={setSportFilter} onWatchlistToggle={() => setShowWatchlistOnly((value) => !value)} />

        <AnimatePresence mode="wait">
          {currentTab === 'scores' && (
            <motion.div key="scores" animate={{ opacity: 1, y: 0 }} className="space-y-12" exit={{ opacity: 0, y: -12 }} initial={{ opacity: 0, y: 12 }}>
              {liveMatchesBySport.length === 0 ? (
                <SportsEmptyState icon="🏟️" message={emptyCopy.scores} />
              ) : (
                liveMatchesBySport.map((group) => (
                  <div key={group.sport} className="space-y-5">
                    <div className="flex items-center gap-4"><h2 className="text-xl font-black text-white">{group.sport}</h2><div className="h-px flex-1 bg-white/5" /></div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                      {group.matches.map((match) => <SportsScoreCard key={match.id} isGerman={isGerman} isLight={isLight} match={match} />)}
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          )}

          {currentTab === 'fixtures' && (
            <motion.div key="fixtures" animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} initial={{ opacity: 0, y: 12 }}>
              {filteredFixtures.length === 0 ? <SportsEmptyState icon="📅" message={emptyCopy.fixtures} /> : <SportsFixturesGrid fixtures={filteredFixtures} isGerman={isGerman} isLight={isLight} />}
            </motion.div>
          )}

          {currentTab === 'highlights' && (
            <motion.div key="highlights" animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} initial={{ opacity: 0, y: 12 }}>
              {filteredHighlights.length === 0 ? (
                <SportsEmptyState icon="🎬" message={emptyCopy.highlights} />
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredHighlights.map((highlight) => <SportsHighlightCard key={highlight.id} isGerman={isGerman} isWatchlisted={watchlist.has(highlight.id)} item={highlight} onToggleWatchlist={toggleWatchlist} />)}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
