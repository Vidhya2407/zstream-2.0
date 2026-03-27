import { create } from 'zustand';
import { persist, PersistStorage } from 'zustand/middleware';
import enTranslations from '../../locales/en/common.json';
import deTranslations from '../../locales/de/common.json';

type Language = 'en' | 'de';

// Pre-cache all translations (translate once)
const TRANSLATION_CACHE = {
  en: enTranslations.common,
  de: deTranslations.common
} as const;

interface LanguageStore {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggle: () => void;
  // Instant cached getter
  getCurrentTranslations: () => typeof TRANSLATION_CACHE['en'];
}

const storage: PersistStorage<LanguageStore> | undefined = 
  typeof window !== 'undefined'
    ? {
        getItem: (name: string) => {
          const item = localStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name: string, value: any) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name: string) => {
          localStorage.removeItem(name);
        }
      }
    : undefined;

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set, get) => ({
      language: 'en',
      setLanguage: (lang: Language) => set({ language: lang }),
      toggle: () =>
        set((state) => ({
          language: state.language === 'en' ? 'de' : 'en'
        })),
      // Instant cached translation getter (zero lag)
      getCurrentTranslations: () => {
        const lang = get().language;
        return TRANSLATION_CACHE[lang];
      }
    }),
    {
      name: 'language-store',
      storage: storage
    }
  )
);
