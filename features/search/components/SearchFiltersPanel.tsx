interface SearchFilterGroupProps {
  isLight: boolean;
  label: string;
  options: readonly string[];
  translateOption: (value: string) => string;
  value: string;
  onChange: (value: string) => void;
}

function SearchFilterGroup({ isLight, label, onChange, options, translateOption, value }: SearchFilterGroupProps) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: isLight ? '#64748b' : '#9ca3af' }}>{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {options.map((option) => <button key={option} className="px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all" onClick={() => onChange(option)} style={{ background: value === option ? 'rgba(0,229,186,0.15)' : isLight ? 'rgba(15,23,42,0.05)' : 'rgba(255,255,255,0.05)', color: value === option ? 'rgb(0,229,186)' : isLight ? '#64748b' : 'rgba(255,255,255,0.5)', border: `1px solid ${value === option ? 'rgba(0,229,186,0.35)' : isLight ? 'rgba(15,23,42,0.08)' : 'transparent'}` }}>{translateOption(option)}</button>)}
      </div>
    </div>
  );
}

interface SearchFiltersPanelProps {
  genre: string;
  isLight: boolean;
  lang: string;
  minCarbon: number;
  resetLabel: string;
  title: string;
  type: string;
  typeLabel: string;
  genreLabel: string;
  languageLabel: string;
  minCarbonLabel: string;
  minCarbonAria: string;
  types: readonly string[];
  genres: readonly string[];
  languages: readonly string[];
  translateOption: (value: string) => string;
  onGenreChange: (value: string) => void;
  onLangChange: (value: string) => void;
  onMinCarbonChange: (value: number) => void;
  onReset: () => void;
  onTypeChange: (value: string) => void;
}

export default function SearchFiltersPanel(props: SearchFiltersPanelProps) {
  const { genre, genreLabel, genres, isLight, lang, languageLabel, languages, minCarbon, minCarbonAria, minCarbonLabel, onGenreChange, onLangChange, onMinCarbonChange, onReset, onTypeChange, resetLabel, title, translateOption, type, typeLabel, types } = props;
  return (
    <div className="sticky top-24 rounded-2xl p-5 space-y-5" style={{ background: isLight ? 'rgba(255,255,255,0.76)' : 'rgba(255,255,255,0.03)', border: `1px solid ${isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.07)'}` }}>
      <h2 className="font-bold text-sm" style={{ color: isLight ? '#0f172a' : '#ffffff' }}>{title}</h2>
      <SearchFilterGroup isLight={isLight} label={typeLabel} onChange={onTypeChange} options={types} translateOption={translateOption} value={type} />
      <SearchFilterGroup isLight={isLight} label={genreLabel} onChange={onGenreChange} options={genres} translateOption={translateOption} value={genre} />
      <SearchFilterGroup isLight={isLight} label={languageLabel} onChange={onLangChange} options={languages} translateOption={translateOption} value={lang} />
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider block mb-2" style={{ color: isLight ? '#64748b' : '#9ca3af' }}>{minCarbonLabel}: <span style={{ color: 'rgb(0,229,186)' }}>{minCarbon}</span></label>
        <input aria-label={minCarbonAria} className="w-full accent-green-400" max={100} min={0} onChange={(event) => onMinCarbonChange(Number(event.target.value))} step={5} type="range" value={minCarbon} />
      </div>
      <button className="w-full py-2 rounded-xl text-xs font-semibold transition-colors" onClick={onReset} style={{ background: isLight ? 'rgba(15,23,42,0.05)' : 'rgba(255,255,255,0.05)', color: isLight ? '#475569' : 'rgba(255,255,255,0.5)' }}>{resetLabel}</button>
    </div>
  );
}


