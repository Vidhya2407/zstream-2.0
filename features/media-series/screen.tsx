'use client';

import MediaSeriesBackground from './components/MediaSeriesBackground';
import MediaSeriesControls from './components/MediaSeriesControls';
import MediaSeriesGenres from './components/MediaSeriesGenres';
import MediaSeriesGrid from './components/MediaSeriesGrid';
import MediaSeriesHeader from './components/MediaSeriesHeader';
import MediaSeriesHero from './components/MediaSeriesHero';
import MediaSeriesTabs from './components/MediaSeriesTabs';
import { useMediaSeriesScreen } from './hooks/useMediaSeriesScreen';

export default function MediaSeriesPage() {
  const {
    activeGenre,
    featured,
    filtered,
    isLight,
    search,
    setActiveGenre,
    setSearch,
    setShowWatchlistOnly,
    setSortBy,
    setSubCategory,
    showWatchlistOnly,
    sortBy,
    tab,
    toggleWatchlist,
    watchlist,
  } = useMediaSeriesScreen();

  return (
    <main className="relative min-h-screen overflow-x-hidden" style={{ background: isLight ? '#f0f4f7' : '#0A0F18' }}>
      <MediaSeriesBackground isLight={isLight} />
      <div className="relative z-10 mx-auto max-w-7xl px-8 py-10 lg:px-12">
        <MediaSeriesHeader isLight={isLight} />
        <MediaSeriesHero featured={featured} isLight={isLight} />
        <MediaSeriesControls
          isLight={isLight}
          search={search}
          setSearch={setSearch}
          setShowWatchlistOnly={setShowWatchlistOnly}
          setSortBy={setSortBy}
          showWatchlistOnly={showWatchlistOnly}
          sortBy={sortBy}
          watchlistCount={watchlist.size}
        />
        <MediaSeriesTabs isLight={isLight} setSubCategory={setSubCategory} tab={tab} />
        {tab === 'genres' && <MediaSeriesGenres activeGenre={activeGenre} isLight={isLight} setActiveGenre={setActiveGenre} />}
        <MediaSeriesGrid
          activeGenre={activeGenre}
          isLight={isLight}
          items={filtered}
          onToggleWatchlist={toggleWatchlist}
          search={search}
          showWatchlistOnly={showWatchlistOnly}
          sortBy={sortBy}
          tabKey={tab}
          watchlist={watchlist}
        />
      </div>
    </main>
  );
}



