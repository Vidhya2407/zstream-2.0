'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useHydrated } from '@/hooks/useHydrated';
import { useThemeStore } from '@/lib/stores/themeStore';

const MONTHLY_DATA = [
  { month: 'Jan', saved: 0.8, industry: 2.1, streams: 24 },
  { month: 'Feb', saved: 1.2, industry: 3.1, streams: 38 },
  { month: 'Mar', saved: 0.9, industry: 2.4, streams: 29 },
  { month: 'Apr', saved: 1.8, industry: 4.7, streams: 52 },
  { month: 'May', saved: 2.1, industry: 5.5, streams: 61 },
  { month: 'Jun', saved: 1.6, industry: 4.2, streams: 48 },
  { month: 'Jul', saved: 2.4, industry: 6.3, streams: 71 },
  { month: 'Aug', saved: 3.1, industry: 8.1, streams: 89 },
  { month: 'Sep', saved: 2.7, industry: 7.1, streams: 79 },
  { month: 'Oct', saved: 3.4, industry: 8.9, streams: 96 },
  { month: 'Nov', saved: 3.8, industry: 9.9, streams: 104 },
  { month: 'Dec', saved: 4.2, industry: 11.0, streams: 118 },
];

const W = 780; const H = 200;
const PAD_L = 52; const PAD_T = 20; const PAD_B = 44; const PAD_R = 20;
const VB_W = PAD_L + W + PAD_R;
const VB_H = PAD_T + H + PAD_B;

