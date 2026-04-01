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
        className="glass p-4 rounded-2xl border border-eco-green/20 glow-green"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpanded(!expanded)}>
          <div className="flex items-center gap-6">
            <motion.div
              className="flex items-center gap-2"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-2xl">🌍</span>
              <div>
                <div className="text-eco-green font-bold text-lg">{formatImpact(impact.co2SavedKg, 'co2')}</div>
                <div className="text-xs text-gray-400">CO2 saved</div>
              </div>
            </motion.div>

            <div className="flex items-center gap-2">
              <span className="text-2xl">💧</span>
              <div>
                <div className="text-cyan-neon font-bold text-lg">{formatImpact(impact.waterSavedLiters, 'water')}</div>
                <div className="text-xs text-gray-400">water saved</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-2xl">â™»</span>
              <div>
                <div className="text-electric-blue font-bold text-lg">{formatImpact(impact.ewasteAvoidedGrams, 'ewaste')}</div>
                <div className="text-xs text-gray-400">e-waste avoided</div>
              </div>
            </div>
          </div>

          <motion.button
            className="glass px-4 py-2 rounded-full text-xs text-eco-green hover:glow-green transition-all"
            animate={{ rotate: expanded ? 180 : 0 }}
          >
            â - ¼
          </motion.button>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              className="mt-4 pt-4 border-t border-gray-700/50 space-y-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="text-xs text-gray-400 space-y-2">
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

              <div className="glass p-3 rounded-xl mt-3">
                <div className="text-xs text-gray-500 mb-2">Compared to traditional streaming</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-700/50 h-2 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-eco-green to-cyan-neon" style={{ width: '65%' }}></div>
                  </div>
                  <span className="text-eco-green text-sm font-bold">65% lower</span>
                </div>
              </div>

              <a
                href="/methodology"
                className="block text-center text-xs text-cyan-neon hover:text-eco-green transition-colors"
              >
                View Methodology â†’
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}


