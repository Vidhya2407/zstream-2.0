'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useHydrated } from '@/hooks/useHydrated';
import { getSportsWatchId, getWatchHref } from '@/lib/navigation/playbackRoutes';
import { useThemeStore } from '@/lib/stores/themeStore';
import { contentImages } from '../../../lib/images/unsplash';

type SportContent = {
  id: string;
  title: string;
  sport: string;
  type: 'highlight' | 'broadcast' | 'match';
  duration: string;
  date: string;
  teams?: string;
  venue?: string;
  rating: string;
  imageIdx: number;
  carbonScore: number;
  description: string;
  views: string;
  related: string[];
  tags: string[];
};

const SPORT_CONTENT: Record<string, SportContent> = {
  h1: { id: 'h1', title: 'FC EcoCity - Stunning Free Kick', sport: 'Football', type: 'highlight', duration: '0:48', date: 'Mar 18, 2026', teams: 'EcoCity vs Green United', venue: 'Solar Arena', rating: '9.1', imageIdx: 0, carbonScore: 0.02, description: 'A breathtaking 35-yard free kick from EcoCity\'s captain seals the match in the 89th minute. Watch the reaction of 60,000 fans as the ball curves perfectly into the top corner.', views: '2.1M', related: ['h2', 'b1'], tags: ['Football', 'Goals', 'Live'] },
  h2: { id: 'h2', title: 'Basketball Game Winner at Buzzer', sport: 'Basketball', type: 'highlight', duration: '1:12', date: 'Mar 17, 2026', teams: 'Solar Hawks vs Climate Bulls', venue: 'Green Dome', rating: '8.8', imageIdx: 1, carbonScore: 0.02, description: 'With 0.4 seconds remaining and the game tied, Solar Hawks\' shooting guard launches a half-court prayer that somehow finds nothing but net.', views: '890K', related: ['h1', 'b1'], tags: ['Basketball', 'Buzzer Beater', 'Highlights'] },
  b1: { id: 'b1', title: 'Green United Cup Final - Full Match', sport: 'Football', type: 'broadcast', duration: '1h 47m', date: 'Mar 15, 2026', teams: 'FC EcoCity vs Green United', venue: 'Carbon-Neutral Park', rating: '9.4', imageIdx: 1, carbonScore: 0.06, description: 'The full match broadcast of the season\'s most anticipated cup final. Commentary in EN/DE. Widevine DRM protected.', views: '1.8M', related: ['h1', 'h2'], tags: ['Football', 'Cup Final', 'Full Match', 'Broadcast'] },
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

export default function SportDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : (params.id ?? 'h1');
  const content = SPORT_CONTENT[id] ?? SPORT_CONTENT.h1;
  const playHref = getWatchHref(getSportsWatchId(content.id));
  const related = content.related.map((rid) => SPORT_CONTENT[rid]).filter(Boolean);
  const theme = usePageTheme();

  return (
    <main className="relative min-h-screen overflow-x-hidden" style={{ background: theme.bg }}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Image src={contentImages.sports[content.imageIdx % contentImages.sports.length].url} alt="" fill className="object-cover opacity-[0.05]" />
        <div className="absolute inset-0" style={{ background: theme.overlay }} />
        <motion.div className="absolute right-[-8%] top-[-20%] h-[640px] w-[640px] rounded-full blur-[70px]" style={{ background: theme.isLight ? 'radial-gradient(circle, rgba(251,191,36,0.11) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 70%)' }} animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 12, repeat: Infinity }} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="mb-6 flex items-center gap-2 text-xs" style={{ color: theme.muted }}>
          <Link href="/sports" className="transition-colors hover:text-amber-400">Sports</Link>
          <span>/</span>
          <span style={{ color: theme.body }}>{content.title}</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <section className="space-y-6">
            <div className="relative overflow-hidden rounded-[28px]" style={{ background: '#000', aspectRatio: '16/9' }}>
              <Image src={contentImages.sports[content.imageIdx % contentImages.sports.length].url} alt={content.title} fill className="object-cover opacity-55" />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Link href={playHref} aria-label="Play sports content">
                  <button className="flex h-20 w-20 items-center justify-center rounded-full" style={{ background: 'rgba(251,191,36,0.9)', boxShadow: '0 0 40px rgba(251,191,36,0.45)' }}>
                    <svg className="ml-1 h-9 w-9 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </button>
                </Link>
                <p className="mt-4 text-sm font-semibold text-white">{content.type === 'broadcast' ? 'Live-ready licensed stream' : 'Instant highlight playback'}</p>
                <p className="mt-1 text-xs text-gray-300">{content.type === 'broadcast' ? 'Widevine DRM enabled' : 'Fast replay mode'}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-wrap gap-2">
                    <span className="rounded-full px-3 py-1 text-[11px] font-bold uppercase" style={{ background: 'rgba(251,191,36,0.12)', color: 'rgb(217,119,6)', border: '1px solid rgba(251,191,36,0.24)' }}>{content.sport}</span>
                    <span className="rounded-full px-3 py-1 text-[11px] font-bold uppercase" style={{ background: content.type === 'broadcast' ? 'rgba(239,68,68,0.12)' : theme.card, color: content.type === 'broadcast' ? 'rgb(239,68,68)' : theme.body, border: `1px solid ${content.type === 'broadcast' ? 'rgba(239,68,68,0.24)' : theme.border}` }}>{content.type}</span>
                  </div>
                  <h1 className="text-3xl font-black leading-tight md:text-4xl" style={{ color: theme.text }}>{content.title}</h1>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs" style={{ color: theme.muted }}>
                    {content.teams ? <span>{content.teams}</span> : null}
                    {content.teams ? <span>·</span> : null}
                    {content.venue ? <span>{content.venue}</span> : null}
                    {content.venue ? <span>·</span> : null}
                    <span>{content.date}</span>
                    <span>·</span>
                    <span>{content.duration}</span>
                    <span>·</span>
                    <span>{content.views} views</span>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-sm font-black text-yellow-500">* {content.rating}</span>
                    <span className="text-sm text-yellow-500">*****</span>
                    <span className="text-[10px]" style={{ color: theme.soft }}>Community rated</span>
                  </div>
                </div>
                <div className="rounded-2xl px-3 py-2" style={{ background: 'rgba(0,229,186,0.08)', border: '1px solid rgba(0,229,186,0.18)' }}>
                  <p className="text-[10px] font-semibold text-gray-500">Broadcast impact</p>
                  <p className="text-sm font-black" style={{ color: 'rgb(0,229,186)' }}>{(content.carbonScore * 1000).toFixed(0)}mg CO2 / stream</p>
                </div>
                <Link href={playHref} className="rounded-2xl px-4 py-2 text-xs font-bold" style={{ background: theme.card, color: theme.body, border: `1px solid ${theme.border}` }}>Play now</Link>
              </div>

              <div className="flex flex-wrap gap-2">
                {content.tags.map((tag) => (
                  <span key={tag} className="rounded-full px-3 py-1 text-[11px] font-semibold" style={{ background: theme.card, color: theme.muted, border: `1px solid ${theme.border}` }}>{tag}</span>
                ))}
              </div>

              <div className="grid gap-4 md:grid-cols-[1.5fr_1fr]">
                <div className="rounded-[26px] p-6" style={{ background: theme.card, border: `1px solid ${theme.border}`, boxShadow: theme.isLight ? '0 20px 60px rgba(15,23,42,0.08)' : 'none' }}>
                  <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: theme.soft }}>Overview</p>
                  <p className="mt-4 text-sm leading-7" style={{ color: theme.body }}>{content.description}</p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl p-4" style={{ background: theme.raised, border: `1px solid ${theme.border}` }}>
                      <p className="text-[11px] uppercase tracking-[0.18em]" style={{ color: theme.soft }}>Venue</p>
                      <p className="mt-2 text-sm font-semibold" style={{ color: theme.text }}>{content.venue ?? 'Global feed'}</p>
                    </div>
                    <div className="rounded-2xl p-4" style={{ background: theme.raised, border: `1px solid ${theme.border}` }}>
                      <p className="text-[11px] uppercase tracking-[0.18em]" style={{ color: theme.soft }}>Format</p>
                      <p className="mt-2 text-sm font-semibold capitalize" style={{ color: theme.text }}>{content.type}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-[26px] p-6" style={{ background: theme.raised, border: `1px solid ${theme.border}`, boxShadow: theme.isLight ? '0 20px 60px rgba(15,23,42,0.08)' : 'none' }}>
                    <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: theme.soft }}>At a glance</p>
                    <div className="mt-4 space-y-3 text-sm">
                      {[
                        ['Sport', content.sport],
                        ['Date', content.date],
                        ['Duration', content.duration],
                        ['Views', content.views],
                      ].map(([label, value]) => (
                        <div key={label} className="flex items-center justify-between gap-3">
                          <span style={{ color: theme.soft }}>{label}</span>
                          <span className="font-semibold" style={{ color: theme.text }}>{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-[26px] p-6" style={{ background: 'rgba(0,229,186,0.05)', border: '1px solid rgba(0,229,186,0.15)' }}>
                    <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: theme.soft }}>Carbon impact</p>
                    <p className="mt-3 text-sm font-semibold" style={{ color: theme.text }}>This stream runs on the lower-emission video delivery profile for sports playback.</p>
                    <p className="mt-4 text-sm font-black" style={{ color: 'rgb(0,229,186)' }}>{content.type === 'broadcast' ? '86% below typical live broadcast' : 'Low-impact instant replay profile'}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <aside className="space-y-4">
            <div className="rounded-[26px] p-5" style={{ background: theme.raised, border: `1px solid ${theme.border}`, boxShadow: theme.isLight ? '0 20px 60px rgba(15,23,42,0.08)' : 'none' }}>
              <h2 className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: theme.soft }}>Related Content</h2>
              <div className="mt-4 space-y-3">
                {related.map((item) => (
                  <Link key={item.id} href={`/sports/${item.id}`} className="block">
                    <div className="flex items-center gap-3 rounded-2xl p-3 transition-transform hover:scale-[1.01]" style={{ background: theme.card, border: `1px solid ${theme.border}` }}>
                      <div className="relative h-14 w-20 overflow-hidden rounded-xl">
                        <Image src={contentImages.sports[item.imageIdx % contentImages.sports.length].url} alt={item.title} fill className="object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-sm font-semibold" style={{ color: theme.text }}>{item.title}</p>
                        <p className="mt-1 text-[11px]" style={{ color: theme.muted }}>{item.sport} · {item.type}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-[26px] p-5" style={{ background: theme.card, border: `1px solid ${theme.border}` }}>
              <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: theme.soft }}>Playback note</p>
              <p className="mt-3 text-sm leading-7" style={{ color: theme.body }}>Live broadcasts remain licensed and DRM-protected during beta. Highlights use the lighter replay profile so these pages still feel fast in both light and dark mode.</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
