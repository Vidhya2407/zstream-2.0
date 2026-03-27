'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { contentImages } from '../../lib/images/unsplash';
import MoviesHeader from './components/MoviesHeader';
import MoviesHeroFeatured from './components/MoviesHeroFeatured';
import MoviesResults from './components/MoviesResults';
import MoviesToolbar from './components/MoviesToolbar';
import { useMoviesScreen } from './hooks/useMoviesScreen';

export default function MoviesPage() {
  const {
    activeGenre,
    featured,
    filtered,
    genres,
    isGerman,
    isLight,
    language,
    search,
    setActiveGenre,
    setSearch,
    setShowWatchlistOnly,
    setSortBy,
    setViewMode,
    showWatchlistOnly,
    sortBy,
    sortOptions,
    toggleWatchlist,
    viewMode,
    watchlist,
  } = useMoviesScreen();

  return (
    <main className="min-h-screen relative overflow-x-hidden" style={{ background: isLight ? '#f0f4f7' : '#0A0F18' }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Image alt="" className="object-cover opacity-[0.04]" fill src={contentImages.movies[0].url} />
        <div className="absolute inset-0" style={{ background: isLight ? 'linear-gradient(to bottom, rgba(240,244,247,0.85), rgba(240,244,247,0.97))' : 'linear-gradient(to bottom, rgba(10,15,24,0.85), rgba(10,15,24,0.97))' }} />
        <motion.div animate={{ scale: [1, 1.08, 1] }} className="absolute rounded-full" style={{ width: '700px', height: '700px', top: '-20%', right: '-10%', background: 'radial-gradient(circle, rgba(0,128,255,0.09) 0%, transparent 70%)', filter: 'blur(70px)' }} transition={{ duration: 14, repeat: Infinity }} />
        <motion.div animate={{ scale: [1, 1.12, 1] }} className="absolute rounded-full" style={{ width: '500px', height: '500px', bottom: '-5%', left: '-5%', background: 'radial-gradient(circle, rgba(0,229,186,0.07) 0%, transparent 70%)', filter: 'blur(60px)' }} transition={{ duration: 10, repeat: Infinity, delay: 5 }} />
      </div>

      <div className="relative z-10 w-full px-8 lg:px-12 py-10">
        <MoviesHeader isGerman={isGerman} isLight={isLight} setViewMode={setViewMode} viewMode={viewMode} />
        <MoviesHeroFeatured isWatchlisted={watchlist.has(featured.id)} movie={featured} onToggle={toggleWatchlist} />
        <MoviesToolbar activeGenre={activeGenre} genres={genres} isGerman={isGerman} isLight={isLight} language={language} search={search} showWatchlistOnly={showWatchlistOnly} sortBy={sortBy} sortOptions={sortOptions} watchlistSize={watchlist.size} onGenreChange={setActiveGenre} onSearchChange={setSearch} onSortChange={setSortBy} onToggleWatchlistOnly={() => setShowWatchlistOnly((value) => !value)} />
        <MoviesResults activeGenre={activeGenre} filtered={filtered} isGerman={isGerman} isLight={isLight} language={language} search={search} showWatchlistOnly={showWatchlistOnly} sortBy={sortBy} toggleWatchlist={toggleWatchlist} viewMode={viewMode} watchlist={watchlist} />
      </div>
    </main>
  );
}
