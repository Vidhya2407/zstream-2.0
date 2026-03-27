'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ImmersiveHero() {
  const [carbonSaved, setCarbonSaved] = React.useState(43.80);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCarbonSaved(prev => prev + Math.random() * 0.08);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden">
      {/* Deep space background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1800&q=80"
          alt=""
          fill
          className="object-cover opacity-[0.12]"
          priority
        />
      </div>

      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-base via-navy-deep to-dark-base opacity-90" />

      {/* Animated ambient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '700px',
            height: '700px',
            top: '-20%',
            left: '-10%',
            background: 'radial-gradient(circle, rgba(0, 229, 186, 0.07) 0%, transparent 65%)',
            filter: 'blur(60px)'
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '550px',
            height: '550px',
            top: '10%',
            right: '-5%',
            background: 'radial-gradient(circle, rgba(0, 128, 255, 0.06) 0%, transparent 65%)',
            filter: 'blur(60px)'
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '400px',
            height: '400px',
            bottom: '5%',
            left: '35%',
            background: 'radial-gradient(circle, rgba(0, 217, 255, 0.05) 0%, transparent 65%)',
            filter: 'blur(50px)'
          }}
          animate={{ scale: [1, 1.25, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 7 }}
        />
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,229,186,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,186,0.025) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      {/* Subtle radial accent */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 70% 40%, rgba(0, 229, 186, 0.08), transparent 60%)'
        }}
      />

      {/* Controlled max-width container */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-[6vw]">
        
        {/* Balanced grid layout */}
        <div 
          className="grid lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center"
          style={{ minHeight: '500px' }}
        >
          
          {/* Left: Content */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Headline - Controlled Typography */}
            <h1 
              className="font-black leading-[1.05] tracking-[-0.02em]"
              style={{
                fontSize: 'clamp(3rem, 5vw, 4.2rem)'
              }}
            >
              <span 
                className="bg-gradient-to-r from-eco-green-bright via-eco-green to-cyan-neon bg-clip-text text-transparent"
                style={{
                  textShadow: '0 0 18px rgba(0, 229, 186, 0.35)'
                }}
              >
                Stream Everything.
              </span>
              <br />
              <span className="text-white">
                Emit Nothing.
              </span>
            </h1>

            {/* Subtext - Proper Hierarchy */}
            <motion.p 
              className="text-lg text-gray-300 leading-relaxed max-w-[480px]"
              style={{ opacity: 0.85, marginTop: '1.5rem' }}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 0.85, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              AI-powered carbon-neutral streaming platform. Watch unlimited content while saving the planet.
            </motion.p>

            {/* CTAs - Reduced Visual Weight */}
            <motion.div 
              className="flex flex-wrap gap-4 pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.button
                className="px-7 py-3.5 rounded-full font-medium text-base relative overflow-hidden"
                style={{
                  background: 'rgba(0, 229, 186, 0.12)',
                  border: '1px solid rgba(0, 229, 186, 0.3)',
                  color: 'rgb(0, 229, 186)',
                  fontWeight: 500,
                  boxShadow: '0 0 24px rgba(0, 229, 186, 0.15)'
                }}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: '0 0 32px rgba(0, 229, 186, 0.25)'
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <span className="relative z-10">Start Streaming</span>
                <div 
                  className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0, 229, 186, 0.15), transparent)'
                  }}
                />
              </motion.button>

              <motion.button
                className="px-7 py-3.5 rounded-full font-medium text-base text-white transition-all duration-200"
                style={{
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  fontWeight: 500
                }}
                whileHover={{ 
                  scale: 1.03,
                  borderColor: 'rgba(0, 229, 186, 0.5)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right: Carbon Impact Card - Premium with Depth */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div
              className="relative rounded-3xl p-8 lg:p-10"
              style={{
                background: 'rgba(20, 30, 40, 0.7)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(0, 229, 186, 0.15)',
                boxShadow: `
                  0 20px 60px rgba(0, 0, 0, 0.45),
                  inset 0 0 20px rgba(0, 229, 186, 0.05)
                `
              }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-sm font-semibold text-eco-green/80 uppercase tracking-wider mb-1">
                    Real-Time Impact
                  </h3>
                  <p className="text-xs text-gray-400">
                    Global carbon savings
                  </p>
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="w-10 h-10 flex items-center justify-center"
                >
                  <svg className="w-9 h-9 text-eco-green-bright" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.6 9h16.8M3.6 15h16.8" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.5 3a17 17 0 0 0 0 18M12.5 3a17 17 0 0 1 0 18" />
                  </svg>
                </motion.div>
              </div>

              {/* Main Carbon Number - Controlled Size */}
              <div className="mb-6">
                <motion.div 
                  className="font-semibold bg-gradient-to-r from-eco-green-bright to-eco-green bg-clip-text text-transparent"
                  style={{
                    fontSize: 'clamp(2.4rem, 3.5vw, 3.2rem)',
                    fontWeight: 600,
                    lineHeight: 1.1
                  }}
                  key={carbonSaved.toFixed(2)}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {carbonSaved.toFixed(2)} kg
                </motion.div>
                <p className="text-sm text-gray-400 mt-2">
                  CO₂ prevented this minute
                </p>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-eco-green/20 to-transparent mb-6" />

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-xs text-gray-400 uppercase tracking-wide">
                    Water Saved
                  </div>
                  <div className="text-xl font-semibold text-cyan-neon">
                    124.5 L
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-gray-400 uppercase tracking-wide">
                    Energy Saved
                  </div>
                  <div className="text-xl font-semibold text-electric-blue">
                    8.2 kWh
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-gray-400 uppercase tracking-wide">
                    Active Users
                  </div>
                  <div className="text-xl font-semibold text-white">
                    24.8K
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-gray-400 uppercase tracking-wide">
                    Trees Saved
                  </div>
                  <div className="text-xl font-semibold text-eco-green">
                    156
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-8">
                <div 
                  className="h-1.5 rounded-full overflow-hidden"
                  style={{
                    background: 'rgba(0, 229, 186, 0.15)'
                  }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, rgba(0, 229, 186, 0.8), rgba(0, 229, 186, 1))'
                    }}
                    initial={{ width: '0%' }}
                    animate={{ width: '68%' }}
                    transition={{ duration: 2, delay: 0.5 }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-gray-500">Daily Goal</span>
                  <span className="text-xs text-eco-green font-medium">68%</span>
                </div>
              </div>

              {/* Bottom Badge */}
              <div className="mt-6 pt-6 border-t border-white/5">
                <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                  <div className="w-2 h-2 rounded-full bg-eco-green animate-pulse" />
                  <span>Live tracking • Updated every second</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Floating particles - minimal */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[20, 45, 62, 30, 75, 50].map((topVal, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-eco-green/20"
            style={{
              left: `${10 + i * 15}%`,
              top: `${topVal}%`
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>
    </section>
  );
}
