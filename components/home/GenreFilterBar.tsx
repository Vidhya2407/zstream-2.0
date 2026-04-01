'use client';
import { useLanguageStore } from '../../lib/stores/languageStore';
import { FilterChips, type FilterChipItem } from '../../shared/ui';
import { homeGenres } from './config';

interface GenreFilterBarProps {
  selected: string;
  onChange: (genre: string) => void;
}

export default function GenreFilterBar({ selected, onChange }: GenreFilterBarProps) {
  const { language } = useLanguageStore();
  const items: FilterChipItem[] = homeGenres.map((genre) => ({
    id: genre.id,
    label: language === 'de' ? genre.de : genre.en,
  }));

  return <FilterChips activeId={selected} activeLayoutId="genre-pill" fadeRight items={items} onChange={onChange} />;
}


