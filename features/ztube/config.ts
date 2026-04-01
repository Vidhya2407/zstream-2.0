import type { ContentType, ZCreator, ZTubeTabOption, ZTubeTypeFilter, ZVideo } from './types';

export const ZTUBE_VIDEOS: ZVideo[] = [
  { id: 1, title: 'How Solar Panels Actually Work', channel: 'TechGreen Labs', views: '4.2M', duration: '12:34', daysAgo: 2, imageIdx: 0, verified: true, subscribers: '1.8M', carbonScore: 0.05, type: 'video', likes: '142K' },
  { id: 2, title: 'Ocean Cleanup Project - Full Documentary', channel: 'EcoWorld', views: '8.7M', duration: '48:12', daysAgo: 5, imageIdx: 1, verified: true, subscribers: '3.2M', carbonScore: 0.04, type: 'video', likes: '318K' },
  { id: 3, title: 'Zero Waste Kitchen in 30 Days', channel: 'GreenLife DIY', views: '2.1M', duration: '22:08', daysAgo: 1, imageIdx: 0, verified: false, subscribers: '540K', carbonScore: 0.06, type: 'video', likes: '87K' },
  { id: 4, title: 'Climate Science Explained Simply', channel: 'EcoEducate', views: '5.6M', duration: '18:45', daysAgo: 7, imageIdx: 1, verified: true, subscribers: '2.4M', carbonScore: 0.04, type: 'video', likes: '201K' },
  { id: 5, title: 'Wind Turbine Farm - Inside Look', channel: 'RenewableTech', views: '1.3M', duration: '9:52', daysAgo: 3, imageIdx: 0, verified: true, subscribers: '890K', carbonScore: 0.05, type: 'video', likes: '54K' },
  { id: 6, title: 'Carbon Capture Technology 2026', channel: 'FuturePlanet', views: '3.8M', duration: '31:20', daysAgo: 10, imageIdx: 1, verified: true, subscribers: '1.1M', carbonScore: 0.06, type: 'video', likes: '130K' },
  { id: 7, title: 'Urban Farming Revolution', channel: 'GreenCity', views: '920K', duration: '14:37', daysAgo: 4, imageIdx: 0, verified: false, subscribers: '320K', carbonScore: 0.07, type: 'video', likes: '38K' },
  { id: 8, title: 'Electric Vehicles - 2026 Review', channel: 'EcoMobility', views: '6.1M', duration: '25:14', daysAgo: 6, imageIdx: 1, verified: true, subscribers: '2.8M', carbonScore: 0.05, type: 'video', likes: '227K' },
  { id: 9, title: 'Eco Beats: Solar Sessions Vol.3', channel: 'GreenBeats', views: '1.9M', duration: '58:30', daysAgo: 2, imageIdx: 0, verified: true, subscribers: '750K', carbonScore: 0.03, type: 'music', likes: '76K' },
  { id: 10, title: 'Ambient Forest Sounds - 8 Hours', channel: 'NatureAudio', views: '12.4M', duration: '8:00:00', daysAgo: 30, imageIdx: 1, verified: false, subscribers: '2.1M', carbonScore: 0.02, type: 'music', likes: '445K' },
  { id: 11, title: 'EcoTech Weekly - Episode 84', channel: 'FuturePlanet', views: '280K', duration: '1:04:18', daysAgo: 3, imageIdx: 0, verified: true, subscribers: '1.1M', carbonScore: 0.04, type: 'podcast', likes: '11K' },
  { id: 12, title: 'The Circular Economy Podcast', channel: 'EcoWorld', views: '510K', duration: '52:40', daysAgo: 7, imageIdx: 1, verified: true, subscribers: '3.2M', carbonScore: 0.04, type: 'podcast', likes: '19K' },
];

export const ZTUBE_CREATORS: ZCreator[] = [
  { id: 1, name: 'TechGreen Labs', subscribers: '1.8M', videos: 248, category: 'Technology', imageIdx: 0, carbonOffset: '12.4 tonnes', verified: true },
  { id: 2, name: 'EcoWorld', subscribers: '3.2M', videos: 412, category: 'Documentary', imageIdx: 1, carbonOffset: '28.1 tonnes', verified: true },
  { id: 3, name: 'GreenLife DIY', subscribers: '540K', videos: 89, category: 'Lifestyle', imageIdx: 2, carbonOffset: '4.2 tonnes', verified: false },
  { id: 4, name: 'EcoEducate', subscribers: '2.4M', videos: 320, category: 'Education', imageIdx: 3, carbonOffset: '18.7 tonnes', verified: true },
  { id: 5, name: 'RenewableTech', subscribers: '890K', videos: 156, category: 'Technology', imageIdx: 0, carbonOffset: '8.9 tonnes', verified: true },
  { id: 6, name: 'FuturePlanet', subscribers: '1.1M', videos: 203, category: 'Science', imageIdx: 1, carbonOffset: '11.2 tonnes', verified: true },
];

