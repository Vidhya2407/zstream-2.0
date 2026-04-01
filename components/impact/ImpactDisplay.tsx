'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { calculateImpact, formatImpact, StreamMetrics } from '../../lib/impact/calculator';

interface ImpactDisplayProps {
  streamMetrics: StreamMetrics;
  updateInterval?: number;
}

export default function ImpactDisplay({ streamMetrics, updateInterval = 5000 }: ImpactDisplayProps) {
  const [impact, setImpact] = React.useState(calculateImpact(streamMetrics));
  const [expanded, setExpanded] = React.useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setImpact(calculateImpact(streamMetrics));
    }, updateInterval);
    return () => clearInterval(interval);
  }, [streamMetrics, updateInterval]);

  return (
    <div className="mt-4">
      <motion.div
        className="glass rounded-2xl border border-eco-green/20 p-4 glow-green"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex cursor-pointer items-center justify-between" onClick={() => setExpanded(!expanded)}>
          <div className="flex items-center gap-6">
            <motion.div className="flex items-center gap-2" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <span className="text-lg font-black text-eco-green">CO2</span>
              <div>
                <div className="text-lg font-bold text-eco-green">{formatImpact(impact.co2SavedKg, 'co2')}</div>
                <div className="text-xs text-gray-400">CO2 estimate</div>
              </div>
            </motion.div>

            <div className="flex items-center gap-2">
              <span className="text-lg font-black text-cyan-neon">H2O</span>
              <div>
                <div className="text-lg font-bold text-cyan-neon">{formatImpact(impact.waterSavedLiters, 'water')}</div>
                <div className="text-xs text-gray-400">Water estimate</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-lg font-black text-electric-blue">EW</span>
              <div>
                <div className="text-lg font-bold text-electric-blue">{formatImpact(impact.ewasteAvoidedGrams, 'ewaste')}</div>
                <div className="text-xs text-gray-400">E-waste estimate</div>
              </div>
            </div>
          </div>

          <motion.button
            className="glass rounded-full px-4 py-2 text-xs text-eco-green transition-all hover:glow-green"
            animate={{ rotate: expanded ? 180 : 0 }}
          >
            <span>v</span>
          </motion.button>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              className="mt-4 space-y-3 border-t border-gray-700/50 pt-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="space-y-2 text-xs text-gray-400">
                <div className="flex justify-between">
                  <span>Resolution:</span>
                  <span className="text-eco-green">{streamMetrics.resolutionHeight}p</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="text-eco-green">{streamMetrics.durationMinutes.toFixed(1)} min</span>
                </div>
                <div className="flex justify-between">
                  <span>Eco Mode:</span>
                  <span className="text-eco-green">{streamMetrics.ecoMode ? 'Active' : 'Off'}</span>
                </div>
              </div>

              <div className="glass mt-3 rounded-xl p-3">
                <div className="mb-2 text-xs text-gray-500">Compared with the standard streaming estimate</div>
                <div className="flex items-center gap-2">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-700/50">
                    <div className="h-full bg-gradient-to-r from-eco-green to-cyan-neon" style={{ width: '65%' }}></div>
                  </div>
                  <span className="text-sm font-bold text-eco-green">65% lower</span>
                </div>
              </div>

              <a href="/methodology" className="block text-center text-xs text-cyan-neon transition-colors hover:text-eco-green">
                View Methodology {'->'}
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
