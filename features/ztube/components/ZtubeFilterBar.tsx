'use client';

import { motion } from 'framer-motion';
import type { ContentType, ZTubeTab, ZTubeTabOption, ZTubeTypeFilter } from '../types';

interface ZtubeFilterBarProps {
  activeTab: ZTubeTab;
  activeType: ContentType;
  onTabChange: (value: ZTubeTab) => void;
  onTypeChange: (value: ContentType) => void;
  tabs: ZTubeTabOption[];
  tr: (value: string) => string;
  typeFilters: ZTubeTypeFilter[];
}

export default function ZtubeFilterBar({ activeTab, activeType, onTabChange, onTypeChange, tabs, tr, typeFilters }: ZtubeFilterBarProps) {
  return (
    <>
      <div className="flex items-center gap-2 mb-5 flex-wrap">
        {typeFilters.map((filter) => (
          <motion.button
            key={filter.id}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all"
            onClick={() => onTypeChange(filter.id)}
            style={{
              background: activeType === filter.id ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.04)',
              border: activeType === filter.id ? '1px solid rgba(239,68,68,0.3)' : '1px solid rgba(255,255,255,0.08)',
              color: activeType === filter.id ? 'rgb(252,165,165)' : 'rgb(107,114,128)',
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {tr(filter.label)}
          </motion.button>
        ))}
      </div>

      <div className="flex items-center gap-1 rounded-xl p-1 mb-8 w-fit" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
        {tabs.map((tab) => (
          <motion.button key={tab.id} className="flex items-center gap-1.5 px-5 py-2 rounded-lg text-xs font-semibold relative" onClick={() => onTabChange(tab.id)} style={{ color: activeTab === tab.id ? 'white' : 'rgb(107,114,128)' }}>
            {activeTab === tab.id && (
              <motion.div layoutId="ztube-tab-pill" className="absolute inset-0 rounded-lg" style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.22)' }} transition={{ type: 'spring', damping: 28, stiffness: 350 }} />
            )}
            <span className="relative z-10">{tr(tab.label)}</span>
          </motion.button>
        ))}
      </div>
    </>
  );
}
