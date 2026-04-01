export type MainCategory =
 | 'home'
 | 'music'
 | 'minis'
 | 'movies'
 | 'mediaseries'
 | 'sports'
 | 'gaming'
 | 'live'
 | 'meetings'
 | 'ztube'
 | 'marketplace';

export interface SubCategory {
  id: string;
  label: string;
  href?: string;
}

const categoryRoutePrefixes: Array<{ category: MainCategory; prefix: string }> = [
  { category: 'music', prefix: '/music' },
  { category: 'minis', prefix: '/minis' },
  { category: 'movies', prefix: '/movies' },
  { category: 'mediaseries', prefix: '/media-series' },
  { category: 'sports', prefix: '/sports' },
  { category: 'gaming', prefix: '/gaming' },
  { category: 'live', prefix: '/live' },
  { category: 'meetings', prefix: '/meetings' },
  { category: 'ztube', prefix: '/ztube' },
  { category: 'marketplace', prefix: '/marketplace' },
];

export function getMainCategoryFromPath(pathname: string | null | undefined): MainCategory {
  if (!pathname || pathname === '/') {
    return 'home';
  }

  const matchedCategory = categoryRoutePrefixes.find(
    ({ prefix }) => pathname === prefix || pathname.startsWith(`${prefix}/`) || pathname.startsWith(`${prefix}?`)
  );

  return matchedCategory?.category ?? 'home';
}

export const subCategories: Record<MainCategory, SubCategory[]> = {
  home: [],
  music: [
    { id: 'trending-songs', label: 'Trending Songs', href: '/music?tab=trending' },
    { id: 'top-artists', label: 'Top Artists', href: '/music?tab=artists' },
    { id: 'playlists', label: 'Playlists', href: '/music?tab=playlists' },
    { id: 'new-releases', label: 'New Releases', href: '/music?tab=new' },
    { id: 'podcasts', label: 'Podcasts', href: '/music?tab=podcasts' },
    { id: 'ai-recommended', label: 'AI Recommended', href: '/music?tab=ai' },
    { id: 'your-library', label: 'Your Library', href: '/music?tab=library' },
    { id: 'eco-charts', label: 'Eco Charts', href: '/music?tab=eco' },
  ],
  minis: [
    { id: 'for-you', label: 'For You', href: '/minis?tab=for-you' },
    { id: 'trending', label: 'Trending', href: '/minis?tab=trending' },
    { id: 'climate-picks', label: 'Climate Picks', href: '/minis?tab=climate' },
    { id: 'gaming', label: 'Gaming', href: '/minis?tab=gaming' },
    { id: 'sports', label: 'Sports', href: '/minis?tab=sports' },
    { id: 'music', label: 'Music', href: '/minis?tab=music' },
  ],
  movies: [
    { id: 'trending', label: 'Trending', href: '/movies?tab=trending' },
    { id: 'originals', label: 'Originals', href: '/movies?tab=originals' },
    { id: 'genres', label: 'Genres', href: '/movies?tab=genres' },
    { id: 'top-rated', label: 'Top Rated', href: '/movies?tab=top' },
    { id: 'recently-added', label: 'Recently Added', href: '/movies?tab=recent' },
    { id: 'continue-watching', label: 'Continue Watching', href: '/movies?tab=continue' },
    { id: 'climate-stories', label: 'Climate Impact Stories', href: '/movies?tab=climate' },
  ],
  mediaseries: [
    { id: 'trending', label: 'Trending', href: '/media-series?tab=trending' },
    { id: 'originals', label: 'ZSTREAM Originals', href: '/media-series?tab=originals' },
    { id: 'new-episodes', label: 'New Episodes', href: '/media-series?tab=new' },
    { id: 'continue-watching', label: 'Continue Watching', href: '/media-series?tab=continue' },
    { id: 'genres', label: 'Browse Genres', href: '/media-series?tab=genres' },
    { id: 'binge-worthy', label: 'Binge-Worthy', href: '/media-series?tab=binge' },
    { id: 'climate-dramas', label: 'Climate Dramas', href: '/media-series?tab=climate' },
  ],
  sports: [
    { id: 'live-now', label: 'Live Now', href: '/sports?tab=live' },
    { id: 'upcoming', label: 'Upcoming Matches', href: '/sports?tab=upcoming' },
    { id: 'highlights', label: 'Highlights', href: '/sports?tab=highlights' },
    { id: 'tournaments', label: 'Tournaments', href: '/sports?tab=tournaments' },
    { id: 'multi-camera', label: 'Multi-Camera', href: '/sports?tab=multi' },
    { id: 'eco-arena', label: 'Eco-Arena Mode', href: '/sports?tab=eco' },
  ],
  gaming: [
    { id: 'live-streams', label: 'Live Streams', href: '/gaming?tab=live' },
    { id: 'tournaments', label: 'Tournaments', href: '/gaming?tab=tournaments' },
    { id: 'top-creators', label: 'Top Creators', href: '/gaming?tab=creators' },
    { id: 'esports', label: 'eSports', href: '/gaming?tab=esports' },
    { id: 'new-games', label: 'New Games', href: '/gaming?tab=new' },
    { id: 'remix-clips', label: 'Regenerate Remix Clips', href: '/gaming?tab=remix' },
  ],
  live: [
    { id: 'all', label: 'All Live', href: '/live?tab=all' },
    { id: 'sports', label: 'Sports', href: '/live?tab=sports' },
    { id: 'gaming', label: 'Gaming', href: '/live?tab=gaming' },
    { id: 'music', label: 'Music', href: '/live?tab=music' },
    { id: 'events', label: 'Events', href: '/live?tab=events' },
  ],
  meetings: [
    { id: 'schedule', label: 'Schedule', href: '/meetings?tab=schedule' },
    { id: 'join', label: 'Join Meeting', href: '/meetings?tab=join' },
    { id: 'recordings', label: 'Recordings', href: '/meetings?tab=recordings' },
    { id: 'webinars', label: 'Webinars', href: '/meetings?tab=webinars' },
  ],
  ztube: [
    { id: 'for-you', label: 'For You', href: '/ztube?tab=forYou' },
    { id: 'trending', label: 'Trending', href: '/ztube?tab=trending' },
    { id: 'subscriptions', label: 'Subscriptions', href: '/ztube?tab=subscriptions' },
    { id: 'creators', label: 'Top Creators', href: '/ztube?tab=creators' },
    { id: 'eco-verified', label: 'Eco Verified', href: '/ztube?tab=verified' },
    { id: 'new-uploads', label: 'New Uploads', href: '/ztube?tab=new' },
  ],
  marketplace: [
    { id: 'carbon-credits', label: 'Carbon Credits', href: '/marketplace?tab=credits' },
    { id: 'eco-merch', label: 'Eco Merch', href: '/marketplace?tab=merch' },
    { id: 'nfts', label: 'Green NFTs', href: '/marketplace?tab=nfts' },
    { id: 'subscriptions', label: 'Subscriptions', href: '/marketplace?tab=subs' },
  ],
};



