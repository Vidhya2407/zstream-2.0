import type { Track } from '../../types/media';
import { contentImages } from '../images/unsplash';
import type { LocalizedText, SupportedLanguage } from '../types/content';

export type MusicTab = 'library' | 'artists' | 'albums' | 'playlists';

export interface LocalizedTrack extends Omit<Track, 'title' | 'artist' | 'album'> {
  title: LocalizedText;
  artist: LocalizedText;
  album: LocalizedText;
}

export interface MusicArtist {
  id: number;
  name: LocalizedText;
  genre: LocalizedText;
  followers: string;
  tracks: number;
  imageUrl: string;
  verified: boolean;
}

export interface MusicAlbum {
  id: number;
  title: LocalizedText;
  artist: LocalizedText;
  year: number;
  tracks: number;
  imageUrl: string;
  genre: string;
}

export interface MusicPlaylist {
  id: number;
  title: LocalizedText;
  description: LocalizedText;
  tracks: number;
  duration: string;
  imageUrl: string;
  curator: LocalizedText;
}

export const LOCALIZED_TRACKS: LocalizedTrack[] = [
  { id: 1, title: { en: 'Carbon Neutral Vibes', de: 'Kohlenstofffreie Vibes' }, artist: { en: 'Eco Beats Collective', de: 'Eco Beats Collective' }, album: { en: 'Green Sessions', de: 'Green Sessions' }, duration: '3:45', durationSeconds: 225, genre: 'Ambient', imageUrl: contentImages.music[0].url, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', carbonPerMin: 1.0175, audioQuality: 'high' },
  { id: 2, title: { en: 'Sustainable Rhythms', de: 'Nachhaltige Rhythmen' }, artist: { en: 'Clean Energy Orchestra', de: 'Clean Energy Orchestra' }, album: { en: 'Electric Earth', de: 'Elektrische Erde' }, duration: '4:20', durationSeconds: 260, genre: 'Electronic', imageUrl: contentImages.music[1].url, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', carbonPerMin: 1.0175, audioQuality: 'high' },
  { id: 3, title: { en: 'Planet Harmony', de: 'Planetare Harmonie' }, artist: { en: 'Earth Guardians', de: 'Earth Guardians' }, album: { en: 'Nature Calls', de: 'Die Natur ruft' }, duration: '3:15', durationSeconds: 195, genre: 'Lo-Fi', imageUrl: contentImages.music[0].url, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', carbonPerMin: 1.0175, audioQuality: 'high' },
  { id: 4, title: { en: 'Solar Wind', de: 'Sonnenwind' }, artist: { en: 'Eco Beats Collective', de: 'Eco Beats Collective' }, album: { en: 'Green Sessions', de: 'Green Sessions' }, duration: '5:12', durationSeconds: 312, genre: 'Ambient', imageUrl: contentImages.music[1].url, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', carbonPerMin: 1.0175, audioQuality: 'high' },
  { id: 5, title: { en: 'Ocean Waves Digital', de: 'Digitale Ozeanwellen' }, artist: { en: 'Blue Planet DJs', de: 'Blue Planet DJs' }, album: { en: 'Deep Blue', de: 'Tiefblau' }, duration: '6:44', durationSeconds: 404, genre: 'Electronic', imageUrl: contentImages.music[0].url, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', carbonPerMin: 1.0175, audioQuality: 'high' },
  { id: 6, title: { en: 'Forest Morning', de: 'Waldmorgen' }, artist: { en: 'Earth Guardians', de: 'Earth Guardians' }, album: { en: 'Nature Calls', de: 'Die Natur ruft' }, duration: '3:28', durationSeconds: 208, genre: 'Lo-Fi', imageUrl: contentImages.music[1].url, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', carbonPerMin: 1.0175, audioQuality: 'high' },
  { id: 7, title: { en: 'Rewild Anthem', de: 'Rewild-Hymne' }, artist: { en: 'Green Horizons', de: 'Green Horizons' }, album: { en: 'Rewild EP', de: 'Rewild EP' }, duration: '4:55', durationSeconds: 295, genre: 'Pop', imageUrl: contentImages.music[0].url, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', carbonPerMin: 1.0175, audioQuality: 'high' },
  { id: 8, title: { en: 'Zero Emission Groove', de: 'Null-Emissions-Groove' }, artist: { en: 'Clean Energy Orchestra', de: 'Clean Energy Orchestra' }, album: { en: 'Electric Earth', de: 'Elektrische Erde' }, duration: '3:59', durationSeconds: 239, genre: 'Jazz', imageUrl: contentImages.music[1].url, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', carbonPerMin: 1.0175, audioQuality: 'high' },
];

export const LOCALIZED_ARTISTS: MusicArtist[] = [
  { id: 1, name: { en: 'Eco Beats Collective', de: 'Eco Beats Collective' }, genre: { en: 'Ambient / Electronic', de: 'Ambient / Electronic' }, followers: '2.4M', tracks: 48, imageUrl: contentImages.creators[0].url, verified: true },
  { id: 2, name: { en: 'Clean Energy Orchestra', de: 'Clean Energy Orchestra' }, genre: { en: 'Electronic / Jazz', de: 'Electronic / Jazz' }, followers: '1.1M', tracks: 32, imageUrl: contentImages.creators[1].url, verified: true },
  { id: 3, name: { en: 'Earth Guardians', de: 'Earth Guardians' }, genre: { en: 'Lo-Fi / Nature', de: 'Lo-Fi / Natur' }, followers: '890K', tracks: 24, imageUrl: contentImages.creators[2].url, verified: false },
  { id: 4, name: { en: 'Blue Planet DJs', de: 'Blue Planet DJs' }, genre: { en: 'Electronic / Techno', de: 'Electronic / Techno' }, followers: '650K', tracks: 18, imageUrl: contentImages.creators[3].url, verified: true },
  { id: 5, name: { en: 'Green Horizons', de: 'Green Horizons' }, genre: { en: 'Pop / Indie', de: 'Pop / Indie' }, followers: '1.8M', tracks: 56, imageUrl: contentImages.creators[0].url, verified: true },
];

export const LOCALIZED_ALBUMS: MusicAlbum[] = [
  { id: 1, title: { en: 'Green Sessions', de: 'Green Sessions' }, artist: { en: 'Eco Beats Collective', de: 'Eco Beats Collective' }, year: 2024, tracks: 12, imageUrl: contentImages.music[0].url, genre: 'Ambient' },
  { id: 2, title: { en: 'Electric Earth', de: 'Elektrische Erde' }, artist: { en: 'Clean Energy Orchestra', de: 'Clean Energy Orchestra' }, year: 2024, tracks: 10, imageUrl: contentImages.music[1].url, genre: 'Electronic' },
  { id: 3, title: { en: 'Nature Calls', de: 'Die Natur ruft' }, artist: { en: 'Earth Guardians', de: 'Earth Guardians' }, year: 2023, tracks: 8, imageUrl: contentImages.music[0].url, genre: 'Lo-Fi' },
  { id: 4, title: { en: 'Deep Blue', de: 'Tiefblau' }, artist: { en: 'Blue Planet DJs', de: 'Blue Planet DJs' }, year: 2024, tracks: 14, imageUrl: contentImages.music[1].url, genre: 'Electronic' },
  { id: 5, title: { en: 'Rewild EP', de: 'Rewild EP' }, artist: { en: 'Green Horizons', de: 'Green Horizons' }, year: 2024, tracks: 6, imageUrl: contentImages.music[0].url, genre: 'Pop' },
  { id: 6, title: { en: 'Sunrise Protocol', de: 'Sonnenaufgang-Protokoll' }, artist: { en: 'Eco Beats Collective', de: 'Eco Beats Collective' }, year: 2023, tracks: 11, imageUrl: contentImages.music[1].url, genre: 'Ambient' },
];

export const LOCALIZED_PLAYLISTS: MusicPlaylist[] = [
  { id: 1, title: { en: 'Focus & Flow', de: 'Fokus & Flow' }, description: { en: 'Deep concentration beats for productive sessions', de: 'Tiefe Konzentrationsbeats fuer produktive Sessions' }, tracks: 24, duration: '1h 42m', imageUrl: contentImages.abstract[0].url, curator: { en: 'ZSTREAM Editorial', de: 'ZSTREAM Redaktion' } },
  { id: 2, title: { en: 'Eco Morning', de: 'Eco-Morgen' }, description: { en: 'Start your day with earth-inspired sounds', de: 'Beginne deinen Tag mit erdinspirierten Klaengen' }, tracks: 18, duration: '1h 08m', imageUrl: contentImages.climate[0].url, curator: { en: 'Eco Beats Collective', de: 'Eco Beats Collective' } },
  { id: 3, title: { en: 'Night Forest', de: 'Nachtwald' }, description: { en: 'Ambient soundscapes for peaceful evenings', de: 'Atmosphaerische Klangwelten fuer friedliche Abende' }, tracks: 30, duration: '2h 15m', imageUrl: contentImages.abstract[1].url, curator: { en: 'Earth Guardians', de: 'Earth Guardians' } },
  { id: 4, title: { en: 'Zero Carbon Club', de: 'Zero Carbon Club' }, description: { en: 'Electronic dance for the sustainable generation', de: 'Elektronischer Dance fuer die nachhaltige Generation' }, tracks: 20, duration: '1h 28m', imageUrl: contentImages.music[0].url, curator: { en: 'ZSTREAM Editorial', de: 'ZSTREAM Redaktion' } },
];

export const GENRES = ['All', 'Ambient', 'Electronic', 'Lo-Fi', 'Jazz', 'Pop'];

export const TABS: { id: MusicTab; label: string; emoji: string }[] = [
  { id: 'library', label: 'Library', emoji: 'music' },
  { id: 'artists', label: 'Artists', emoji: 'artist' },
  { id: 'albums', label: 'Albums', emoji: 'album' },
  { id: 'playlists', label: 'Playlists', emoji: 'playlist' },
];

export const MUSIC_DE_TEXT: Record<string, string> = {
  'Music Library': 'Musikbibliothek',
  'Carbon-free streaming - GEMA licensed': 'Kohlenstofffreies Streaming - GEMA-lizenziert',
  'GEMA Licensed': 'GEMA-lizenziert',
  'Featured Station': 'Empfohlener Sender',
  'Eco Beats Radio': 'Eco Beats Radio',
  '24/7 Carbon-Free Music - 8.4K listening': '24/7 kohlenstofffreie Musik - 8,4 Tsd. hoeren zu',
  'Listen Now': 'Jetzt hoeren',
  'Carbon Neutral Vibes': 'Kohlenstofffreie Vibes',
  'Sustainable Rhythms': 'Nachhaltige Rhythmen',
  'Planet Harmony': 'Planetare Harmonie',
  'Solar Wind': 'Sonnenwind',
  'Ocean Waves Digital': 'Digitale Ozeanwellen',
  'Forest Morning': 'Waldmorgen',
  'Rewild Anthem': 'Rewild-Hymne',
  'Zero Emission Groove': 'Null-Emissions-Groove',
  'Electric Earth': 'Elektrische Erde',
  'Nature Calls': 'Die Natur ruft',
  'Deep Blue': 'Tiefblau',
  'Sunrise Protocol': 'Sonnenaufgang-Protokoll',
  'Focus & Flow': 'Fokus & Flow',
  'Deep concentration beats for productive sessions': 'Tiefe Konzentrationsbeats fuer produktive Sessions',
  'Eco Morning': 'Eco-Morgen',
  'Start your day with earth-inspired sounds': 'Beginne deinen Tag mit erdinspirierten Klaengen',
  'Night Forest': 'Nachtwald',
  'Ambient soundscapes for peaceful evenings': 'Atmosphaerische Klangwelten fuer friedliche Abende',
  'Electronic dance for the sustainable generation': 'Elektronischer Dance fuer die nachhaltige Generation',
  'ZSTREAM Editorial': 'ZSTREAM Redaktion',
  Library: 'Bibliothek',
  Artists: 'Kuenstler',
  Albums: 'Alben',
  Playlists: 'Playlists',
  All: 'Alle',
  Nature: 'Natur',
  followers: 'Follower',
  tracks: 'Tracks',
  'Play All': 'Alle abspielen',
  by: 'von',
  'Carbon-Free Audio Streaming': 'Kohlenstofffreies Audio-Streaming',
  'Audio uses 94% less energy than video. Every minute saves 0.002g CO2.': 'Audio verbraucht 94 % weniger Energie als Video. Jede Minute spart 0,002 g CO2.',
  'CO2/min saved': 'CO2/Min gespart',
  'GEMA Licensing Notice': 'Hinweis zur GEMA-Lizenzierung',
  Understood: 'Verstanden',
};

export const resolveMusicText = (value: LocalizedText, language: SupportedLanguage) => value[language] ?? value.en;
export const toTrack = (track: LocalizedTrack, language: SupportedLanguage): Track => ({ ...track, title: resolveMusicText(track.title, language), artist: resolveMusicText(track.artist, language), album: resolveMusicText(track.album, language) });

export const TRACKS: Track[] = LOCALIZED_TRACKS.map((track) => toTrack(track, 'en'));
export const ARTISTS = LOCALIZED_ARTISTS.map((artist) => ({ ...artist, name: artist.name.en, genre: artist.genre.en }));
export const ALBUMS = LOCALIZED_ALBUMS.map((album) => ({ ...album, title: album.title.en, artist: album.artist.en }));
export const PLAYLISTS = LOCALIZED_PLAYLISTS.map((playlist) => ({ ...playlist, title: playlist.title.en, description: playlist.description.en, curator: playlist.curator.en }));

export const musicText = (value: string, language: 'en' | 'de') => language === 'de' ? (MUSIC_DE_TEXT[value] ?? value) : value;
export const musicGenreLabel = (value: string, language: 'en' | 'de') => language === 'de' ? ({ All: 'Alle', Nature: 'Natur' }[value] ?? value) : value;





