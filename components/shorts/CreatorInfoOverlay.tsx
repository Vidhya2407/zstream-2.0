'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguageStore } from '../../lib/stores/languageStore';
import { useThemeStore } from '../../lib/stores/themeStore';

interface CreatorInfoOverlayProps {
  creator: string;
  verified: boolean;
  avatarUrl: string;
  title: string;
  description: string;
  hashtags: readonly string[];
  music: string;
}

export default function CreatorInfoOverlay({
  creator,
  verified,
  avatarUrl,
  title,
  description,
  hashtags,
  music
}: CreatorInfoOverlayProps) {
  const { theme } = useThemeStore();
  const { language } = useLanguageStore();
  const isLight = theme === 'light';
  const isGerman = language === 'de';

  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-20"
      style={{
        padding: '24px',
        paddingRight: '88px',
        background: isLight ? 'linear-gradient(to top, rgba(240, 244, 247, 0.94) 0%, rgba(240, 244, 247, 0.72) 55%, transparent 100%)' : 'linear-gradient(to top, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.45) 50%, transparent 100%)'
      }}
    >
      <div className="space-y-2.5 max-w-xl">
        <motion.div className="flex items-center gap-2.5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="w-10 h-10 rounded-full flex-shrink-0 overflow-hidden ring-1 ring-white/20">
            <Image src={avatarUrl} alt={creator} width={40} height={40} className="w-full h-full object-cover" />
          </div>

          <div className="flex-1 min-w-0 flex items-center gap-2">
            <span className="font-semibold text-sm truncate" style={{ color: isLight ? '#0f172a' : '#ffffff', textShadow: isLight ? 'none' : '0 1px 10px rgba(0, 0, 0, 0.65)' }}>
              {creator}
            </span>
            {verified && (
              <div className="w-3.5 h-3.5 rounded-full bg-eco-green flex items-center justify-center flex-shrink-0" style={{ boxShadow: '0 0 8px rgba(0, 229, 186, 0.4)' }}>
                <span className="text-[9px] text-dark-base font-bold">?</span>
              </div>
            )}
          </div>

          <motion.button className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex-shrink-0" style={{ background: 'rgba(0, 229, 186, 0.9)', color: 'rgba(10, 15, 24, 1)', border: '1px solid rgba(0, 229, 186, 1)' }} whileHover={{ scale: 1.03, backgroundColor: 'rgba(0, 229, 186, 1)', boxShadow: '0 0 16px rgba(0, 229, 186, 0.35)' }} whileTap={{ scale: 0.97 }}>
            {isGerman ? 'Folgen' : 'Follow'}
          </motion.button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <p className="text-sm font-medium leading-snug line-clamp-2" style={{ color: isLight ? '#1f2937' : '#ffffff', textShadow: isLight ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.9)' }}>
            {description}
          </p>
        </motion.div>

        <motion.div className="flex flex-wrap gap-1.5" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          {hashtags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[11px] font-medium" style={{ color: 'rgba(0, 229, 186, 0.9)', textShadow: '0 1px 4px rgba(0, 0, 0, 0.8)' }}>
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full max-w-[280px]" style={{ background: isLight ? 'rgba(255, 255, 255, 0.92)' : 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(8px)', border: isLight ? '1px solid rgba(15, 23, 42, 0.08)' : '1px solid rgba(255, 255, 255, 0.12)', boxShadow: isLight ? '0 10px 24px rgba(15, 23, 42, 0.08)' : 'none' }} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <svg className="w-3 h-3 text-eco-green flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
          </svg>
          <span className="text-[11px] truncate font-medium" style={{ color: isLight ? '#334155' : 'rgba(255,255,255,0.8)' }}>{music}</span>
        </motion.div>
      </div>
    </div>
  );
}


