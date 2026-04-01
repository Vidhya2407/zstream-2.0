import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { contentImages } from '../../../lib/images/unsplash';
import EstimatedFootprintBadge from '../../../components/impact/EstimatedFootprintBadge';
import type { SeriesItem } from '../types';
import SeriesCarbonBadge from './SeriesCarbonBadge';
import SeriesStarRating from './SeriesStarRating';

interface SeriesCardProps {
  delay?: number;
  isLight: boolean;
  isWatchlisted: boolean;
  onToggleWatchlist: (id: string) => void;
  series: SeriesItem;
}

export default function SeriesCard({ delay = 0, isLight, isWatchlisted, onToggleWatchlist, series }: SeriesCardProps) {
  const [showRate, setShowRate] = React.useState(false);
  const [userRating, setUserRating] = React.useState(0);

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="group cursor-pointer overflow-hidden rounded-2xl"
      initial={{ opacity: 0, y: 16 }}
      style={{ background: isLight ? 'rgba(0,0,0,0.03)' : 'rgba(15,22,34,0.9)', border: isLight ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.06)' }}
      transition={{ delay }}
      whileHover={{ y: -5, borderColor: 'rgba(0,128,255,0.25)' }}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image alt={series.title} className="object-cover transition-transform duration-500 group-hover:scale-105" fill sizes="320px" src={contentImages.hero[series.imageIdx % contentImages.hero.length].url} />
        <div className="absolute inset-0" style={{ background: isLight ? 'linear-gradient(to top, rgba(240,244,247,0.85) 0%, rgba(240,244,247,0.15) 60%, transparent 100%)' : 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.2), transparent)' }} />
        <div className="absolute left-2 top-2 flex gap-1.5">
          {series.isPremium && <span className="rounded-full bg-[rgba(251,191,36,0.9)] px-2 py-0.5 text-[9px] font-bold text-[#0A0F18]">PREMIUM</span>}
          <span className="rounded-full px-2 py-0.5 text-[9px] font-bold text-[#0A0F18]" style={{ background: series.status === 'Ongoing' ? 'rgba(0,229,186,0.85)' : 'rgba(107,114,128,0.75)' }}>{series.status}</span>
        </div>
        <div className="absolute right-2 top-2 rounded bg-[rgba(0,0,0,0.7)] px-1.5 py-0.5 text-[10px] font-bold text-[rgb(251,191,36)]">{series.rating}</div>
        <motion.button
          aria-label="Toggle watchlist"
          className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full"
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
            onToggleWatchlist(series.id);
          }}
          style={{ background: isWatchlisted ? 'rgba(0,229,186,0.9)' : 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)', border: `1px solid ${isWatchlisted ? 'rgba(0,229,186,0.5)' : 'rgba(255,255,255,0.12)'}` }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg className="h-4 w-4" fill={isWatchlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} style={{ color: isWatchlisted ? '#0A0F18' : 'white' }} viewBox="0 0 24 24">
            <path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
          <Link href={`/media-series/${series.id}`}>
            <motion.div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ background: 'rgba(0,229,186,0.9)', boxShadow: '0 0 24px rgba(0,229,186,0.4)' }} whileHover={{ scale: 1.08 }}>
              <svg className="ml-0.5 h-5 w-5 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            </motion.div>
          </Link>
        </div>
        {series.progress > 0 && series.progress < 100 && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[rgba(255,255,255,0.08)]">
            <div className="h-full bg-[rgb(0,229,186)]" style={{ width: `${series.progress}%` }} />
          </div>
        )}
      </div>
      <div className="p-3.5">
        <Link href={`/media-series/${series.id}`}>
          <h3 className="mb-1 truncate text-sm font-bold" style={{ color: isLight ? '#1d1d1f' : 'white' }}>{series.title}</h3>
        </Link>
        <div className="mb-2 flex items-center justify-between text-[9px]" style={{ color: isLight ? '#6b7280' : '#9ca3af' }}>
          <span>{series.genre} · {series.year} · {series.seasons}S/{series.episodes} eps · {series.language}</span>
        </div>
        <p className="mb-2 line-clamp-2 text-[10px] leading-relaxed" style={{ color: isLight ? '#6b7280' : '#9ca3af' }}>{series.description}</p>
        <div className="mb-2">
          <EstimatedFootprintBadge durationLabel={`${series.averageEpisodeMinutes}m`} isLight={isLight} />
        </div>
        <div className="flex items-center justify-between">
          <SeriesCarbonBadge score={series.carbonScore} />
          <div className="flex items-center gap-1">
            {showRate ? (
              <SeriesStarRating
                onChange={(value) => {
                  setUserRating(value);
                  setShowRate(false);
                }}
                value={userRating}
              />
            ) : (
              <button className="text-[9px] transition-colors" onClick={() => setShowRate(true)} style={{ color: isLight ? '#6b7280' : '#9ca3af' }}>
                {userRating > 0 ? <SeriesStarRating value={userRating} /> : 'Rate'}
              </button>
            )}
          </div>
        </div>
        {series.progress === 100 && <p className="mt-1.5 text-[9px]" style={{ color: 'rgb(34,197,94)' }}>Finished</p>}
        {series.progress > 0 && series.progress < 100 && <p className="mt-1.5 text-[9px]" style={{ color: isLight ? '#6b7280' : '#9ca3af' }}>{series.progress}% complete</p>}
      </div>
    </motion.div>
  );
}



