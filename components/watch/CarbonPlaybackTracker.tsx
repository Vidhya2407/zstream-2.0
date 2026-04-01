'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { calculateImpactForecast, formatForecastValue } from '../../lib/impact/forecast';
import { useCarbonStore } from '../../lib/stores/carbonStore';
import { useLanguageStore } from '../../lib/stores/languageStore';
import { useThemeStore } from '../../lib/stores/themeStore';

interface CarbonPlaybackTrackerProps {
  isPlaying: boolean;
  currentTime: number;
  resolution?: number;
}

export default function CarbonPlaybackTracker({
  isPlaying,
  currentTime,
  resolution = 720,
}: CarbonPlaybackTrackerProps) {
  const { addSaved, incrementStreamingTime } = useCarbonStore();
  const { language } = useLanguageStore();
  const { theme } = useThemeStore();
  const isGerman = language === 'de';
  const isLight = theme === 'light';
  const [sessionMinutes, setSessionMinutes] = React.useState(0);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [milestone, setMilestone] = React.useState<string | null>(null);
  const prevTimeRef = React.useRef(0);
  const projectedSavingsRef = React.useRef(0);

  React.useEffect(() => {
    if (!isPlaying) {
      prevTimeRef.current = currentTime;
      return;
    }

    const delta = currentTime - prevTimeRef.current;
    prevTimeRef.current = currentTime;
    if (delta <= 0 || delta > 5) return;

    const deltaMinutes = delta / 60;
    const forecast = calculateImpactForecast({
      durationMinutes: deltaMinutes,
      resolutionHeight: resolution,
      ecoMode: true,
    });

    const nextProjected = projectedSavingsRef.current + forecast.projectedCo2SavedKg;
    if (
      Math.floor(nextProjected * 10000) > Math.floor(projectedSavingsRef.current * 10000) &&
      Math.floor(nextProjected * 1000) % 5 === 0 &&
      nextProjected > 0.001
    ) {
      setMilestone(`${formatForecastValue(nextProjected, 'co2')} projected savings`);
      setTimeout(() => setMilestone(null), 2500);
    }
    projectedSavingsRef.current = nextProjected;
    setSessionMinutes((prev) => prev + deltaMinutes);
    addSaved(forecast.projectedCo2SavedKg);
    incrementStreamingTime(deltaMinutes);
  }, [currentTime, isPlaying, resolution, addSaved, incrementStreamingTime]);

  const forecast = calculateImpactForecast({
    durationMinutes: Math.max(sessionMinutes, 0.01),
    resolutionHeight: resolution,
    ecoMode: true,
  });

  const muted = isLight ? '#64748b' : '#9ca3af';
  const faint = isLight ? '#94a3b8' : '#6b7280';
  const currentCo2 = formatForecastValue(forecast.estimatedCo2Kg, 'co2');
  const currentWater = formatForecastValue(forecast.waterLiters, 'water');
  const currentEwaste = formatForecastValue(forecast.ewasteGrams, 'ewaste');
  const projectedSavings = formatForecastValue(forecast.projectedCo2SavedKg, 'co2');
  const projectedPoints = `+${forecast.projectedPoints} pts`;

  const wasteStats = [
    {
      label: isGerman ? 'CO2-Abfall' : 'Carbon waste',
      value: currentCo2,
      color: 'rgb(0,229,186)',
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 20v-8m0 0c-2-2-4-4-4-6a4 4 0 018 0c0 2-2 4-4 6z" />,
    },
    {
      label: isGerman ? 'Wasser-Abfall' : 'Water waste',
      value: currentWater,
      color: 'rgb(0,217,255)',
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.5 3.2 5 6 5 9a5 5 0 11-10 0c0-3 2.5-5.8 5-9z" />,
    },
    {
      label: isGerman ? 'E-Abfall' : 'E-waste',
      value: currentEwaste,
      color: 'rgb(251,191,36)',
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.75h4.5m-7.5 3h10.5m-9 3h7.5m-9 3h10.5m-12 6h13.5A2.25 2.25 0 0021 18.75V8.25A2.25 2.25 0 0018.75 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21z" />,
    },
    {
      label: isGerman ? 'Streaming-Zeit' : 'Watch time',
      value: sessionMinutes < 1 ? `${Math.round(sessionMinutes * 60)}s` : `${sessionMinutes.toFixed(1)} min`,
      color: 'rgb(96,165,250)',
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />,
    },
  ];

  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl cursor-pointer"
      style={{
        background: isLight
          ? 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(236,253,245,0.95) 100%)'
          : 'linear-gradient(135deg, rgba(0,229,186,0.06) 0%, rgba(0,217,255,0.04) 100%)',
        border: isLight ? '1px solid rgba(15,23,42,0.08)' : '1px solid rgba(0,229,186,0.14)',
      }}
      onClick={() => setIsExpanded((v) => !v)}
      whileHover={{ scale: 1.005 }}
    >
      <div className="flex items-center gap-4 px-5 py-4">
        <div
          className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
          style={{ background: 'rgba(0,229,186,0.12)', border: '1px solid rgba(0,229,186,0.2)' }}
        >
          <svg className="w-5 h-5" fill="none" stroke="rgb(0,229,186)" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20v-8m0 0c-2-2-4-4-4-6a4 4 0 018 0c0 2-2 4-4 6z" />
          </svg>
          {isPlaying && (
            <motion.div
              className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full"
              style={{ background: 'rgb(0,229,186)' }}
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="mb-0.5 text-[11px] font-medium uppercase tracking-wider" style={{ color: muted }}>
            {isGerman ? 'Aktueller Streaming-Fussabdruck' : 'Current Streaming Footprint'}
          </p>
          <div className="flex items-baseline gap-2 flex-wrap">
            <motion.span
              key={Math.round(forecast.estimatedCo2Kg * 100000)}
              className="text-lg font-black"
              style={{ color: 'rgb(0,229,186)' }}
              initial={{ y: -4, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.25 }}
            >
              {currentCo2}
            </motion.span>
            <span className="text-xs font-medium" style={{ color: muted }}>
              {isGerman ? 'Geschaetzter CO2-Abfall fuer diese Sitzung' : 'Estimated carbon waste for this session'}
            </span>
          </div>
        </div>

        <div className="text-right flex-shrink-0">
          <p className="mb-0.5 text-[10px] uppercase tracking-wider" style={{ color: faint }}>
            {isGerman ? 'Aufloesung' : 'Resolution'}
          </p>
          <p className="text-xs font-bold text-eco-green-bright">{resolution}p</p>
        </div>

        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0"
          style={{ color: faint }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </motion.div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div
              className="px-5 pb-5 pt-1"
              style={{ borderTop: isLight ? '1px solid rgba(15,23,42,0.08)' : '1px solid rgba(0,229,186,0.08)' }}
            >
              <div className="mb-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: muted }}>
                  {isGerman ? 'Aktuelle Abfall-Schaetzung' : 'Current Waste Estimate'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5 sm:grid-cols-5">
                {wasteStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl p-3 text-center"
                    style={{ background: `${stat.color}08`, border: `1px solid ${stat.color}20` }}
                  >
                    <svg className="w-4 h-4 mx-auto mb-1.5" fill="none" stroke={stat.color} strokeWidth={2} viewBox="0 0 24 24">
                      {stat.icon}
                    </svg>
                    <p className="text-sm font-black" style={{ color: stat.color }}>
                      {stat.value}
                    </p>
                    <p className="mt-0.5 text-[10px]" style={{ color: muted }}>
                      {stat.label}
                    </p>
                  </div>
                ))}
                <div
                  className="rounded-xl p-3 text-center"
                  style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.22)' }}
                >
                  <svg className="w-4 h-4 mx-auto mb-1.5" fill="none" stroke="rgb(74,222,128)" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                  </svg>
                  <p className="text-sm font-black" style={{ color: 'rgb(74,222,128)' }}>
                    {projectedPoints}
                  </p>
                  <p className="mt-0.5 text-[10px]" style={{ color: muted }}>
                    {isGerman ? 'Geschaetzte Carbon-Punkte' : 'Estimated carbon points'}
                  </p>
                </div>
              </div>

              <div
                className="rounded-xl p-2.5 sm:p-3"
                style={{
                  background: isLight ? 'rgba(248,250,252,0.92)' : 'rgba(0,0,0,0.2)',
                  border: isLight ? '1px solid rgba(15,23,42,0.08)' : '1px solid rgba(255,255,255,0.04)',
                }}
              >
                <div className="mb-2 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: muted }}>
                      {isGerman ? 'Zero-Carbon-Sparvergleich' : 'Zero Carbon Savings Comparison'}
                    </p>
                    <p className="mt-0.5 text-[11px] font-medium" style={{ color: faint }}>
                      {isGerman ? 'Projizierte Zero-Carbon-Lieferung gegen Standard-Streaming' : 'Projected Zero Carbon delivery vs standard streaming'}
                    </p>
                  </div>
                  <div className="text-right min-w-[92px]">
                    <p className="text-[9px] uppercase tracking-wider" style={{ color: faint }}>
                      {isGerman ? 'Projizierte Einsparung' : 'Projected savings'}
                    </p>
                    <p className="text-base font-black text-eco-green-bright">{projectedSavings}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <div className="mb-1 flex items-center justify-between gap-3">
                      <span className="text-[10px] font-semibold" style={{ color: muted }}>
                      {isGerman ? 'Projizierte Zero-Carbon-Lieferung' : 'Projected Zero Carbon delivery'}
                      </span>
                      <span className="text-[10px] font-semibold" style={{ color: muted }}>
                        28 g/GB
                      </span>
                    </div>
                    <div
                      className="h-1.5 overflow-hidden rounded-full"
                      style={{ background: isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.06)' }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: 'linear-gradient(90deg, rgb(0,229,186), rgb(0,217,255))' }}
                        initial={{ width: 0 }}
                        animate={{ width: '38%' }}
                        transition={{ duration: 1.2, delay: 0.2 }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mb-1 flex items-center justify-between gap-3">
                      <span className="text-[10px] font-semibold" style={{ color: faint }}>
                        {isGerman ? 'Standard-Streaming-Basislinie' : 'Standard streaming baseline'}
                      </span>
                      <span className="text-[10px] font-semibold" style={{ color: faint }}>
                        72 g/GB
                      </span>
                    </div>
                    <div
                      className="h-1.5 overflow-hidden rounded-full"
                      style={{ background: isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.06)' }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: 'rgba(239,68,68,0.5)' }}
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 1.2, delay: 0.3 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {milestone && (
          <motion.div
            className="absolute top-2 right-12 z-20 rounded-full px-3 py-1.5 text-[11px] font-bold pointer-events-none"
            style={{ background: 'rgba(0,229,186,0.9)', color: '#0A0F18', boxShadow: '0 0 20px rgba(0,229,186,0.4)' }}
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.9 }}
          >
            {milestone}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
