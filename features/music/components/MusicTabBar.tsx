import { motion } from 'framer-motion';
import { musicText, type MusicTab } from '../../../lib/data/musicCatalog';
import type { SupportedLanguage } from '../../../lib/types/content';

interface MusicTabBarProps {
  isLight: boolean;
  language: SupportedLanguage;
  tab: MusicTab;
  tabs: { id: MusicTab; label: string; emoji: string }[];
  onTabChange: (tab: MusicTab) => void;
}

export default function MusicTabBar({ isLight, language, tab, tabs, onTabChange }: MusicTabBarProps) {
  return (
    <div className="flex items-center gap-1 rounded-xl p-1 mb-3 w-fit" style={{ background: isLight ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.03)', border: `1px solid ${isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.06)'}` }}>
      {tabs.map((item) => (
        <motion.button key={item.id} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold relative" onClick={() => onTabChange(item.id)} style={{ color: tab === item.id ? (isLight ? 'rgb(31,41,55)' : 'white') : 'rgb(107,114,128)' }}>
          {tab === item.id && <motion.div className="absolute inset-0 rounded-lg" layoutId="music-tab-pill" style={{ background: 'rgba(147,51,234,0.15)', border: '1px solid rgba(147,51,234,0.25)' }} transition={{ type: 'spring', damping: 28, stiffness: 350 }} />}
          <span className="relative z-10">{musicText(item.label, language)}</span>
        </motion.button>
      ))}
    </div>
  );
}
