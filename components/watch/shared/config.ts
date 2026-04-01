export const watchContentTypeAccent: Record<string, string> = {
  video: 'rgba(0,128,255,0.85)',
  music: 'rgba(147,51,234,0.85)',
  live: 'rgba(239,68,68,0.85)',
  gaming: 'rgba(0,200,80,0.85)',
  shorts: 'rgba(251,146,60,0.85)',
};

export const watchContentTypeLabel: Record<string, string> = {
  video: 'Video',
  music: 'Music',
  live: 'Live',
  gaming: 'Gaming',
  shorts: 'Shorts',
};

export const relatedContentSidebarMetrics = {
  audienceLabel: 'Platform Impact',
  audienceSummary: '2.4M streamers today',
  audienceDetailPrefix: 'Together saving',
  audienceDetailValue: '1,284 kg',
  audienceDetailSuffix: 'CO2, equal to planting 58 trees.',
} as const;

export function getCarbonGrade(score: number) {
  if (score < 0.1) return { grade: 'A+', color: 'rgb(0,229,186)' };
  if (score < 0.3) return { grade: 'A', color: 'rgb(0,217,255)' };
  if (score < 0.5) return { grade: 'B', color: 'rgb(96,165,250)' };
  return { grade: 'C', color: 'rgb(251,191,36)' };
}


