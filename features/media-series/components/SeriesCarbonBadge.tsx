interface SeriesCarbonBadgeProps {
  score: number;
}

export default function SeriesCarbonBadge({ score }: SeriesCarbonBadgeProps) {
  const grade = score < 0.06 ? { label: 'A+', color: 'rgb(0,229,186)', bg: 'rgba(0,229,186,0.1)', border: 'rgba(0,229,186,0.2)' } : score < 0.08 ? { label: 'A', color: 'rgb(0,217,255)', bg: 'rgba(0,217,255,0.1)', border: 'rgba(0,217,255,0.2)' } : { label: 'B', color: 'rgb(96,165,250)', bg: 'rgba(96,165,250,0.1)', border: 'rgba(96,165,250,0.2)' };
  return <span className="text-[9px] font-black px-2 py-0.5 rounded-full" style={{ background: grade.bg, color: grade.color, border: `1px solid ${grade.border}` }}>{grade.label} | {(score * 1000).toFixed(0)}mg/hr</span>;
}


