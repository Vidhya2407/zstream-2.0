'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { contentImages } from '../../lib/images/unsplash';
import { useLanguageStore } from '../../lib/stores/languageStore';
import { useThemeStore } from '../../lib/stores/themeStore';
import EstimatedFootprintBadge from '../../components/impact/EstimatedFootprintBadge';

interface ContentCardProps {
  title: string;
  subtitle: string;
  image?: string;
  href: string;
  type: 'music' | 'video' | 'minis' | 'live' | 'gaming';
  index: number;
  carbonScore?: number;
  estimateDuration?: string;
  genre?: string;
}

function getCarbonGrade(score: number) {
  if (score < 0.1) return { grade: 'A+', color: 'rgb(0, 229, 186)' };
  if (score < 0.3) return { grade: 'A', color: 'rgb(0, 217, 255)' };
  if (score < 0.5) return { grade: 'B', color: 'rgb(96, 165, 250)' };
  return { grade: 'C', color: 'rgb(251, 191, 36)' };
}

const typeConfig = {
  music: {
    accent: 'rgba(147, 51, 234, 0.85)',
    accentBorder: 'rgba(147, 51, 234, 0.4)',
    label: 'Music',
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
      </svg>
    )
  },
  video: {
    accent: 'rgba(0, 128, 255, 0.85)',
    accentBorder: 'rgba(0, 128, 255, 0.4)',
    label: 'Video',
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
      </svg>
    )
  },
  minis: {
    accent: 'rgba(251, 146, 60, 0.85)',
    accentBorder: 'rgba(251, 146, 60, 0.4)',
    label: 'Minis',
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    )
  },
  live: {
    accent: 'rgba(239, 68, 68, 0.85)',
    accentBorder: 'rgba(239, 68, 68, 0.4)',
    label: 'Live',
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 010 1.972l-11.54 6.347a1.125 1.125 0 01-1.667-.986V5.653z" />
      </svg>
    )
  },
  gaming: {
    accent: 'rgba(0, 200, 80, 0.85)',
    accentBorder: 'rgba(0, 200, 80, 0.4)',
    label: 'Gaming',
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
      </svg>
    )
  }
};

function buildBadgeSurface(accentBorder: string, isLight: boolean) {
  return {
    background: isLight ? 'rgba(255, 255, 255, 0.84)' : 'rgba(8, 12, 22, 0.78)',
    border: `1px solid ${isLight ? accentBorder : accentBorder.replace('0.4', '0.52')}`,
    color: isLight ? '#0f172a' : '#f8fafc',
    boxShadow: isLight ? '0 10px 24px rgba(15, 23, 42, 0.12)' : '0 14px 28px rgba(0, 0, 0, 0.28)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
  } as const;
}

