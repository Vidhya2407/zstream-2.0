import type { LocalizedText, SupportedLanguage } from '../types/content';

export type GamingTab = 'live-streams' | 'tournaments' | 'top-creators' | 'esports' | 'new-games' | 'remix-clips';
export type DashTab = 'library' | 'recent' | 'achievements' | 'friends' | 'saves';

export interface CloudGame {
  id: number;
  title: string;
  genre: string;
  players?: string;
  imageIdx: number;
  owned: boolean;
  subscribed: boolean;
  progress: number;
  rating: string;
  carbonGPerHr: number;
  hoursPlayed: number;
  lastPlayed: string;
  size: number;
}

interface LocalizedCloudGame extends Omit<CloudGame, 'title' | 'genre' | 'lastPlayed'> {
  title: LocalizedText;
  genre: LocalizedText;
  lastPlayed: LocalizedText;
}

export interface Achievement {
  id: number;
  game: string;
  title: string;
  desc: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt: string;
  points: number;
}

interface LocalizedAchievement extends Omit<Achievement, 'game' | 'title' | 'desc'> {
  game: LocalizedText;
  title: LocalizedText;
  desc: LocalizedText;
}

export interface Friend {
  id: number;
  name: string;
  avatarIdx: number;
  status: 'online' | 'in-game' | 'offline';
  game?: string;
  country: string;
}

interface LocalizedFriend extends Omit<Friend, 'game'> {
  game?: LocalizedText;
}

export interface SaveState {
  id: number;
  game: string;
  slot: number;
  location: string;
  savedAt: string;
  sizeKB: number;
  imageIdx: number;
}

interface LocalizedSaveState extends Omit<SaveState, 'game' | 'location' | 'savedAt'> {
  game: LocalizedText;
  location: LocalizedText;
  savedAt: LocalizedText;
}

export const LOCALIZED_GAMES: LocalizedCloudGame[] = [
  { id: 1, title: { en: 'Eco Warriors Online', de: 'Eco Warriors Online' }, genre: { en: 'Strategy', de: 'Strategie' }, players: '12.4K', imageIdx: 0, owned: true, subscribed: false, progress: 68, rating: '9.1', carbonGPerHr: 12.4, hoursPlayed: 142, lastPlayed: { en: '2 hours ago', de: 'vor 2 Stunden' }, size: 48 },
  { id: 2, title: { en: 'Solar Clash Tournament', de: 'Solar Clash Tournament' }, genre: { en: 'Battle Royale', de: 'Battle Royale' }, players: '89K', imageIdx: 1, owned: false, subscribed: true, progress: 45, rating: '8.8', carbonGPerHr: 18.2, hoursPlayed: 87, lastPlayed: { en: 'Yesterday', de: 'Gestern' }, size: 72 },
  { id: 3, title: { en: 'Green City Builder', de: 'Green City Builder' }, genre: { en: 'Simulation', de: 'Simulation' }, players: '34K', imageIdx: 0, owned: true, subscribed: false, progress: 91, rating: '9.4', carbonGPerHr: 8.6, hoursPlayed: 312, lastPlayed: { en: '3 days ago', de: 'vor 3 Tagen' }, size: 35 },
  { id: 4, title: { en: 'Carbon Quest RPG', de: 'Carbon Quest RPG' }, genre: { en: 'RPG', de: 'RPG' }, players: '21K', imageIdx: 1, owned: false, subscribed: true, progress: 22, rating: '8.6', carbonGPerHr: 14.1, hoursPlayed: 38, lastPlayed: { en: '1 week ago', de: 'vor 1 Woche' }, size: 120 },
  { id: 5, title: { en: 'Zero Emission Racing', de: 'Zero Emission Racing' }, genre: { en: 'Racing', de: 'Rennen' }, players: '15K', imageIdx: 0, owned: true, subscribed: false, progress: 54, rating: '8.3', carbonGPerHr: 9.8, hoursPlayed: 56, lastPlayed: { en: '4 days ago', de: 'vor 4 Tagen' }, size: 28 },
  { id: 6, title: { en: 'Planet Guardian FPS', de: 'Planet Guardian FPS' }, genre: { en: 'FPS', de: 'FPS' }, players: '67K', imageIdx: 1, owned: false, subscribed: true, progress: 77, rating: '8.9', carbonGPerHr: 21.3, hoursPlayed: 204, lastPlayed: { en: 'Today', de: 'Heute' }, size: 96 },
];

