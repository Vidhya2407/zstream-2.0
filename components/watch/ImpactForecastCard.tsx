'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { calculateImpactForecast, formatForecastValue } from '../../lib/impact/forecast';
import { useLanguageStore } from '../../lib/stores/languageStore';
import { useThemeStore } from '../../lib/stores/themeStore';

interface ImpactForecastCardProps {
  durationMinutes: number;
  resolution: number;
  title: string;
}

type Tone = 'teal' | 'green' | 'amber' | 'blue';

function toneStyles(tone: Tone) {
  if (tone === 'green') {
    return { color: 'rgb(74, 222, 128)', soft: 'rgba(74, 222, 128, 0.08)', border: 'rgba(74, 222, 128, 0.22)' };
  }
  if (tone === 'amber') {
    return { color: 'rgb(251, 191, 36)', soft: 'rgba(251, 191, 36, 0.08)', border: 'rgba(251, 191, 36, 0.22)' };
  }
  if (tone === 'blue') {
    return { color: 'rgb(96, 165, 250)', soft: 'rgba(96, 165, 250, 0.08)', border: 'rgba(96, 165, 250, 0.22)' };
  }
  return { color: 'rgb(0, 229, 186)', soft: 'rgba(0, 229, 186, 0.08)', border: 'rgba(0, 229, 186, 0.22)' };
}