export default function PremiumContentCard({ title, subtitle, image, href, type, index, carbonScore, estimateDuration, genre }: ContentCardProps) {
  const config = typeConfig[type];
  const { language } = useLanguageStore();
  const { theme } = useThemeStore();
  const imagesForType = contentImages[type as keyof typeof contentImages];
  const defaultImage = (Array.isArray(imagesForType) ? imagesForType[0] : contentImages.video[0]) as { url: string };
  const imageUrl = image || defaultImage.url;
  const isLive = type === 'live';
  const isLight = theme === 'light';
  const badgeSurface = buildBadgeSurface(config.accentBorder, isLight);
  const typeLabel = language === 'de'
    ? { Music: 'Musik', Video: 'Video', Minis: 'Kurzvideos', Live: 'Live', Gaming: 'Gaming' }[config.label] ?? config.label
    : config.label;
  const neutralLabel = language === 'de' ? 'Klimaneutral' : 'Carbon Neutral';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
    >
      <Link href={href}>
        <motion.div
          className="group relative rounded-2xl overflow-hidden cursor-pointer"
          style={{
            background: isLight ? 'rgba(255, 255, 255, 0.92)' : 'rgba(15, 22, 35, 0.82)',
            border: isLight ? '1px solid rgba(148, 163, 184, 0.2)' : '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)'
          }}
          whileHover={{ y: -5, scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
            style={{
              boxShadow: `inset 0 0 0 1px ${config.accentBorder}`,
              background: `radial-gradient(circle at 20% 20%, ${config.accent.replace('0.85', '0.05')}, transparent 50%)`
            }}
          />

          <div className="aspect-video relative overflow-hidden">
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0" style={{ background: isLight ? 'linear-gradient(to top, rgba(248,250,252,0.92) 0%, rgba(248,250,252,0.32) 38%, rgba(15,23,42,0.16) 100%)' : 'linear-gradient(to top, rgba(15,22,35,0.95) 0%, rgba(15,22,35,0.24) 42%, rgba(0,0,0,0.34) 100%)' }} />
            <div className="absolute inset-x-0 top-0 h-20" style={{ background: isLight ? 'linear-gradient(to bottom, rgba(15,23,42,0.18), rgba(15,23,42,0))' : 'linear-gradient(to bottom, rgba(0,0,0,0.42), rgba(0,0,0,0))' }} />

            <div
              className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={badgeSurface}
            >
              {config.icon}
              <span className="text-[10px] font-bold uppercase tracking-wider">{typeLabel}</span>
            </div>

            {isLive && (
              <motion.div
                className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                style={{
                  background: 'rgba(220, 38, 38, 0.92)',
                  border: '1px solid rgba(254, 202, 202, 0.28)',
                  boxShadow: '0 12px 24px rgba(127, 29, 29, 0.28)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                }}
                animate={{ opacity: [1, 0.75, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                <span className="text-white text-[10px] font-bold">LIVE</span>
              </motion.div>
            )}

            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <motion.div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{
                  background: config.accent,
                  backdropFilter: 'blur(8px)',
                  boxShadow: `0 0 28px ${config.accentBorder}`
                }}
                whileHover={{ scale: 1.1 }}
              >
                <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </motion.div>
            </div>
          </div>

          <div className="p-4">
            <h3
              className="font-semibold text-sm leading-tight mb-1 group-hover:transition-colors duration-300"
              style={{ color: isLight ? 'rgb(15, 23, 42)' : 'rgb(255, 255, 255)', transition: 'color 0.3s ease' }}
            >
              {title}
            </h3>
            <p className="text-xs mb-3" style={{ color: isLight ? 'rgb(71, 85, 105)' : 'rgb(148, 163, 184)' }}>{subtitle}</p>

            {estimateDuration && (
              <div className="mb-3">
                <EstimatedFootprintBadge durationLabel={estimateDuration} isGerman={language === 'de'} isLight={isLight} />
              </div>
            )}

            {carbonScore !== undefined ? (() => {
              const { grade, color } = getCarbonGrade(carbonScore);
              return (
                <div className="flex items-center justify-between">
                  <div
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                    style={{ background: `${color}18`, border: `1px solid ${color}35` }}
                  >
                    <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke={color} strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 20v-8m0 0c-2-2-4-4-4-6a4 4 0 018 0c0 2-2 4-4 6z" />
                    </svg>
                    <span className="text-[10px] font-bold" style={{ color }}>
                      {carbonScore.toFixed(2)}g CO2
                    </span>
                    <span
                      className="text-[9px] font-black px-1 rounded"
                      style={{ background: `${color}25`, color }}
                    >
                      {grade}
                    </span>
                  </div>
                  {genre && (
                    <span className="text-[10px] font-medium" style={{ color: isLight ? 'rgb(100, 116, 139)' : 'rgb(148, 163, 184)' }}>{genre}</span>
                  )}
                </div>
              );
            })() : (
              <div className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-eco-green" />
                <span className="text-[10px] text-eco-green/60 font-medium">{neutralLabel}</span>
              </div>
            )}
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

