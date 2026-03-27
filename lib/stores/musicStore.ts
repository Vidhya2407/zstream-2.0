import { create } from 'zustand';
import type { Track } from '@/types/media';

export type { Track };

interface MusicState {
  currentTrack: Track | null;
  isPlaying: boolean;
  isLoading: boolean;
  progress: number;
  volume: number;
  queue: Track[];
  isShuffled: boolean;
  isRepeating: boolean;
  showLyrics: boolean;
  setTrack: (track: Track, queue?: Track[]) => void;
  togglePlay: () => void;
  setProgress: (p: number) => void;
  setVolume: (v: number) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  clearTrack: () => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  toggleLyrics: () => void;
  setLoading: (l: boolean) => void;
}

export const useMusicStore = create<MusicState>((set, get) => ({
  currentTrack: null,
  isPlaying: false,
  isLoading: false,
  progress: 0,
  volume: 0.8,
  queue: [],
  isShuffled: false,
  isRepeating: false,
  showLyrics: false,
  setTrack: (track, queue) =>
    set({ currentTrack: track, isPlaying: true, isLoading: true, progress: 0, ...(queue ? { queue } : {}) }),
  togglePlay: () => set((s) => ({ isPlaying: !s.isPlaying })),
  setLoading: (isLoading) => set({ isLoading }),
  setProgress: (progress) => set({ progress }),
  setVolume: (volume) => set({ volume }),
  nextTrack: () => {
    const { queue, currentTrack, isShuffled } = get();
    if (!currentTrack || !queue.length) return;
    const idx = queue.findIndex((t) => t.id === currentTrack.id);
    const nextIdx = isShuffled
      ? Math.floor(Math.random() * queue.length)
      : (idx + 1) % queue.length;
    set({ currentTrack: queue[nextIdx], progress: 0 });
  },
  prevTrack: () => {
    const { queue, currentTrack } = get();
    if (!currentTrack || !queue.length) return;
    const idx = queue.findIndex((t) => t.id === currentTrack.id);
    set({ currentTrack: queue[(idx - 1 + queue.length) % queue.length], progress: 0 });
  },
  clearTrack: () => set({ currentTrack: null, isPlaying: false, progress: 0 }),
  toggleShuffle: () => set((s) => ({ isShuffled: !s.isShuffled })),
  toggleRepeat: () => set((s) => ({ isRepeating: !s.isRepeating })),
  toggleLyrics: () => set((s) => ({ showLyrics: !s.showLyrics })),
}));
