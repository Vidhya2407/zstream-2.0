'use client';
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

interface ClimateHeaderProps {
  category: string;
  onCategoryChange: (category: string) => void;
  carbonSaved: number;
}

const categories = ['For You', 'Trending', 'Climate Picks', 'Gaming', 'Sports', 'Music'];

export default function ClimateHeader({ category, onCategoryChange, carbonSaved }: ClimateHeaderProps) {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 50], [1, 0.85]);
  const blur = useTransform(scrollY, [0, 50], [20, 30]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-eco-green/20"
      style={{ 
        opacity,
        backdropFilter: `blur(${blur}px)`
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 25 }}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Left: Logo & Badge */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              className="w-10 h-10 rounded-full bg-gradient-to-br from-eco-green to-cyan-neon flex items-center justify-center"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <span className="text-dark-base font-black text-lg">Z</span>
            </motion.div>
            <span className="text-lg font-black text-eco-green hidden md:block">ZEROSTREAM</span>
          </Link>

          <motion.div
            className="glass px-3 py-1 rounded-full text-xs font-bold text-eco-green glow-green/50"
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            LIVE GREEN
          </motion.div>
        </div>

        {/* Center: Category Selector */}
        <div className="hidden md:flex items-center gap-1 glass px-2 py-1 rounded-full">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all relative ${
                category === cat ? 'text-eco-green' : 'text-gray-400 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
              {category === cat && (
                <motion.div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-eco-green glow-green"
                  layoutId="category-indicator"
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Right: Search, Carbon, Profile */}
        <div className="flex items-center gap-4">
          {/* Search Icon */}
          <motion.button
            className="w-10 h-10 glass rounded-full flex items-center justify-center hover:glow-cyan transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-5 h-5 text-cyan-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </motion.button>

          {/* Carbon Counter Badge */}
          <motion.div
            className="glass px-3 py-1.5 rounded-full flex items-center gap-2 glow-green/30"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="text-eco-green text-xs font-black">
              {carbonSaved.toFixed(3)} kg
            </span>
            <motion.span
              className="text-lg"
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🌱
            </motion.span>
          </motion.div>

          {/* Profile Avatar */}
          <motion.div
            className="w-10 h-10 rounded-full bg-gradient-to-br from-electric-blue to-cyan-neon relative"
            whileHover={{ scale: 1.1 }}
          >
            <div className="absolute inset-0 rounded-full ring-2 ring-eco-green/50 animate-glow-pulse" />
            <div className="w-full h-full rounded-full flex items-center justify-center text-white font-bold">
              U
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
