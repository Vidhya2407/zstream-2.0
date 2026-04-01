'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useThemeStore } from '../../lib/stores/themeStore';
import EstimatedFootprintBadge from '../../components/impact/EstimatedFootprintBadge';
import { useLanguageStore } from '../../lib/stores/languageStore';

export interface HeroItem {
  id: number;
  title: string;
  description: string;
  genre: string;
  year: number;
  duration: string;
  estimateDuration?: string;
  rating: string;
  carbonScore: number;
  type: 'video' | 'music' | 'live' | 'gaming' | 'shorts';
  href: string;
  imageUrl: string;
  tags: string[];
}

interface HeroCarouselProps {
  items: HeroItem[];
}

function getCarbonGrade(score: number): { grade: string; color: string; bg: string } {
  if (score < 0.1) return { grade: 'A+', color: 'rgb(0, 229, 186)', bg: 'rgba(0, 229, 186, 0.15)' };
  if (score < 0.3) return { grade: 'A', color: 'rgb(0, 217, 255)', bg: 'rgba(0, 217, 255, 0.15)' };
  if (score < 0.5) return { grade: 'B', color: 'rgb(96, 165, 250)', bg: 'rgba(96, 165, 250, 0.15)' };
  return { grade: 'C', color: 'rgb(251, 191, 36)', bg: 'rgba(251, 191, 36, 0.15)' };
}

const typeAccent: Record<HeroItem['type'], string> = {
  video: 'rgba(0, 128, 255, 0.9)',
  music: 'rgba(147, 51, 234, 0.9)',
  live: 'rgba(239, 68, 68, 0.9)',
  gaming: 'rgba(0, 200, 80, 0.9)',
  shorts: 'rgba(251, 146, 60, 0.9)'
};

const AUTOPLAY_MS = 5000;

