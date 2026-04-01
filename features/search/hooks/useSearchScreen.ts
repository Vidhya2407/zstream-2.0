import React from 'react';
import { useApiResource } from '../../../hooks/useApiResource';
import type { SearchApiResponse } from '../../../lib/api/contracts';
import { useLanguageStore } from '../../../lib/stores/languageStore';
import { useThemeStore } from '../../../lib/stores/themeStore';
import { fetchSearchBrowser } from '../api';

interface SearchLabelObject {
  en: string;
  de: string;
}

type SearchLabelValue = string | SearchLabelObject | undefined;

export function useSearchScreen() {
  const { language } = useLanguageStore();
  const { theme } = useThemeStore();
  const [query, setQuery] = React.useState('');
  const [genre, setGenre] = React.useState('All');
  const [type, setType] = React.useState('All');
  const [lang, setLang] = React.useState('All');
  const [minCarbon, setMinCarbon] = React.useState(0);
  const [focused, setFocused] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const debouncedQuery = React.useDeferredValue(query);

  const loadSearch = React.useCallback((signal: AbortSignal) => fetchSearchBrowser(
    {
      contentLanguage: lang,
      genre,
      lang: language,
      minCarbon,
      q: debouncedQuery,
      type,
    },
    signal,
  ), [debouncedQuery, genre, lang, language, minCarbon, type]);

  const { data: searchResponse, isLoading, loadError } = useApiResource<SearchApiResponse>({ load: loadSearch });

  const labels = searchResponse?.data?.labels as Record<string, SearchLabelValue> | undefined;
  const resolveLabelValue = (value: SearchLabelValue) => {
    if (!value) return '';
    if (typeof value === 'string') return value;
    return value[language] ?? value.en;
  };

  const searchLabel = (key: string) => resolveLabelValue(labels?.[key]) || key;
  const searchOption = (value: string) => {
    const optionMap: Record<string, string> = {
      All: searchLabel('all'),
      English: searchLabel('english'),
      French: searchLabel('french'),
      German: searchLabel('german'),
      Japanese: searchLabel('japanese'),
      Korean: searchLabel('korean'),
      Live: searchLabel('live'),
      Minis: searchLabel('minis'),
      Movie: searchLabel('movie'),
      Music: searchLabel('music'),
      Series: searchLabel('series'),
      Spanish: searchLabel('spanish'),
      ZTube: searchLabel('ztube'),
    };

    return optionMap[value] ?? value;
  };

  const searchContent = searchResponse?.data;

  return {
    filtered: searchContent?.results ?? [],
    focused,
    genre,
    inputRef,
    isLight: theme === 'light',
    isLoading,
    lang,
    language,
    loadError,
    minCarbon,
    query,
    searchContent,
    searchLabel,
    searchOption,
    setFocused,
    setGenre,
    setLang,
    setMinCarbon,
    setQuery,
    setType,
    type,
  };
}


