import { carbonBitrateGbPerHour, carbonEnergyIntensity, carbonModel } from '../config/carbon';

/**
 * ZSTREAM Carbon Engine
 * Calculates estimated carbon footprint for streaming sessions.
 */
export interface CarbonMetadata {
  resolution: keyof typeof carbonBitrateGbPerHour;
  deviceType: keyof typeof carbonEnergyIntensity.device;
  networkType: keyof typeof carbonEnergyIntensity.network;
}

export function calculateStreamingCarbon(durationMinutes: number, metadata: CarbonMetadata): number {
  const durationHours = durationMinutes / 60;
  const dataGB = carbonBitrateGbPerHour[metadata.resolution] * durationHours;
  const networkEnergy = dataGB * carbonEnergyIntensity.network[metadata.networkType];
  const deviceEnergy = durationHours * carbonEnergyIntensity.device[metadata.deviceType];
  const totalEnergyKWh = networkEnergy + deviceEnergy;
  const carbonGrams = totalEnergyKWh * carbonModel.globalAverageGridIntensity;

  return parseFloat(carbonGrams.toFixed(2));
}

export function calculateCarbonSaving(carbonProduced: number): number {
  return parseFloat((carbonProduced * carbonModel.renewableSavingsFactor).toFixed(2));
}
