import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { contentImages } from '../../../lib/images/unsplash';
import { useLanguageStore } from '../../../lib/stores/languageStore';
import { useThemeStore } from '../../../lib/stores/themeStore';
import { trDuration, trGenre, trMovieDescription, trMovieTitle, type Movie } from '../../../lib/data/moviesCatalog';
import CarbonBadge from './CarbonBadge';
import StarRating from './StarRating';

interface MovieCardProps {
  delay?: number;
  isWatchlisted: boolean;
  movie: Movie;
  onToggleWatchlist: (id: string) => void;
}

export default function MovieCard({ delay = 0, isWatchlisted, movie, onToggleWatchlist }: MovieCardProps) {
  const { theme } = useThemeStore();
  const { language } = useLanguageStore();
  const isLight = theme === 'light';
  const isGerman = language === 'de';
  const [userRating, setUserRating] = React.useState(0);
  const [showRating, setShowRating] = React.useState(false);
  const [hovering, setHovering] = React.useState(false);

  return (
    <motion.div animate={{ opacity: 1, y: 0 }} className="group rounded-2xl overflow-hidden relative" initial={{ opacity: 0, y: 16 }} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)} style={{ background: isLight ? 'rgba(255,255,255,0.7)' : 'rgba(15,22,34,0.9)', border: `1px solid ${hovering ? 'rgba(0,128,255,0.3)' : isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.06)'}`, transition: 'border-color 0.2s', boxShadow: isLight ? '0 18px 34px rgba(15,23,42,0.06)' : 'none' }} transition={{ delay }} whileHover={{ y: -4 }}>
      <div className="relative aspect-video overflow-hidden">
        <Image alt={trMovieTitle(movie, language)} className="object-cover group-hover:scale-105 transition-transform duration-500" fill sizes="320px" src={contentImages.movies[movie.imageIdx % contentImages.movies.length].url} />
        <div className="absolute inset-0" style={{ background: isLight ? 'linear-gradient(to top, rgba(240,244,247,0.98) 0%, rgba(240,244,247,0.3) 60%, transparent 100%)' : 'linear-gradient(to top, rgba(15,22,34,0.98) 0%, rgba(15,22,34,0.3) 60%, transparent 100%)' }} />
        <div className="absolute top-2 left-2 flex gap-1.5">
          {movie.isPremium && <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ background: isLight ? 'rgba(251,191,36,0.18)' : 'rgba(251,191,36,0.9)', color: isLight ? '#9a6700' : '#0A0F18', border: isLight ? '1px solid rgba(251,191,36,0.25)' : 'none' }}>PREMIUM</span>}
        </div>
        <div className="absolute top-2 right-2 text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: isLight ? 'rgba(255,255,255,0.92)' : 'rgba(0,0,0,0.75)', color: 'rgb(251,191,36)', border: isLight ? '1px solid rgba(15,23,42,0.08)' : 'none' }}>* {movie.rating}</div>
        <motion.button aria-label={isWatchlisted ? (isGerman ? 'Aus Merkliste entfernen' : 'Remove from watchlist') : (isGerman ? 'Zur Merkliste hinzufuegen' : 'Add to watchlist')} className="absolute bottom-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all" onClick={(event) => { event.stopPropagation(); event.preventDefault(); onToggleWatchlist(movie.id); }} style={{ background: isWatchlisted ? 'rgba(0,229,186,0.9)' : isLight ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', border: `1px solid ${isWatchlisted ? 'rgba(0,229,186,0.5)' : isLight ? 'rgba(15,23,42,0.1)' : 'rgba(255,255,255,0.15)'}` }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <svg className="w-4 h-4" fill={isWatchlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} style={{ color: isWatchlisted ? '#0A0F18' : isLight ? '#475569' : 'white' }} viewBox="0 0 24 24"><path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </motion.button>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link href={`/movies/${movie.id}`}>
            <motion.div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,128,255,0.9)', boxShadow: '0 0 28px rgba(0,128,255,0.5)' }} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
              <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            </motion.div>
          </Link>
        </div>
      </div>
      <div className="p-4">
        <Link href={`/movies/${movie.id}`}><h3 className="font-bold text-sm leading-tight mb-1 transition-colors" style={{ color: isLight ? '#1d1d1f' : 'white' }}>{trMovieTitle(movie, language)}</h3></Link>
        <p className="text-[10px] mb-2" style={{ color: isLight ? '#6b7280' : '#9ca3af' }}>{trGenre(movie.genre, language)} | {trDuration(movie.duration, language)} | {movie.year} | {movie.language}</p>
        <p className="text-[10px] leading-relaxed mb-3 line-clamp-2" style={{ color: isLight ? '#4b5563' : '#d1d5db' }}>{trMovieDescription(movie, language)}</p>
        <div className="flex items-center justify-between">
          <CarbonBadge score={movie.carbonScore} />
          <div className="flex items-center gap-2">
            {showRating ? <StarRating onChange={(value) => { setUserRating(value); setShowRating(false); }} value={userRating} /> : <button aria-label={isGerman ? 'Diesen Film bewerten' : 'Rate this movie'} className="text-[9px] transition-colors" onClick={() => setShowRating(true)} style={{ color: isLight ? '#6b7280' : '#9ca3af' }}>{userRating > 0 ? <StarRating value={userRating} /> : <span>{isGerman ? 'Bewerten *' : 'Rate *'}</span>}</button>}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

