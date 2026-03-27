export interface SustainabilityLeaderboardEntry {
  rank: number;
  name: string;
  country: string;
  saved: number;
  trees: number;
  badge: string;
  isUser?: boolean;
}

export interface SustainabilityCertification {
  name: string;
  logo: string;
  cert: string;
  year: string;
  desc: string;
}

export interface SustainabilityStat {
  icon: string;
  value: string;
  unit: string;
  labelKey: string;
}

export const sustainabilityLeaderboard: SustainabilityLeaderboardEntry[] = [
  { rank: 1, name: 'EcoWatcher_DE', country: 'DE', saved: 28400, trees: 142, badge: '1' },
  { rank: 2, name: 'GreenStream_FR', country: 'FR', saved: 24100, trees: 120, badge: '2' },
  { rank: 3, name: 'ZeroCarbon_JP', country: 'JP', saved: 19800, trees: 99, badge: '3' },
  { rank: 4, name: 'NatureFirst_UK', country: 'UK', saved: 16300, trees: 81, badge: '' },
  { rank: 5, name: 'ClimateHero_SE', country: 'SE', saved: 14700, trees: 73, badge: '' },
  { rank: 6, name: 'EcoPlayer_CA', country: 'CA', saved: 12200, trees: 61, badge: '' },
  { rank: 7, name: 'SustainTV_AU', country: 'AU', saved: 10900, trees: 54, badge: '' },
  { rank: 8, name: 'GreenBinge_NL', country: 'NL', saved: 9400, trees: 47, badge: '' },
  { rank: 9, name: 'You', country: 'GL', saved: 8200, trees: 41, badge: '*', isUser: true },
  { rank: 10, name: 'WatchGreen_KR', country: 'KR', saved: 7800, trees: 39, badge: '' },
];

export const sustainabilityMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;
export const sustainabilitySavingsData = [310, 420, 580, 490, 720, 810, 680, 940, 1100, 850, 1230, 1470] as const;

export const sustainabilityCertifications: SustainabilityCertification[] = [
  { name: 'TUV SUD', logo: 'T', cert: 'Carbon Neutral Infrastructure', year: '2024', desc: 'Server infrastructure certified carbon neutral by TUV SUD GmbH, Munich.' },
  { name: 'Bureau Veritas', logo: 'B', cert: 'Green Streaming Standard', year: '2024', desc: 'Content delivery network verified for minimum CO2 footprint by Bureau Veritas.' },
  { name: 'Ecologi Partner', logo: 'E', cert: 'Verified Tree Planting', year: '2024', desc: 'Tree planting programme validated. 1 tree planted per 500g CO2 offset.' },
];

export const sustainabilityStats: SustainabilityStat[] = [
  { icon: '🌿', value: '8,241', unit: 'g', labelKey: 'sustainability.co2SavedMonth' },
  { icon: '🌳', value: '41', unit: 'trees', labelKey: 'sustainability.treesPlanted' },
  { icon: '⚡', value: '12.8', unit: 'kWh', labelKey: 'sustainability.greenEnergyUsed' },
  { icon: '📊', value: '#9', unit: '', labelKey: 'sustainability.globalRank' },
];
