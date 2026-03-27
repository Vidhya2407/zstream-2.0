import { useHydrated } from '@/hooks/useHydrated';
import { useLanguageStore } from '../stores/languageStore';
import enCommon from '../../locales/en/common.json';
import deCommon from '../../locales/de/common.json';

export type Language = 'en' | 'de';

type TranslationMessages = typeof enCommon.common;
type TranslationBranch = Record<string, unknown>;
type TranslationValue = string | number | boolean | TranslationBranch | undefined;

export const translations = {
  en: enCommon,
  de: deCommon,
};

export const getTranslations = (language: Language) => {
  return translations[language];
};

export const useInstantTranslations = () => {
  const { language } = useLanguageStore();
  const hydrated = useHydrated(useLanguageStore);
  const resolvedLanguage: Language = hydrated ? language : 'en';
  return resolvedLanguage === 'de' ? deCommon.common : enCommon.common;
};

export const useTranslations = (language: Language) => {
  return getTranslations(language).common;
};

const getTranslationValue = (messages: TranslationMessages, key: string): TranslationValue => {
  return key.split('.').reduce<TranslationValue>((current, part) => {
    if (!current || typeof current !== 'object' || Array.isArray(current) || !(part in current)) {
      return undefined;
    }

    return (current as TranslationBranch)[part] as TranslationValue;
  }, messages);
};

export const useAppTranslations = () => {
  const { language } = useLanguageStore();
  const hydrated = useHydrated(useLanguageStore);
  const resolvedLanguage: Language = hydrated ? language : 'en';
  const messages = resolvedLanguage === 'de' ? deCommon.common : enCommon.common;
  const isGerman = resolvedLanguage === 'de';

  const t = (key: string, fallback?: string) => {
    const value = getTranslationValue(messages, key);
    return typeof value === 'string' ? value : fallback ?? key;
  };

  return { language: resolvedLanguage, isGerman, messages, t, hydrated };
};
