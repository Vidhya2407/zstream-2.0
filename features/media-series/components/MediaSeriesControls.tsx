import type { Dispatch, SetStateAction } from 'react';
import { seriesSortOptions } from '../config';

interface MediaSeriesControlsProps {
  isLight: boolean;
  search: string;
  setSearch: (value: string) => void;
  setShowWatchlistOnly: Dispatch<SetStateAction<boolean>>;
  setSortBy: (value: string) => void;
  showWatchlistOnly: boolean;
  sortBy: string;
  watchlistCount: number;
}

export default function MediaSeriesControls({
  isLight,
  search,
  setSearch,
  setShowWatchlistOnly,
  setSortBy,
  showWatchlistOnly,
  sortBy,
  watchlistCount,
}: MediaSeriesControlsProps) {
  return (
    <div className="mb-5 flex flex-wrap items-center gap-3">
      <div className="flex min-w-[200px] flex-1 items-center gap-2 rounded-xl px-3 py-2" style={{ background: isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.04)', border: isLight ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.09)' }}>
        <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} style={{ color: isLight ? '#6b7280' : '#9ca3af' }} viewBox="0 0 24 24">
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <input
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500"
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search series..."
          style={{ color: isLight ? '#1d1d1f' : 'white' }}
          value={search}
        />
      </div>
      <select className="rounded-xl px-3 py-2 text-xs font-medium outline-none" onChange={(event) => setSortBy(event.target.value)} style={{ background: isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.04)', border: isLight ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.09)', color: isLight ? '#1d1d1f' : '#d1d5db', colorScheme: isLight ? 'light' : 'dark' }} value={sortBy}>
        {seriesSortOptions.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <button className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all" onClick={() => setShowWatchlistOnly((value) => !value)} style={showWatchlistOnly ? { background: 'rgba(0,229,186,0.12)', color: 'rgb(0,229,186)', border: '1px solid rgba(0,229,186,0.25)' } : { background: isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.04)', color: isLight ? '#6b7280' : 'rgb(107,114,128)', border: isLight ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.09)' }}>
        Watchlist {watchlistCount > 0 && `(${watchlistCount})`}
      </button>
    </div>
  );
}

