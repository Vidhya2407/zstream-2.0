'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useThemeStore } from '../../lib/stores/themeStore';
import { useLanguageStore } from '../../lib/stores/languageStore';
import EstimatedFootprintBadge from '../../components/impact/EstimatedFootprintBadge';

export interface ContentItem {
  id: number;
  title: string;
  subtitle: string;
  href: string;
  type: 'music' | 'video' | 'minis' | 'live' | 'gaming';
  genre: string;
  carbonScore: number;
  imageUrl: string;
  progress?: number;
  year?: number;
  duration?: string;
  estimateDuration?: string;
}

interface ContentRowProps {
  title: string;
  subtitle?: string;
  items: ContentItem[];
  badge?: string;
  selectedGenre?: string;
}

const typeConfig: Record<ContentItem['type'], { accent: string; label: string }> = {
  music: { accent: 'rgba(147, 51, 234, 0.85)', label: 'Music' },
  video: { accent: 'rgba(0, 128, 255, 0.85)', label: 'Video' },
  minis: { accent: 'rgba(251, 146, 60, 0.85)', label: 'Minis' },
  live: { accent: 'rgba(239, 68, 68, 0.85)', label: 'Live' },
  gaming: { accent: 'rgba(0, 200, 80, 0.85)', label: 'Gaming' }
};

function buildBadgeSurface(accent: string, isLight: boolean) {
  return {
    background: isLight ? 'rgba(255, 255, 255, 0.82)' : 'rgba(8, 12, 22, 0.76)',
    border: `1px solid ${isLight ? `${accent.replace('0.85', '0.32')}` : `${accent.replace('0.85', '0.52')}`}`,
    color: isLight ? '#0f172a' : '#f8fafc',
    boxShadow: isLight ? '0 10px 24px rgba(15, 23, 42, 0.12)' : '0 14px 28px rgba(0, 0, 0, 0.28)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
  } as const;
}

function getCarbonGrade(score: number) {
  if (score < 0.1) return { grade: 'A+', color: 'rgb(0, 229, 186)' };
  if (score < 0.3) return { grade: 'A', color: 'rgb(0, 217, 255)' };
  if (score < 0.5) return { grade: 'B', color: 'rgb(96, 165, 250)' };
  return { grade: 'C', color: 'rgb(251, 191, 36)' };
}

