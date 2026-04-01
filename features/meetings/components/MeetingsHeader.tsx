'use client';

import { motion } from 'framer-motion';

interface MeetingsHeaderProps {
  joinLabel: string;
  onJoinClick: () => void;
  pageTextPrimary: string;
  pageTextSecondary: string;
  subtitle: string;
  title: string;
}

export default function MeetingsHeader({ joinLabel, onJoinClick, pageTextPrimary, pageTextSecondary, subtitle, title }: MeetingsHeaderProps) {
  return (
    <motion.div animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-end justify-between gap-6" initial={{ opacity: 0, y: 20 }}>
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-eco-green/10 flex items-center justify-center border border-eco-green/20">
            <svg className="w-6 h-6 text-eco-green" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <h1 className="text-4xl font-black tracking-tight" style={{ color: pageTextPrimary }}>{title}</h1>
        </div>
        <p className="text-sm max-w-lg leading-relaxed" style={{ color: pageTextSecondary }}>{subtitle}</p>
      </div>

      <motion.button className="px-6 py-3 rounded-xl font-bold text-sm bg-eco-green text-[#0A0F18] shadow-lg shadow-eco-green/20" onClick={onJoinClick} whileHover={{ scale: 1.05, boxShadow: '0 0 24px rgba(0,229,186,0.3)' }} whileTap={{ scale: 0.97 }}>
        {joinLabel}
      </motion.button>
    </motion.div>
  );
}


