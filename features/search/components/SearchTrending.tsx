interface SearchTrendingProps {
  isLight: boolean;
  title: string;
  trending: readonly string[];
  onSelect: (value: string) => void;
}

export default function SearchTrending({ isLight, onSelect, title, trending }: SearchTrendingProps) {
  return (
    <div className="mb-8">
      <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: isLight ? '#64748b' : '#6b7280' }}>{title}</p>
      <div className="flex flex-wrap gap-2">
        {trending.map((trend) => <button key={trend} className="px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all" onClick={() => onSelect(trend)} style={{ background: isLight ? 'rgba(255,255,255,0.82)' : 'rgba(255,255,255,0.06)', color: isLight ? '#475569' : 'rgba(255,255,255,0.7)', border: `1px solid ${isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.08)'}` }}>{trend}</button>)}
      </div>
    </div>
  );
}