export default function ImpactForecastCard({ durationMinutes, resolution, title }: ImpactForecastCardProps) {
  const { language } = useLanguageStore();
  const { theme } = useThemeStore();
  const isGerman = language === 'de';
  const isLight = theme === 'light';
  const forecast = React.useMemo(
    () => calculateImpactForecast({ durationMinutes, resolutionHeight: resolution, ecoMode: true }),
    [durationMinutes, resolution],
  );

  const panelBg = isLight ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.03)';
  const panelBorder = isLight ? '1px solid rgba(15,23,42,0.08)' : '1px solid rgba(255,255,255,0.08)';
  const titleColor = isLight ? '#0f172a' : '#f8fafc';
  const body = isLight ? '#475569' : '#cbd5e1';
  const muted = isLight ? '#64748b' : '#9ca3af';
  const faint = isLight ? '#94a3b8' : '#6b7280';
  const forecastBg = isLight
    ? 'linear-gradient(135deg, rgba(236,253,245,0.95) 0%, rgba(239,246,255,0.95) 100%)'
    : 'linear-gradient(135deg, rgba(0,229,186,0.08) 0%, rgba(59,130,246,0.08) 100%)';

  const sections = [
    {
      title: isGerman ? 'Aktueller Carbon-Abfall' : 'Current carbon waste',
      value: formatForecastValue(forecast.estimatedCo2Kg, 'co2'),
      detail: isGerman ? `${formatForecastValue(forecast.waterLiters, 'water')} Wasser-Abfall | ${formatForecastValue(forecast.ewasteGrams, 'ewaste')} E-Abfall` : `${formatForecastValue(forecast.waterLiters, 'water')} water waste | ${formatForecastValue(forecast.ewasteGrams, 'ewaste')} e-waste`,
      tone: 'teal' as const,
    },
    {
      title: isGerman ? 'Zero-Carbon-Einsparung' : 'Zero Carbon projected savings',
      value: formatForecastValue(forecast.projectedCo2SavedKg, 'co2'),
      detail: isGerman ? `vs ${formatForecastValue(forecast.baselineCo2Kg, 'co2')} Branchen-Basislinie` : `vs ${formatForecastValue(forecast.baselineCo2Kg, 'co2')} industry baseline`,
      tone: 'green' as const,
    },
    {
      title: isGerman ? 'Geschaetzte Carbon-Punkte' : 'Estimated carbon points',
      value: `+${forecast.projectedPoints} pts`,
      detail: isGerman ? 'Werden nach dem verifizierten Rollout gutgeschrieben, wenn dieser Titel abgeschlossen wird' : 'Earned after verified rollout, if this title is completed',
      tone: 'amber' as const,
    },
  ];

  const metricCards = [
    { label: isGerman ? 'Laufzeitbasis' : 'Runtime basis', value: `${Math.round(durationMinutes)} min`, tone: 'blue' as const },
    { label: isGerman ? 'Wiedergabequalitaet' : 'Playback quality', value: `${resolution}p`, tone: 'green' as const },
  ];

  return (
    <motion.section
      className="rounded-[28px] overflow-hidden"
      style={{ background: panelBg, border: panelBorder }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.35 }}
    >
      <div className="px-5 py-5 sm:px-6" style={{ background: forecastBg, borderBottom: panelBorder }}>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em]"
              style={{ color: 'rgb(0, 229, 186)', background: 'rgba(0, 229, 186, 0.1)', border: '1px dashed rgba(0, 229, 186, 0.35)' }}
            >
              {isGerman ? 'Zero-Carbon-Demo' : 'Zero Carbon Demo'}
            </div>
            <h2 className="mt-3 text-xl font-black tracking-tight sm:text-2xl" style={{ color: titleColor }}>
              {isGerman ? `Aktueller Abfall und kuenftige Einsparungen fuer ${title}` : `Current waste and future savings for ${title}`}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6" style={{ color: body }}>
              {isGerman ? 'Diese Ansicht zeigt zuerst die aktuelle Streaming-Schaetzung und ergaenzt sie danach um modellierte Zero-Carbon-Einsparungen und geschaetzte Carbon-Punkte.' : 'This view shows the current streaming estimate first, then layers in the modeled Zero Carbon savings and estimated carbon points.'}
            </p>
          </div>
          <div className="rounded-2xl px-4 py-3 text-sm" style={{ background: isLight ? 'rgba(255,255,255,0.76)' : 'rgba(2,6,23,0.32)', border: '1px solid rgba(0,229,186,0.18)' }}>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: muted }}>
              {isGerman ? 'Berechnungsbasis' : 'Estimate basis'}
            </p>
            <p className="mt-1 font-semibold" style={{ color: titleColor }}>
              {isGerman ? '28g CO2/GB auf ZSTREAM vs 72g/GB Branchendurchschnitt' : '28g CO2/GB on ZSTREAM vs 72g/GB industry average'}
            </p>
            <p className="mt-1 text-xs" style={{ color: muted }}>
              {isGerman ? 'Nutzt Laufzeit, Wiedergabequalitaet und aktuelle Eco-Lieferannahmen.' : 'Uses runtime, playback quality, and current eco delivery assumptions.'}
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <div className="grid gap-3 lg:grid-cols-3">
          {sections.map((section) => {
            const tone = toneStyles(section.tone);
            return (
              <div
                key={section.title}
                className="rounded-2xl p-4"
                style={{ background: tone.soft, border: `1px solid ${tone.border}` }}
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: muted }}>
                  {section.title}
                </p>
                <p className="mt-2 text-2xl font-black tracking-tight" style={{ color: tone.color }}>
                  {section.value}
                </p>
                <p className="mt-1 text-xs leading-5" style={{ color: body }}>
                  {section.detail}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {metricCards.map((metric) => {
            const tone = toneStyles(metric.tone);
            return (
              <div
                key={metric.label}
                className="rounded-2xl px-4 py-3"
                style={{ background: isLight ? '#f8fafc' : 'rgba(255,255,255,0.02)', border: `1px solid ${isLight ? 'rgba(15,23,42,0.08)' : tone.border}` }}
              >
                <p className="text-[11px] uppercase tracking-[0.14em]" style={{ color: faint }}>
                  {metric.label}
                </p>
                <p className="mt-1 text-sm font-bold" style={{ color: tone.color }}>
                  {metric.value}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-4 rounded-2xl px-4 py-3 text-xs leading-5" style={{ background: isLight ? 'rgba(15,23,42,0.03)' : 'rgba(255,255,255,0.02)', border: '1px dashed rgba(148,163,184,0.35)', color: muted }}>
          {isGerman ? 'Die aktuellen Abfallwerte sind auf Basis ueblicher Streaming-Annahmen geschaetzt. Zero-Carbon-Einsparungen und Carbon-Punkte sind als kommende Funktion dargestellt.' : 'Current waste values are estimated using standard streaming assumptions. Zero Carbon savings and carbon points are shown here as a coming-soon feature.'}
        </div>
      </div>
    </motion.section>
  );
}
