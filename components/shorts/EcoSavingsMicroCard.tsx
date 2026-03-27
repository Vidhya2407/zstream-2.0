'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguageStore } from '../../lib/stores/languageStore';
import { useThemeStore } from '../../lib/stores/themeStore';

interface EcoSavingsMicroCardProps {
  watchProgress: number;
  co2Saved: number;
  waterSaved: number;
}

export default function EcoSavingsMicroCard({
  watchProgress,
  co2Saved,
  waterSaved
}: EcoSavingsMicroCardProps) {
  const { theme } = useThemeStore();
  const { language } = useLanguageStore();
  const isLight = theme === 'light';
  const isGerman = language === 'de';

  const showCard = watchProgress >= 30;
  const [hasShown, setHasShown] = React.useState(false);

  React.useEffect(() => {
    if (showCard && !hasShown) {
      setHasShown(true);
    }
  }, [showCard, hasShown]);

  if (!hasShown) return null;

  return (
    <div className="absolute z-30" style={{ bottom: '140px', left: '50%', transform: 'translateX(-50%)', width: '80%', maxWidth: '340px' }}>
      <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} transition={{ type: 'spring', damping: 25, stiffness: 300 }}>
        <div className="rounded-2xl px-4 py-3" style={{ background: isLight ? 'rgba(255, 255, 255, 0.82)' : 'rgba(10, 25, 35, 0.65)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: isLight ? '1px solid rgba(15, 23, 42, 0.08)' : '1px solid rgba(0, 229, 186, 0.25)', boxShadow: isLight ? '0 12px 28px rgba(15, 23, 42, 0.12), inset 0 0 20px rgba(0, 229, 186, 0.05)' : '0 4px 16px rgba(0, 0, 0, 0.3), inset 0 0 20px rgba(0, 229, 186, 0.08)' }}>
          <div className="flex items-center justify-center gap-1.5 mb-2.5">
            <svg className="w-4 h-4 text-eco-green-bright" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12c0-2 2-4 5-4s5 2 7 2 3-1 5-1M12 3c2 0 4 2 4 5s-2 5-2 7-1 3-1 5" />
            </svg>
            <span className="text-[11px] font-semibold text-eco-green-bright">{isGerman ? 'Du hilfst dem Planeten' : "You're saving the planet"}</span>
          </div>

          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-eco-green" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 20v-8m0 0c-2-2-4-4-4-6a4 4 0 018 0c0 2-2 4-4 6z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c2-2 4-4 6-4a3 3 0 010 6c-2 0-4-1-6-2z" />
                <circle cx="12" cy="20" r="1.5" />
              </svg>
              <motion.span className="text-xs font-bold text-eco-green-bright" key={co2Saved.toFixed(4)} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                +{co2Saved.toFixed(4)}kg CO2
              </motion.span>
            </div>

            <div className="w-px h-3 bg-white/20" />

            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-cyan-neon" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
              </svg>
              <motion.span className="text-xs font-bold text-cyan-neon" key={waterSaved.toFixed(2)} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                +{waterSaved.toFixed(2)}L
              </motion.span>
            </div>
          </div>

          <div className="mt-2.5 h-0.5 rounded-full overflow-hidden" style={{ background: 'rgba(0, 229, 186, 0.2)' }}>
            <motion.div className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, rgba(0, 229, 186, 0.8), rgba(0, 229, 186, 1))' }} initial={{ width: '0%' }} animate={{ width: `${Math.min(watchProgress, 100)}%` }} transition={{ duration: 0.5 }} />
          </div>

          {watchProgress >= 80 && (
            <motion.div className="text-center mt-2" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
              <span className="text-[10px] text-eco-green font-semibold">{isGerman ? 'Starker Impact!' : 'Amazing impact!'}</span>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