function catmullRomPath(pts: { x: number; y: number }[], tension = 0.22): string {
  if (pts.length < 2) return '';
  const pad = [pts[0], ...pts, pts[pts.length - 1]];
  let d = `M ${pts[0].x.toFixed(2)},${pts[0].y.toFixed(2)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pad[i], p1 = pad[i + 1], p2 = pad[i + 2], p3 = pad[i + 3];
    const cp1x = p1.x + (p2.x - p0.x) * tension;
    const cp1y = p1.y + (p2.y - p0.y) * tension;
    const cp2x = p2.x - (p3.x - p1.x) * tension;
    const cp2y = p2.y - (p3.y - p1.y) * tension;
    d += ` C ${cp1x.toFixed(2)},${cp1y.toFixed(2)} ${cp2x.toFixed(2)},${cp2y.toFixed(2)} ${p2.x.toFixed(2)},${p2.y.toFixed(2)}`;
  }
  return d;
}

export default function CarbonTimelineChart() {
  const hydrated = useHydrated(useThemeStore);
  const { theme } = useThemeStore();
  const isLight = (hydrated ? theme : 'dark') === 'light';
  const [hovered, setHovered] = React.useState<number | null>(null);
  const [activeView, setActiveView] = React.useState<'saved' | 'industry'>('saved');
  const maxVal = Math.max(...MONTHLY_DATA.map((d) => d.industry)) * 1.12;
  const yGrid = [0, 25, 50, 75, 100].map((pct) => ({ pct, val: (maxVal * pct) / 100, y: PAD_T + H - (H * pct) / 100 }));
  const toPoint = (val: number, i: number) => ({ x: PAD_L + (i / (MONTHLY_DATA.length - 1)) * W, y: PAD_T + H - (val / maxVal) * H });
  const savedPts = MONTHLY_DATA.map((d, i) => toPoint(d.saved, i));
  const industryPts = MONTHLY_DATA.map((d, i) => toPoint(d.industry, i));
  const savedPath = catmullRomPath(savedPts);
  const industryPath = catmullRomPath(industryPts);
  const savedAreaPath = `${catmullRomPath(savedPts)} L ${savedPts[savedPts.length - 1].x},${PAD_T + H} L ${PAD_L},${PAD_T + H} Z`;
  const totalSaved = MONTHLY_DATA.reduce((s, d) => s + d.saved, 0);
  const totalIndustry = MONTHLY_DATA.reduce((s, d) => s + d.industry, 0);
  const savingsPct = (((totalIndustry - totalSaved) / totalIndustry) * 100).toFixed(0);
  const title = isLight ? '#0f172a' : '#ffffff';
  const muted = isLight ? '#64748b' : '#6b7280';
  const gridStroke = isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.05)';
  const chartBg = isLight ? 'rgba(255,255,255,0.72)' : 'rgba(0,0,0,0.2)';
  const tooltipBg = isLight ? 'rgba(255,255,255,0.98)' : 'rgba(10,15,24,0.95)';

  return (
    <div className="w-full">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-black" style={{ color: title }}>Estimated Impact vs Industry</h2>
          <p className="mt-0.5 text-[11px]" style={{ color: muted }}>
            Your modeled ZSTREAM footprint is <span className="font-bold text-eco-green-bright">{totalSaved.toFixed(1)} kg CO2</span> this year vs <span className="font-bold text-red-400">{totalIndustry.toFixed(1)} kg</span> industry average, <span className="font-bold" style={{ color: 'rgb(0,229,186)' }}>{savingsPct}% lower</span>
          </p>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-semibold">
          <button onClick={() => setActiveView('saved')} className="flex items-center gap-1.5 transition-colors" style={{ color: activeView === 'saved' ? 'rgb(0,229,186)' : muted }}><span className="inline-block h-0.5 w-4 rounded-full" style={{ background: 'rgb(0,229,186)' }} />ZSTREAM estimate</button>
          <button onClick={() => setActiveView('industry')} className="flex items-center gap-1.5 transition-colors" style={{ color: activeView === 'industry' ? 'rgb(248,113,113)' : muted }}><span className="inline-block h-px w-4 rounded-full border-t border-dashed" style={{ borderColor: 'rgb(248,113,113)' }} />Industry avg</button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl" style={{ background: chartBg }}>
        <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="w-full" style={{ height: 'clamp(180px, 28vw, 260px)' }}>
          <defs>
            <linearGradient id="savedGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="rgb(0,229,186)" stopOpacity="0.25" /><stop offset="100%" stopColor="rgb(0,229,186)" stopOpacity="0" /></linearGradient>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="rgb(0,217,255)" /><stop offset="100%" stopColor="rgb(0,229,186)" /></linearGradient>
          </defs>
          {yGrid.map(({ val, y }) => <g key={val}><line x1={PAD_L} y1={y} x2={PAD_L + W} y2={y} stroke={gridStroke} strokeWidth="1" /><text x={PAD_L - 6} y={y + 4} fill={muted} fontSize="9" textAnchor="end">{val.toFixed(1)}</text></g>)}
          {MONTHLY_DATA.map((d, i) => <text key={d.month} x={PAD_L + (i / (MONTHLY_DATA.length - 1)) * W} y={VB_H - 8} fill={muted} fontSize="9" textAnchor="middle">{d.month}</text>)}
          <motion.path d={savedAreaPath} fill="url(#savedGrad)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }} />
          <motion.path d={industryPath} fill="none" stroke="rgba(248,113,113,0.45)" strokeWidth="1.5" strokeDasharray="5 4" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 2.2, delay: 0.4, ease: 'easeOut' }} />
          <motion.path d={savedPath} fill="none" stroke="url(#lineGrad)" strokeWidth="2.5" strokeLinecap="round" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 2, delay: 0.2, ease: 'easeOut' }} />
          {savedPts.map((pt, i) => <g key={i}><rect x={pt.x - 26} y={PAD_T} width={52} height={H} fill="transparent" style={{ cursor: 'pointer' }} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} /><motion.circle cx={pt.x} cy={pt.y} r={hovered === i ? 5 : 3.5} fill={hovered === i ? (isLight ? '#0f172a' : 'white') : 'rgb(0,229,186)'} stroke="rgb(0,229,186)" strokeWidth={hovered === i ? 2 : 0} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 + i * 0.1, duration: 0.3 }} style={{ transition: 'r 0.15s, fill 0.15s' }} /></g>)}
          {hovered !== null && (() => { const pt = savedPts[hovered]; const d = MONTHLY_DATA[hovered]; const tooltipX = Math.min(Math.max(pt.x - 48, PAD_L), PAD_L + W - 96); return <g><line x1={pt.x} y1={PAD_T} x2={pt.x} y2={PAD_T + H} stroke="rgba(0,229,186,0.25)" strokeWidth="1" strokeDasharray="3 3" /><rect x={tooltipX} y={pt.y - 52} width={96} height={46} rx={6} ry={6} fill={tooltipBg} stroke="rgba(0,229,186,0.3)" /><text x={tooltipX + 8} y={pt.y - 36} fill="rgb(0,229,186)" fontSize="10" fontWeight="800">{d.saved.toFixed(1)} kg estimate</text><text x={tooltipX + 8} y={pt.y - 22} fill={muted} fontSize="9">{d.streams} streams · {d.month}</text><text x={tooltipX + 8} y={pt.y - 10} fill="rgba(248,113,113,0.8)" fontSize="9">Industry: {d.industry.toFixed(1)} kg</text></g>; })()}
        </svg>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        {[{ label: 'ZSTREAM estimate', value: `${totalSaved.toFixed(1)} kg`, color: 'rgb(0,229,186)' }, { label: 'Peak month', value: 'Dec · 4.2 kg', color: 'rgb(0,217,255)' }, { label: 'Total streams', value: `${MONTHLY_DATA.reduce((s, d) => s + d.streams, 0)}`, color: 'rgb(96,165,250)' }, { label: 'vs Industry', value: `${savingsPct}% lower`, color: 'rgb(0,229,186)' }].map((stat) => <div key={stat.label} className="text-center"><p className="text-sm font-black" style={{ color: stat.color }}>{stat.value}</p><p className="mt-0.5 text-[10px]" style={{ color: muted }}>{stat.label}</p></div>)}
      </div>
    </div>
  );
}



