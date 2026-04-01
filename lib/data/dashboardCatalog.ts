import { contentImages } from '../images/unsplash';
import type { LocalizedText, SupportedLanguage } from '../types/content';

export interface DashboardContinueItem {
  id: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  progress: number;
  imageUrl: string;
  type: 'video' | 'music' | 'live' | 'gaming' | 'shorts';
  co2: string;
  estimateDuration?: string;
}

export interface DashboardHistoryItem {
  id: string;
  title: LocalizedText;
  genre: LocalizedText;
  watchedAt: LocalizedText;
  co2: string;
  imageUrl: string;
}

export const LOCALIZED_CONTINUE_WATCHING: DashboardContinueItem[] = [
  { id: '1', title: { en: 'Planet: A New Hope', de: 'Planet: Eine neue Hoffnung' }, subtitle: { en: 'Ep 3 of 6 - 28 min left', de: 'Ep 3 von 6 - 28 Min uebrig' }, progress: 62, imageUrl: contentImages.hero[0].url, type: 'video', co2: '0.07g/hr', estimateDuration: '28 min' },
  { id: '3', title: { en: 'Green Beats: Season 3', de: 'Green Beats: Staffel 3' }, subtitle: { en: 'Festival Set 2 - 1h 12m left', de: 'Festival-Set 2 - 1 Std 12 Min uebrig' }, progress: 35, imageUrl: contentImages.music[0].url, type: 'music', co2: '0.06g/hr', estimateDuration: '1h 12m' },
  { id: '6', title: { en: 'Solar Run 2024', de: 'Solar Run 2024' }, subtitle: { en: 'Highlights - 14 min left', de: 'Highlights - 14 Min uebrig' }, progress: 78, imageUrl: contentImages.sports[0].url, type: 'live', co2: '0.09g/hr', estimateDuration: '14 min' },
  { id: '5', title: { en: 'Quantum Forest', de: 'Quantum Forest' }, subtitle: { en: 'Ep 5 of 8 - 42 min left', de: 'Ep 5 von 8 - 42 Min uebrig' }, progress: 20, imageUrl: contentImages.abstract[1].url, type: 'video', co2: '0.07g/hr', estimateDuration: '42 min' },
  { id: '8', title: { en: 'EcoTech Summit', de: 'EcoTech Summit' }, subtitle: { en: 'Panel 3 - 22 min left', de: 'Panel 3 - 22 Min uebrig' }, progress: 55, imageUrl: contentImages.live[1].url, type: 'live', co2: '0.06g/hr', estimateDuration: '22 min' },
];

export const LOCALIZED_WATCH_HISTORY: DashboardHistoryItem[] = [
  { id: '1', title: { en: 'Planet: A New Hope', de: 'Planet: Eine neue Hoffnung' }, genre: { en: 'Documentary', de: 'Dokumentation' }, watchedAt: { en: '2h ago', de: 'vor 2 Std' }, co2: '0.19g', imageUrl: contentImages.hero[0].url },
  { id: '4', title: { en: 'Ocean Warriors', de: 'Ocean Warriors' }, genre: { en: 'Nature', de: 'Natur' }, watchedAt: { en: 'Yesterday', de: 'Gestern' }, co2: '0.14g', imageUrl: contentImages.climate[0].url },
  { id: '7', title: { en: 'Future Cities', de: 'Future Cities' }, genre: { en: 'Sci-Fi', de: 'Sci-Fi' }, watchedAt: { en: '2 days ago', de: 'vor 2 Tagen' }, co2: '0.21g', imageUrl: contentImages.abstract[0].url },
  { id: '2', title: { en: 'Eco Championship', de: 'Eco Championship' }, genre: { en: 'Gaming', de: 'Gaming' }, watchedAt: { en: '3 days ago', de: 'vor 3 Tagen' }, co2: '0.18g', imageUrl: contentImages.gaming[0].url },
  { id: '3', title: { en: 'Green Beats: S3', de: 'Green Beats: S3' }, genre: { en: 'Music', de: 'Musik' }, watchedAt: { en: '1 week ago', de: 'vor 1 Woche' }, co2: '0.11g', imageUrl: contentImages.music[0].url },
  { id: '6', title: { en: 'Solar Run 2024', de: 'Solar Run 2024' }, genre: { en: 'Sports', de: 'Sport' }, watchedAt: { en: '1 week ago', de: 'vor 1 Woche' }, co2: '0.09g', imageUrl: contentImages.sports[0].url },
];

export const typeAccent: Record<string, string> = {
  video: 'rgba(0,128,255,0.85)',
  music: 'rgba(147,51,234,0.85)',
  live: 'rgba(239,68,68,0.85)',
  gaming: 'rgba(0,200,80,0.85)',
  shorts: 'rgba(251,146,60,0.85)',
};

export const glassBg = {
  background: 'linear-gradient(135deg, rgba(15,25,40,0.9), rgba(10,18,30,0.85))',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.07)',
};

export const sectionGlass = {
  ...glassBg,
  borderRadius: '1.5rem',
  padding: '1.5rem',
};

export const DASHBOARD_QUICK_STATS = [
  { label: { en: 'CO2 Saved (session)', de: 'CO2 gespart (Sitzung)' }, staticValue: null, color: 'rgb(0,229,186)', icon: 'leaf' },
  { label: { en: 'Total streams', de: 'Streams gesamt' }, staticValue: '738', color: 'rgb(0,217,255)', icon: 'play' },
  { label: { en: 'Credit balance', de: 'Guthaben' }, staticValue: '2,840', color: 'rgb(251,191,36)', icon: 'bolt' },
  { label: { en: 'Streak', de: 'Serie' }, staticValue: '34 days', color: 'rgb(251,146,60)', icon: 'fire' },
] as const;

export const DASHBOARD_UI_TEXT = {
  continueWatching: { en: 'Continue Watching', de: 'Weiterschauen' },
  watchHistory: { en: 'Watch History', de: 'Verlauf' },
  watched: { en: 'watched', de: 'gesehen' },
  saved: { en: 'saved', de: 'gespart' },
  editProfile: { en: 'Edit Profile', de: 'Profil bearbeiten' },
  shareStats: { en: 'Share Stats', de: 'Statistiken teilen' },
  memberSince: { en: 'Member since January 2024 - 738 streams - 34-day streak', de: 'Mitglied seit Januar 2024 - 738 Streams - 34 Tage Serie' },
  impactTitle: { en: 'Your cumulative impact this year', de: 'Dein kumulativer Einfluss in diesem Jahr' },
  methodology: { en: 'View Methodology', de: 'Methodik ansehen' },
} as const;

export const resolveDashboardText = (value: LocalizedText, language: SupportedLanguage) => value[language] ?? value.en;
export const getContinueWatching = (language: SupportedLanguage) => LOCALIZED_CONTINUE_WATCHING.map((item) => ({ ...item, title: resolveDashboardText(item.title, language), subtitle: resolveDashboardText(item.subtitle, language) }));
export const getWatchHistory = (language: SupportedLanguage) => LOCALIZED_WATCH_HISTORY.map((item) => ({ ...item, title: resolveDashboardText(item.title, language), genre: resolveDashboardText(item.genre, language), watchedAt: resolveDashboardText(item.watchedAt, language) }));

export const CONTINUE_WATCHING = getContinueWatching('en');
export const WATCH_HISTORY = getWatchHistory('en');


