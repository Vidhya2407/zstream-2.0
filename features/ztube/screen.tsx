'use client';

import { AnimatePresence, motion } from 'framer-motion';
import ZtubeCreatorCard from './components/ZtubeCreatorCard';
import ZtubeEmptyState from './components/ZtubeEmptyState';
import ZtubeFilterBar from './components/ZtubeFilterBar';
import ZtubeHeader from './components/ZtubeHeader';
import ZtubeVideoCard from './components/ZtubeVideoCard';
import ZtubeVideoSection from './components/ZtubeVideoSection';
import { useZtubeScreen } from './hooks/useZtubeScreen';

export default function ZTubePage() {
  const {
    bgGradient,
    contentType,
    creators,
    filtered,
    isGerman,
    isLight,
    loading,
    musicRow,
    newRow,
    podcastRow,
    searchQuery,
    searchRef,
    setContentType,
    setSearchQuery,
    setShowSuggestions,
    setTab,
    showSuggestions,
    suggestions,
    tab,
    tabs,
    tr,
    trendingRow,
    typeFilters,
  } = useZtubeScreen();

  const showCreatorTab = tab === 'creators';
  const showForYouRows = tab === 'forYou' && contentType === 'all' && !searchQuery;
  const showGrid = !showCreatorTab && !showForYouRows;

  return (
    <main className="min-h-screen relative overflow-hidden" style={{ background: bgGradient }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-base/60 via-dark-base/85 to-dark-base" />
        <motion.div animate={{ scale: [1, 1.1, 1] }} className="absolute rounded-full" style={{ width: '600px', height: '600px', top: '-20%', right: '-8%', background: 'radial-gradient(circle, rgba(239,68,68,0.06) 0%, transparent 70%)', filter: 'blur(70px)' }} transition={{ duration: 13, repeat: Infinity }} />
        <motion.div animate={{ scale: [1, 1.14, 1] }} className="absolute rounded-full" style={{ width: '450px', height: '450px', bottom: '-10%', left: '-5%', background: 'radial-gradient(circle, rgba(0,229,186,0.07) 0%, transparent 70%)', filter: 'blur(60px)' }} transition={{ duration: 10, repeat: Infinity, delay: 4 }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-12 py-10">
        <ZtubeHeader
          isLight={isLight}
          searchQuery={searchQuery}
          searchRef={searchRef}
          setSearchQuery={setSearchQuery}
          setShowSuggestions={setShowSuggestions}
          showSuggestions={showSuggestions}
          suggestions={suggestions}
          tr={tr}
        />

        <ZtubeFilterBar
          activeTab={tab}
          activeType={contentType}
          onTabChange={(value) => { setTab(value); setSearchQuery(''); }}
          onTypeChange={setContentType}
          tabs={tabs}
          tr={tr}
          typeFilters={typeFilters}
        />

        <AnimatePresence mode="wait">
          {showCreatorTab && (
            <motion.div key="creators" animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} initial={{ opacity: 0, y: 8 }}>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: isLight ? '#64748b' : '#6b7280' }}>{tr('Top Eco Creators')}</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {creators.map((creator, index) => (
                  <ZtubeCreatorCard creator={creator} index={index} key={creator.id} />
                ))}
              </div>
            </motion.div>
          )}

          {showForYouRows && (
            <motion.div key="forYou" animate={{ opacity: 1, y: 0 }} className="space-y-10" exit={{ opacity: 0, y: -8 }} initial={{ opacity: 0, y: 8 }}>
              <ZtubeVideoSection isGerman={isGerman} isLight={isLight} items={trendingRow} title={tr('Trending Now')} />
              <ZtubeVideoSection isGerman={isGerman} isLight={isLight} items={newRow} title={tr('New Uploads')} />
              <ZtubeVideoSection isGerman={isGerman} isLight={isLight} items={musicRow} title={tr('Music & Audio')} />
              <ZtubeVideoSection isGerman={isGerman} isLight={isLight} items={podcastRow} title={tr('Podcasts')} />
            </motion.div>
          )}

          {showGrid && (
            <motion.div key={`${tab}-${contentType}-${searchQuery}`} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} initial={{ opacity: 0, y: 8 }}>
              {loading ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="rounded-2xl h-52 animate-pulse" style={{ background: isLight ? 'rgba(15,23,42,0.06)' : 'rgba(255,255,255,0.04)', border: isLight ? '1px solid rgba(15,23,42,0.08)' : '1px solid rgba(255,255,255,0.08)' }} />
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                <ZtubeEmptyState message={`${tr('No results')}${searchQuery ? ` for "${searchQuery}"` : ''}`} />
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filtered.map((video, index) => (
                    <ZtubeVideoCard key={video.id} delay={index * 0.05} isGerman={isGerman} isLight={isLight} video={video} />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}



