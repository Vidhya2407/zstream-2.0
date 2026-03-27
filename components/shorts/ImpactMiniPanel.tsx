'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface ImpactMiniPanelProps {
  watchTime: number;
}

export default function ImpactMiniPanel({ watchTime }: ImpactMiniPanelProps) {
  const co2Saved = (watchTime / 60) * 0.032;
  const waterSaved = (watchTime / 60) * 0.8;

  return (
    <motion.div
      className="absolute right-4 bottom-8 glass p-3 rounded-2xl border border-eco-green/20 glow-green/30 min-w-[140px]"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="space-y-2">
        {/* CO₂ Saved */}
        <div className="flex items-center gap-2">
          <motion.span
            className="text-lg"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🌍
          </motion.span>
          <div className="flex-1">
            <motion.div
              className="text-eco-green font-black text-sm"
              key={co2Saved.toFixed(4)}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {co2Saved.toFixed(4)} kg
            </motion.div>
            <div className="text-xs text-gray-400">CO₂ saved</div>
          </div>
        </div>

        {/* Water Saved */}
        <div className="flex items-center gap-2">
          <motion.span
            className="text-lg"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
          >
            💧
          </motion.span>
          <div className="flex-1">
            <motion.div
              className="text-cyan-neon font-black text-sm"
              key={waterSaved.toFixed(2)}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {waterSaved.toFixed(2)} L
            </motion.div>
            <div className="text-xs text-gray-400">water saved</div>
          </div>
        </div>

        {/* Pulse indicator */}
        <motion.div
          className="w-full h-0.5 bg-gradient-to-r from-eco-green via-cyan-neon to-electric-blue rounded-full overflow-hidden"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="h-full w-1/3 bg-white"
            animate={{ x: ['0%', '300%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>

        {/* Leaf pulse every 10 seconds */}
        <AnimatedLeafPulse watchTime={watchTime} />
      </div>
    </motion.div>
  );
}

function AnimatedLeafPulse({ watchTime }: { watchTime: number }) {
  const showPulse = Math.floor(watchTime) % 10 === 0 && watchTime > 0;

  return showPulse ? (
    <motion.div
      className="absolute -top-8 left-1/2 -translate-x-1/2"
      initial={{ scale: 0, y: 0, opacity: 1 }}
      animate={{ scale: 2, y: -30, opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      🌿
    </motion.div>
  ) : null;
}
