'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useHydrated } from '@/hooks/useHydrated';
import { getSeriesWatchId, getWatchHref } from '@/lib/navigation/playbackRoutes';
import { useThemeStore } from '@/lib/stores/themeStore';
import { contentImages } from '../../../lib/images/unsplash';

type Episode = { num: number; title: string; duration: string; watched: boolean };
type SeriesDetail = {
  id: string;
  title: string;
  genre: string;
  seasons: number;
  episodes: Episode[];
  rating: string;
  year: number;
  status: 'Ongoing' | 'Complete';
  imageIdx: number;
  carbonScore: number;
  isPremium: boolean;
  description: string;
  longDescription: string;
  studio: string;
  language: string;
  ageRating: string;
  tags: string[];
  creator: string;
  related: string[];
};

const makeEps = (count: number, watched: number): Episode[] =>
  Array.from({ length: count }, (_, i) => ({ num: i + 1, title: `Episode ${i + 1}`, duration: `${42 + (i % 3) * 4}m`, watched: i < watched }));

const SERIES_DATA: Record<string, SeriesDetail> = {
  s1: { id: 's1', title: 'Planet: A New Hope', genre: 'Documentary', seasons: 2, episodes: makeEps(12, 7), rating: '9.4', year: 2024, status: 'Ongoing', imageIdx: 0, carbonScore: 0.07, isPremium: false, description: 'A groundbreaking series exploring humanity\'s path to a sustainable future across six continents.', longDescription: 'Shot over four years across six continents, Planet: A New Hope is a landmark series in environmental storytelling. Each episode travels to a different part of the world to document the scientists, activists, and communities building a sustainable future.', studio: 'EcoLens Films', language: 'EN', ageRating: 'G', tags: ['Environment', 'Science', 'Hope'], creator: 'David Attenborough Jr.', related: ['s7', 's8'] },
  s7: { id: 's7', title: 'Solar Pioneers', genre: 'Drama', seasons: 1, episodes: makeEps(10, 8), rating: '8.8', year: 2024, status: 'Ongoing', imageIdx: 0, carbonScore: 0.06, isPremium: true, description: 'A drama series following the engineers, politicians, and activists behind Germany\'s solar energy revolution.', longDescription: 'Based on true events, Solar Pioneers dramatizes the extraordinary decade during which Germany transformed its energy grid. The series reveals how ordinary people drove one of history\'s most audacious energy transitions.', studio: 'ZStream Originals', language: 'DE/EN', ageRating: '12', tags: ['Drama', 'Energy', 'Germany'], creator: 'Lukas Bayer', related: ['s8', 's1'] },
  s8: { id: 's8', title: 'The Carbon Code', genre: 'Thriller', seasons: 2, episodes: makeEps(18, 6), rating: '9.0', year: 2023, status: 'Complete', imageIdx: 1, carbonScore: 0.07, isPremium: true, description: 'A financial thriller about a whistleblower exposing a fraudulent carbon credit conspiracy.', longDescription: 'When compliance officer Rachel Voss discovers that the world\'s largest carbon credit exchange is falsifying offset data, she faces a choice that will cost her everything. The Carbon Code blends finance, environmental activism, and suspense into a thriller that feels urgently real.', studio: 'ZStream Originals', language: 'EN', ageRating: '15', tags: ['Thriller', 'Finance', 'Crime'], creator: 'Sophie Reed', related: ['s7', 's1'] },
};

function usePageTheme() {
  const hydrated = useHydrated(useThemeStore);
  const { theme } = useThemeStore();
  const isLight = (hydrated ? theme : 'dark') === 'light';
  return {
    isLight,
    bg: isLight ? 'linear-gradient(180deg, #eef5f8 0%, #f8fbfd 40%, #eef8f4 100%)' : '#0a0f18',
    overlay: isLight ? 'linear-gradient(to bottom, rgba(238,245,248,0.9), rgba(248,251,253,0.97))' : 'linear-gradient(to bottom, rgba(10,15,24,0.9), rgba(10,15,24,1))',
    card: isLight ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.04)',
    raised: isLight ? 'rgba(255,255,255,0.94)' : 'rgba(15,22,34,0.9)',
    border: isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.08)',
    text: isLight ? '#0f172a' : '#ffffff',
    body: isLight ? '#334155' : '#d1d5db',
    muted: isLight ? '#64748b' : '#9ca3af',
    soft: isLight ? '#94a3b8' : '#6b7280',
  };
}

