import { create } from 'zustand';
import { subCategories, type MainCategory } from '../config/navigation';

interface NavigationState {
  activeMainCategory: MainCategory;
  activeSubCategory: string | null;
  setMainCategory: (category: MainCategory) => void;
  setSubCategory: (subCategory: string) => void;
}

export { subCategories, type MainCategory };
export type SubCategory = (typeof subCategories)[MainCategory][number];

export const useNavigationStore = create<NavigationState>((set) => ({
  activeMainCategory: 'home',
  activeSubCategory: null,
  setMainCategory: (category) =>
    set({
      activeMainCategory: category,
      activeSubCategory: subCategories[category][0]?.id || null,
    }),
  setSubCategory: (subCategory) => set({ activeSubCategory: subCategory }),
}));
