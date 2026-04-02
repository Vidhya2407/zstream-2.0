import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { contentImages } from '../../../lib/images/unsplash';
import { useLanguageStore } from '../../../lib/stores/languageStore';
import { useThemeStore } from '../../../lib/stores/themeStore';
import { getMovieWatchId, getWatchHref } from '@/lib/navigation/playbackRoutes';
import { trDuration, trGenre, trMovieDescription, trMovieTitle, type Movie } from '../../../lib/data/moviesCatalog';
import StarRating from './StarRating';

interface MoviesHeroFeaturedProps {
  isWatchlisted: boolean;
  movie: Movie;
  onToggle: (id: string) => void;
}

export default function MoviesHeroFeatured({ isWatchlisted, movie, onToggle }: MoviesHeroFeaturedProps) {
  const { theme } = useThemeStore();
  const { language } = useLanguageStore();
  const isLight = theme === 'light';
  const isGerman = language === 'de';
  const playHref = getWatchHref(getMovieWatchId(movie.id));

  return (
    <motion.div animate={{ opacity: 1, scale: 1 }} className="relative rounded-3xl overflow-hidden mb-10" initial={{ opacity: 0, scale: 0.97 }} style={{ height: '340px' }} transition={{ delay: 0.1 }}>
      <Image alt="Featured" className="object-cover" fill src={contentImages.movies[1].url} />
      <div className="absolute inset-0" style={{ background: isLight ? 'linear-gradient(to right, rgba(240,244,247,0.98) 0%, rgba(240,244,247,0.65) 50%, rgba(240,244,247,0.1) 100%)' : 'linear-gradient(to right, rgba(10,15,24,0.98) 0%, rgba(10,15,24,0.65) 50%, rgba(10,15,24,0.1) 100%)' }} />
      <div className="absolute inset-0 p-10 flex flex-col justify-end max-w-2xl">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-widest" style={{ background: 'rgba(0,128,255,0.15)', border: '1px solid rgba(0,128,255,0.3)', color: 'rgb(96,165,250)' }}>{isGerman ? 'Empfohlen' : 'Featured'}</span>
          <span className="text-[9px] font-bold px-2.5 py-0.5 rounded-full" style={{ background: 'rgba(0,229,186,0.1)', border: '1px solid rgba(0,229,186,0.2)', color: 'rgb(0,229,186)' }}>Carbon Neutral</span>
        </div>
        <h2 className="text-4xl font-black mb-2 leading-tight" style={{ color: isLight ? '#1d1d1f' : 'white' }}>{trMovieTitle(movie, language)}</h2>
        <p className="text-sm mb-1" style={{ color: isLight ? '#6b7280' : '#9ca3af' }}>{movie.year} | {trGenre(movie.genre, language)} | {trDuration(movie.duration, language)} | * {movie.rating}</p>
        <p className="text-sm leading-relaxed mb-5 line-clamp-2" style={{ color: isLight ? '#4b5563' : '#d1d5db' }}>{trMovieDescription(movie, language)}</p>
        <div className="flex items-center gap-3 flex-wrap">
          <Link href={playHref}><motion.button className="px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2" style={{ background: 'rgb(0,128,255)', color: 'white' }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>{isGerman ? 'Jetzt ansehen' : 'Watch Now'}</motion.button></Link>
          <motion.button className="px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2" onClick={() => onToggle(movie.id)} style={{ background: isWatchlisted ? 'rgba(0,229,186,0.15)' : isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)', border: `1px solid ${isWatchlisted ? 'rgba(0,229,186,0.4)' : isLight ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.15)'}`, color: isWatchlisted ? 'rgb(0,229,186)' : isLight ? '#1d1d1f' : 'white' }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>{isWatchlisted ? (isGerman ? 'In Merkliste' : 'In Watchlist') : (isGerman ? '+ Merkliste' : '+ Watchlist')}</motion.button>
          <div className="flex items-center gap-2 ml-1"><span className="text-[10px]" style={{ color: isLight ? '#6b7280' : '#9ca3af' }}>{isGerman ? 'Deine Bewertung:' : 'Your rating:'}</span><StarRating onChange={() => {}} value={0} /></div>
        </div>
      </div>
      <div className="absolute top-5 right-5 px-3 py-2 rounded-xl text-right" style={{ background: isLight ? 'rgba(255,255,255,0.82)' : 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', border: isLight ? '1px solid rgba(15,23,42,0.1)' : '1px solid rgba(0,229,186,0.2)' }}>
        <p className="text-[9px]" style={{ color: isLight ? '#64748b' : '#9ca3af' }}>{isGerman ? 'Titel-Impact-Schaetzung' : 'Title impact estimate'}</p>
        <p className="font-black text-sm" style={{ color: 'rgb(0,229,186)' }}>{movie.carbonScore < 0.04 ? 'Impact grade A+' : 'Impact grade A'}</p>
        <p className="text-[8px]" style={{ color: isLight ? '#475569' : '#6b7280' }}>{isGerman ? 'Vor Playback, keine Live-Sitzung' : 'Before playback, not a live session value'}</p>
      </div>
    </motion.div>
  );
}