function CarbonScoreBadge({ score }: { score: number }) {
  const { grade, color } = getCarbonGrade(score);
  return (
    <div
      className="flex items-center gap-1 px-2 py-0.5 rounded-full"
      style={{ background: `${color}18`, border: `1px solid ${color}40` }}
    >
      <svg className="w-2.5 h-2.5 flex-shrink-0" fill="none" stroke={color} strokeWidth={2.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20v-8m0 0c-2-2-4-4-4-6a4 4 0 018 0c0 2-2 4-4 6z" />
      </svg>
      <span className="text-[9px] font-bold" style={{ color }}>
        Impact {grade}
      </span>
    </div>
  );
}

export function ContentCard({ item, index }: { item: ContentItem; index: number }) {
  const cfg = typeConfig[item.type];
  const isLive = item.type === 'live';
  const { theme } = useThemeStore();
  const { language } = useLanguageStore();
  const isLight = theme === 'light';
  const badgeSurface = buildBadgeSurface(cfg.accent, isLight);
  const typeLabel = language === 'de'
    ? { Music: 'Musik', Video: 'Video', Minis: 'Kurzvideos', Live: 'Live', Gaming: 'Gaming' }[cfg.label] ?? cfg.label
    : cfg.label;

  return (
    <motion.div
      className="flex-shrink-0"
      style={{ width: '220px' }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
    >
      <Link href={item.href}>
        <motion.div
          className="group rounded-xl overflow-hidden cursor-pointer"
          style={{
            background: isLight ? 'rgba(255, 255, 255, 0.9)' : 'rgba(15, 22, 35, 0.8)',
            border: isLight ? '1px solid rgba(15, 23, 42, 0.1)' : '1px solid rgba(255, 255, 255, 0.06)'
          }}
          whileHover={{ y: -4, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.22 }}
        >
          <div className="relative overflow-hidden" style={{ height: '124px' }}>
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              sizes="220px"
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div
              className="absolute inset-0"
              style={{
                background: isLight
                  ? 'linear-gradient(to top, rgba(244,247,251,0.92) 0%, rgba(244,247,251,0.3) 38%, rgba(15,23,42,0.16) 100%)'
                  : 'linear-gradient(to top, rgba(10,15,24,0.9) 0%, rgba(10,15,24,0.24) 42%, rgba(10,15,24,0.34) 100%)',
              }}
            />
            <div
              className="absolute inset-x-0 top-0 h-16"
              style={{
                background: isLight
                  ? 'linear-gradient(to bottom, rgba(15,23,42,0.18), rgba(15,23,42,0))'
                  : 'linear-gradient(to bottom, rgba(0,0,0,0.42), rgba(0,0,0,0))',
              }}
            />

            <div
              className="absolute left-2.5 top-2.5 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.14em]"
              style={badgeSurface}
            >
              {typeLabel}
            </div>

            {isLive && (
              <motion.div
                className="absolute right-2.5 top-2.5 px-2.5 py-1 rounded-full text-[9px] font-bold text-white flex items-center gap-1.5"
                style={{
                  background: 'rgba(220, 38, 38, 0.92)',
                  border: '1px solid rgba(254, 202, 202, 0.28)',
                  boxShadow: '0 12px 24px rgba(127, 29, 29, 0.28)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                }}
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
                LIVE
              </motion.div>
            )}

            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <motion.div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: cfg.accent, backdropFilter: 'blur(8px)' }}
                whileHover={{ scale: 1.12 }}
              >
                <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </motion.div>
            </div>
          </div>

          {item.progress !== undefined && (
            <div className="px-3 pt-2">
              <div className="h-0.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${item.progress}%`,
                    background: 'linear-gradient(90deg, rgb(0, 229, 186), rgb(0, 217, 255))'
                  }}
                />
              </div>
            </div>
          )}

          <div className="p-3 pt-2">
            <h3 className="font-semibold text-xs leading-tight mb-0.5 line-clamp-1" style={{ color: isLight ? '#1d1d1f' : '#fff' }}>
              {item.title}
            </h3>
            <p className="text-[10px] mb-2 line-clamp-1" style={{ color: '#6b7280' }}>{item.subtitle}</p>

            {item.estimateDuration && (
              <div className="mb-2">
                <EstimatedFootprintBadge durationLabel={item.estimateDuration} isGerman={language === 'de'} isLight={isLight} />
              </div>
            )}
            <div className="flex items-center justify-between">
              <CarbonScoreBadge score={item.carbonScore} />
              {item.duration && (
                <span className="text-[9px] text-gray-600">{item.duration}</span>
              )}
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default function ContentRow({ title, subtitle, items, badge, selectedGenre }: ContentRowProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const { theme } = useThemeStore();
  const isLight = theme === 'light';

  const filtered = selectedGenre && selectedGenre !== 'All'
    ? items.filter((item) => item.genre === selectedGenre)
    : items;

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === 'right' ? 480 : -480, behavior: 'smooth' });
  };

  if (filtered.length === 0) return null;

  return (
    <section className="relative">
      <div className="app-container mb-5 flex items-end justify-between gap-4">
        <div>
          {badge && (
            <span
              className="text-[10px] font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full inline-block mb-2"
              style={{
                background: 'rgba(0, 229, 186, 0.08)',
                border: '1px solid rgba(0, 229, 186, 0.2)',
                color: 'rgb(0, 229, 186)'
              }}
            >
              {badge}
            </span>
          )}
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-black tracking-tight" style={{ color: isLight ? '#1d1d1f' : '#fff' }}>{title}</h2>
            {subtitle && (
              <span className="text-xs text-gray-500 font-medium">{subtitle}</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            onClick={() => scroll('left')}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400"
            style={{
              background: isLight ? 'rgba(15,23,42,0.06)' : 'rgba(255,255,255,0.06)',
              border: isLight ? '1px solid rgba(15,23,42,0.1)' : '1px solid rgba(255,255,255,0.08)'
            }}
            whileHover={{ backgroundColor: 'rgba(0,229,186,0.12)', color: 'rgb(0,229,186)' }}
            whileTap={{ scale: 0.92 }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </motion.button>
          <motion.button
            onClick={() => scroll('right')}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400"
            style={{
              background: isLight ? 'rgba(15,23,42,0.06)' : 'rgba(255,255,255,0.06)',
              border: isLight ? '1px solid rgba(15,23,42,0.1)' : '1px solid rgba(255,255,255,0.08)'
            }}
            whileHover={{ backgroundColor: 'rgba(0,229,186,0.12)', color: 'rgb(0,229,186)' }}
            whileTap={{ scale: 0.92 }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </motion.button>
        </div>
      </div>

      <div className="relative">
        <div
          className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
          style={{ background: isLight ? 'linear-gradient(to right, #f0f4f7, transparent)' : 'linear-gradient(to right, #0A0F18, transparent)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
          style={{ background: isLight ? 'linear-gradient(to left, #f0f4f7, transparent)' : 'linear-gradient(to left, #0A0F18, transparent)' }}
        />

        <div
          ref={scrollRef}
          className="app-scroll-gutter flex gap-3 overflow-x-auto pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filtered.map((item, i) => (
            <ContentCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

