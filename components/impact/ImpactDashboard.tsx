'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useImpactStore } from '../../lib/stores/impactStore';
import { useLanguageStore } from '../../lib/stores/languageStore';

export default function ImpactDashboard() {
  const { totalCO2Saved, totalWaterSaved, totalEwasteSaved } = useImpactStore();
  const { language } = useLanguageStore();
  const isGerman = language === 'de';
  const treesEquivalent = (totalCO2Saved / 21).toFixed(1);

  const stats = [
    { icon: 'CO2', label: 'Total CO2 Estimate', value: totalCO2Saved.toFixed(2) + ' kg', color: 'eco-green', comparison: 'vs industry avg' },
    { icon: 'H2O', label: 'Water Estimate', value: totalWaterSaved.toFixed(1) + ' L', color: 'cyan-neon', comparison: 'data center cooling' },
    { icon: 'EW', label: 'E-Waste Estimate', value: totalEwasteSaved.toFixed(2) + ' g', color: 'electric-blue', comparison: 'hardware lifecycle' },
    { icon: 'TREES', label: 'Trees Equivalent', value: treesEquivalent + ' trees', color: 'eco-green', comparison: 'annual CO2 absorption' }
  ];

  return (
    <div className="space-y-8">
      <motion.div className="space-y-4 text-center" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-6xl font-black">
          <span className="bg-gradient-to-r from-eco-green via-cyan-neon to-electric-blue bg-clip-text text-transparent">
            {isGerman ? 'Deine Umwelt-Schaetzung' : 'Your Environmental Estimate'}
          </span>
        </h1>
        <p className="text-xl text-gray-400">{isGerman ? 'Jeder Stream baut deine aktuelle Schaetzung auf' : 'Every stream builds your current estimate'}</p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="glass glow-green relative overflow-hidden rounded-3xl p-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-eco-green/10 to-cyan-neon/5 opacity-0 transition-opacity hover:opacity-100"></div>
            <div className="relative z-10">
              <motion.div className="mb-4 text-4xl font-black" animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}>
                {stat.icon}
              </motion.div>
              <div className={`mb-2 text-4xl font-black text-${stat.color}`}>{stat.value}</div>
              <div className="text-sm font-medium text-gray-400">{stat.label}</div>
              <div className="mt-2 text-xs text-gray-500">{stat.comparison}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div className="glass rounded-3xl p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <h2 className="mb-6 bg-gradient-to-r from-eco-green to-cyan-neon bg-clip-text text-3xl font-bold text-transparent">
          Impact Breakdown
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="glass rounded-2xl p-6">
            <div className="mb-2 text-xl font-bold text-eco-green">{isGerman ? 'Energieeffizienz' : 'Energy Efficiency'}</div>
            <div className="mb-4 text-4xl font-black">65%</div>
            <div className="text-sm text-gray-400">{isGerman ? 'Weniger Energieverbrauch als traditionelles Streaming' : 'Lower energy consumption vs traditional streaming'}</div>
          </div>

          <div className="glass rounded-2xl p-6">
            <div className="mb-2 text-xl font-bold text-cyan-neon">{isGerman ? 'Kompressions-KI' : 'Compression AI'}</div>
            <div className="mb-4 text-4xl font-black">42%</div>
            <div className="text-sm text-gray-400">{isGerman ? 'Datenreduktion durch intelligente Kompression' : 'Data reduction through intelligent compression'}</div>
          </div>

          <div className="glass rounded-2xl p-6">
            <div className="mb-2 text-xl font-bold text-electric-blue">{isGerman ? 'Gruenes CDN' : 'Green CDN'}</div>
            <div className="mb-4 text-4xl font-black">100%</div>
            <div className="text-sm text-gray-400">{isGerman ? 'Edge-Nodes mit erneuerbarer Energie' : 'Renewable energy powered edge nodes'}</div>
          </div>
        </div>

        <div className="glass mt-8 rounded-2xl p-6">
          <h3 className="mb-4 text-xl font-bold text-eco-green">{isGerman ? 'Methodik-Transparenz' : 'Methodology Transparency'}</h3>
          <div className="space-y-2 text-sm text-gray-400">
            <p>- CO2 calculations based on industry average of 55-90g per GB streamed</p>
            <p>- Water usage derived from data center cooling requirements</p>
            <p>- E-waste impact calculated from extended hardware lifecycle</p>
            <p>- All metrics are modeled against standard streaming assumptions</p>
          </div>
          <a href="/methodology" className="inline-block mt-4 text-cyan-neon transition-colors hover:text-eco-green">
            View Full Methodology {'->'}
          </a>
        </div>
      </motion.div>

      <motion.div className="glass rounded-3xl p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
        <h2 className="mb-6 bg-gradient-to-r from-eco-green to-cyan-neon bg-clip-text text-3xl font-bold text-transparent">
          Global Impact Leaderboard
        </h2>
        <div className="py-8 text-center text-gray-500">
          {isGerman ? 'Ranking folgt bald...' : 'Leaderboard coming soon...'}
        </div>
      </motion.div>
    </div>
  );
}
