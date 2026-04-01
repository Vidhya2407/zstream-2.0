import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { typeAccent } from '../../../lib/data/dashboardCatalog';
import EstimatedFootprintBadge from '../../../components/impact/EstimatedFootprintBadge';

interface DashboardWatchSectionsProps {
  continueWatching: {
    co2: string;
    id: string;
    imageUrl: string;
    progress: number;
    subtitle: string;
    title: string;
    type: keyof typeof typeAccent;
    estimateDuration?: string;
  }[];
  historyTab: 'continue' | 'history';
  isLight?: boolean;
  labels: { continueWatching?: string; saved?: string; watchHistory?: string; watched?: string } | undefined;
  setHistoryTab: (tab: 'continue' | 'history') => void;
  watchHistory: { co2: string; genre: string; id: string; imageUrl: string; title: string; watchedAt: string }[];
}

export default function DashboardWatchSections({
  continueWatching,
  historyTab,
  isLight = false,
  labels,
  setHistoryTab,
  watchHistory,
}: DashboardWatchSectionsProps) {
  const panelBg = isLight ? 'rgba(255,255,255,0.92)' : 'rgba(15,25,40,0.72)';
  const panelBorder = isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.06)';
  const muted = isLight ? '#64748b' : '#6b7280';
  const title = isLight ? '#0f172a' : '#ffffff';
  const continueEmpty = isLight ? 'rgba(15,23,42,0.04)' : 'rgba(255,255,255,0.03)';

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 16 }}
      style={{
        background: panelBg,
        border: `1px solid ${panelBorder}`,
        backdropFilter: 'blur(18px)',
        boxShadow: isLight ? '0 18px 48px rgba(15,23,42,0.08)' : '0 14px 32px rgba(0,0,0,0.25)',
        borderRadius: '1.5rem',
        padding: '1.5rem',
      }}
    >
      <div className="mb-5 flex w-fit items-center gap-1 rounded-xl p-1" style={{ background: isLight ? 'rgba(15,23,42,0.04)' : 'rgba(255,255,255,0.03)', border: `1px solid ${panelBorder}` }}>
        {[
          { id: 'continue' as const, label: labels?.continueWatching ?? 'Continue watching', count: continueWatching.length },
          { id: 'history' as const, label: labels?.watchHistory ?? 'Watch history', count: watchHistory.length },
        ].map((tab) => (
          <motion.button
            key={tab.id}
            className="relative flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold transition-colors"
            onClick={() => setHistoryTab(tab.id)}
            style={{ color: historyTab === tab.id ? (isLight ? '#0f172a' : 'white') : muted }}
          >
            {historyTab === tab.id ? (
              <motion.div
                className="absolute inset-0 rounded-lg"
                layoutId="dash-hist-pill"
                style={{ background: 'rgba(0,229,186,0.12)', border: '1px solid rgba(0,229,186,0.2)' }}
                transition={{ type: 'spring', damping: 28, stiffness: 350 }}
              />
            ) : null}
            <span className="relative z-10">{tab.label}</span>
            <span
              className="relative z-10 rounded-full px-1.5 py-0.5 text-[9px] font-black"
              style={{
                background:
                  historyTab === tab.id
                    ? 'rgba(0,229,186,0.2)'
                    : isLight
                      ? 'rgba(15,23,42,0.06)'
                      : 'rgba(255,255,255,0.06)',
                color: historyTab === tab.id ? 'rgb(0,229,186)' : muted,
              }}
            >
              {tab.count}
            </span>
          </motion.button>
        ))}
      </div>

      {historyTab === 'continue' ? (
        continueWatching.length > 0 ? (
          <div className="relative">
            <div className="absolute bottom-0 left-0 top-0 z-10 w-8 pointer-events-none" style={{ background: isLight ? 'linear-gradient(to right, rgba(255,255,255,0.95), transparent)' : 'linear-gradient(to right, rgba(15,25,40,0.9), transparent)' }} />
            <div className="absolute bottom-0 right-0 top-0 z-10 w-8 pointer-events-none" style={{ background: isLight ? 'linear-gradient(to left, rgba(255,255,255,0.95), transparent)' : 'linear-gradient(to left, rgba(15,25,40,0.9), transparent)' }} />
            <div className="flex gap-4 overflow-x-auto px-1 pb-2 scrollbar-none">
              {continueWatching.map((item, index) => {
                const accent = typeAccent[item.type];
                return (
                  <motion.div key={item.id} animate={{ opacity: 1, y: 0 }} className="flex-shrink-0" initial={{ opacity: 0, y: 12 }} style={{ width: '200px' }} transition={{ delay: index * 0.07 }}>
                    <Link href={`/watch/${item.id}`}>
                      <motion.div className="group cursor-pointer overflow-hidden rounded-xl" style={{ background: isLight ? 'rgba(255,255,255,0.94)' : 'rgba(255,255,255,0.03)', border: `1px solid ${panelBorder}` }} whileHover={{ y: -3, scale: 1.02 }}>
                        <div className="relative overflow-hidden" style={{ height: '112px' }}>
                          <Image alt={item.title} className="object-cover transition-transform duration-500 group-hover:scale-105" fill sizes="200px" src={item.imageUrl} />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          <div className="absolute left-2 top-2 rounded px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white" style={{ background: accent }}>
                            {item.type}
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: accent }}>
                              <svg className="ml-0.5 h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="px-3 pt-2">
                          <div className="h-0.5 overflow-hidden rounded-full" style={{ background: isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.08)' }}>
                            <div className="h-full rounded-full" style={{ width: `${item.progress}%`, background: 'linear-gradient(90deg, rgb(0,229,186), rgb(0,217,255))' }} />
                          </div>
                        </div>
                        <div className="p-3 pt-2">
                          <h4 className="mb-0.5 line-clamp-1 text-xs font-semibold leading-tight" style={{ color: title }}>
                            {item.title}
                          </h4>
                          <p className="mb-1.5 text-[10px]" style={{ color: muted }}>
                            {item.subtitle}
                          </p>
                          {item.estimateDuration && (
                            <div className="mb-2">
                              <EstimatedFootprintBadge durationLabel={item.estimateDuration} isLight={isLight} />
                            </div>
                          )}
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-bold" style={{ color: 'rgb(0,229,186)' }}>
                              {item.progress}% {labels?.watched ?? 'watched'}
                            </span>
                            <span className="text-[9px]" style={{ color: muted }}>
                              {item.co2} CO2
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border px-5 py-12 text-center" style={{ background: continueEmpty, borderColor: panelBorder }}>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: isLight ? 'rgba(15,23,42,0.06)' : 'rgba(255,255,255,0.05)', color: muted }}>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path d="M5 5.5A2.5 2.5 0 017.5 3h9A2.5 2.5 0 0119 5.5v13A2.5 2.5 0 0116.5 21h-9A2.5 2.5 0 015 18.5v-13z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10 9l5 3-5 3V9z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-sm font-semibold" style={{ color: title }}>
              {labels?.continueWatching ?? 'Continue watching'}
            </p>
            <p className="mt-2 text-xs" style={{ color: muted }}>
              Start a title and your in-progress shows will appear here for quick resume.
            </p>
          </div>
        )
      ) : null}

      {historyTab === 'history' ? (
        watchHistory.length > 0 ? (
          <div className="space-y-2">
            {watchHistory.map((item, index) => (
              <motion.div key={item.id + item.watchedAt} animate={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: -10 }} transition={{ delay: index * 0.05 }}>
                <Link href={`/watch/${item.id}`}>
                  <motion.div className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5" style={{ background: isLight ? 'rgba(255,255,255,0.94)' : 'rgba(255,255,255,0.02)', border: `1px solid ${isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.05)'}` }} whileHover={{ backgroundColor: isLight ? 'rgba(240,249,255,0.96)' : 'rgba(0,229,186,0.04)', borderColor: 'rgba(0,229,186,0.15)' }}>
                    <div className="relative h-8 w-12 flex-shrink-0 overflow-hidden rounded-lg">
                      <Image alt={item.title} className="object-cover" fill src={item.imageUrl} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-semibold" style={{ color: title }}>
                        {item.title}
                      </p>
                      <p className="text-[10px]" style={{ color: muted }}>
                        {item.genre}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-[10px]" style={{ color: muted }}>
                        {item.watchedAt}
                      </p>
                      <p className="text-[9px] font-bold" style={{ color: 'rgb(0,229,186)' }}>
                        {item.co2} {labels?.saved ?? 'saved'}
                      </p>
                    </div>
                    <svg className="h-3 w-3 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} style={{ color: muted }} viewBox="0 0 24 24">
                      <path d="M8.25 4.5l7.5 7.5-7.5 7.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border px-5 py-12 text-center" style={{ background: continueEmpty, borderColor: panelBorder }}>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: isLight ? 'rgba(15,23,42,0.06)' : 'rgba(255,255,255,0.05)', color: muted }}>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path d="M12 8v4l2.5 2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-sm font-semibold" style={{ color: title }}>
              {labels?.watchHistory ?? 'Watch history'}
            </p>
            <p className="mt-2 text-xs" style={{ color: muted }}>
              Your recently watched titles will appear here once playback activity starts.
            </p>
          </div>
        )
      ) : null}
    </motion.div>
  );
}


