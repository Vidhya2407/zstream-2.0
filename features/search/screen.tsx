'use client';

import React from 'react';
import SearchFiltersPanel from './components/SearchFiltersPanel';
import SearchInput from './components/SearchInput';
import SearchResults from './components/SearchResults';
import SearchTrending from './components/SearchTrending';
import { useSearchScreen } from './hooks/useSearchScreen';

export default function SearchPage() {
  const {
    filtered,
    focused,
    genre,
    inputRef,
    isLight,
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
  } = useSearchScreen();

  return (
    <div className="min-h-screen" style={{ background: isLight ? '#f0f4f7' : 'var(--color-dark-base, #0A0F18)' }}>
      <div className="max-w-7xl mx-auto px-8 lg:px-12 pt-24 pb-32">
        <h1 className="font-black text-3xl mb-8" style={{ color: isLight ? '#0f172a' : '#ffffff' }}>{searchLabel('search')}</h1>

        <SearchInput focused={focused} inputRef={inputRef} isLight={isLight} onBlur={() => setTimeout(() => setFocused(false), 150)} onChange={(value) => setQuery(value.replace(/[^\p{L}\p{N}\s&'.,!?-]/gu, '').trimStart())} onClear={() => setQuery('')} onFocus={() => setFocused(true)} placeholder={searchLabel('placeholder')} query={query} />

        {!query && searchContent && <SearchTrending isLight={isLight} onSelect={setQuery} title={searchLabel('trending')} trending={searchContent.trending} />}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1">
            <SearchFiltersPanel genre={genre} genreLabel={searchLabel('genre')} genres={searchContent?.genres ?? []} isLight={isLight} lang={lang} languageLabel={searchLabel('language')} languages={searchContent?.languages ?? []} minCarbon={minCarbon} minCarbonAria={searchLabel('minCarbonAria')} minCarbonLabel={searchLabel('minCarbon')} onGenreChange={setGenre} onLangChange={setLang} onMinCarbonChange={setMinCarbon} onReset={() => { setGenre('All'); setType('All'); setLang('All'); setMinCarbon(0); }} onTypeChange={setType} resetLabel={searchLabel('reset')} title={searchLabel('filters')} translateOption={searchOption} type={type} typeLabel={searchLabel('type')} types={searchContent?.types ?? []} />
          </aside>
          <div className="lg:col-span-3">
            <SearchResults filtered={filtered} isLight={isLight} isLoading={isLoading} language={language} loadError={loadError} query={query} searchLabel={searchLabel} searchOption={searchOption} />
          </div>
        </div>
      </div>
    </div>
  );
}
