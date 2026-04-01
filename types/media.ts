export type MusicQuality = 'low' | 'normal' | 'high' | 'veryhigh' | 'lossless';

export interface Track {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: string;
  durationSeconds: number;
  genre: string;
  imageUrl: string;
  audioUrl: string;
  carbonPerMin: number;
  audioQuality?: MusicQuality;
}



