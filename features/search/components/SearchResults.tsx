import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import ReportButton from '../../../components/content/ReportButton';
import type { SearchResultItem } from '../../../lib/data/searchCatalog';
import { getSearchResultHref } from '@/lib/navigation/playbackRoutes';

interface SearchResultsProps {
  filtered: readonly SearchResultItem[];
  isLight: boolean;
  isLoading: boolean;
  language: string;
  loadError: string | null;
  query: string;
  searchLabel: (key: string) => string;
  searchOption: (value: string) => string;
}

export default function SearchResults({
  filtered,
  isLight,
  isLoading,
  language,
  loadError,
  query,
  searchLabel,
  searchOption,
}: SearchResultsProps) {
  const panelBg = isLight ? 'rgba(255,255,255,0.82)' : 'rgba(255,255,255,0.04)';
  const panelBorder = isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.07)';
  const muted = isLight ? '#64748b' : '#9ca3af';
  const subtle = isLight ? '#94a3b8' : '#6b7280';
  const title = isLight ? '#0f172a' : '#ffffff';
  const resultSummary = isLoading
    ? language === 'de'
      ? 'Lade Suchergebnisse...'
      : 'Loading search results...'
    : `${filtered.length} ${filtered.length !== 1 ? searchLabel('results') : searchLabel('result')}${query ? ` ${language === 'de' ? 'fuer' : 'for'} "${query}"` : ''}`;

  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm" style={{ color: muted }}>
          {resultSummary}
        </p>
        {loadError ? (
          <p className="rounded-full px-3 py-1 text-[11px] font-semibold" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.18)', color: '#ef4444' }}>
            {loadError}
          </p>
        ) : null}
      </div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div key="loading" animate={{ opacity: 1 }} className="grid grid-cols-1 gap-4 sm:grid-cols-2" exit={{ opacity: 0 }} initial={{ opacity: 0 }}>
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="overflow-hidden rounded-2xl" style={{ background: panelBg, border: `1px solid ${panelBorder}`, boxShadow: isLight ? '0 12px 30px rgba(15,23,42,0.05)' : 'none' }}>
                <div className="aspect-video animate-pulse" style={{ background: isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.08)' }} />
                <div className="space-y-2 p-3.5">
                  <div className="h-4 animate-pulse rounded" style={{ background: isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.08)' }} />
                  <div className="h-3 w-2/3 animate-pulse rounded" style={{ background: isLight ? 'rgba(15,23,42,0.06)' : 'rgba(255,255,255,0.06)' }} />
                </div>
              </div>
            ))}
          </motion.div>
        ) : filtered.length === 0 ? (
          <motion.div key="empty" animate={{ opacity: 1 }} className="rounded-[1.75rem] border px-6 py-16 text-center" exit={{ opacity: 0 }} initial={{ opacity: 0 }} style={{ background: panelBg, borderColor: panelBorder, boxShadow: isLight ? '0 18px 48px rgba(15,23,42,0.06)' : 'none' }}>
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: isLight ? 'rgba(15,23,42,0.05)' : 'rgba(255,255,255,0.05)', color: subtle }}>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path d="M21 21l-4.35-4.35" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="11" cy="11" r="6.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-base font-semibold" style={{ color: title }}>
              {searchLabel('noResults')}
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm" style={{ color: muted }}>
              {searchLabel('tryAdjusting')}
            </p>
          </motion.div>
        ) : (
          <motion.div key="results" animate={{ opacity: 1 }} className="grid grid-cols-1 gap-4 sm:grid-cols-2" exit={{ opacity: 0 }} initial={{ opacity: 0 }}>
            {filtered.map((result, index) => {
              const href = getSearchResultHref(result);

              return (
                <motion.div key={result.id} animate={{ opacity: 1, y: 0 }} className="group overflow-hidden rounded-2xl" initial={{ opacity: 0, y: 12 }} style={{ background: panelBg, border: `1px solid ${panelBorder}`, boxShadow: isLight ? '0 12px 30px rgba(15,23,42,0.05)' : 'none' }} transition={{ delay: index * 0.04 }} whileHover={{ y: -2 }}>
                  <Link className="block" href={href}>
                    <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900">
                      <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ background: isLight ? 'rgba(255,255,255,0.92)' : 'rgba(0,0,0,0.7)', color: 'rgb(0,229,186)', border: `1px solid ${isLight ? 'rgba(15,23,42,0.08)' : 'rgba(0,229,186,0.3)'}` }}>
                        {result.carbon}
                      </div>
                      <div className="absolute bottom-2 left-2 rounded-md px-2 py-0.5 text-[10px] font-semibold" style={{ background: isLight ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.65)', color: isLight ? '#475569' : 'rgba(255,255,255,0.8)' }}>
                        {searchOption(result.type)}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: 'rgba(0,229,186,0.9)' }}>
                          <svg className="ml-0.5 h-4 w-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="p-3.5">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-sm font-bold leading-snug" style={{ color: title }}>
                            {result.title}
                          </h3>
                          <p className="mt-0.5 text-[11px]" style={{ color: subtle }}>
                            {result.genre} | {searchOption(result.lang)} | {result.year}
                          </p>
                        </div>
                        <div className="flex flex-shrink-0 items-center gap-1 rounded-full px-2 py-1" style={{ background: isLight ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.08)' }}>
                          <svg className="h-3 w-3 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                          <span className="text-xs font-semibold" style={{ color: title }}>
                            {result.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className="flex items-center justify-between gap-3 px-3.5 pb-3.5">
                    <Link className="rounded-xl px-3 py-1.5 text-[11px] font-bold" href={href} style={{ background: 'rgba(0,229,186,0.12)', color: 'rgb(0,229,186)', border: '1px solid rgba(0,229,186,0.25)' }}>
                      {language === 'de' ? 'Abspielen' : 'Play now'}
                    </Link>
                    <ReportButton contentId={result.id} contentTitle={result.title} />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
