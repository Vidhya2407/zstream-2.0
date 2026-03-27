'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { calculateImpact } from '../../lib/impact/calculator';
import { useCarbonStore } from '../../lib/stores/carbonStore';
import { useLanguageStore } from '../../lib/stores/languageStore';
import { useThemeStore } from '../../lib/stores/themeStore';

interface CarbonPlaybackTrackerProps {
  isPlaying: boolean;
  currentTime: number;
  resolution?: number;
}

function formatGrams(kg: number): string {
  const g = kg * 1000;
  if (g < 1) return `${(g * 1000).toFixed(2)} mg`;
  return `${g.toFixed(3)} g`;
}

export default function CarbonPlaybackTracker({ isPlaying, currentTime, resolution = 720 }: CarbonPlaybackTrackerProps) {
  const { addSaved, incrementStreamingTime } = useCarbonStore();
  const { language } = useLanguageStore();
  const { theme } = useThemeStore();
  const isGerman = language === 'de';
  const isLight = theme === 'light';
  const [sessionSaved, setSessionSaved] = React.useState(0);
  const [sessionMinutes, setSessionMinutes] = React.useState(0);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [milestone, setMilestone] = React.useState<string | null>(null);
  const prevTimeRef = React.useRef(0);
  const milestoneRef = React.useRef(0);

  React.useEffect(() => {
    if (!isPlaying) {
      prevTimeRef.current = currentTime;
      return;
    }
    const delta = currentTime - prevTimeRef.current;
    prevTimeRef.current = currentTime;
    if (delta <= 0 || delta > 5) return;

    const deltaMinutes = delta / 60;
    const impact = calculateImpact({ durationMinutes: deltaMinutes, resolutionHeight: resolution, bitrateKbps: 3500, deviceType: 'desktop', networkType: 'wifi', ecoMode: true });
    const savedThisTick = impact.co2SavedKg;
    setSessionSaved((prev) => {
      const next = prev + savedThisTick;
      if (Math.floor(next * 10000) > Math.floor(milestoneRef.current * 10000) && Math.floor(next * 1000) % 5 === 0 && next > 0.001) {
        milestoneRef.current = next;
        setMilestone(`${formatGrams(next)} CO2 saved!`);
        setTimeout(() => setMilestone(null), 2500);
      }
      return next;
    });
    setSessionMinutes((prev) => prev + deltaMinutes);
    addSaved(savedThisTick);
    incrementStreamingTime(deltaMinutes);
  }, [currentTime, isPlaying, resolution, addSaved, incrementStreamingTime]);

  const impact = calculateImpact({ durationMinutes: Math.max(sessionMinutes, 0.01), resolutionHeight: resolution, bitrateKbps: 3500, deviceType: 'desktop', networkType: 'wifi', ecoMode: true });
  const savedGrams = sessionSaved * 1000;
  const waterSaved = impact.waterSavedLiters;
  const title = isLight ? '#0f172a' : '#ffffff';
  const muted = isLight ? '#64748b' : '#9ca3af';
  const faint = isLight ? '#94a3b8' : '#6b7280';

  return (
    <motion.div className="relative rounded-2xl overflow-hidden cursor-pointer" style={{ background: isLight ? 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(236,253,245,0.95) 100%)' : 'linear-gradient(135deg, rgba(0,229,186,0.06) 0%, rgba(0,217,255,0.04) 100%)', border: isLight ? '1px solid rgba(15,23,42,0.08)' : '1px solid rgba(0,229,186,0.14)' }} onClick={() => setIsExpanded((v) => !v)} whileHover={{ scale: 1.005 }}>
      <div className="flex items-center gap-4 px-5 py-4"><div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 relative" style={{ background: 'rgba(0,229,186,0.12)', border: '1px solid rgba(0,229,186,0.2)' }}><svg className="w-5 h-5" fill="none" stroke="rgb(0,229,186)" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20v-8m0 0c-2-2-4-4-4-6a4 4 0 018 0c0 2-2 4-4 6z" /></svg>{isPlaying && <motion.div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full" style={{ background: 'rgb(0,229,186)' }} animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }} transition={{ duration: 1.6, repeat: Infinity }} />}</div><div className="flex-1 min-w-0"><p className="text-[11px] font-medium mb-0.5 uppercase tracking-wider" style={{ color: muted }}>{isGerman ? 'Live-CO2-Impact' : 'Live Carbon Impact'}</p><div className="flex items-baseline gap-2 flex-wrap"><motion.span key={Math.round(savedGrams * 100)} className="text-lg font-black" style={{ color: 'rgb(0,229,186)' }} initial={{ y: -4, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.25 }}>{savedGrams < 1 ? `${(savedGrams * 1000).toFixed(1)} mg` : `${savedGrams.toFixed(3)} g`}</motion.span><span className="text-xs font-medium" style={{ color: muted }}>CO2 saved watching this</span></div></div><div className="text-right flex-shrink-0"><p className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: faint }}>{isGerman ? 'vs. Branche' : 'vs Industry'}</p><p className="text-xs font-bold text-eco-green-bright">{((1 - 28 / 72) * 100).toFixed(0)}% {isGerman ? 'weniger' : 'less'}</p></div><motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.25 }} className="flex-shrink-0" style={{ color: faint }}><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg></motion.div></div>
      <AnimatePresence>{isExpanded && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden"><div className="px-5 pb-5 pt-1" style={{ borderTop: isLight ? '1px solid rgba(15,23,42,0.08)' : '1px solid rgba(0,229,186,0.08)' }}><div className="grid grid-cols-3 gap-3 mb-4">{[{ label: 'CO2 Saved', value: savedGrams < 1 ? `${(savedGrams * 1000).toFixed(1)} mg` : `${savedGrams.toFixed(3)} g`, color: 'rgb(0,229,186)', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 20v-8m0 0c-2-2-4-4-4-6a4 4 0 018 0c0 2-2 4-4 6z" /> }, { label: isGerman ? 'Wasser gespart' : 'Water Saved', value: `${(waterSaved * 1000).toFixed(1)} mL`, color: 'rgb(0,217,255)', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /> }, { label: isGerman ? 'Streaming-Zeit' : 'Watch Time', value: `${sessionMinutes < 1 ? `${Math.round(sessionMinutes * 60)}s` : `${sessionMinutes.toFixed(1)} min`}`, color: 'rgb(96,165,250)', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /> }].map((stat) => <div key={stat.label} className="rounded-xl p-3 text-center" style={{ background: `${stat.color}08`, border: `1px solid ${stat.color}20` }}><svg className="w-4 h-4 mx-auto mb-1.5" fill="none" stroke={stat.color} strokeWidth={2} viewBox="0 0 24 24">{stat.icon}</svg><p className="font-black text-sm" style={{ color: stat.color }}>{stat.value}</p><p className="text-[10px] mt-0.5" style={{ color: muted }}>{stat.label}</p></div>)}</div><div className="rounded-xl p-3" style={{ background: isLight ? 'rgba(248,250,252,0.92)' : 'rgba(0,0,0,0.2)', border: isLight ? '1px solid rgba(15,23,42,0.08)' : '1px solid rgba(255,255,255,0.04)' }}><div className="flex items-center justify-between mb-2"><span className="text-[10px] uppercase tracking-wider" style={{ color: muted }}>{isGerman ? 'Streaming-Effizienz' : 'Streaming efficiency'}</span><span className="text-[10px] font-bold text-eco-green-bright">{isGerman ? 'ZSTREAM vs. Branche' : 'ZSTREAM vs Industry'}</span></div><div className="flex items-center gap-2"><div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.06)' }}><motion.div className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, rgb(0,229,186), rgb(0,217,255))' }} initial={{ width: 0 }} animate={{ width: '38%' }} transition={{ duration: 1.2, delay: 0.2 }} /></div><span className="text-[10px] font-medium w-12 text-right" style={{ color: muted }}>28 g/GB</span></div><div className="flex items-center gap-2 mt-1.5"><div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.06)' }}><motion.div className="h-full rounded-full" style={{ background: 'rgba(239,68,68,0.5)' }} initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1.2, delay: 0.3 }} /></div><span className="text-[10px] font-medium w-12 text-right" style={{ color: faint }}>72 g/GB</span></div><p className="text-[10px] mt-2" style={{ color: muted }}>ZSTREAM uses {((1 - 28 / 72) * 100).toFixed(0)}% less energy per GB than the global average. Eco mode active · 720p optimised.</p></div></div></motion.div>}</AnimatePresence>
      <AnimatePresence>{milestone && <motion.div className="absolute top-2 right-12 px-3 py-1.5 rounded-full text-[11px] font-bold pointer-events-none z-20" style={{ background: 'rgba(0,229,186,0.9)', color: '#0A0F18', boxShadow: '0 0 20px rgba(0,229,186,0.4)' }} initial={{ opacity: 0, y: 8, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.9 }}>CO2 {milestone}</motion.div>}</AnimatePresence>
    </motion.div>
  );
}
