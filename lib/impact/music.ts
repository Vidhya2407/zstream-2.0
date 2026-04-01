export type MusicQuality = 'low' | 'normal' | 'high' | 'veryhigh' | 'lossless';

export interface MusicImpactResult {
  quality: MusicQuality;
  qualityLabel: string;
  kbps: number;
  durationSeconds: number;
  dataGB: number;
  estimatedCo2Grams: number;
  waterMl: number;
  ewasteMicrograms: number;
}

const E_PER_GB = 0.016;
const CO2_KWH = 431.0;
const WUE = 1.9;
const WATER_GRID = 7.6;
const CHIP_ML_S = 0.083;
const HW_CO2_G_HR = 60.0;
const HW_EW_UG_S = 17_500.0;
const EW_DATA_UG_GB = 500.0;
const MUS_G_HR = 1.05;
const MUS_KBPS_REF = 192.0;

const MUSIC_QUALITY_CONFIG: Record<MusicQuality, { kbps: number; label: string }> = {
  low: { kbps: 48, label: 'Low / Auto' },
  normal: { kbps: 128, label: 'Normal' },
  high: { kbps: 192, label: 'High' },
  veryhigh: { kbps: 320, label: 'Very High' },
  lossless: { kbps: 1411, label: 'Lossless Hi-Res' },
};

export function calculateMusicImpact(durationSeconds: number, quality: MusicQuality = 'high'): MusicImpactResult {
  const config = MUSIC_QUALITY_CONFIG[quality] ?? MUSIC_QUALITY_CONFIG.high;
  const mbps = config.kbps / 1000;
  const dataGB = ((mbps * 1_000_000) / 8) * durationSeconds / 1_000_000_000;
  const ratio = config.kbps / MUS_KBPS_REF;
  const operationalCo2Grams = (MUS_G_HR / 3600) * ratio * durationSeconds;
  const hardwareCo2Grams = (HW_CO2_G_HR / 3600) * durationSeconds;
  const estimatedCo2Grams = operationalCo2Grams + hardwareCo2Grams;
  const platformEnergyKWh = (MUS_G_HR / CO2_KWH / 3600) * ratio * durationSeconds;
  const networkEnergyKWh = dataGB * E_PER_GB;
  const waterMl = (platformEnergyKWh * WUE * 1000) + ((platformEnergyKWh + networkEnergyKWh) * WATER_GRID * 1000) + (CHIP_ML_S * durationSeconds);
  const ewasteMicrograms = (HW_EW_UG_S * durationSeconds) + (dataGB * EW_DATA_UG_GB);

  return {
    quality,
    qualityLabel: config.label,
    kbps: config.kbps,
    durationSeconds,
    dataGB,
    estimatedCo2Grams,
    waterMl,
    ewasteMicrograms,
  };
}

export function formatMusicCo2(grams: number): string {
  if (grams < 0.001) return `${(grams * 1_000_000).toFixed(1)} mg`;
  if (grams < 1) return `${(grams * 1000).toFixed(1)} mg`;
  return `${grams.toFixed(3)} g`;
}

export function formatMusicWater(ml: number): string {
  if (ml < 0.001) return `${(ml * 1_000_000).toFixed(1)} nL`;
  if (ml < 1) return `${(ml * 1000).toFixed(1)} uL`;
  if (ml < 1000) return `${ml.toFixed(2)} mL`;
  return `${(ml / 1000).toFixed(3)} L`;
}

export function formatMusicEwaste(micrograms: number): string {
  if (micrograms < 1) return `${(micrograms * 1000).toFixed(1)} ng`;
  if (micrograms < 1000) return `${micrograms.toFixed(1)} ug`;
  if (micrograms < 1_000_000) return `${(micrograms / 1000).toFixed(3)} mg`;
  return `${(micrograms / 1_000_000).toFixed(3)} g`;
}
