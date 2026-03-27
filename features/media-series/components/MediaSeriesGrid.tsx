import { AnimatePresence, motion } from 'framer-motion';
import type { SeriesItem } from '../types';
import SeriesCard from './SeriesCard';

interface MediaSeriesGridProps {
  activeGenre: string;
  isLight: boolean;
  items: SeriesItem[];
  onToggleWatchlist: (id: string) => void;
  search: string;
  showWatchlistOnly: boolean;
  sortBy: string;
  tabKey: string;
  watchlist: Set<string>;
}

export default function MediaSeriesGrid({
  activeGenre,
  isLight,
  items,
  onToggleWatchlist,
  search,
  showWatchlistOnly,
  sortBy,
  tabKey,
  watchlist,
}: MediaSeriesGridProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} initial={{ opacity: 0, y: 8 }} key={`${tabKey}-${activeGenre}-${sortBy}-${search}-${showWatchlistOnly}`}>
        {items.length === 0 ? (
          <div className="py-20 text-center" style={{ color: isLight ? '#6b7280' : '#9ca3af' }}>
            <p className="mb-3 text-4xl">TV</p>
            <p className="text-sm">{tabKey === 'continue' ? 'No series in progress' : 'No series found'}</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {items.map((series, index) => (
              <SeriesCard delay={index * 0.06} isLight={isLight} isWatchlisted={watchlist.has(series.id)} key={series.id} onToggleWatchlist={onToggleWatchlist} series={series} />
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

