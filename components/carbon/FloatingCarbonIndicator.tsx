'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCarbonStore } from '../../lib/stores/carbonStore';
import { useThemeStore } from '../../lib/stores/themeStore';
import { useHydrated } from '@/hooks/useHydrated';
import { useLanguageStore } from '../../lib/stores/languageStore';

export default function FloatingCarbonIndicator() {
  const { totalSaved, streamingTime, addSaved, incrementStreamingTime } = useCarbonStore();
  const hydratedTheme = useHydrated(useThemeStore);
  const hydratedLanguage = useHydrated(useLanguageStore);
  const { theme } = useThemeStore();
  const { language } = useLanguageStore();
  const resolvedLanguage = hydratedLanguage ? language : 'en';
  const isGerman = resolvedLanguage === 'de';
  const [isExpanded, setIsExpanded] = React.useState(false);
  const isLight = (hydratedTheme ? theme : 'dark') === 'light';

  React.useEffect(() => {
    const interval = setInterval(() => {
      addSaved(Math.random() * 0.002);
      incrementStreamingTime(1 / 60);
    }, 1000);
    return () => clearInterval(interval);
  }, [addSaved, incrementStreamingTime]);

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', damping: 20, stiffness: 300 }}
    >
      <AnimatePresence mode="wait">
        {isExpanded ? (
          <motion.div
            key="expanded"
            className="w-72 rounded-3xl p-6"
            style={{
              background: isLight ? 'rgba(255, 255, 255, 0.94)' : 'rgba(10, 20, 30, 0.9)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: isLight ? '1px solid rgba(15, 23, 42, 0.08)' : '1px solid rgba(0, 229, 186, 0.2)',
              boxShadow: isLight ? '0 20px 60px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(15, 23, 42, 0.04)' : '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0, 229, 186, 0.08)'
            }}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(0, 229, 186, 0.12)' }}
                >
                  <svg className="w-4 h-4 text-eco-green-bright" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 20v-8m0 0c-2-2-4-4-4-6a4 4 0 018 0c0 2-2 4-4 6z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-sm" style={{ color: isLight ? 'rgb(15, 23, 42)' : 'white' }}>{isGerman ? 'CO2-Impact' : 'Carbon Impact'}</h3>
              </div>
              <button
                className="w-6 h-6 rounded-full flex items-center justify-center transition-colors"
                style={{ background: isLight ? 'rgba(15, 23, 42, 0.05)' : 'rgba(255, 255, 255, 0.06)', color: isLight ? 'rgb(100, 116, 139)' : 'rgb(156, 163, 175)' }}
                onClick={() => setIsExpanded(false)}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-3">
              <div
                className="rounded-2xl p-4"
                style={{
                  background: 'rgba(0, 229, 186, 0.06)',
                  border: '1px solid rgba(0, 229, 186, 0.12)'
                }}
              >
                <p className="text-xs mb-1.5" style={{ color: isLight ? 'rgb(100, 116, 139)' : 'rgb(107, 114, 128)' }}>{isGerman ? 'CO2 gespart' : 'CO2 Saved'}</p>
                <motion.p
                  className="text-2xl font-black text-eco-green-bright"
                  key={totalSaved.toFixed(2)}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {totalSaved.toFixed(2)} <span className="text-base font-medium text-eco-green/70">kg</span>
                </motion.p>
              </div>

              <div
                className="rounded-2xl p-4"
                style={{
                  background: 'rgba(0, 217, 255, 0.05)',
                  border: '1px solid rgba(0, 217, 255, 0.1)'
                }}
              >
                <p className="text-xs mb-1.5" style={{ color: isLight ? 'rgb(100, 116, 139)' : 'rgb(107, 114, 128)' }}>{isGerman ? 'Streaming-Zeit' : 'Streaming Time'}</p>
                <p className="text-xl font-bold text-cyan-neon">
                  {streamingTime} <span className="text-sm font-medium text-cyan-neon/60">min</span>
                </p>
              </div>

              <div
                className="rounded-2xl p-4 flex items-center justify-between"
                style={{
                  background: isLight ? 'rgba(15, 23, 42, 0.03)' : 'rgba(255, 255, 255, 0.03)',
                  border: isLight ? '1px solid rgba(15, 23, 42, 0.06)' : '1px solid rgba(255, 255, 255, 0.06)'
                }}
              >
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-eco-green" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-sm" style={{ color: isLight ? 'rgb(51, 65, 85)' : 'rgb(209, 213, 219)' }}>{isGerman ? 'Eco-Modus' : 'Eco Mode'}</span>
                </div>
                <div
                  className="w-10 h-5 rounded-full relative cursor-pointer"
                  style={{ background: 'rgba(0, 229, 186, 0.25)' }}
                >
                  <motion.div
                    className="absolute top-0.5 w-4 h-4 rounded-full"
                    style={{ background: 'rgb(0, 229, 186)', left: 22 }}
                    transition={{ type: 'spring', damping: 20 }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-eco-green animate-pulse" />
              <span className="text-xs" style={{ color: isLight ? 'rgb(100, 116, 139)' : 'rgb(75, 85, 99)' }}>{isGerman ? 'Live-Tracking' : 'Live tracking'}</span>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="collapsed"
            className="flex items-center gap-2 rounded-full px-4 py-2.5 cursor-pointer"
            style={{
              background: isLight ? 'rgba(255, 255, 255, 0.94)' : 'rgba(10, 20, 30, 0.85)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: isLight ? '1px solid rgba(15, 23, 42, 0.08)' : '1px solid rgba(0, 229, 186, 0.2)',
              boxShadow: isLight ? '0 8px 32px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(15, 23, 42, 0.04)' : '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 229, 186, 0.06)'
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={() => setIsExpanded(true)}
            whileHover={{
              scale: 1.04,
              borderColor: 'rgba(0, 229, 186, 0.35)',
              boxShadow: isLight ? '0 8px 32px rgba(15, 23, 42, 0.16), 0 0 20px rgba(0, 229, 186, 0.12)' : '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 229, 186, 0.12)'
            }}
            whileTap={{ scale: 0.97 }}
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(0, 229, 186, 0.12)' }}
            >
              <svg className="w-3.5 h-3.5 text-eco-green-bright" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 20v-8m0 0c-2-2-4-4-4-6a4 4 0 018 0c0 2-2 4-4 6z" />
              </svg>
            </div>
            <div className="flex items-baseline gap-1">
              <motion.span
                className="text-sm font-bold text-eco-green-bright"
                key={totalSaved.toFixed(2)}
                initial={{ opacity: 0, y: -3 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {totalSaved.toFixed(2)}
              </motion.span>
              <span className="text-xs text-eco-green/60">kg CO2</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-eco-green animate-pulse ml-0.5" />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}






