'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useHydrated } from '@/hooks/useHydrated';
import { getMovieWatchId, getWatchHref } from '@/lib/navigation/playbackRoutes';
import { useThemeStore } from '@/lib/stores/themeStore';
import { contentImages } from '../../../lib/images/unsplash';

type Movie = {
  id: string;
  title: string;
  genre: string;
  rating: string;
  imageIdx: number;
  duration: string;
  year: number;
  director: string;
  language: string;
  ageRating: string;
  carbonScore: number;
  description: string;
  longDescription: string;
  isPremium: boolean;
  tags: string[];
  studio: string;
  related: string[];
};

const MOVIES: Record<string, Movie> = {
  m1: { id: 'm1', title: 'Climate Action Documentary', genre: 'Documentary', rating: '9.2', imageIdx: 0, duration: '1h 48m', year: 2024, director: 'David Attenborough Jr.', language: 'EN', ageRating: 'PG', carbonScore: 0.04, description: 'A sweeping examination of global climate efforts told through the lives of scientists, activists, and communities on the front lines of change.', longDescription: 'Shot over four years across six continents, this documentary follows the women and men dedicating their lives to reversing climate catastrophe. From the ice-fields of Greenland to the solar deserts of Morocco, the film reveals how science, courage, and community are our most powerful tools.', isPremium: false, tags: ['Environment', 'Science', 'Education'], studio: 'EcoLens Films', related: ['m3', 'm7'] },
  m2: { id: 'm2', title: 'Green Tech Future', genre: 'Sci-Fi', rating: '8.7', imageIdx: 1, duration: '2h 05m', year: 2024, director: 'Maya Chen', language: 'EN', ageRating: '12', carbonScore: 0.06, description: 'A breathtaking vision of a world powered entirely by renewable energy, where cities float on solar grids and oceans breathe again.', longDescription: 'In 2087, renewable energy has transformed every aspect of civilization. But when the grid is threatened by a mysterious signal from deep space, engineer Dr. Yoko Nara must race to protect the fragile utopia humanity built. A visually stunning triumph of eco-sci-fi cinema.', isPremium: true, tags: ['Technology', 'Future', 'Innovation'], studio: 'Aurora Pictures', related: ['m7', 'm3'] },
  m3: { id: 'm3', title: 'Ocean Guardians', genre: 'Nature', rating: '9.5', imageIdx: 0, duration: '1h 32m', year: 2025, director: 'James Reef', language: 'EN/DE', ageRating: 'G', carbonScore: 0.03, description: 'Following a team of marine biologists as they race to protect the last pristine reef systems from climate change and human activity.', longDescription: 'The world\'s coral reefs are vanishing at unprecedented speed. In this urgent and heartbreakingly beautiful film, a team of marine biologists dives to the edge of ecological collapse and back to show us what we still have to save. Filmed entirely on solar-powered vessels with zero-emission equipment.', isPremium: false, tags: ['Nature', 'Ocean', 'Wildlife'], studio: 'Blue Planet Studio', related: ['m1', 'm7'] },
  m7: { id: 'm7', title: 'The Last Forest', genre: 'Nature', rating: '9.6', imageIdx: 0, duration: '2h 12m', year: 2025, director: 'Amazonia Productions', language: 'PT/EN', ageRating: 'PG', carbonScore: 0.04, description: 'An urgent, visually stunning portrait of the Amazon rainforest and the indigenous guardians fighting to preserve it against all odds.', longDescription: 'The Amazon rainforest is the lungs of the Earth and they are burning. This landmark film, shot over three years with indigenous communities, is both a cry for justice and a celebration of the extraordinary biodiversity that still remains.', isPremium: true, tags: ['Nature', 'Biodiversity', 'Indigenous'], studio: 'Amazonia Cinema', related: ['m3', 'm1'] },
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

function RatingRow({ rating, muted }: { rating: string; muted: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-black text-yellow-500">* {rating}</span>
      <div className="flex text-sm text-yellow-500">*****</div>
      <span className="text-[10px]" style={{ color: muted }}>Audience favorite</span>
    </div>
  );
}

export default function MovieDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : (params.id ?? 'm1');
  const movie = MOVIES[id] ?? MOVIES.m1;
  const playHref = getWatchHref(getMovieWatchId(movie.id));
  const related = movie.related.map((rid) => MOVIES[rid]).filter(Boolean);
  const theme = usePageTheme();

  return (
    <main className="relative min-h-screen overflow-x-hidden" style={{ background: theme.bg }}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Image src={contentImages.movies[movie.imageIdx % contentImages.movies.length].url} alt="" fill className="object-cover opacity-[0.05]" />
        <div className="absolute inset-0" style={{ background: theme.overlay }} />
        <motion.div className="absolute right-[-8%] top-[-20%] h-[700px] w-[700px] rounded-full blur-[70px]" style={{ background: theme.isLight ? 'radial-gradient(circle, rgba(0,128,255,0.09) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(0,128,255,0.07) 0%, transparent 70%)' }} animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 13, repeat: Infinity }} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="mb-6 flex items-center gap-2 text-xs" style={{ color: theme.muted }}>
          <Link href="/movies" className="transition-colors hover:text-blue-400">Movies</Link>
          <span>/</span>
          <span style={{ color: theme.body }}>{movie.title}</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <section className="space-y-6">
            <div className="relative overflow-hidden rounded-[28px]" style={{ background: '#000', aspectRatio: '16/9' }}>
              <Image src={contentImages.movies[movie.imageIdx % contentImages.movies.length].url} alt={movie.title} fill className="object-cover opacity-55" />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Link href={playHref} aria-label="Play movie">
                  <button className="flex h-20 w-20 items-center justify-center rounded-full" style={{ background: 'rgba(0,128,255,0.9)', boxShadow: '0 0 40px rgba(0,128,255,0.45)' }}>
                    <svg className="ml-1 h-9 w-9 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </button>
                </Link>
                <p className="mt-4 text-sm font-semibold text-white">Ready to stream</p>
                <p className="mt-1 text-xs text-gray-300">Licensed DRM  {movie.isPremium ? 'Premium' : 'Free'} access</p>
              </div>
              <div className="absolute left-4 top-4 rounded-full px-3 py-1.5 text-[10px] font-bold" style={{ background: theme.isLight ? 'rgba(255,255,255,0.84)' : 'rgba(8,12,22,0.78)', color: theme.isLight ? '#0f172a' : '#f8fafc', border: '1px solid rgba(0,229,186,0.28)', boxShadow: theme.isLight ? '0 10px 24px rgba(15, 23, 42, 0.12)' : '0 14px 28px rgba(0, 0, 0, 0.28)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
                Widevine DRM  1080p
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <h1 className="text-3xl font-black leading-tight md:text-4xl" style={{ color: theme.text }}>{movie.title}</h1>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs" style={{ color: theme.muted }}>
                    <span>{movie.year}</span>
                    <span></span>
                    <span>{movie.genre}</span>
                    <span></span>
                    <span>{movie.duration}</span>
                    <span></span>
                    <span>{movie.language}</span>
                    <span></span>
                    <span className="rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ background: theme.card, border: `1px solid ${theme.border}` }}>{movie.ageRating}</span>
                  </div>
                  <div className="mt-3">
                    <RatingRow rating={movie.rating} muted={theme.soft} />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded-2xl px-3 py-2" style={{ background: 'rgba(0,229,186,0.08)', border: '1px solid rgba(0,229,186,0.18)' }}>
                    <p className="text-[10px] font-semibold text-gray-500">Carbon score</p>
                    <p className="text-sm font-black" style={{ color: 'rgb(0,229,186)' }}>{(movie.carbonScore * 1000).toFixed(0)}mg CO2</p>
                  </div>
                  <Link href={playHref} className="rounded-2xl px-4 py-2 text-xs font-bold" style={{ background: theme.card, color: theme.body, border: `1px solid ${theme.border}` }}>Play now</Link>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {movie.tags.map((tag) => (
                  <span key={tag} className="rounded-full px-3 py-1 text-[11px] font-semibold" style={{ background: theme.card, color: theme.muted, border: `1px solid ${theme.border}` }}>{tag}</span>
                ))}
              </div>

              <div className="grid gap-4 md:grid-cols-[1.5fr_1fr]">
                <div className="rounded-[26px] p-6" style={{ background: theme.card, border: `1px solid ${theme.border}`, boxShadow: theme.isLight ? '0 20px 60px rgba(15,23,42,0.08)' : 'none' }}>
                  <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: theme.soft }}>Overview</p>
                  <p className="mt-4 text-sm leading-7" style={{ color: theme.body }}>{movie.longDescription}</p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl p-4" style={{ background: theme.raised, border: `1px solid ${theme.border}` }}>
                      <p className="text-[11px] uppercase tracking-[0.18em]" style={{ color: theme.soft }}>Director</p>
                      <p className="mt-2 text-sm font-semibold" style={{ color: theme.text }}>{movie.director}</p>
                    </div>
                    <div className="rounded-2xl p-4" style={{ background: theme.raised, border: `1px solid ${theme.border}` }}>
                      <p className="text-[11px] uppercase tracking-[0.18em]" style={{ color: theme.soft }}>Studio</p>
                      <p className="mt-2 text-sm font-semibold" style={{ color: theme.text }}>{movie.studio}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-[26px] p-6" style={{ background: theme.raised, border: `1px solid ${theme.border}`, boxShadow: theme.isLight ? '0 20px 60px rgba(15,23,42,0.08)' : 'none' }}>
                    <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: theme.soft }}>At a glance</p>
                    <div className="mt-4 space-y-3 text-sm">
                      {[
                        ['Rating', `${movie.rating} / 10`],
                        ['Runtime', movie.duration],
                        ['Language', movie.language],
                        ['Carbon grade', movie.carbonScore < 0.05 ? 'A+' : 'A'],
                      ].map(([label, value]) => (
                        <div key={label} className="flex items-center justify-between gap-3">
                          <span style={{ color: theme.soft }}>{label}</span>
                          <span className="font-semibold" style={{ color: theme.text }}>{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-[26px] p-6" style={{ background: 'rgba(0,229,186,0.05)', border: '1px solid rgba(0,229,186,0.15)' }}>
                    <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: theme.soft }}>Impact</p>
                    <p className="mt-3 text-sm font-semibold" style={{ color: theme.text }}>{movie.description}</p>
                    <p className="mt-4 text-sm font-black" style={{ color: 'rgb(0,229,186)' }}>{(movie.carbonScore * 1000).toFixed(0)}mg CO2 per watch</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <aside className="space-y-4">
            <div className="rounded-[26px] p-5" style={{ background: theme.raised, border: `1px solid ${theme.border}`, boxShadow: theme.isLight ? '0 20px 60px rgba(15,23,42,0.08)' : 'none' }}>
              <h2 className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: theme.soft }}>Related Movies</h2>
              <div className="mt-4 space-y-3">
                {related.map((item) => (
                  <Link key={item.id} href={`/movies/${item.id}`} className="block">
                    <div className="flex items-center gap-3 rounded-2xl p-3 transition-transform hover:scale-[1.01]" style={{ background: theme.card, border: `1px solid ${theme.border}` }}>
                      <div className="relative h-14 w-20 overflow-hidden rounded-xl">
                        <Image src={contentImages.movies[item.imageIdx % contentImages.movies.length].url} alt={item.title} fill className="object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold" style={{ color: theme.text }}>{item.title}</p>
                        <p className="mt-1 text-[11px]" style={{ color: theme.muted }}>{item.genre}  * {item.rating}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-[26px] p-5" style={{ background: theme.card, border: `1px solid ${theme.border}` }}>
              <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: theme.soft }}>Playback notice</p>
              <p className="mt-3 text-sm leading-7" style={{ color: theme.body }}>Content is protected by Widevine, PlayReady, and FairPlay DRM. Download remains available only for premium subscribers during beta.</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
