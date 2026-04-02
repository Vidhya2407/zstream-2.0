'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import ShakaPlayer from '../../../components/players/ShakaPlayer';
import CarbonPlaybackTracker from '../../../components/watch/CarbonPlaybackTracker';
import ImpactForecastCard from '../../../components/watch/ImpactForecastCard';
import RelatedContentSidebar from '../../../components/watch/RelatedContentSidebar';
import CommentsTab from '../../../components/watch/CommentsTab';
import DownloadPanel from '../../../components/watch/DownloadPanel';
import ZstreamShieldPanel from '../../../components/shield/ZstreamShieldPanel';
import PlaybackProtectionCard from '../../../components/shield/PlaybackProtectionCard';
import { useApiResource } from '../../../hooks/useApiResource';
import type { WatchApiResponse } from '../../../lib/api/contracts';
import { fetchWatchBrowser } from '../../../lib/api/browserClient';
import { useLanguageStore } from '../../../lib/stores/languageStore';
import { useThemeStore } from '../../../lib/stores/themeStore';

type TabId = 'overview' | 'cast' | 'comments' | 'downloads';

const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  {
    id: 'overview',
    label: 'Overview',
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
      </svg>
    ),
  },
  {
    id: 'cast',
    label: 'Cast & Crew',
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    id: 'comments',
    label: 'Community',
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
  },
  {
    id: 'downloads',
    label: 'Downloads',
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
    ),
  },
];

function getCarbonGrade(score: number) {
  if (score < 0.1) return { grade: 'A+', color: 'rgb(0,229,186)', bg: 'rgba(0,229,186,0.12)' };
  if (score < 0.3) return { grade: 'A', color: 'rgb(0,217,255)', bg: 'rgba(0,217,255,0.12)' };
  if (score < 0.5) return { grade: 'B', color: 'rgb(96,165,250)', bg: 'rgba(96,165,250,0.12)' };
  return { grade: 'C', color: 'rgb(251,191,36)', bg: 'rgba(251,191,36,0.12)' };
}

const typeAccent: Record<string, string> = {
  video: 'rgba(0,128,255,0.85)',
  music: 'rgba(147,51,234,0.85)',
  live: 'rgba(239,68,68,0.85)',
  gaming: 'rgba(0,200,80,0.85)',
  minis: 'rgba(251,146,60,0.85)',
  shorts: 'rgba(251,146,60,0.85)',
};

function buildOverlayBadge(accent: string, isLight: boolean) {
  return {
    background: isLight ? 'rgba(255,255,255,0.84)' : 'rgba(8,12,22,0.78)',
    border: `1px solid ${isLight ? accent.replace('0.85', '0.32') : accent.replace('0.85', '0.52')}`,
    color: isLight ? '#0f172a' : '#f8fafc',
    boxShadow: isLight ? '0 10px 24px rgba(15, 23, 42, 0.12)' : '0 14px 28px rgba(0, 0, 0, 0.28)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
  } as const;
}

