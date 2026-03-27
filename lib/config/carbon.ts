export const carbonEnergyIntensity = {
  network: {
    wifi: 0.05,
    cellular: 0.2,
    fiber: 0.02,
  },
  device: {
    mobile: 0.005,
    tablet: 0.01,
    desktop: 0.05,
    tv: 0.1,
  },
} as const;

export const carbonBitrateGbPerHour = {
  '360p': 0.3,
  '720p': 1.5,
  '1080p': 3.0,
  '4k': 7.0,
} as const;

export const carbonModel = {
  globalAverageGridIntensity: 475,
  renewableSavingsFactor: 0.45,
} as const;
