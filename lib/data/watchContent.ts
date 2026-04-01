import { contentImages } from '../images/unsplash';
import { type BaseCatalogContent, type PlayableContent, toPlayableContent } from '../types/content';

export interface CastMember {
  name: string;
  role: string;
  avatarUrl: string;
}

export interface DRMLicenseUrls {
  widevine: string;
  playready: string;
  fairplay: string;
}

export interface WatchContent {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  genre: string;
  year: number;
  duration: string;
  durationMinutes: number;
  rating: string;
  ageRating: string;
  type: 'video' | 'music' | 'live' | 'gaming' | 'shorts';
  carbonScore: number;
  imageUrl: string;
  backdropUrl: string;
  tags: string[];
  cast: CastMember[];
  director: string;
  studio: string;
  src: string;
  drmLicenseUrls: DRMLicenseUrls;
  relatedIds: string[];
  isPremium: boolean;
}

const SHAKA_DEMO_STREAM = 'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd';
const HLS_FALLBACK = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';

const DEMO_DRM: DRMLicenseUrls = {
  widevine: 'https://cwip-shaka-proxy.appspot.com/no_auth',
  playready: 'https://test.playready.microsoft.com/service/rightsmanager.asmx',
  fairplay: 'https://fps.ezdrm.com/api/licenses/placeholder',
};