export default function MediaSeriesDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : (params.id ?? 's1');
  const series = SERIES_DATA[id] ?? SERIES_DATA.s1;
  const playHref = getWatchHref(getSeriesWatchId(series.id));
  const related = series.related.map((rid) => SERIES_DATA[rid]).filter(Boolean);
  const nextEpisode = series.episodes.find((episode) => !episode.watched) ?? series.episodes[0];
  const theme = usePageTheme();

  return (
    <main className="relative min-h-screen overflow-x-hidden" style={{ background: theme.bg }}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Image src={contentImages.hero[series.imageIdx % contentImages.hero.length].url} alt="" fill className="object-cover opacity-[0.05]" />
        <div className="absolute inset-0" style={{ background: theme.overlay }} />
        <motion.div className="absolute right-[-8%] top-[-20%] h-[700px] w-[700px] rounded-full blur-[70px]" style={{ background: theme.isLight ? 'radial-gradient(circle, rgba(0,128,255,0.09) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(0,128,255,0.07) 0%, transparent 70%)' }} animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 13, repeat: Infinity }} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="mb-6 flex items-center gap-2 text-xs" style={{ color: theme.muted }}>
          <Link href="/media-series" className="transition-colors hover:text-blue-400">Media Series</Link>
          <span>/</span>
          <span style={{ color: theme.body }}>{series.title}</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <section className="space-y-6">
            <div className="relative overflow-hidden rounded-[28px]" style={{ background: '#000', aspectRatio: '16/9' }}>
              <Image src={contentImages.hero[series.imageIdx % contentImages.hero.length].url} alt={series.title} fill className="object-cover opacity-50" />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Link href={playHref} aria-label="Play series">
                  <button className="flex h-20 w-20 items-center justify-center rounded-full" style={{ background: 'rgba(0,229,186,0.9)', boxShadow: '0 0 40px rgba(0,229,186,0.45)' }}>
                    <svg className="ml-1 h-9 w-9 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </button>
                </Link>
                <p className="mt-4 text-sm font-semibold text-white">Continue with {nextEpisode.title}</p>
                <p className="mt-1 text-xs text-gray-300">Season-ready stream · {series.isPremium ? 'Premium' : 'Free'} access</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <h1 className="text-3xl font-black leading-tight md:text-4xl" style={{ color: theme.text }}>{series.title}</h1>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs" style={{ color: theme.muted }}>
                    <span>{series.year}</span>
                    <span>·</span>
                    <span>{series.genre}</span>
                    <span>·</span>
                    <span>{series.seasons} season{series.seasons > 1 ? 's' : ''}</span>
                    <span>·</span>
                    <span>{series.episodes.length} episodes</span>
                    <span>·</span>
                    <span>{series.language}</span>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-sm font-black text-yellow-500">* {series.rating}</span>
                    <span className="text-sm text-yellow-500">*****</span>
                    <span className="rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ background: series.status === 'Ongoing' ? 'rgba(0,229,186,0.12)' : theme.card, color: series.status === 'Ongoing' ? 'rgb(0,229,186)' : theme.body, border: `1px solid ${series.status === 'Ongoing' ? 'rgba(0,229,186,0.22)' : theme.border}` }}>{series.status}</span>
                  </div>
                </div>
                <div className="rounded-2xl px-3 py-2" style={{ background: 'rgba(0,229,186,0.08)', border: '1px solid rgba(0,229,186,0.18)' }}>
                  <p className="text-[10px] font-semibold text-gray-500">Series impact</p>
                  <p className="text-sm font-black" style={{ color: 'rgb(0,229,186)' }}>{(series.carbonScore * 1000).toFixed(0)}mg CO2 / hour</p>
                </div>
                <Link href={playHref} className="rounded-2xl px-4 py-2 text-xs font-bold" style={{ background: theme.card, color: theme.body, border: `1px solid ${theme.border}` }}>Play series</Link>
              </div>

              <div className="flex flex-wrap gap-2">
                {series.tags.map((tag) => (
                  <span key={tag} className="rounded-full px-3 py-1 text-[11px] font-semibold" style={{ background: theme.card, color: theme.muted, border: `1px solid ${theme.border}` }}>{tag}</span>
                ))}
              </div>

              <div className="grid gap-4 md:grid-cols-[1.5fr_1fr]">
                <div className="rounded-[26px] p-6" style={{ background: theme.card, border: `1px solid ${theme.border}`, boxShadow: theme.isLight ? '0 20px 60px rgba(15,23,42,0.08)' : 'none' }}>
                  <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: theme.soft }}>Overview</p>
                  <p className="mt-4 text-sm leading-7" style={{ color: theme.body }}>{series.longDescription}</p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl p-4" style={{ background: theme.raised, border: `1px solid ${theme.border}` }}>
                      <p className="text-[11px] uppercase tracking-[0.18em]" style={{ color: theme.soft }}>Creator</p>
                      <p className="mt-2 text-sm font-semibold" style={{ color: theme.text }}>{series.creator}</p>
                    </div>
                    <div className="rounded-2xl p-4" style={{ background: theme.raised, border: `1px solid ${theme.border}` }}>
                      <p className="text-[11px] uppercase tracking-[0.18em]" style={{ color: theme.soft }}>Studio</p>
                      <p className="mt-2 text-sm font-semibold" style={{ color: theme.text }}>{series.studio}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-[26px] p-6" style={{ background: theme.raised, border: `1px solid ${theme.border}`, boxShadow: theme.isLight ? '0 20px 60px rgba(15,23,42,0.08)' : 'none' }}>
                    <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: theme.soft }}>Next episode</p>
                    <p className="mt-3 text-lg font-black" style={{ color: theme.text }}>{nextEpisode.title}</p>
                    <p className="mt-2 text-sm" style={{ color: theme.body }}>{nextEpisode.duration} · Episode {nextEpisode.num}</p>
                  </div>
                  <div className="rounded-[26px] p-6" style={{ background: 'rgba(0,229,186,0.05)', border: '1px solid rgba(0,229,186,0.15)' }}>
                    <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: theme.soft }}>Carbon impact</p>
                    <p className="mt-3 text-sm font-semibold" style={{ color: theme.text }}>{series.description}</p>
                    <p className="mt-4 text-sm font-black" style={{ color: 'rgb(0,229,186)' }}>{(series.carbonScore * series.episodes.length * 0.75).toFixed(2)}kg CO2 full-series estimate</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[26px] p-6" style={{ background: theme.card, border: `1px solid ${theme.border}` }}>
                <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: theme.soft }}>Episodes</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {series.episodes.slice(0, 6).map((episode) => (
                    <div key={episode.num} className="flex items-center justify-between rounded-2xl p-4" style={{ background: theme.raised, border: `1px solid ${theme.border}` }}>
                      <div>
                        <p className="text-sm font-semibold" style={{ color: theme.text }}>{episode.title}</p>
                        <p className="mt-1 text-[11px]" style={{ color: theme.muted }}>{episode.duration}</p>
                      </div>
                      <span className="rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ background: episode.watched ? 'rgba(0,229,186,0.12)' : theme.card, color: episode.watched ? 'rgb(0,229,186)' : theme.body, border: `1px solid ${episode.watched ? 'rgba(0,229,186,0.22)' : theme.border}` }}>{episode.watched ? 'Watched' : 'Up next'}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <aside className="space-y-4">
            <div className="rounded-[26px] p-5" style={{ background: theme.raised, border: `1px solid ${theme.border}`, boxShadow: theme.isLight ? '0 20px 60px rgba(15,23,42,0.08)' : 'none' }}>
              <h2 className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: theme.soft }}>Related Series</h2>
              <div className="mt-4 space-y-3">
                {related.map((item) => (
                  <Link key={item.id} href={`/media-series/${item.id}`} className="block">
                    <div className="flex items-center gap-3 rounded-2xl p-3 transition-transform hover:scale-[1.01]" style={{ background: theme.card, border: `1px solid ${theme.border}` }}>
                      <div className="relative h-14 w-20 overflow-hidden rounded-xl">
                        <Image src={contentImages.hero[item.imageIdx % contentImages.hero.length].url} alt={item.title} fill className="object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold" style={{ color: theme.text }}>{item.title}</p>
                        <p className="mt-1 text-[11px]" style={{ color: theme.muted }}>{item.genre} · * {item.rating}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-[26px] p-5" style={{ background: theme.card, border: `1px solid ${theme.border}` }}>
              <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: theme.soft }}>Series note</p>
              <p className="mt-3 text-sm leading-7" style={{ color: theme.body }}>The beta playback experience supports premium gating, continue-watching handoff, and series progress summaries. DRM-protected offline downloads will be enabled later.</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