export default function WatchPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : (params.id ?? '1');
  const { theme } = useThemeStore();
  const { language } = useLanguageStore();
  const isLight = theme === 'light';
  const isGerman = language === 'de';

  const loadWatch = React.useCallback((signal: AbortSignal) => fetchWatchBrowser(id, signal), [id]);
  const { data: watchResponse, isLoading, loadError } = useApiResource<WatchApiResponse>({ load: loadWatch });
  const content = watchResponse?.data?.content ?? null;
  const related = watchResponse?.data?.related ?? [];

  const [activeTab, setActiveTab] = React.useState<TabId>('overview');
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [currentResolution, setCurrentResolution] = React.useState(720);
  const [isWatchlisted, setIsWatchlisted] = React.useState(false);

  const pageBg = isLight ? '#f4f7fb' : '#0A0F18';
  const panelBg = isLight ? 'rgba(255,255,255,0.84)' : 'rgba(255,255,255,0.02)';
  const panelBorder = isLight ? '1px solid rgba(15,23,42,0.08)' : '1px solid rgba(255,255,255,0.06)';
  const title = isLight ? '#0f172a' : '#ffffff';
  const body = isLight ? '#334155' : '#d1d5db';
  const muted = isLight ? '#64748b' : '#9ca3af';
  const faint = isLight ? '#94a3b8' : '#6b7280';
  const crumb = isLight ? '#475569' : '#9ca3af';
  const crumbDivider = isLight ? '#cbd5e1' : '#374151';
  const surface = isLight ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.04)';
  const supportsQualitySelection = content ? ['video', 'live', 'gaming'].includes(content.type) : false;

  if (isLoading && !content) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ background: pageBg }}>
        <div className="text-center">
          <p className="text-sm" style={{ color: muted }}>{isGerman ? 'Inhalt wird geladen...' : 'Loading content...'}</p>
        </div>
      </main>
    );
  }

  if (!content) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ background: pageBg }}>
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold mb-2" style={{ color: title }}>{isGerman ? 'Inhalt nicht gefunden' : 'Content Not Found'}</h1>
          <p className="text-sm mb-2" style={{ color: muted }}>{isGerman ? 'Dieser Inhalt wurde moeglicherweise entfernt oder ist nicht verfuegbar.' : 'This content may have been removed or is unavailable.'}</p>
          {loadError && <p className="text-red-400 text-xs mb-4">{loadError}</p>}
          <Link href="/">
            <motion.button className="px-6 py-2.5 rounded-full text-sm font-semibold" style={{ background: 'rgba(0,229,186,0.9)', color: '#0A0F18' }} whileHover={{ scale: 1.04 }}>
              {isGerman ? 'Zur Startseite' : 'Back to Home'}
            </motion.button>
          </Link>
        </div>
      </main>
    );
  }

  const grade = getCarbonGrade(content.carbonScore);
  const accent = typeAccent[content.type] ?? typeAccent.video;
  const badgeSurface = buildOverlayBadge(accent, isLight);

  return (
    <main className="min-h-screen" style={{ background: pageBg }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ height: '500px' }}>
        <Image src={content.backdropUrl} alt="" fill className="object-cover opacity-[0.08]" priority />
        <div className="absolute inset-0" style={{ background: isLight ? 'linear-gradient(to bottom, rgba(244,247,251,0.7) 0%, rgba(244,247,251,1) 100%)' : 'linear-gradient(to bottom, rgba(10,15,24,0.5) 0%, rgba(10,15,24,1) 100%)' }} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16">
        <motion.div className="flex items-center gap-2 mb-5 text-xs" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
          <Link href="/" className="transition-colors" style={{ color: crumb }}>{isGerman ? 'Startseite' : 'Home'}</Link>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} style={{ color: crumbDivider }} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          <span style={{ color: crumb }}>{content.genre}</span>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} style={{ color: crumbDivider }} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          <span className="line-clamp-1" style={{ color: title }}>{content.title}</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_400px] gap-6 lg:gap-8">
          <div className="min-w-0">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <ShakaPlayer
                src={content.src}
                drm={content.drmLicenseUrls}
                isPremium={content.isPremium}
                showQualitySelector={supportsQualitySelection}
                onQualityChange={({ resolution }) => setCurrentResolution(resolution)}
                onTimeUpdate={(t) => setCurrentTime(t)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
              />
            </motion.div>

            <motion.div className="mt-5" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <CarbonPlaybackTracker isPlaying={isPlaying} currentTime={currentTime} resolution={currentResolution} />
            </motion.div>

            <div className="mt-5">
              <ImpactForecastCard
                durationMinutes={content.durationMinutes}
                resolution={currentResolution}
                title={content.title}
              />
            </div>

            <div className="mt-5">
              <PlaybackProtectionCard
                compact
                isGerman={isGerman}
                isLight={isLight}
                sessionExpiresIn={isGerman ? 'In 14 Min' : 'In 14 min'}
                sessionId={`ZS-${String(id).padStart(2, '0')}${currentResolution}P-AX4`}
              />
            </div>

            <div className="mt-5">
              <ZstreamShieldPanel
                light={isLight}
                mode="summary"
                compact
                title={isGerman ? 'ZSTREAM Shield Schutzstatus' : 'ZSTREAM Shield Protection Status'}
                subtitle={isGerman
                  ? 'High-level Schutzsignale fuer dieses Playback.'
                  : 'High-level protection signals for this playback.'}
                metrics={[
                  { label: isGerman ? 'Status' : 'Status', value: isGerman ? 'Shield aktiv' : 'Shield active' },
                  { label: isGerman ? 'Proof' : 'Proof', value: isGerman ? 'Blockchain bereit' : 'Blockchain ready' },
                ]}
              />
            </div>

            <motion.div className="mt-5" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <div className="flex items-start gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-2 flex-wrap">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full" style={badgeSurface}>
                      {content.genre}
                    </span>
                    {content.type === 'live' && (
                      <motion.span className="flex items-center gap-1.5 text-[10px] font-bold uppercase px-3 py-1.5 rounded-full text-white" style={{ background: 'rgba(220,38,38,0.92)', border: '1px solid rgba(254, 202, 202, 0.28)', boxShadow: '0 12px 24px rgba(127, 29, 29, 0.28)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }} animate={{ opacity: [1, 0.7, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />{isGerman ? 'Jetzt live' : 'Live Now'}
                      </motion.span>
                    )}
                    <span className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: grade.bg, color: grade.color, border: `1px solid ${grade.color}35` }}>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20v-8m0 0c-2-2-4-4-4-6a4 4 0 018 0c0 2-2 4-4 6z" /></svg>
                      {content.carbonScore.toFixed(2)}g CO2 | {grade.grade}
                    </span>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: isLight ? 'rgba(15,23,42,0.04)' : 'rgba(255,255,255,0.05)', border: isLight ? '1px solid rgba(15,23,42,0.08)' : '1px solid rgba(255,255,255,0.1)', color: isLight ? '#0f766e' : 'rgb(0,229,186)' }}>
                      {isGerman ? 'Shield aktiv' : 'Shield active'}
                    </span>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded border" style={{ borderColor: isLight ? 'rgba(15,23,42,0.12)' : 'rgba(255,255,255,0.12)', color: muted }}>{content.ageRating}</span>
                    {supportsQualitySelection && (
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded border" style={{ borderColor: 'rgba(0,229,186,0.22)', color: 'rgb(0,229,186)', background: 'rgba(0,229,186,0.08)' }}>
                        {isGerman ? `Aktuell ${currentResolution}p` : `Playing at ${currentResolution}p`}
                      </span>
                    )}
                  </div>

                  <h1 className="text-2xl lg:text-3xl font-black tracking-tight leading-tight mb-2" style={{ color: title }}>{content.title}</h1>

                  <div className="flex items-center gap-3 text-xs flex-wrap mb-3" style={{ color: muted }}>
                    <span>{content.year}</span><span style={{ color: crumbDivider }}>|</span><span>{content.duration}</span><span style={{ color: crumbDivider }}>|</span><span>{content.studio}</span>
                    {content.rating && <><span style={{ color: crumbDivider }}>|</span><span className="flex items-center gap-1"><svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg><span className="text-amber-400 font-bold">{content.rating}</span><span style={{ color: faint }}>/10</span></span></>}
                  </div>

                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <motion.button onClick={() => setIsWatchlisted((v) => !v)} className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold transition-all" style={{ background: isWatchlisted ? 'rgba(0,229,186,0.15)' : surface, border: `1px solid ${isWatchlisted ? 'rgba(0,229,186,0.4)' : isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.1)'}`, color: isWatchlisted ? 'rgb(0,229,186)' : muted }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.95 }}>
                    <svg className="w-3.5 h-3.5" fill={isWatchlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" /></svg>
                    {isWatchlisted ? (isGerman ? 'Gemerkt' : 'Watchlisted') : (isGerman ? 'Zur Liste' : 'Add to List')}
                  </motion.button>

                  <motion.button className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold" style={{ background: surface, border: panelBorder, color: muted }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.95 }}>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" /></svg>
                    {isGerman ? 'Teilen' : 'Share'}
                  </motion.button>
                </div>
              </div>
            </motion.div>

            <motion.div className="mt-5" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <AnimatePresence mode="wait">
                <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>
                  {activeTab === 'overview' && <div><div className="rounded-2xl p-6 mb-5" style={{ background: panelBg, border: panelBorder }}><h3 className="text-sm font-bold mb-3" style={{ color: title }}>{isGerman ? 'Info' : 'About'}</h3><p className="text-sm leading-relaxed" style={{ color: body }}>{content.longDescription}</p>{content.tags.length > 0 && <div className="mt-4 flex flex-wrap gap-2">{content.tags.map((tag) => <span key={tag} className="rounded-full px-3 py-1 text-[11px] font-medium" style={{ background: isLight ? 'rgba(15,23,42,0.04)' : 'rgba(255,255,255,0.04)', border: isLight ? '1px solid rgba(15,23,42,0.08)' : '1px solid rgba(255,255,255,0.08)', color: muted }}>#{tag.replace(/^#/, '')}</span>)}</div>}</div><div className="grid sm:grid-cols-2 gap-3">{[{ label: isGerman ? 'Regie / Creator' : 'Director / Creator', value: content.director }, { label: 'Studio', value: content.studio }, { label: isGerman ? 'Jahr' : 'Year', value: String(content.year) }, { label: isGerman ? 'Laufzeit' : 'Runtime', value: content.duration }, { label: 'Genre', value: content.genre }, { label: isGerman ? 'Altersfreigabe' : 'Age Rating', value: content.ageRating }].map((item) => <div key={item.label} className="rounded-xl px-4 py-3 flex items-center justify-between" style={{ background: panelBg, border: panelBorder }}><span className="text-[11px] uppercase tracking-wider" style={{ color: faint }}>{item.label}</span><span className="text-xs font-semibold" style={{ color: title }}>{item.value}</span></div>)}</div></div>}
                  {activeTab === 'cast' && <div><div className="grid sm:grid-cols-2 gap-3">{content.cast.map((member, i) => <motion.div key={member.name} className="flex items-center gap-3 rounded-xl p-3" style={{ background: panelBg, border: panelBorder }} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} whileHover={{ backgroundColor: isLight ? 'rgba(255,255,255,0.94)' : 'rgba(255,255,255,0.04)' }}><div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0"><Image src={member.avatarUrl} alt={member.name} fill className="object-cover" /></div><div><p className="text-xs font-semibold leading-tight" style={{ color: title }}>{member.name}</p><p className="text-[10px] mt-0.5" style={{ color: muted }}>{member.role}</p></div></motion.div>)}</div><div className="mt-4 rounded-2xl p-5" style={{ background: panelBg, border: panelBorder }}><h4 className="text-xs font-bold mb-3 uppercase tracking-wider" style={{ color: title }}>{isGerman ? 'Produktion' : 'Production'}</h4><div className="space-y-2">{[{ role: isGerman ? 'Regie / Executive Producer' : 'Director / Executive Producer', name: content.director }, { role: 'Studio', name: content.studio }].map((item) => <div key={item.role} className="flex items-center justify-between"><span className="text-[11px]" style={{ color: muted }}>{item.role}</span><span className="text-xs font-medium" style={{ color: title }}>{item.name}</span></div>)}</div></div></div>}
                  {activeTab === 'comments' && <CommentsTab />}
                  {activeTab === 'downloads' && <div className="rounded-2xl p-6" style={{ background: panelBg, border: panelBorder }}><DownloadPanel isPremium={content.isPremium} contentTitle={content.title} /></div>}
                </motion.div>
              </AnimatePresence>

              <div className="mt-5 flex items-center gap-1 rounded-xl p-1" style={{ background: surface, border: panelBorder }}>
                {TABS.map((tab) => (
                  <motion.button key={tab.id} onClick={() => setActiveTab(tab.id)} className="flex items-center gap-1.5 flex-1 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all relative justify-center" style={{ color: activeTab === tab.id ? (isLight ? '#0f172a' : 'white') : muted }} whileTap={{ scale: 0.97 }}>
                    {activeTab === tab.id && <motion.div layoutId="watch-tab-pill" className="absolute inset-0 rounded-lg" style={{ background: isLight ? 'rgba(0,229,186,0.12)' : 'rgba(0,229,186,0.12)', border: '1px solid rgba(0,229,186,0.2)' }} transition={{ type: 'spring', damping: 28, stiffness: 350 }} />}
                    <span className="relative z-10 flex items-center gap-1.5">{tab.icon}<span className="hidden sm:inline">{tab.id === 'overview' ? (isGerman ? 'Uebersicht' : 'Overview') : tab.id === 'cast' ? (isGerman ? 'Cast & Team' : 'Cast & Crew') : tab.id === 'comments' ? 'Community' : 'Downloads'}</span></span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div className="hidden lg:block" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <div className="sticky top-20 space-y-5">
              <RelatedContentSidebar items={related} currentId={id} />
              <div className="rounded-2xl p-5" style={{ background: panelBg, border: panelBorder }}>
                <h4 className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: title }}>{isGerman ? 'Kurzinfo' : 'Quick Info'}</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between"><span className="text-[11px]" style={{ color: muted }}>{isGerman ? 'Carbon Score' : 'Carbon Score'}</span><span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: grade.bg, color: grade.color }}>{content.carbonScore.toFixed(2)}g CO2 | {grade.grade}</span></div>
                  <div className="flex items-center justify-between"><span className="text-[11px]" style={{ color: muted }}>{isGerman ? 'Schutzstatus' : 'Protection'}</span><span className="text-[11px] font-bold" style={{ color: 'rgb(0,229,186)' }}>{isGerman ? 'Shield aktiv' : 'Shield active'}</span></div>
                  <div className="flex items-center justify-between"><span className="text-[11px]" style={{ color: muted }}>DRM</span><span className="text-xs font-medium" style={{ color: title }}>Widevine | PlayReady | FairPlay</span></div>
                  <div className="flex items-center justify-between"><span className="text-[11px]" style={{ color: muted }}>Codec</span><span className="text-xs font-medium" style={{ color: title }}>H.265 / H.264</span></div>
                  <div className="flex items-center justify-between"><span className="text-[11px]" style={{ color: muted }}>{isGerman ? 'Proof' : 'Proof'}</span><span className="text-[11px] font-bold" style={{ color: title }}>{isGerman ? 'Blockchain bereit' : 'Blockchain ready'}</span></div>
                  <div className="flex items-center justify-between"><span className="text-[11px]" style={{ color: muted }}>{isGerman ? 'Aktuelle Qualitaet' : 'Current Quality'}</span><span className="text-xs font-medium" style={{ color: title }}>{supportsQualitySelection ? `${currentResolution}p ${isGerman ? 'waehlbar' : 'selectable'}` : (isGerman ? 'Adaptiv' : 'Adaptive')}</span></div>
                  <div className="flex items-center justify-between"><span className="text-[11px]" style={{ color: muted }}>Offline</span><span className="text-[11px] font-bold" style={{ color: 'rgb(0,229,186)' }}>{isGerman ? 'Verfuegbar' : 'Available'}</span></div>
                  <div className="flex items-center justify-between"><span className="text-[11px]" style={{ color: muted }}>{isGerman ? 'Energiequelle' : 'Energy Source'}</span><span className="text-[11px] font-bold" style={{ color: 'rgb(0,229,186)' }}>{isGerman ? '100% Erneuerbar' : '100% Renewable'}</span></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