export const watchCatalog: WatchContent[] = [
  {
    id: '1',
    title: 'Planet: A New Hope',
    description: "A groundbreaking documentary series exploring humanity's relationship with the natural world and the innovations powering our path to a sustainable future.",
    longDescription: "Planet: A New Hope takes viewers on an extraordinary journey across six continents, documenting the scientists, activists, and ordinary people driving the global sustainability revolution. From solar farms of the Sahara to rewilded forests of Central Europe, this series reveals how human ingenuity and natural resilience can work together. Filmed with unprecedented access to climate labs and pristine ecosystems, every episode delivers both profound beauty and urgent hope. Winner of four International Documentary Awards 2024.",
    genre: 'Documentary',
    year: 2024,
    duration: '6 episodes | 48 min each',
    durationMinutes: 48,
    rating: '9.4',
    ageRating: 'PG',
    type: 'video',
    carbonScore: 0.07,
    imageUrl: contentImages.hero[0].url,
    backdropUrl: contentImages.climate[0].url,
    tags: ['#Documentary', '#Climate', '#Hope', '#Nature', '#Science'],
    cast: [
      { name: 'Dr. Sarah Chen', role: 'Host & Narrator', avatarUrl: contentImages.creators[0].url },
      { name: 'Marcus Webb', role: 'Field Reporter', avatarUrl: contentImages.creators[2].url },
      { name: 'Amara Diallo', role: 'Environmental Scientist', avatarUrl: contentImages.creators[1].url },
      { name: 'Prof. Erik Larsen', role: 'Climate Advisor', avatarUrl: contentImages.creators[3].url },
    ],
    director: 'James Attenborough',
    studio: 'EcoFilms Ltd.',
    src: HLS_FALLBACK,
    drmLicenseUrls: DEMO_DRM,
    relatedIds: ['4', '7', '5'],
    isPremium: false,
  },
  {
    id: '2',
    title: 'Eco Championship Live',
    description: "The world's first carbon-neutral esports tournament, streaming live with real-time environmental impact tracking displayed for every viewer.",
    longDescription: "The Eco Championship brings together the world's top 64 esports teams to compete in a tournament that redefines competitive gaming. Every match is powered by 100% renewable energy, and the live carbon dashboard displayed during broadcasts has inspired millions of viewers to adopt sustainable gaming habits. Featuring exclusive backstage access, player interviews, and stunning production values, this is esports at its most electrifying - and most responsible. All proceeds fund reforestation projects across three continents.",
    genre: 'Gaming',
    year: 2024,
    duration: 'Live | 3h 20m',
    durationMinutes: 200,
    rating: '8.9',
    ageRating: 'E',
    type: 'live',
    carbonScore: 0.05,
    imageUrl: contentImages.gaming[0].url,
    backdropUrl: contentImages.gaming[1].url,
    tags: ['#eSports', '#Live', '#GreenGaming', '#Tournament'],
    cast: [
      { name: 'Alex "Volt" Reyes', role: 'Pro Player | Team Solaris', avatarUrl: contentImages.creators[3].url },
      { name: 'Kira Tanaka', role: 'Host', avatarUrl: contentImages.creators[1].url },
      { name: 'Jordan Silva', role: 'Analyst', avatarUrl: contentImages.creators[2].url },
    ],
    director: 'Global Esports Inc.',
    studio: 'EcoGaming Productions',
    src: HLS_FALLBACK,
    drmLicenseUrls: DEMO_DRM,
    relatedIds: ['6', '1', '8'],
    isPremium: false,
  },
  {
    id: '3',
    title: 'Green Beats: Season 3',
    description: "The world's most popular eco-conscious music festival, streamed in carbon-neutral 4K. 200+ artists, zero emissions, infinite energy.",
    longDescription: "Green Beats returns for its most ambitious season yet, uniting 200 artists across six stages in a 72-hour celebration of music and sustainability. From indie folk to electronic, every performance testifies to art's power to drive change. Season 3 introduces the Carbon Pledge - artists commit to measurable environmental actions - and viewers track the festival's real-time impact through ZSTREAM's built-in carbon dashboard. Winner of the 2024 Sustainable Events Award. Exclusive 4K Dolby Atmos streaming only on ZSTREAM.",
    genre: 'Music',
    year: 2024,
    duration: '8 hours | 3 headline sets',
    durationMinutes: 480,
    rating: '9.1',
    ageRating: 'E',
    type: 'music',
    carbonScore: 0.06,
    imageUrl: contentImages.music[0].url,
    backdropUrl: contentImages.live[0].url,
    tags: ['#Music', '#Festival', '#ZeroEmissions', '#Live'],
    cast: [
      { name: 'Luna Waves', role: 'Headliner', avatarUrl: contentImages.creators[1].url },
      { name: 'The Roots Collective', role: 'Featured Act', avatarUrl: contentImages.creators[0].url },
      { name: 'Priya Sundaram', role: 'Festival Curator', avatarUrl: contentImages.creators[3].url },
    ],
    director: 'Elena Morano',
    studio: 'Harmonia Records',
    src: HLS_FALLBACK,
    drmLicenseUrls: DEMO_DRM,
    relatedIds: ['1', '8', '6'],
    isPremium: false,
  },
  {
    id: '4',
    title: 'Ocean Warriors',
    description: 'Join the most daring marine conservationists as they battle pollution, illegal fishing, and climate change on the high seas.',
    longDescription: "Ocean Warriors embeds cameras on the vessels of four frontline conservation organisations - Sea Shepherd, Oceana, the Ocean Cleanup, and a new startup using AI-powered drones. Over 10 episodes we witness the physical and emotional toll of protecting the world's largest ecosystem. Filmed in 8K across the Atlantic, Pacific, and Indian Oceans, Ocean Warriors is an unflinching look at both the crisis and the extraordinary humans fighting back. Exclusive ZSTREAM Premium content - ad-free, offline-capable.",
    genre: 'Nature',
    year: 2024,
    duration: '10 episodes | 44 min each',
    durationMinutes: 44,
    rating: '9.6',
    ageRating: 'PG',
    type: 'video',
    carbonScore: 0.08,
    imageUrl: contentImages.climate[0].url,
    backdropUrl: contentImages.hero[1].url,
    tags: ['#Nature', '#Ocean', '#Conservation', '#Wildlife'],
    cast: [
      { name: 'Capt. Nadia Ferreira', role: 'Field Lead', avatarUrl: contentImages.creators[0].url },
      { name: 'Dr. Tomas Reyes', role: 'Marine Biologist', avatarUrl: contentImages.creators[2].url },
      { name: 'Suki Park', role: 'AI Systems Lead', avatarUrl: contentImages.creators[1].url },
    ],
    director: 'Roberto Iglesias',
    studio: 'Blue Planet Studio',
    src: HLS_FALLBACK,
    drmLicenseUrls: DEMO_DRM,
    relatedIds: ['1', '5', '7'],
    isPremium: true,
  },
  {
    id: '5',
    title: 'Quantum Forest',
    description: 'A visually stunning sci-fi series about a team of scientists who discover a forest ecosystem that defies the laws of physics.',
    longDescription: "In the not-so-distant future, a remote expedition team discovers a forest in Patagonia where plants communicate via quantum entanglement, animals have evolved symbiotic neural links, and the ecosystem seems to possess collective intelligence. Quantum Forest blends hard science with breathtaking speculative fiction across 8 episodes. Praised by physicists and ecologists alike, it's the rare sci-fi series that makes you believe the natural world's marvels may already exceed our imaginations. ZSTREAM Premium exclusive - full 8-episode season.",
    genre: 'Sci-Fi',
    year: 2024,
    duration: '8 episodes | 55 min each',
    durationMinutes: 55,
    rating: '8.8',
    ageRating: 'PG-13',
    type: 'video',
    carbonScore: 0.07,
    imageUrl: contentImages.abstract[1].url,
    backdropUrl: contentImages.hero[2].url,
    tags: ['#SciFi', '#Nature', '#Science', '#Mystery'],
    cast: [
      { name: 'Elara Voss', role: 'Dr. Mira Okafor', avatarUrl: contentImages.creators[1].url },
      { name: 'Dev Kapoor', role: 'Dr. Jin Park', avatarUrl: contentImages.creators[2].url },
      { name: 'Lena Schmidt', role: 'Commander Rivera', avatarUrl: contentImages.creators[3].url },
    ],
    director: 'Yuki Hashimoto',
    studio: 'Nebula Films',
    src: HLS_FALLBACK,
    drmLicenseUrls: DEMO_DRM,
    relatedIds: ['7', '4', '1'],
    isPremium: true,
  },
  {
    id: '6',
    title: 'Solar Run 2024',
    description: "The world's first fully solar-powered marathon event, bringing together 40,000 athletes in a celebration of human endurance and clean energy.",
    longDescription: "Solar Run 2024 is more than a race - it's a movement. Powered entirely by solar panels installed along the 42km route through Cape Town, the event draws elite athletes and casual runners united by a shared commitment to climate action. Every finisher plants a virtual tree through the ZSTREAM platform. Follow top athletes, hear from scientists and fans, and experience the electric atmosphere of the most eco-conscious sporting event in history. Includes multi-angle camera feeds and live carbon-offset tracking.",
    genre: 'Sports',
    year: 2024,
    duration: '4h 30m',
    durationMinutes: 270,
    rating: '8.5',
    ageRating: 'E',
    type: 'live',
    carbonScore: 0.09,
    imageUrl: contentImages.sports[0].url,
    backdropUrl: contentImages.sports[1].url,
    tags: ['#Sports', '#Running', '#Solar', '#Live'],
    cast: [
      { name: 'Amara Diallo', role: 'Elite Runner', avatarUrl: contentImages.creators[0].url },
      { name: 'Tom Osei', role: 'Race Commentator', avatarUrl: contentImages.creators[2].url },
      { name: 'Ingrid Holm', role: 'Sustainability Lead', avatarUrl: contentImages.creators[3].url },
    ],
    director: 'SportsCast Global',
    studio: 'GreenSports Media',
    src: HLS_FALLBACK,
    drmLicenseUrls: DEMO_DRM,
    relatedIds: ['2', '8', '4'],
    isPremium: false,
  },
  {
    id: '7',
    title: 'Future Cities',
    description: 'An architectural sci-fi series envisioning the megacities of 2075 - where vertical forests, AI transit, and circular economies define daily life.',
    longDescription: "Future Cities is a six-part docufiction series combining expert-led analysis with stunning CGI recreations of six global cities transformed by 2075. Featuring input from leading urban planners, climate scientists, and architects, each episode explores a different city - from a solar-powered Singapore to a fully rewilded London. Groundbreaking visual effects and rigorous scientific grounding make Future Cities the most credible - and inspiring - vision of tomorrow ever committed to screen. Three-time BAFTA nominee.",
    genre: 'Sci-Fi',
    year: 2024,
    duration: '6 episodes | 50 min each',
    durationMinutes: 50,
    rating: '8.6',
    ageRating: 'E',
    type: 'video',
    carbonScore: 0.07,
    imageUrl: contentImages.abstract[0].url,
    backdropUrl: contentImages.climate[1].url,
    tags: ['#SciFi', '#Cities', '#Future', '#Architecture'],
    cast: [
      { name: 'Prof. Aiko Yamamoto', role: 'Urban Futurist', avatarUrl: contentImages.creators[3].url },
      { name: 'Carlos Mendez', role: 'Narrator', avatarUrl: contentImages.creators[0].url },
      { name: 'Fatima Al-Rashid', role: 'Architect Consultant', avatarUrl: contentImages.creators[1].url },
    ],
    director: 'Maya Brandt',
    studio: 'UrbanVision Productions',
    src: HLS_FALLBACK,
    drmLicenseUrls: DEMO_DRM,
    relatedIds: ['5', '1', '4'],
    isPremium: false,
  },
  {
    id: '8',
    title: 'EcoTech Summit 2024',
    description: "Live coverage of the world's premier green technology conference featuring talks, panels, and product reveals from 500+ companies.",
    longDescription: "The EcoTech Summit is where the future is built. Featuring keynotes from leading CEOs, breakthrough product announcements, and unfiltered panel debates on the hardest problems in sustainability, this annual event draws the brightest minds in green technology. ZSTREAM brings you gavel-to-gavel coverage with multi-stream access to all 12 stages, on-demand replays, and exclusive backstage interviews. Never miss a breakthrough. Includes full Q&A sessions and downloadable slide decks.",
    genre: 'Tech',
    year: 2024,
    duration: 'Live | 8h coverage',
    durationMinutes: 480,
    rating: '8.7',
    ageRating: 'E',
    type: 'live',
    carbonScore: 0.06,
    imageUrl: contentImages.live[1].url,
    backdropUrl: contentImages.hero[0].url,
    tags: ['#Tech', '#Live', '#Innovation', '#Sustainability'],
    cast: [
      { name: 'Riya Patel', role: 'MC & Anchor', avatarUrl: contentImages.creators[1].url },
      { name: 'Dr. Leo Strauss', role: 'Keynote Speaker', avatarUrl: contentImages.creators[2].url },
      { name: 'Maya Chen', role: 'Panel Moderator', avatarUrl: contentImages.creators[0].url },
    ],
    director: 'EcoTech Foundation',
    studio: 'Summit Media',
    src: HLS_FALLBACK,
    drmLicenseUrls: DEMO_DRM,
    relatedIds: ['2', '6', '3'],
    isPremium: false,
  },
  {
    id: '9',
    title: 'Eco Warriors Online Demo Session',
    description: 'A playable cloud-gaming style demo stream for the flagship eco strategy title.',
    longDescription: 'Eco Warriors Online Demo Session is a beta-ready gameplay showcase used across the app to power launch buttons, play cards, and gaming handoff flows. It simulates a cloud gaming session with a stable fallback stream, gaming-themed metadata, and the same carbon tracking used across the rest of ZSTREAM.',
    genre: 'Gaming',
    year: 2026,
    duration: 'Demo session | 32 min',
    durationMinutes: 32,
    rating: '9.0',
    ageRating: 'E',
    type: 'gaming',
    carbonScore: 0.04,
    imageUrl: contentImages.gaming[0].url,
    backdropUrl: contentImages.gaming[1].url,
    tags: ['#Gaming', '#CloudPlay', '#Strategy', '#Beta'],
    cast: [
      { name: 'EcoStrike99', role: 'Featured Player', avatarUrl: contentImages.creators[0].url },
      { name: 'GreenStreamer', role: 'Commentary', avatarUrl: contentImages.creators[1].url },
    ],
    director: 'ZStream Play',
    studio: 'ZStream Gaming',
    src: HLS_FALLBACK,
    drmLicenseUrls: DEMO_DRM,
    relatedIds: ['10', '11', '2'],
    isPremium: false,
  },
  {
    id: '10',
    title: 'Solar Clash Tournament Demo',
    description: 'A competitive match replay used for gaming and esports launch actions across the beta.',
    longDescription: 'Solar Clash Tournament Demo gives the gaming, esports, and dashboard surfaces a real playback endpoint during beta. It behaves like a tournament replay, complete with cloud-play styling, competitive metadata, and low-friction streaming fallback support.',
    genre: 'eSports',
    year: 2026,
    duration: 'Tournament replay | 54 min',
    durationMinutes: 54,
    rating: '8.8',
    ageRating: '12',
    type: 'gaming',
    carbonScore: 0.05,
    imageUrl: contentImages.gaming[1].url,
    backdropUrl: contentImages.gaming[0].url,
    tags: ['#eSports', '#Tournament', '#Replay', '#Beta'],
    cast: [
      { name: 'Solar Squad', role: 'Finalist Team', avatarUrl: contentImages.creators[2].url },
      { name: 'Volt Arena', role: 'Broadcast Crew', avatarUrl: contentImages.creators[3].url },
    ],
    director: 'Arena Cast',
    studio: 'ZStream eSports',
    src: HLS_FALLBACK,
    drmLicenseUrls: DEMO_DRM,
    relatedIds: ['9', '2', '6'],
    isPremium: false,
  },
  {
    id: '11',
    title: 'Zero Emission Racing Demo',
    description: 'A fast-paced gameplay sample used for launch, resume, and new-release actions.',
    longDescription: 'Zero Emission Racing Demo powers the lighter-weight gaming actions in the app, including browse pages, resume states, and recommendation cards. It is a polished beta playback target with reusable gaming metadata and stable fallback streaming.',
    genre: 'Racing',
    year: 2026,
    duration: 'Gameplay session | 18 min',
    durationMinutes: 18,
    rating: '8.6',
    ageRating: 'E',
    type: 'gaming',
    carbonScore: 0.03,
    imageUrl: contentImages.gaming[0].url,
    backdropUrl: contentImages.sports[0].url,
    tags: ['#Racing', '#CloudPlay', '#Gameplay', '#Demo'],
    cast: [
      { name: 'WindRaider', role: 'Driver', avatarUrl: contentImages.creators[1].url },
      { name: 'RaceOps', role: 'Live HUD', avatarUrl: contentImages.creators[0].url },
    ],
    director: 'Green Grid Studio',
    studio: 'ZStream Racing',
    src: HLS_FALLBACK,
    drmLicenseUrls: DEMO_DRM,
    relatedIds: ['9', '10', '6'],
    isPremium: false,
  },
  {
    id: '12',
    title: 'Minis Creator Loop',
    description: 'A vertical-style creator playback loop used for Minis and remix interactions.',
    longDescription: 'Minis Creator Loop is a shared short-form playback target that makes the Minis, remix, and creator-driven actions in the app operational during beta. It gives those surfaces a consistent playback destination with creator metadata and short-form styling.',
    genre: 'Shorts',
    year: 2026,
    duration: 'Mini loop | 4 min',
    durationMinutes: 4,
    rating: '8.4',
    ageRating: 'E',
    type: 'shorts',
    carbonScore: 0.01,
    imageUrl: contentImages.videoBackgrounds[0].url,
    backdropUrl: contentImages.videoBackgrounds[1].url,
    tags: ['#Shorts', '#Creator', '#Minis', '#Loop'],
    cast: [
      { name: 'EcoCreator', role: 'Host', avatarUrl: contentImages.creators[0].url },
      { name: 'ZMini Crew', role: 'Production', avatarUrl: contentImages.creators[2].url },
    ],
    director: 'Creator Hub',
    studio: 'ZStream Minis',
    src: HLS_FALLBACK,
    drmLicenseUrls: DEMO_DRM,
    relatedIds: ['9', '3', '10'],
    isPremium: false,
  },
];