export default function HeroCarousel({ items }: HeroCarouselProps) {
  const [active, setActive] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);
  const [trailerPreview, setTrailerPreview] = React.useState(false);
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const [progress, setProgress] = React.useState(0);
  const progressRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const { theme } = useThemeStore();
  const { language } = useLanguageStore();
  const isLight = theme === 'light';

  const startAutoplay = React.useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressRef.current) clearInterval(progressRef.current);

    setProgress(0);
    let elapsed = 0;
    progressRef.current = setInterval(() => {
      elapsed += 50;
      setProgress(Math.min((elapsed / AUTOPLAY_MS) * 100, 100));
    }, 50);

    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % items.length);
      elapsed = 0;
      setProgress(0);
    }, AUTOPLAY_MS);
  }, [items.length]);

  React.useEffect(() => {
    if (!isHovered) {
      startAutoplay();
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [isHovered, startAutoplay]);

  React.useEffect(() => {
    if (!isHovered) startAutoplay();
  }, [active, isHovered, startAutoplay]);

  const current = items[active];
  const grade = getCarbonGrade(current.carbonScore);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: 'clamp(480px, 75vh, 720px)' }}
      onMouseEnter={() => { setIsHovered(true); setTrailerPreview(true); }}
      onMouseLeave={() => { setIsHovered(false); setTrailerPreview(false); }}
    >
      {/* Background image with cinematic overlay */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current.id}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: trailerPreview ? 1.02 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <Image
            src={current.imageUrl}
            alt={current.title}
            fill
            priority
            className="object-cover"
            style={{ opacity: trailerPreview ? 0.45 : 0.3 }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlays */}
      <div className="absolute inset-0" style={{
        background: isLight ? 'linear-gradient(to right, rgba(240,244,247,0.94) 0%, rgba(240,244,247,0.58) 55%, rgba(240,244,247,0.12) 100%)'
          : 'linear-gradient(to right, rgba(10,15,24,0.97) 0%, rgba(10,15,24,0.7) 55%, rgba(10,15,24,0.2) 100%)'
      }} />
      <div className="absolute inset-0" style={{
        background: isLight ? 'linear-gradient(to top, rgba(240,244,247,0.98) 0%, transparent 44%)'
          : 'linear-gradient(to top, rgba(10,15,24,1) 0%, transparent 40%)'
      }} />

      {/* Trailer preview indicator */}
      <AnimatePresence>
        {trailerPreview && (
          <motion.div
            className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1.5 rounded-full z-20"
            style={{
              background: isLight ? 'rgba(255, 255, 255, 0.82)' : 'rgba(10, 15, 24, 0.8)',
              border: isLight ? '1px solid rgba(15, 23, 42, 0.14)' : '1px solid rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(12px)'
            }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-red-500"
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: isLight ? '#1d1d1f' : '#fff' }}>
              {language === 'de' ? 'Vorschau' : 'Preview'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              className="max-w-2xl"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              {/* Genre + type badge row */}
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full"
                  style={{
                    background: typeAccent[current.type].replace('0.9', '0.15'),
                    border: `1px solid ${typeAccent[current.type].replace('0.9', '0.4')}`,
                    color: 'white'
                  }}
                >
                  {current.genre}
                </span>

                {current.type === 'live' && (
                  <motion.span
                    className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1.5"
                    style={{ background: 'rgba(239, 68, 68, 0.85)', color: 'white' }}
                    animate={{ opacity: [1, 0.75, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
                    {language === 'de' ? 'Jetzt live' : 'Live Now'}
                  </motion.span>
                )}

                {/* Carbon Score badge */}
                <span
                  className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1"
                  style={{ background: grade.bg, color: grade.color, border: `1px solid ${grade.color}40` }}
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 20v-8m0 0c-2-2-4-4-4-6a4 4 0 018 0c0 2-2 4-4 6z" />
                  </svg>
                  {current.carbonScore.toFixed(2)}g CO2  {grade.grade}
                </span>

                <span className="text-[11px] text-gray-400">{current.year}</span>
                <span className="text-[11px] text-gray-500"></span>
                <span className="text-[11px] text-gray-400">{current.duration}</span>
                <span
                  className="text-[10px] font-medium px-2 py-0.5 rounded border text-gray-400"
                  style={{ borderColor: 'rgba(255,255,255,0.15)' }}
                >
                  {current.rating}
                </span>
              </div>

              {/* Title */}
              <h1
                className="font-black leading-tight tracking-tight mb-4"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: isLight ? '#1d1d1f' : '#fff' }}
              >
                {current.title}
              </h1>

              {/* Description */}
              <p className="text-sm leading-relaxed mb-4 max-w-lg opacity-85" style={{ color: isLight ? '#374151' : '#d1d5db' }}>
                {current.description}
              </p>

              {current.estimateDuration && (
                <div className="mb-6">
                  <EstimatedFootprintBadge durationLabel={current.estimateDuration} isGerman={language === 'de'} isLight={isLight} />
                </div>
              )}

              {/* Hashtags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {current.tags.map((tag) => (
                  <span key={tag} className="text-[11px] text-eco-green/60 font-medium">
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex items-center gap-3">
                <Link href={current.href}>
                  <motion.button
                    className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm"
                    style={{
                      background: 'rgba(0, 229, 186, 0.9)',
                      color: '#0A0F18'
                    }}
                    whileHover={{ scale: 1.04, boxShadow: '0 0 28px rgba(0,229,186,0.35)' }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    {language === 'de' ? 'Jetzt ansehen' : 'Watch Now'}
                  </motion.button>
                </Link>
                <motion.button
                  className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm"
                  style={{
                    color: isLight ? '#1d1d1f' : '#fff',
                    background: isLight ? 'rgba(255,255,255,0.86)' : 'rgba(255,255,255,0.08)',
                    border: isLight ? '1px solid rgba(15,23,42,0.16)' : '1px solid rgba(255,255,255,0.18)',
                    backdropFilter: 'blur(8px)'
                  }}
                  whileHover={{ scale: 1.04, backgroundColor: isLight ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.12)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  {language === 'de' ? 'Zur Liste' : 'Add to List'}
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide indicators + progress */}
      <div className="absolute bottom-8 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 flex items-center gap-3">
          {items.map((item, i) => (
            <button
              key={item.id}
              onClick={() => { setActive(i); }}
              className="relative rounded-full overflow-hidden flex-shrink-0 transition-all duration-300"
              style={{
                height: '3px',
                width: i === active ? '48px' : '24px',
                background: isLight ? 'rgba(15,23,42,0.2)' : 'rgba(255,255,255,0.2)'
              }}
            >
              {i === active && (
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ background: 'rgb(0, 229, 186)', width: `${progress}%` }}
                />
              )}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-1.5">
            {isHovered && (
              <motion.span
                className="text-[10px] text-gray-500 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {language === 'de' ? 'Pausiert' : 'Paused'}
              </motion.span>
            )}
          </div>
        </div>
      </div>

      {/* Slide thumbnails with small clickable previews */}
      <div className="absolute bottom-16 right-6 lg:right-8 z-20 hidden lg:flex flex-col gap-2">
        {items.map((item, i) => (
          <motion.button
            key={item.id}
            onClick={() => setActive(i)}
            className="relative rounded-xl overflow-hidden flex-shrink-0"
            style={{
              width: '100px',
              height: '56px',
              border: i === active ? '1.5px solid rgba(0, 229, 186, 0.7)'
                : '1.5px solid rgba(255,255,255,0.1)',
              opacity: i === active ? 1 : 0.55
            }}
            whileHover={{ opacity: 1, scale: 1.04 }}
            transition={{ duration: 0.2 }}
          >
            <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
            <div className="absolute inset-0" style={{
              background: isLight ? 'linear-gradient(to top, rgba(240,244,247,0.9) 0%, transparent 60%)'
                : 'linear-gradient(to top, rgba(10,15,24,0.8) 0%, transparent 60%)'
            }} />
            <span className="absolute bottom-1 left-1.5 text-[9px] font-semibold leading-tight max-w-[84px] truncate" style={{ color: isLight ? '#1d1d1f' : '#fff' }}>
              {item.title}
            </span>
          </motion.button>
        ))}
      </div>
    </section>
  );
}

