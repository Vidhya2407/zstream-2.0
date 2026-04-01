export const LIVE_LOADING_COPY = {
  de: 'Lade Live-Kanaele...',
  en: 'Loading live channels...',
} as const;

export const LIVE_HEALTH_THRESHOLDS = {
  latency: { good: 20, bad: 50 },
  maxBitrate: 10,
  maxFps: 60,
} as const;

export const LIVE_FILTER_MATCHERS = {
  events: ['event', 'summit'],
  gaming: ['game', 'esport'],
  music: ['music', 'concert'],
  sports: ['sport', 'football', 'racing'],
} as const;