export const ZTUBE_TABS: ZTubeTabOption[] = [
  { id: 'forYou', label: 'For You', emoji: 'Spark' },
  { id: 'trending', label: 'Trending', emoji: 'Trend' },
  { id: 'new', label: 'New', emoji: 'New' },
  { id: 'subscriptions', label: 'Subscriptions', emoji: 'Bell' },
  { id: 'creators', label: 'Creators', emoji: 'Studio' },
];

export const ZTUBE_TYPE_FILTERS: ZTubeTypeFilter[] = [
  { id: 'all', label: 'All', icon: 'All' },
  { id: 'videos', label: 'Videos', icon: 'Videos' },
  { id: 'music', label: 'Music', icon: 'Music' },
  { id: 'podcasts', label: 'Podcasts', icon: 'Podcasts' },
];

export const ZTUBE_TRANSLATIONS: Record<string, string> = {
  'All': 'Alle',
  'Ambient Forest Sounds - 8 Hours': 'Ambient-Waldklaenge - 8 Stunden',
  'Carbon Capture Technology 2026': 'Carbon-Capture-Technologie 2026',
  'Climate Science Explained Simply': 'Klimawissenschaft einfach erklaert',
  'Clear search': 'Suche leeren',
  'Creator Studio': 'Creator Studio',
  'Creators': 'Top-Creator',
  'EcoTech Weekly - Episode 84': 'EcoTech Weekly - Folge 84',
  'Electric Vehicles - 2026 Review': 'Elektrofahrzeuge - Rueckblick 2026',
  'For You': 'Fuer dich',
  'How Solar Panels Actually Work': 'Wie Solarmodule wirklich funktionieren',
  'Music': 'Musik',
  'Music & Audio': 'Musik & Audio',
  'New': 'Neu',
  'New Uploads': 'Neue Uploads',
  'No results': 'Keine Ergebnisse',
  'Ocean Cleanup Project - Full Documentary': 'Ocean-Cleanup-Projekt - Vollstaendige Dokumentation',
  'Podcasts': 'Podcasts',
  'Search ZTube': 'ZTube durchsuchen',
  'Search ZTube...': 'ZTube durchsuchen...',
  'Subscribe': 'Abonnieren',
  'Subscribers': 'Abonnenten',
  'Subscriptions': 'Abos',
  'The Circular Economy Podcast': 'Der Circular-Economy-Podcast',
  'Top Eco Creators': 'Top Eco Creators',
  'Trending': 'Trend',
  'Trending Now': 'Trend',
  'Urban Farming Revolution': 'Revolution der urbanen Landwirtschaft',
  'Videos': 'Videos',
  'Videos label': 'Videos',
  'Wind Turbine Farm - Inside Look': 'Windpark - Blick hinter die Kulissen',
  'ZTube': 'ZTube',
  'Zero Waste Kitchen in 30 Days': 'Zero-Waste-Kueche in 30 Tagen',
};

export const ZTUBE_AUTOCOMPLETE_SUGGESTIONS = [
  'solar energy explained', 'zero waste challenge', 'climate science', 'electric vehicles',
  'carbon capture', 'urban farming', 'ocean cleanup', 'wind energy', 'eco living tips',
];

export function translateZTube(value: string, isGerman: boolean) {
  return isGerman ? (ZTUBE_TRANSLATIONS[value] ?? value) : value;
}

export function fmtAge(daysAgo: number, isGerman = false) {
  if (daysAgo === 0) return isGerman ? 'Heute' : 'Today';
  if (daysAgo === 1) return isGerman ? 'Gestern' : 'Yesterday';
  if (daysAgo < 30) return isGerman ? `vor ${daysAgo} Tagen` : `${daysAgo} days ago`;
  const monthsAgo = Math.floor(daysAgo / 30);
  return isGerman ? `vor ${monthsAgo} Monat${monthsAgo > 1 ? 'en' : ''}` : `${monthsAgo} month${monthsAgo > 1 ? 's' : ''} ago`;
}

export function normalizeContentType(value: ContentType | string): ZVideo['type'] {
  return value === 'music' || value === 'podcast' ? value : 'video';
}



