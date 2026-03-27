import { motion } from 'framer-motion';
import type { SportsFilterOption, SportsTab } from '../types';

interface SportsFiltersProps {
  currentTab: SportsTab;
  isGerman: boolean;
  search: string;
  searchPlaceholder: string;
  showWatchlistOnly: boolean;
  sportFilter: string;
  sportFilters: SportsFilterOption[];
  watchlistCount: number;
  watchlistLabel: string;
  onSearchChange: (value: string) => void;
  onSportFilterChange: (value: string) => void;
  onWatchlistToggle: () => void;
}

export default function SportsFilters(props: SportsFiltersProps) {
  const { currentTab, search, searchPlaceholder, showWatchlistOnly, sportFilter, sportFilters, watchlistCount, watchlistLabel, onSearchChange, onSportFilterChange, onWatchlistToggle } = props;

  return (
    <motion.div className="mb-8 space-y-4 pt-4">
      <div className="flex flex-wrap gap-2">
        {sportFilters.map((filter) => (
          <motion.button key={filter.id} className="rounded-full px-4 py-2 text-xs font-bold transition-all" onClick={() => onSportFilterChange(filter.id)} style={sportFilter === filter.id ? { background: 'rgba(0,229,186,0.15)', color: 'rgb(0,229,186)', border: '1px solid rgba(0,229,186,0.3)' } : { background: 'rgba(255,255,255,0.04)', color: 'rgb(107,114,128)', border: '1px solid rgba(255,255,255,0.07)' }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            {filter.label}
          </motion.button>
        ))}
      </div>

      {currentTab === 'highlights' && (
        <div className="flex flex-wrap gap-2">
          <div className="flex max-w-md flex-1 items-center gap-2 rounded-xl px-4 py-2" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <svg className="h-4 w-4 flex-shrink-0 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0016.803 15.803z" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <input className="w-full bg-transparent text-sm text-white outline-none placeholder-gray-600" onChange={(event) => onSearchChange(event.target.value)} placeholder={searchPlaceholder} type="text" value={search} />
          </div>
          <motion.button className="flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold" onClick={onWatchlistToggle} style={showWatchlistOnly ? { background: 'rgba(0,229,186,0.12)', color: 'rgb(0,229,186)', border: '1px solid rgba(0,229,186,0.25)' } : { background: 'rgba(255,255,255,0.04)', color: 'rgb(107,114,128)', border: '1px solid rgba(255,255,255,0.08)' }} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            {watchlistLabel} {watchlistCount > 0 ? `(${watchlistCount})` : ''}
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}
