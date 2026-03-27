import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { contentImages } from '../../../lib/images/unsplash';
import { getSeriesWatchId, getWatchHref } from '@/lib/navigation/playbackRoutes';
import type { SeriesItem } from '../types';
import SeriesCarbonBadge from './SeriesCarbonBadge';

interface MediaSeriesHeroProps {
  featured: SeriesItem;
  isLight: boolean;
}

export default function MediaSeriesHero({ featured, isLight }: MediaSeriesHeroProps) {
  const playHref = getWatchHref(getSeriesWatchId(featured.id));

  return (
    <motion.div animate={{ opacity: 1, scale: 1 }} className="relative mb-8 overflow-hidden rounded-3xl" initial={{ opacity: 0, scale: 0.97 }} style={{ height: '290px' }} transition={{ delay: 0.1 }}>
      <Image alt={featured.title} className="object-cover" fill src={contentImages.hero[featured.imageIdx % contentImages.hero.length].url} />
      <div className="absolute inset-0" style={{ background: isLight ? 'linear-gradient(to right, rgba(240,244,247,0.98) 0%, rgba(240,244,247,0.55) 55%, rgba(240,244,247,0.1) 100%)' : 'linear-gradient(to right, rgba(10,15,24,0.98) 0%, rgba(10,15,24,0.55) 55%, rgba(10,15,24,0.1) 100%)' }} />
      <div className="absolute inset-0 flex max-w-2xl flex-col justify-end p-8 md:p-10">
        <div className="mb-3 flex items-center gap-2">
          {featured.isOriginal && <span className="rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest" style={{ background: 'rgba(0,128,255,0.15)', border: '1px solid rgba(0,128,255,0.3)', color: 'rgb(96,165,250)' }}>Original</span>}
          <span className="rounded-full px-2.5 py-0.5 text-[9px] font-bold" style={{ background: 'rgba(0,229,186,0.12)', border: '1px solid rgba(0,229,186,0.25)', color: 'rgb(0,229,186)' }}>Season spotlight</span>
          <SeriesCarbonBadge score={featured.carbonScore} />
        </div>
        <h2 className="mb-1 text-3xl font-black" style={{ color: isLight ? '#1d1d1f' : 'white' }}>{featured.title}</h2>
        <p className="mb-1 text-sm" style={{ color: isLight ? '#6b7280' : '#9ca3af' }}>{featured.seasons} seasons · {featured.episodes} episodes · {featured.rating} rating</p>
        <p className="mb-4 line-clamp-2 text-xs leading-relaxed" style={{ color: isLight ? '#4b5563' : '#d1d5db' }}>{featured.description}</p>
        <div className="flex flex-wrap items-center gap-3">
          <Link href={playHref}>
            <motion.button className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold" style={{ background: 'rgba(0,229,186,0.9)', color: '#0A0F18' }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              Continue watching
            </motion.button>
          </Link>
          <Link className="rounded-full px-5 py-2.5 text-sm font-semibold" href={`/media-series/${featured.id}`} style={{ background: isLight ? 'rgba(15,23,42,0.06)' : 'rgba(255,255,255,0.08)', border: isLight ? '1px solid rgba(15,23,42,0.12)' : '1px solid rgba(255,255,255,0.12)', color: isLight ? '#1d1d1f' : 'white' }}>
            Series details
          </Link>
        </div>
      </div>
      <div className="absolute right-5 top-5 rounded-xl px-3 py-2 text-right" style={{ background: isLight ? 'rgba(255,255,255,0.82)' : 'rgba(0,0,0,0.55)', backdropFilter: 'blur(10px)', border: isLight ? '1px solid rgba(15,23,42,0.1)' : '1px solid rgba(0,229,186,0.18)', boxShadow: isLight ? '0 10px 26px rgba(15,23,42,0.08)' : 'none' }}>
        <p className="text-[9px]" style={{ color: isLight ? '#64748b' : '#9ca3af' }}>Carbon per episode</p>
        <p className="text-sm font-black" style={{ color: 'rgb(0,229,186)' }}>{(featured.carbonScore * 1000).toFixed(0)}mg CO2</p>
      </div>
    </motion.div>
  );
}
