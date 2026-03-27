import { motion } from 'framer-motion';
import { seriesTabs } from '../config';
import type { SeriesTab } from '../types';

interface MediaSeriesTabsProps {
  isLight: boolean;
  setSubCategory: (value: string) => void;
  tab: SeriesTab;
}

export default function MediaSeriesTabs({ isLight, setSubCategory, tab }: MediaSeriesTabsProps) {
  return (
    <div className="mb-5 flex w-fit items-center gap-1 overflow-x-auto rounded-xl p-1" style={{ background: isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)', border: isLight ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.06)' }}>
      {seriesTabs.map((seriesTab) => (
        <button className="relative whitespace-nowrap rounded-lg px-4 py-2 text-xs font-semibold" key={seriesTab.id} onClick={() => setSubCategory(seriesTab.id)} style={{ color: tab === seriesTab.id ? (isLight ? '#1d1d1f' : 'white') : isLight ? '#6b7280' : 'rgb(107,114,128)' }}>
          {tab === seriesTab.id && <motion.div className="absolute inset-0 rounded-lg" layoutId="series-tab-pill" style={{ background: 'rgba(0,128,255,0.12)', border: '1px solid rgba(0,128,255,0.2)' }} transition={{ type: 'spring', damping: 28, stiffness: 350 }} />}
          <span className="relative z-10">{seriesTab.emoji} {seriesTab.label}</span>
        </button>
      ))}
    </div>
  );
}