export const TOURNAMENT_BRACKET = [
  { round: 'Quarter Finals', matches: [
    { team1: 'EcoStrike', team2: 'GreenForce', score1: 2, score2: 1, done: true },
    { team1: 'Solar Squad', team2: 'Rewild FC', score1: 2, score2: 0, done: true },
    { team1: 'CarbonCrusher', team2: 'Wind Warriors', score1: 1, score2: 2, done: true },
    { team1: 'Planet Defenders', team2: 'Zero Net', score1: 2, score2: 2, done: false },
  ]},
  { round: 'Semi Finals', matches: [
    { team1: 'EcoStrike', team2: 'Solar Squad', score1: null, score2: null, done: false },
    { team1: 'Wind Warriors', team2: 'TBD', score1: null, score2: null, done: false },
  ]},
  { round: 'Grand Final', matches: [
    { team1: 'TBD', team2: 'TBD', score1: null, score2: null, done: false },
  ]},
] as const;

export const LEADERBOARD = [
  { rank: 1, name: 'EcoStrike99', score: 142800, kd: '4.2', wins: 38, country: 'DE', badge: '1' },
  { rank: 2, name: 'GreenBlaster', score: 138500, kd: '3.9', wins: 34, country: 'US', badge: '2' },
  { rank: 3, name: 'SolarSniper', score: 129100, kd: '3.7', wins: 31, country: 'JP', badge: '3' },
  { rank: 4, name: 'CarbonKing', score: 118400, kd: '3.1', wins: 27, country: 'BR', badge: '' },
  { rank: 5, name: 'WindRaider', score: 112000, kd: '2.9', wins: 24, country: 'IN', badge: '' },
  { rank: 6, name: 'EcoForce_X', score: 104300, kd: '2.7', wins: 22, country: 'FR', badge: '' },
  { rank: 7, name: 'PlanetGuard', score: 96700, kd: '2.4', wins: 19, country: 'GB', badge: '' },
  { rank: 8, name: 'ZeroNet99', score: 89200, kd: '2.2', wins: 17, country: 'CA', badge: '' },
];

export const GAMING_TABS: { id: GamingTab; label: string; emoji: string }[] = [
  { id: 'live-streams', label: 'Game Library', emoji: 'Game' },
  { id: 'tournaments', label: 'Tournaments', emoji: 'Cup' },
  { id: 'top-creators', label: 'Top Creators', emoji: 'Top' },
  { id: 'esports', label: 'eSports', emoji: 'Live' },
  { id: 'new-games', label: 'New Games', emoji: 'Spark' },
  { id: 'remix-clips', label: 'Remix Clips', emoji: 'Clip' },
];

export const LOCALIZED_ACHIEVEMENTS: LocalizedAchievement[] = [
  { id: 1, game: { en: 'Eco Warriors Online', de: 'Eco Warriors Online' }, title: { en: 'First Bloom', de: 'Erste Bluete' }, desc: { en: 'Plant your first virtual forest', de: 'Pflanze deinen ersten virtuellen Wald' }, icon: 'seedling', rarity: 'common', unlockedAt: 'Mar 16, 2026', points: 10 },
  { id: 2, game: { en: 'Green City Builder', de: 'Green City Builder' }, title: { en: 'Carbon Neutral City', de: 'Klimaneutrale Stadt' }, desc: { en: 'Achieve net-zero in your city', de: 'Erreiche Netto-Null in deiner Stadt' }, icon: 'city', rarity: 'legendary', unlockedAt: 'Mar 14, 2026', points: 100 },
  { id: 3, game: { en: 'Solar Clash Tournament', de: 'Solar Clash Tournament' }, title: { en: 'Solar Storm', de: 'Solarsturm' }, desc: { en: 'Win 10 consecutive matches', de: 'Gewinne 10 Spiele in Folge' }, icon: 'bolt', rarity: 'epic', unlockedAt: 'Mar 12, 2026', points: 50 },
  { id: 4, game: { en: 'Planet Guardian FPS', de: 'Planet Guardian FPS' }, title: { en: 'Guardian Angel', de: 'Schutzengel' }, desc: { en: 'Protect 50 eco zones without fail', de: 'Schuetze 50 Oekozonen ohne Fehler' }, icon: 'shield', rarity: 'rare', unlockedAt: 'Mar 10, 2026', points: 25 },
  { id: 5, game: { en: 'Zero Emission Racing', de: 'Zero Emission Racing' }, title: { en: 'Clean Lap', de: 'Saubere Runde' }, desc: { en: 'Complete a race with zero collisions', de: 'Beende ein Rennen ohne Kollisionen' }, icon: 'flag', rarity: 'common', unlockedAt: 'Mar 8, 2026', points: 10 },
  { id: 6, game: { en: 'Carbon Quest RPG', de: 'Carbon Quest RPG' }, title: { en: 'Nature\'s Champion', de: 'Champion der Natur' }, desc: { en: 'Complete all nature side quests', de: 'Schliesse alle Natur-Nebenquests ab' }, icon: 'leaf', rarity: 'epic', unlockedAt: 'Mar 6, 2026', points: 50 },
];