const watchCatalogIndex = new Map(watchCatalog.map((item) => [item.id, item] as const));

export const watchCatalogContent: BaseCatalogContent[] = watchCatalog.map((item) => ({
  id: item.id,
  kind: item.type,
  title: item.title,
  description: item.description,
  artwork: {
    posterUrl: item.imageUrl,
    backdropUrl: item.backdropUrl,
  },
  playback: {
    primary: item.src,
    hls: item.src,
  },
  metadata: {
    genre: item.genre,
    year: item.year,
    durationLabel: item.duration,
    durationMinutes: item.durationMinutes,
    rating: item.rating,
    ageRating: item.ageRating,
    carbonScore: item.carbonScore,
    tags: item.tags,
  },
  isPremium: item.isPremium,
}));

const watchCatalogContentIndex = new Map(watchCatalogContent.map((item) => [item.id, item] as const));
export const watchPlayableCatalog: PlayableContent[] = watchCatalogContent.map((item) => toPlayableContent(item));

export function getCatalogContentById(id: string): BaseCatalogContent | undefined {
  return watchCatalogContentIndex.get(id);
}

export function getPlayableContentById(id: string): PlayableContent | undefined {
  const content = getCatalogContentById(id);
  return content ? toPlayableContent(content) : undefined;
}

export function getContentById(id: string): WatchContent | undefined {
  return watchCatalogIndex.get(id);
}

export function getRelatedContent(ids: string[]): WatchContent[] {
  return ids
    .map((id) => watchCatalogIndex.get(id))
    .filter(Boolean) as WatchContent[];
}



