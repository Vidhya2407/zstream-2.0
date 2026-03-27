import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ImpactHistory {
  date: string;
  co2Saved: number;
  waterSaved: number;
  ewasteSaved: number;
}

interface ImpactState {
  totalCO2Saved: number;
  totalWaterSaved: number;
  totalEwasteSaved: number;
  monthlyHistory: ImpactHistory[];
  addImpact: (co2: number, water: number, ewaste: number) => void;
  resetStats: () => void;
}

export const useImpactStore = create<ImpactState>()(
  persist(
    (set, get) => ({
      totalCO2Saved: 0,
      totalWaterSaved: 0,
      totalEwasteSaved: 0,
      monthlyHistory: [],
      addImpact: (co2, water, ewaste) => {
        const today = new Date().toISOString().split('T')[0];
        set((state) => ({
          totalCO2Saved: state.totalCO2Saved + co2,
          totalWaterSaved: state.totalWaterSaved + water,
          totalEwasteSaved: state.totalEwasteSaved + ewaste,
          monthlyHistory: [
            ...state.monthlyHistory.filter(h => h.date !== today),
            { date: today, co2Saved: co2, waterSaved: water, ewasteSaved: ewaste }
          ].slice(-30)
        }));
      },
      resetStats: () => set({ totalCO2Saved: 0, totalWaterSaved: 0, totalEwasteSaved: 0, monthlyHistory: [] })
    }),
    { name: 'impact-storage' }
  )
);