export const LOCALIZED_FRIENDS: LocalizedFriend[] = [
  { id: 1, name: 'EcoStrike99', avatarIdx: 0, status: 'in-game', game: { en: 'Eco Warriors Online', de: 'Eco Warriors Online' }, country: 'DE' },
  { id: 2, name: 'GreenBlaster', avatarIdx: 1, status: 'online', country: 'US' },
  { id: 3, name: 'SolarSniper', avatarIdx: 2, status: 'in-game', game: { en: 'Planet Guardian FPS', de: 'Planet Guardian FPS' }, country: 'JP' },
  { id: 4, name: 'CarbonKing', avatarIdx: 3, status: 'offline', country: 'BR' },
  { id: 5, name: 'WindRaider', avatarIdx: 0, status: 'online', country: 'IN' },
  { id: 6, name: 'EcoForce_X', avatarIdx: 1, status: 'in-game', game: { en: 'Solar Clash Tournament', de: 'Solar Clash Tournament' }, country: 'FR' },
];

export const LOCALIZED_SAVE_STATES: LocalizedSaveState[] = [
  { id: 1, game: { en: 'Eco Warriors Online', de: 'Eco Warriors Online' }, slot: 1, location: { en: 'The Amazon Frontier - Wave 12', de: 'Amazonas-Grenze - Welle 12' }, savedAt: { en: '2 hours ago', de: 'vor 2 Stunden' }, sizeKB: 840, imageIdx: 0 },
  { id: 2, game: { en: 'Green City Builder', de: 'Green City Builder' }, slot: 1, location: { en: 'New Berlin 2046 - Year 8', de: 'Neu-Berlin 2046 - Jahr 8' }, savedAt: { en: 'Yesterday', de: 'Gestern' }, sizeKB: 1240, imageIdx: 1 },
  { id: 3, game: { en: 'Carbon Quest RPG', de: 'Carbon Quest RPG' }, slot: 2, location: { en: 'Crystal Caves - Chapter 3', de: 'Kristallhoehlen - Kapitel 3' }, savedAt: { en: '1 week ago', de: 'vor 1 Woche' }, sizeKB: 620, imageIdx: 0 },
  { id: 4, game: { en: 'Planet Guardian FPS', de: 'Planet Guardian FPS' }, slot: 1, location: { en: 'Arctic Station - Mission 7', de: 'Arktis-Station - Mission 7' }, savedAt: { en: 'Today', de: 'Heute' }, sizeKB: 380, imageIdx: 1 },
];

export const TOP_CREATORS = [
  { id: 1, name: 'EcoGamerPro', followers: '2.4M', status: 'live', avatarIdx: 0, platform: 'ZSTREAM', bio: 'Living the zero carbon life while dominating the eco-battlefield.' },
  { id: 2, name: 'GreenStreamer', followers: '1.8M', status: 'online', avatarIdx: 1, platform: 'ZSTREAM', bio: 'Solar powered gaming at its finest. Join the movement!' },
  { id: 3, name: 'WindWalker', followers: '950K', status: 'offline', avatarIdx: 2, platform: 'ZSTREAM', bio: 'Competitive eSports with a green heart.' },
];

export const ESPORTS_EVENTS = [
  { id: 1, title: 'Solar Cup Grand Finals', game: 'Solar Clash', date: 'LIVE NOW', viewers: '450K', prize: '$500,000' },
  { id: 2, title: 'EcoLeague Season 4', game: 'Eco Warriors Online', date: 'Starts in 2h', viewers: '120K', prize: '$250,000' },
];

export const NEW_GAMES = [
  { id: 7, title: { en: 'Geothermal Genesis', de: 'Geothermal Genesis' }, genre: { en: 'Adventure', de: 'Abenteuer' }, rating: '9.2', imageIdx: 1 },
  { id: 8, title: { en: 'Wind Turbine Tycoon', de: 'Windrad Tycoon' }, genre: { en: 'Simulation', de: 'Simulation' }, rating: '8.9', imageIdx: 0 },
];

export const REMIX_CLIPS = [
  { id: 1, title: 'Epic Win in Solar Clash', creator: 'EcoGamerPro', duration: '0:45', views: '1.2M', carbonSaved: '0.04g' },
  { id: 2, title: 'Green City Speedrun', creator: 'GreenStreamer', duration: '12:30', views: '450K', carbonSaved: '0.12g' },
];

