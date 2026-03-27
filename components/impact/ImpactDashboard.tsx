'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useImpactStore } from '../../lib/stores/impactStore';
import { useLanguageStore } from '../../lib/stores/languageStore';

export default function ImpactDashboard() {
  const { totalCO2Saved, totalWaterSaved, totalEwasteSaved, monthlyHistory } = useImpactStore();
  const { language } = useLanguageStore();
  const isGerman = language === 'de';
  const treesEquivalent = (totalCO2Saved / 21).toFixed(1);

  const stats = [
    { icon: '🌍', label: 'Total CO₂ Saved', value: totalCO2Saved.toFixed(2) + ' kg', color: 'eco-green', comparison: 'vs industry avg' },
    { icon: '💧', label: 'Water Saved', value: totalWaterSaved.toFixed(1) + ' L', color: 'cyan-neon', comparison: 'data center cooling' },
    { icon: '♻️', label: 'E-Waste Avoided', value: totalEwasteSaved.toFixed(2) + ' g', color: 'electric-blue', comparison: 'hardware lifecycle' },
    { icon: '🌲', label: 'Trees Equivalent', value: treesEquivalent + ' trees', color: 'eco-green', comparison: 'annual CO₂ absorption' }
  ];

  return (
    <div className="space-y-8">
      <motion.div
        className="text-center space-y-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-6xl font-black">
          <span className="bg-gradient-to-r from-eco-green via-cyan-neon to-electric-blue bg-clip-text text-transparent">
            {isGerman ? 'Dein Impact fuer den Planeten' : 'Your Planet Impact'}
          </span>
        </h1>
        <p className="text-gray-400 text-xl">{isGerman ? 'Jeder Stream macht einen Unterschied' : 'Every stream makes a difference'}</p>
      </motion.div>

      <div className="grid md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="glass p-8 rounded-3xl glow-green relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-eco-green/10 to-cyan-neon/5 opacity-0 hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <motion.div
                className="text-6xl mb-4"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              >
                {stat.icon}
              </motion.div>
              <div className={`text-4xl font-black text-${stat.color} mb-2`}>{stat.value}</div>
              <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
              <div className="text-xs text-gray-500 mt-2">{stat.comparison}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="glass p-8 rounded-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-eco-green to-cyan-neon bg-clip-text text-transparent">
          📊 Impact Breakdown
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass p-6 rounded-2xl">
            <div className="text-eco-green text-xl font-bold mb-2">{isGerman ? 'Energieeffizienz' : 'Energy Efficiency'}</div>
            <div className="text-4xl font-black mb-4">65%</div>
            <div className="text-sm text-gray-400">{isGerman ? 'Weniger Energieverbrauch als traditionelles Streaming' : 'Lower energy consumption vs traditional streaming'}</div>
          </div>

          <div className="glass p-6 rounded-2xl">
            <div className="text-cyan-neon text-xl font-bold mb-2">{isGerman ? 'Kompressions-KI' : 'Compression AI'}</div>
            <div className="text-4xl font-black mb-4">42%</div>
            <div className="text-sm text-gray-400">{isGerman ? 'Datenreduktion durch intelligente Kompression' : 'Data reduction through intelligent compression'}</div>
          </div>

          <div className="glass p-6 rounded-2xl">
            <div className="text-electric-blue text-xl font-bold mb-2">{isGerman ? 'Gruenes CDN' : 'Green CDN'}</div>
            <div className="text-4xl font-black mb-4">100%</div>
            <div className="text-sm text-gray-400">{isGerman ? 'Edge-Nodes mit erneuerbarer Energie' : 'Renewable energy powered edge nodes'}</div>
          </div>
        </div>

        <div className="mt-8 glass p-6 rounded-2xl">
          <h3 className="text-xl font-bold mb-4 text-eco-green">{isGerman ? 'Methodik-Transparenz' : 'Methodology Transparency'}</h3>
          <div className="text-sm text-gray-400 space-y-2">
            <p>• CO₂ calculations based on industry average of 55-90g per GB streamed</p>
            <p>• Water usage derived from data center cooling requirements</p>
            <p>• E-waste impact calculated from extended hardware lifecycle</p>
            <p>• All metrics compared against traditional streaming platforms</p>
          </div>
          <a href="/methodology" className="inline-block mt-4 text-cyan-neon hover:text-eco-green transition-colors">
            View Full Methodology →
          </a>
        </div>
      </motion.div>

      <motion.div
        className="glass p-8 rounded-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-eco-green to-cyan-neon bg-clip-text text-transparent">
          🏆 Global Impact Leaderboard
        </h2>
        <div className="text-center text-gray-500 py-8">
          {isGerman ? 'Ranking folgt bald...' : 'Leaderboard coming soon...'}
        </div>
      </motion.div>
    </div>
  );
}
