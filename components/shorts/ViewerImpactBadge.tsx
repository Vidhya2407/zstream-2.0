'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ViewerImpactBadgeProps {
  watchProgress: number;
  co2Saved: number;
  waterSaved: number;
}

function EarthIcon() {
  return (
    <svg className="w-7 h-7 text-eco-green-bright" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12c0-2 2-4 5-4s5 2 7 2 3-1 5-1M12 3c2 0 4 2 4 5s-2 5-2 7-1 3-1 5" />
    </svg>
  );
}

function SproutIcon({ className }: { className?: string }) {
  return (
    <svg className={className ?? 'w-5 h-5'} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 20v-8m0 0c-2-2-4-4-4-6a4 4 0 018 0c0 2-2 4-4 6z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c2-2 4-4 6-4a3 3 0 010 6c-2 0-4-1-6-2z" />
    </svg>
  );
}

function WaterIcon({ className }: { className?: string }) {
  return (
    <svg className={className ?? 'w-6 h-6'} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg className="w-4 h-4 text-eco-green" fill="currentColor" viewBox="0 0 24 24">
      <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  );
}

export default function ViewerImpactBadge({ watchProgress, co2Saved, waterSaved }: ViewerImpactBadgeProps) {
  const showImpact = watchProgress >= 30;
  const [hasShown, setHasShown] = React.useState(false);

  React.useEffect(() => {
    if (showImpact && !hasShown) {
      setHasShown(true);
    }
  }, [showImpact, hasShown]);

  if (!hasShown) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="rounded-2xl p-4 space-y-3 max-w-[380px]"
        style={{
          background: 'rgba(0, 229, 186, 0.08)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(0, 229, 186, 0.2)'
        }}
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      >
        {/* Header */}
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-8 h-8 flex items-center justify-center"
          >
            <EarthIcon />
          </motion.div>
          <div className="flex-1">
            <div className="text-xs font-bold text-eco-green-bright">By watching this video, you saved:</div>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-3">
          {/* CO2 */}
          <motion.div
            className="flex items-center gap-2 p-2 rounded-xl"
            style={{ background: 'rgba(0, 229, 186, 0.1)' }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative w-10 h-10 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="16" stroke="rgba(0,229,186,0.2)" strokeWidth="2" fill="none" />
                <motion.circle
                  cx="20"
                  cy="20"
                  r="16"
                  stroke="rgba(0,229,186,1)"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: Math.min(watchProgress / 100, 1) }}
                  transition={{ duration: 0.5 }}
                />
              </svg>
              <SproutIcon className="w-5 h-5 text-eco-green-bright" />
            </div>
            <div className="flex-1">
              <motion.div
                className="text-sm font-black text-eco-green-bright"
                key={co2Saved.toFixed(4)}
                initial={{ opacity: 0, y: -3 }}
                animate={{ opacity: 1, y: 0 }}
              >
                +{co2Saved.toFixed(4)} kg
              </motion.div>
              <div className="text-[9px] text-eco-green/70 uppercase tracking-wide">CO₂</div>
            </div>
          </motion.div>

          {/* Water */}
          <motion.div
            className="flex items-center gap-2 p-2 rounded-xl"
            style={{ background: 'rgba(0, 217, 255, 0.1)' }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 flex items-center justify-center">
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <WaterIcon className="w-6 h-6 text-cyan-neon" />
              </motion.div>
            </div>
            <div className="flex-1">
              <motion.div
                className="text-sm font-black text-cyan-neon"
                key={waterSaved.toFixed(2)}
                initial={{ opacity: 0, y: -3 }}
                animate={{ opacity: 1, y: 0 }}
              >
                +{waterSaved.toFixed(2)} L
              </motion.div>
              <div className="text-[9px] text-cyan-neon/70 uppercase tracking-wide">Water</div>
            </div>
          </motion.div>
        </div>

        {/* Progress bar */}
        <div className="relative h-1 rounded-full overflow-hidden" style={{
          background: 'rgba(0, 229, 186, 0.15)'
        }}>
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              background: 'linear-gradient(90deg, rgba(0, 229, 186, 0.8), rgba(0, 229, 186, 1))'
            }}
            initial={{ width: '0%' }}
            animate={{ width: `${Math.min(watchProgress, 100)}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Appreciation message */}
        {watchProgress >= 80 && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-xs text-eco-green font-semibold flex items-center justify-center gap-1.5">
              <StarIcon />
              <span>Amazing! You&apos;re making a difference!</span>
              <StarIcon />
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
