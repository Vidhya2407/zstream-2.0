'use client';

import { motion } from 'framer-motion';
import type { MeetingTab, MeetingTabOption } from '../types';

interface MeetingsTabBarProps {
  activeTab: MeetingTab;
  onTabChange: (tab: MeetingTab) => void;
  tabs: MeetingTabOption[];
  translate: (key: string, fallback?: string) => string;
}

export default function MeetingsTabBar({ activeTab, onTabChange, tabs, translate }: MeetingsTabBarProps) {
  return (
    <div className="flex items-center gap-1 rounded-xl p-1 w-fit" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
      {tabs.map((tab) => (
        <motion.button key={tab.id} className="relative px-5 py-2 rounded-lg text-xs font-semibold" onClick={() => onTabChange(tab.id)} style={{ color: activeTab === tab.id ? 'white' : 'rgb(107,114,128)' }}>
          {activeTab === tab.id && <motion.div layoutId="meetings-tab-pill" className="absolute inset-0 rounded-lg" style={{ background: 'rgba(0,229,186,0.12)', border: '1px solid rgba(0,229,186,0.22)' }} transition={{ type: 'spring', damping: 28, stiffness: 350 }} />}
          <span className="relative z-10">{translate(`meetings.${tab.labelKey}`, tab.id)}</span>
        </motion.button>
      ))}
    </div>
  );
}
