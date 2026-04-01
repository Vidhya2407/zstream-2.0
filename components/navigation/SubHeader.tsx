'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useNavigationStore, subCategories } from '../../lib/stores/navigationStore';
import { useThemeStore } from '../../lib/stores/themeStore';
import { useAppTranslations } from '../../lib/utils/translations';
import { getMainCategoryFromPath } from '../../lib/config/navigation';
import { HEADER_HEIGHT } from '../../lib/config/header';

const SUBCATEGORY_KEYS: Record<string, string> = {
  'Trending Songs': 'subnav.trendingSongs',
  'Top Artists': 'subnav.topArtists',
  Playlists: 'subnav.playlists',
  'New Releases': 'subnav.newReleases',
  Podcasts: 'subnav.podcasts',
  'AI Recommended': 'subnav.aiRecommended',
  'Your Library': 'subnav.yourLibrary',
  'Eco Charts': 'subnav.ecoCharts',
  'For You': 'subnav.forYou',
  Trending: 'subnav.trending',
  'Climate Picks': 'subnav.climatePicks',
  Gaming: 'platform.gaming',
  Sports: 'platform.sports',
  Music: 'platform.music',
  Originals: 'subnav.originals',
  Genres: 'subnav.genres',
  'Top Rated': 'subnav.topRated',
  'Recently Added': 'subnav.recentlyAdded',
  'Continue Watching': 'subnav.continueWatching',
  'Climate Impact Stories': 'subnav.climateImpactStories',
  'ZSTREAM Originals': 'subnav.zstreamOriginals',
  'New Episodes': 'subnav.newEpisodes',
  'Browse Genres': 'subnav.browseGenres',
  'Binge-Worthy': 'subnav.bingeWorthy',
  'Climate Dramas': 'subnav.climateDramas',
  'Live Now': 'subnav.liveNow',
  'Upcoming Matches': 'subnav.upcomingMatches',
  Highlights: 'subnav.highlights',
  Tournaments: 'subnav.tournaments',
  'Multi-Camera': 'subnav.multiCamera',
  'Eco-Arena Mode': 'subnav.ecoArenaMode',
  'Live Streams': 'subnav.liveStreams',
  'Top Creators': 'subnav.topCreators',
  eSports: 'subnav.esports',
  'New Games': 'subnav.newGames',
  'Regenerate Remix Clips': 'subnav.regenerateRemixClips',
  'All Live': 'subnav.allLive',
  Events: 'subnav.events',
  Schedule: 'subnav.schedule',
  'Join Meeting': 'subnav.joinMeeting',
  Recordings: 'subnav.recordings',
  Webinars: 'subnav.webinars',
  Subscriptions: 'subnav.subscriptions',
  'Eco Verified': 'subnav.ecoVerified',
  'New Uploads': 'subnav.newUploads',
  'Carbon Credits': 'subnav.carbonCredits',
  'Eco Merch': 'subnav.ecoMerch',
  'Green NFTs': 'subnav.greenNfts',
};

export default function SubHeader() {
  const pathname = usePathname();
  const { activeSubCategory, setSubCategory } = useNavigationStore();
  const { theme } = useThemeStore();
  const { t } = useAppTranslations();
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const isLight = theme === 'light';
  const currentMainCategory = getMainCategoryFromPath(pathname);

  const currentSubCategories = subCategories[currentMainCategory];
  const headerBg = isLight ? 'rgba(240, 244, 247, 0.94)' : 'rgba(10, 15, 24, 0.94)';
  const activePillBg = isLight ? 'rgba(0, 234, 175, 0.1)' : 'rgba(0, 229, 186, 0.08)';
  const activePillBorder = isLight ? '1px solid rgba(0, 234, 175, 0.3)' : '1px solid rgba(0, 229, 186, 0.2)';
  const hoverBg = isLight ? 'rgba(0, 0, 0, 0.03)' : 'rgba(255, 255, 255, 0.03)';
  const inactiveTextColor = isLight ? '#334155' : '#cbd5e1';
  const borderGradient = isLight
    ? 'linear-gradient(to right, transparent, rgba(0, 0, 0, 0.1), transparent)'
    : 'linear-gradient(to right, transparent, rgba(0, 229, 186, 0.2), transparent)';

  React.useEffect(() => {
    if (scrollContainerRef.current && activeSubCategory) {
      const activeElement = scrollContainerRef.current.querySelector(`[data-sub-id="${activeSubCategory}"]`);
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeSubCategory]);

  if (!currentSubCategories || currentSubCategories.length === 0) {
    return null;
  }

  return (
    <motion.div
      className="fixed left-0 right-0 z-40"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -60, opacity: 0 }}
      transition={{ type: 'spring', damping: 30, stiffness: 300, delay: 0.15 }}
      style={{
        top: `${HEADER_HEIGHT}px`,
        backgroundColor: headerBg,
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: `1px solid ${isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(0, 229, 186, 0.12)'}`,
      }}
      data-no-translate="true"
    >
      <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{ background: borderGradient }} />

      <div className="w-full px-5 lg:px-10 py-3.5">
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {currentSubCategories.map((subCat, index) => {
            const isActive = activeSubCategory === subCat.id;
            const translationKey = SUBCATEGORY_KEYS[subCat.label];
            const translatedLabel = translationKey ? t(translationKey, subCat.label) : subCat.label;

            return (
              <motion.div
                key={subCat.id}
                data-sub-id={subCat.id}
                className="snap-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={subCat.href || '#'}>
                  <motion.button
                    onClick={() => setSubCategory(subCat.id)}
                    className="relative px-5 py-2.5 rounded-full text-[15px] font-semibold whitespace-nowrap"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="relative z-10 transition-colors duration-200" style={{ color: isActive ? 'rgb(0, 229, 186)' : inactiveTextColor }}>
                      {translatedLabel}
                    </span>

                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{
                          backgroundColor: activePillBg,
                          border: activePillBorder,
                          boxShadow: `0 0 12px ${isLight ? 'rgba(0, 234, 175, 0.1)' : 'rgba(0, 229, 186, 0.08)'}`,
                        }}
                        layoutId="sub-nav-pill"
                        transition={{ type: 'spring', damping: 25, stiffness: 400 }}
                      />
                    )}

                    {!isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-200"
                        style={{
                          background: hoverBg,
                          boxShadow: `0 2px 8px ${isLight ? 'rgba(0, 234, 175, 0.04)' : 'rgba(0, 229, 186, 0.06)'}`,
                        }}
                      />
                    )}
                  </motion.button>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </motion.div>
  );
}
