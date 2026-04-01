'use client';

import React from 'react';
import { calculateImpactForecast, formatForecastValue } from '../../lib/impact/forecast';

interface EstimatedFootprintBadgeProps {
  durationLabel: string;
  isGerman?: boolean;
  isLight?: boolean;
  resolution?: number;
}

function parseDurationToMinutes(duration: string) {
  const normalized = duration.trim();
  const hourMatch = normalized.match(/(\d+)\s*h/i);
  const minuteMatch = normalized.match(/(\d+)\s*m/i);
  const clockParts = normalized.split(':').map((part) => parseInt(part, 10));

  if (clockParts.length === 2 && clockParts.every((part) => Number.isFinite(part))) {
    return Math.max(1, clockParts[0] + (clockParts[1] / 60));
  }

  if (clockParts.length === 3 && clockParts.every((part) => Number.isFinite(part))) {
    return Math.max(1, (clockParts[0] * 60) + clockParts[1] + (clockParts[2] / 60));
  }

  if (hourMatch || minuteMatch) {
    const hours = hourMatch ? parseInt(hourMatch[1], 10) : 0;
    const minutes = minuteMatch ? parseInt(minuteMatch[1], 10) : 0;
    return Math.max(1, (hours * 60) + minutes);
  }

  return 12;
}

export default function EstimatedFootprintBadge({
  durationLabel,
  isGerman = false,
  isLight = false,
  resolution = 720,
}: EstimatedFootprintBadgeProps) {
  const durationMinutes = React.useMemo(() => parseDurationToMinutes(durationLabel), [durationLabel]);
  const forecast = React.useMemo(
    () => calculateImpactForecast({ durationMinutes, resolutionHeight: resolution }),
    [durationMinutes, resolution],
  );

  const chips = [
    {
      label: isGerman ? 'CO2' : 'CO2',
      value: formatForecastValue(forecast.estimatedCo2Kg, 'co2'),
      color: 'rgb(0,229,186)',
      bg: 'rgba(0,229,186,0.08)',
      border: 'rgba(0,229,186,0.16)',
    },
    {
      label: isGerman ? 'Wasser' : 'Water',
      value: formatForecastValue(forecast.waterLiters, 'water'),
      color: 'rgb(56,189,248)',
      bg: 'rgba(56,189,248,0.08)',
      border: 'rgba(56,189,248,0.16)',
    },
    {
      label: isGerman ? 'E-Abfall' : 'E-waste',
      value: formatForecastValue(forecast.ewasteGrams, 'ewaste'),
      color: 'rgb(251,191,36)',
      bg: 'rgba(251,191,36,0.09)',
      border: 'rgba(251,191,36,0.16)',
    },
  ] as const;

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span
        className="rounded-full px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.18em]"
        style={{
          background: isLight ? 'rgba(15,23,42,0.04)' : 'rgba(255,255,255,0.04)',
          border: `1px solid ${isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.08)'}`,
          color: isLight ? '#64748b' : '#9ca3af',
        }}
      >
        {isGerman ? `720p Schaetzung` : '720p estimate'}
      </span>
      {chips.map((chip) => (
        <span
          key={chip.label}
          className="rounded-full px-2 py-0.5 text-[8px] font-semibold"
          style={{ background: chip.bg, border: `1px solid ${chip.border}`, color: chip.color }}
        >
          {chip.label} {chip.value}
        </span>
      ))}
    </div>
  );
}
