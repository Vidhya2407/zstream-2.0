import { create } from 'zustand';

interface CarbonState {
  totalSaved: number;
  streamingTime: number;
  addSaved: (amount: number) => void;
  incrementStreamingTime: (minutes: number) => void;
  reset: () => void;
}

export const useCarbonStore = create<CarbonState>((set) => ({
  totalSaved: 0,
  streamingTime: 0,
  addSaved: (amount) => set((state) => ({ totalSaved: state.totalSaved + amount })),
  incrementStreamingTime: (minutes) => set((state) => ({ streamingTime: state.streamingTime + minutes })),
  reset: () => set({ totalSaved: 0, streamingTime: 0 })
}));