import { motion } from 'framer-motion';
import { trGenre, trSort } from '../../../lib/data/moviesCatalog';
import type { SupportedLanguage } from '../../../lib/types/content';

interface MoviesToolbarProps {
  activeGenre: string;
  genres: readonly string[];
  isGerman: boolean;
  isLight: boolean;
  language: SupportedLanguage;
  search: string;
  showWatchlistOnly: boolean;
  sortBy: string;
  sortOptions: readonly string[];
  watchlistSize: number;
  onGenreChange: (genre: string) => void;
  onSearchChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onToggleWatchlistOnly: () => void;
}

export default function MoviesToolbar({ activeGenre, genres, isGerman, isLight, language, search, showWatchlistOnly, sortBy, sortOptions, watchlistSize, onGenreChange, onSearchChange, onSortChange, onToggleWatchlistOnly }: MoviesToolbarProps) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex items-center gap-2 flex-1 min-w-[200px] px-3 py-2 rounded-xl" style={{ background: isLight ? 'rgba(255,255,255,0.82)' : 'rgba(255,255,255,0.04)', border: `1px solid ${isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.09)'}` }}>
          <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <input className="flex-1 bg-transparent text-sm outline-none" onChange={(event) => onSearchChange(event.target.value)} placeholder={isGerman ? 'Filme suchen...' : 'Search movies...'} style={{ color: isLight ? '#0f172a' : 'white' }} value={search} />
        </div>
        <select className="px-3 py-2 rounded-xl text-xs font-medium outline-none" onChange={(event) => onSortChange(event.target.value)} style={{ background: isLight ? 'rgba(255,255,255,0.82)' : 'rgba(255,255,255,0.04)', border: `1px solid ${isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.09)'}`, color: isLight ? '#334155' : 'rgb(209,213,219)', colorScheme: isLight ? 'light' : 'dark' }} value={sortBy}>
          {sortOptions.map((option) => <option key={option} value={option}>{trSort(option, language)}</option>)}
        </select>
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all" onClick={onToggleWatchlistOnly} style={showWatchlistOnly ? { background: 'rgba(0,229,186,0.12)', color: 'rgb(0,229,186)', border: '1px solid rgba(0,229,186,0.25)' } : { background: isLight ? 'rgba(255,255,255,0.82)' : 'rgba(255,255,255,0.04)', color: isLight ? '#64748b' : 'rgb(107,114,128)', border: `1px solid ${isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.09)'}` }}>
          {isGerman ? 'Merkliste' : 'Watchlist'} {watchlistSize > 0 && `(${watchlistSize})`}
        </button>
      </div>
      <div className="flex items-center gap-2 mb-7 flex-wrap">
        {genres.map((genre) => (
          <motion.button key={genre} className="px-4 py-1.5 rounded-full text-xs font-semibold" onClick={() => onGenreChange(genre)} style={{ background: activeGenre === genre ? 'rgba(0,128,255,0.16)' : isLight ? 'rgba(255,255,255,0.78)' : 'rgba(255,255,255,0.04)', border: `1px solid ${activeGenre === genre ? 'rgba(0,128,255,0.35)' : isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.08)'}`, color: activeGenre === genre ? 'rgb(96,165,250)' : isLight ? '#94a3b8' : 'rgb(156,163,175)' }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            {trGenre(genre, language)}
          </motion.button>
        ))}
      </div>
    </>
  );
}


