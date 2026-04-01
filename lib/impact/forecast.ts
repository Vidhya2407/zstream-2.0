export interface ForecastMetrics {
  durationMinutes: number;
  resolutionHeight: number;
  ecoMode?: boolean;
}

export interface ForecastResult {
  dataGB: number;
  estimatedCo2Kg: number;
  baselineCo2Kg: number;
  projectedCo2SavedKg: number;
  energyKWh: number;
  waterLiters: number;
  ewasteGrams: number;
  projectedPoints: number;
}

const INDUSTRY_AVG_CO2_PER_GB = 72;
const ZSTREAM_CO2_PER_GB = 28;

// Resolution rates aligned to zstream-calc.html video calculator.
const VIDEO_MBIT_PER_SECOND: Record<number, number> = {
  144: 0.1,
  240: 0.4,
  360: 0.75,
  480: 1.75,
  720: 3.25,
  1080: 6.0,
  1440: 12.0,
  2160: 20.0,
};

// Exact calculator constants from zstream-calc.html
const E_PER_GB = 0.016; // kWh/GB
const CO2_KWH = 431.0; // gCO2e/kWh
const WUE = 1.9; // L/kWh
const WATER_GRID = 7.6; // L/kWh
const CHIP_ML_S = 0.083; // mL/s
const HW_CO2_G_HR = 60.0; // g/hr
const HW_EW_UG_S = 17_500.0; // ug/s
const EW_DATA_UG_GB = 500.0; // ug/GB
const PLAT_G_HR = 12.74; // g CO2e/hr platform-side at 1080p / 6 Mbps
const BASE_MBPS = 6.0;
const BASE_E_S = PLAT_G_HR / (CO2_KWH * 3600.0);

export function calculateImpactForecast(metrics: ForecastMetrics): ForecastResult {
  const mbps = VIDEO_MBIT_PER_SECOND[metrics.resolutionHeight] ?? VIDEO_MBIT_PER_SECOND[720];
  const durationSeconds = metrics.durationMinutes * 60;
  const durationHours = metrics.durationMinutes / 60;
  const dataGB = ((mbps * 1_000_000) / 8) * durationSeconds / 1_000_000_000;
  const ratio = mbps / BASE_MBPS;
  const baselineCo2Kg = (dataGB * INDUSTRY_AVG_CO2_PER_GB) / 1000;

  const operationalCo2Grams = (PLAT_G_HR / 3600) * ratio * durationSeconds;
  const hardwareCo2Grams = (HW_CO2_G_HR / 3600) * durationSeconds;
  const estimatedCo2Kg = (operationalCo2Grams + hardwareCo2Grams) / 1000;
  const projectedCo2SavedKg = Math.max(baselineCo2Kg - estimatedCo2Kg, 0);
  const platformEnergyKWh = BASE_E_S * ratio * durationSeconds;
  const networkEnergyKWh = dataGB * E_PER_GB;
  const waterMl = (platformEnergyKWh * WUE * 1000) + ((platformEnergyKWh + networkEnergyKWh) * WATER_GRID * 1000) + (CHIP_ML_S * durationSeconds);
  const waterLiters = waterMl / 1000;
  const ewasteMicrograms = (HW_EW_UG_S * durationSeconds) + (dataGB * EW_DATA_UG_GB);
  const ewasteGrams = ewasteMicrograms / 1_000_000;
  const energyKWh = platformEnergyKWh + networkEnergyKWh;
  const projectedPoints = Math.max(
    Math.round(projectedCo2SavedKg * 1000 * 0.12 + metrics.durationMinutes * 0.35),
    0,
  );

  return {
    dataGB,
    estimatedCo2Kg,
    baselineCo2Kg,
    projectedCo2SavedKg,
    energyKWh,
    waterLiters,
    ewasteGrams,
    projectedPoints,
  };
}

export function formatForecastValue(value: number, unit: 'co2' | 'water' | 'energy' | 'ewaste' | 'data'): string {
  if (unit === 'co2') {
    if (value < 0.001) return `${(value * 1_000_000).toFixed(1)} mg`;
    return `${(value * 1000).toFixed(1)} g`;
  }

  if (unit === 'water') {
    if (value < 0.000001) return `${(value * 1_000_000_000).toFixed(1)} nL`;
    if (value < 0.001) return `${(value * 1_000_000).toFixed(1)} uL`;
    if (value < 1) return `${(value * 1000).toFixed(0)} mL`;
    return `${value.toFixed(2)} L`;
  }

  if (unit === 'energy') {
    return `${value.toFixed(3)} kWh`;
  }

  if (unit === 'ewaste') {
    if (value < 0.001) return `${(value * 1_000_000).toFixed(1)} ug`;
    return `${value.toFixed(2)} g`;
  }

  return `${value.toFixed(2)} GB`;
}
