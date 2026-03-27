import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { contentImages } from '../../../lib/images/unsplash';
import { trDuration, trGenre, trMovieTitle, type Movie } from '../../../lib/data/moviesCatalog';
import type { SupportedLanguage } from '../../../lib/types/content';
import CarbonBadge from './CarbonBadge';
import MovieCard from './MovieCard';

interface MoviesResultsProps {
  activeGenre: string;
  filtered: Movie[];
  isGerman: boolean;
  isLight: boolean;
  language: SupportedLanguage;
  showWatchlistOnly: boolean;
  sortBy: string;
  toggleWatchlist: (id: string) => void;
  viewMode: 'grid' | 'list';
  watchlist: Set<string>;
  search: string;
}

export default function MoviesResults({ activeGenre, filtered, isGerman, isLight, language, search, showWatchlistOnly, sortBy, toggleWatchlist, viewMode, watchlist }: MoviesResultsProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} initial={{ opacity: 0, y: 8 }} key={activeGenre + sortBy + search + String(showWatchlistOnly) + viewMode}>
        {filtered.length === 0 ? (
          <div className="text-center py-24" style={{ color: isLight ? '#6b7280' : '#9ca3af' }}>
            <p className="text-4xl mb-3">?</p>
            <p className="text-sm">{isGerman ? 'Keine Filme gefunden' : 'No movies found'}</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {filtered.map((movie, index) => (
              <MovieCard delay={index * 0.07} isWatchlisted={watchlist.has(movie.id)} key={movie.id} movie={movie} onToggleWatchlist={toggleWatchlist} />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((movie, index) => (
              <motion.div animate={{ opacity: 1, x: 0 }} className="flex items-center gap-4 p-4 rounded-2xl" initial={{ opacity: 0, x: -12 }} key={movie.id} style={{ background: isLight ? 'rgba(255,255,255,0.78)' : 'rgba(15,22,34,0.9)', border: isLight ? '1px solid rgba(15,23,42,0.08)' : '1px solid rgba(255,255,255,0.07)' }} transition={{ delay: index * 0.05 }}>
                <div className="relative w-28 h-16 rounded-xl overflow-hidden flex-shrink-0">
                  <Image alt={trMovieTitle(movie, language)} className="object-cover" fill src={contentImages.movies[movie.imageIdx % contentImages.movies.length].url} />
                </div>
                <div className="flex-1 min-w-0">
                  <Link href={`/movies/${movie.id}`}><h3 className="font-bold text-sm transition-colors" style={{ color: isLight ? '#1d1d1f' : 'white' }}>{trMovieTitle(movie, language)}</h3></Link>
                  <p className="text-[10px] mt-0.5" style={{ color: isLight ? '#6b7280' : '#9ca3af' }}>{trGenre(movie.genre, language)} | {trDuration(movie.duration, language)} | {movie.year} | * {movie.rating}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <CarbonBadge score={movie.carbonScore} />
                    {movie.isPremium && <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ background: isLight ? 'rgba(251,191,36,0.18)' : 'rgba(251,191,36,0.1)', color: isLight ? '#9a6700' : 'rgb(251,191,36)' }}>PREMIUM</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link href={`/movies/${movie.id}`}><button className="px-3 py-1.5 rounded-xl text-[10px] font-bold" style={{ background: 'rgba(0,128,255,0.15)', color: 'rgb(96,165,250)', border: '1px solid rgba(0,128,255,0.25)' }}>{isGerman ? 'Ansehen' : 'Watch'}</button></Link>
                  <button aria-label={isGerman ? 'Merkliste umschalten' : 'Toggle watchlist'} className="w-7 h-7 rounded-lg flex items-center justify-center transition-all" onClick={() => toggleWatchlist(movie.id)} style={{ background: watchlist.has(movie.id) ? 'rgba(0,229,186,0.15)' : isLight ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.05)', border: `1px solid ${watchlist.has(movie.id) ? 'rgba(0,229,186,0.3)' : isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.08)'}`, color: watchlist.has(movie.id) ? 'rgb(0,229,186)' : isLight ? '#6b7280' : 'rgb(107,114,128)' }}>
                    <svg className="w-3.5 h-3.5" fill={watchlist.has(movie.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
