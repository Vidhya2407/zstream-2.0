'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

interface ZtubeHeaderProps {
  isLight: boolean;
  searchQuery: string;
  searchRef: React.RefObject<HTMLDivElement | null>;
  setSearchQuery: (value: string) => void;
  setShowSuggestions: (value: boolean) => void;
  showSuggestions: boolean;
  suggestions: string[];
  tr: (value: string) => string;
}

export default function ZtubeHeader({ isLight, searchQuery, searchRef, setSearchQuery, setShowSuggestions, showSuggestions, suggestions, tr }: ZtubeHeaderProps) {
  return (
    <motion.div animate={{ opacity: 1, y: 0 }} className="flex items-center gap-5 mb-7 flex-wrap" initial={{ opacity: 0, y: -20 }}>
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, rgba(239,68,68,0.4), rgba(251,146,60,0.3))', border: '1px solid rgba(239,68,68,0.3)', boxShadow: '0 0 28px rgba(239,68,68,0.15)' }}>
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
      </div>
      <div className="flex-1 min-w-0">
        <h1 className="text-4xl font-black tracking-tight" style={{ color: isLight ? '#0f172a' : '#ffffff' }}>{tr('ZTube')}</h1>
        <p className="mt-0.5 text-sm" style={{ color: isLight ? '#64748b' : '#9ca3af' }}>{tr('Creator videos · Music · Podcasts · Zero-carbon streaming')}</p>
      </div>

      <div ref={searchRef} className="relative flex-1 md:flex-initial md:min-w-[320px] max-w-md">
        <div className="flex items-center rounded-full" style={{ background: isLight ? 'rgba(255,255,255,0.82)' : 'rgba(255,255,255,0.05)', border: isLight ? '1px solid rgba(15,23,42,0.08)' : '1px solid rgba(255,255,255,0.1)' }}>
          <input
            aria-autocomplete="list"
            aria-label={tr('Search ZTube')}
            className="flex-1 bg-transparent px-4 py-2.5 text-sm outline-none"
            onChange={(event) => { setSearchQuery(event.target.value); setShowSuggestions(true); }}
            onFocus={() => setShowSuggestions(true)}
            placeholder={tr('Search ZTube...')}
            style={{ color: isLight ? '#0f172a' : '#ffffff' }}
            value={searchQuery}
          />
          {searchQuery ? (
            <button aria-label={tr('Clear search')} className="pr-3 text-gray-500 hover:text-white transition-colors" onClick={() => { setSearchQuery(''); setShowSuggestions(false); }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          ) : (
            <span className="pr-3 text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
          )}
        </div>

        <AnimatePresence>
          {showSuggestions && suggestions.length > 0 && (
            <motion.div animate={{ opacity: 1, y: 0 }} className="absolute top-full left-0 right-0 mt-2 rounded-2xl overflow-hidden z-50" exit={{ opacity: 0, y: -6 }} initial={{ opacity: 0, y: -6 }} style={{ background: 'rgba(10,18,30,0.98)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)' }}>
              {suggestions.map((suggestion) => (
                <button key={suggestion} className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-white/5 transition-colors" onClick={() => { setSearchQuery(suggestion); setShowSuggestions(false); }}>
                  <svg className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <span className="text-white text-xs">{suggestion}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Link href="/ztube/studio">
        <motion.button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold flex-shrink-0" style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)', color: 'rgb(252,165,165)' }} whileHover={{ scale: 1.03, backgroundColor: 'rgba(239,68,68,0.18)' }} whileTap={{ scale: 0.97 }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" strokeLinecap="round" strokeLinejoin="round" /></svg>
          {tr('Creator Studio')}
        </motion.button>
      </Link>
    </motion.div>
  );
}



