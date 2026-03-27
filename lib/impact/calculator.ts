// Environmental Impact Calculation Engine  
  
export interface StreamMetrics {  
  durationMinutes: number;  
  resolutionHeight: number; // 240, 360, 720, 1080, 2160 (4K)  
  bitrateKbps: number;  
  deviceType: 'mobile' | 'tablet' | 'desktop' | 'tv';  
  networkType: '3g' | '4g' | '5g' | 'wifi' | 'ethernet';  
  ecoMode: boolean;  
}  
  
export interface ImpactResult {  
  co2SavedKg: number;  
  waterSavedLiters: number;  
  ewasteAvoidedGrams: number;  
  breakdown: {  
    industryAverage: number;  
    optimized: number;  
    savings: number;  
  };  
}  
  
// Industry baseline constants (grams CO2 per GB)  
const INDUSTRY_AVG_CO2_PER_GB = 72; // Global average  
const OPTIMIZED_CO2_PER_GB = 28; // Our optimized platform  
const WATER_PER_KWH = 1.8; // Liters for data center cooling  
const EWASTE_PER_YEAR_DEVICE = 0.05; // kg per device/year  
  
// Data consumption estimates by resolution (MB per minute)  
const DATA_RATES = {  
  240: 0.3,   
  360: 0.7,   
  480: 1.5,   
  720: 3.5,   
  1080: 7.5,  
  2160: 25    
};  
  
export function calculateImpact(metrics: StreamMetrics): ImpactResult {  
  // Calculate data consumed  
  const resolution = metrics.resolutionHeight as keyof typeof DATA_RATES;  
  const mbPerMinute = DATA_RATES[resolution] || DATA_RATES[720];  
  const totalMB = mbPerMinute * metrics.durationMinutes;  
  const totalGB = totalMB / 1024;  
  
  // Apply eco mode reduction  
  const ecoReduction = metrics.ecoMode ? 0.85 : 1.0;  
  
  // CO2 calculation  
  const industryCO2 = (totalGB * INDUSTRY_AVG_CO2_PER_GB) / 1000;  
  const optimizedCO2 = (totalGB * OPTIMIZED_CO2_PER_GB * ecoReduction) / 1000;  
  const co2SavedKg = industryCO2 - optimizedCO2;  
  
  // Water calculation (based on energy consumption)  
  const energyKWh = totalGB * 0.004; // Rough estimate  
  const industryWater = energyKWh * WATER_PER_KWH;  
  const optimizedWater = industryWater * 0.4 * ecoReduction;  
  const waterSavedLiters = industryWater - optimizedWater;  
  
  // E-waste calculation  
  const deviceLifecycleExtension = 1.3; // 30%% longer hardware life  
  const streamingHoursPerYear = 2000;  
  const ewasteReductionFactor = (metrics.durationMinutes / 60) / streamingHoursPerYear;  
  const ewasteAvoidedGrams = (EWASTE_PER_YEAR_DEVICE * 1000 * ewasteReductionFactor * (deviceLifecycleExtension - 1));  
  
  return {  
    co2SavedKg,  
    waterSavedLiters,  
    ewasteAvoidedGrams,  
    breakdown: {  
      industryAverage: industryCO2,  
      optimized: optimizedCO2,  
      savings: co2SavedKg  
    }  
  };  
}  
  
export function formatImpact(value: number, unit: 'co2' | 'water' | 'ewaste'): string {  
  if (unit === 'co2') return value.toFixed(3) + ' kg';  
  if (unit === 'water') return value.toFixed(1) + ' L';  
  if (unit === 'ewaste') return value.toFixed(4) + ' g';  
  return value.toString();  
}