export const GAMING_UI_TEXT = {
  pageTitle: { en: 'Game Streaming', de: 'Game-Streaming' },
  pageSubtitle: { en: 'Cloud gaming - Tournaments - Leaderboards - Zero carbon', de: 'Cloud-Gaming - Turniere - Ranglisten - Zero Carbon' },
  featuredChip: { en: 'Cloud Gaming', de: 'Cloud Gaming' },
  featuredTitle: { en: 'Solar Clash World Cup', de: 'Solar Clash World Cup' },
  featuredSubtitle: { en: 'Battle Royale - 89K watching - Prize: $1M Carbon Credits', de: 'Battle Royale - 89 Tsd. sehen zu - Preis: 1 Mio. Carbon Credits' },
  watchLive: { en: 'Watch Live', de: 'Live ansehen' },
  libraryTitle: { en: 'Game Library', de: 'Spielebibliothek' },
  playing: { en: 'playing', de: 'spielen' },
  creatorsTitle: { en: 'Top Eco Creators', de: 'Top Eco-Creator' },
  esportsTitle: { en: 'Live eSports', de: 'Live eSports' },
  newGamesTitle: { en: 'New Green Releases', de: 'Neue Green-Releases' },
  remixTitle: { en: 'AI Remix Clips', de: 'AI Remix Clips' },
} as const;

export const resolveGamingText = (value: LocalizedText, language: SupportedLanguage) => value[language] ?? value.en;
export const getGames = (language: SupportedLanguage): CloudGame[] => LOCALIZED_GAMES.map((game) => ({ ...game, title: resolveGamingText(game.title, language), genre: resolveGamingText(game.genre, language), lastPlayed: resolveGamingText(game.lastPlayed, language) }));
export const getAchievements = (language: SupportedLanguage): Achievement[] => LOCALIZED_ACHIEVEMENTS.map((item) => ({ ...item, game: resolveGamingText(item.game, language), title: resolveGamingText(item.title, language), desc: resolveGamingText(item.desc, language) }));
export const getFriends = (language: SupportedLanguage): Friend[] => LOCALIZED_FRIENDS.map((item) => ({ ...item, game: item.game ? resolveGamingText(item.game, language) : undefined }));
export const getSaveStates = (language: SupportedLanguage): SaveState[] => LOCALIZED_SAVE_STATES.map((item) => ({ ...item, game: resolveGamingText(item.game, language), location: resolveGamingText(item.location, language), savedAt: resolveGamingText(item.savedAt, language) }));

export const GAMES: CloudGame[] = getGames('en');
export const ACHIEVEMENTS: Achievement[] = getAchievements('en');
export const FRIENDS: Friend[] = getFriends('en');
export const SAVE_STATES: SaveState[] = getSaveStates('en');
export const RECS = [
  { title: 'Rewild Tycoon', genre: 'Simulation', reason: 'Because you play Green City Builder', rating: '9.0', imageIdx: 0 },
  { title: 'Storm Chasers VR', genre: 'Adventure', reason: 'Trending in your region', rating: '8.7', imageIdx: 1 },
  { title: 'Ocean Defense Squad', genre: 'Strategy', reason: 'Popular with EcoStrike99', rating: '8.9', imageIdx: 0 },
];

export const rarityConfig: Record<Achievement['rarity'], { label: string; color: string; bg: string; border: string }> = {
  common: { label: 'Common', color: 'rgb(156,163,175)', bg: 'rgba(156,163,175,0.08)', border: 'rgba(156,163,175,0.2)' },
  rare: { label: 'Rare', color: 'rgb(96,165,250)', bg: 'rgba(96,165,250,0.08)', border: 'rgba(96,165,250,0.2)' },
  epic: { label: 'Epic', color: 'rgb(196,132,252)', bg: 'rgba(196,132,252,0.08)', border: 'rgba(196,132,252,0.2)' },
  legendary: { label: 'Legendary', color: 'rgb(251,191,36)', bg: 'rgba(251,191,36,0.08)', border: 'rgba(251,191,36,0.2)' },
};

export const statusConfig: Record<Friend['status'], { label: string; color: string; dot: string }> = {
  online: { label: 'Online', color: 'rgb(0,229,186)', dot: 'rgb(0,229,186)' },
  'in-game': { label: 'In Game', color: 'rgb(0,200,80)', dot: 'rgb(0,200,80)' },
  offline: { label: 'Offline', color: 'rgb(107,114,128)', dot: 'rgb(75,85,99)' },
};

export const DASH_TABS: { id: DashTab; label: string; icon: string }[] = [
  { id: 'library', label: 'My Library', icon: 'gamepad' },
  { id: 'recent', label: 'Recent', icon: 'clock' },
  { id: 'achievements', label: 'Achievements', icon: 'trophy' },
  { id: 'friends', label: 'Friends', icon: 'users' },
  { id: 'saves', label: 'Save States', icon: 'save' },
];
