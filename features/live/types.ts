import type { ChatMessage, Stream } from '../../lib/data/liveCatalog';

export type LiveFilterKey = 'all' | 'sports' | 'gaming' | 'music' | 'events';

export interface LiveLabels {
  heroTitle: string;
  heroSubtitle: string;
  offsetLabel: string;
  minLiveLabel: string;
  healthLabel: string;
  streamHealthLabel: string;
  watchLiveLabel: string;
  watchStatLabel: string;
  allChannelsLabel: string;
  liveChatLabel: string;
  saySomethingLabel: string;
  sendLabel: string;
  encryptedLabel: string;
}

export interface LiveImpactStats {
  activeRooms: string;
  activeWidth: string;
  co2Offset: string;
  renewable: string;
}

export interface LiveStreamView extends Stream {
  imageUrl: string;
}

export interface LiveHealthMetric {
  bar: number;
  color: string;
  label: string;
  value: string;
}

export interface LiveScreenViewModel {
  activeStream: number;
  bgGradient: string;
  cardBg: string;
  cardBorder: string;
  carbonOffset: number;
  chatInput: string;
  chatMessages: ChatMessage[];
  encryptedLabel: string;
  generateHealthMetrics: (stream: LiveStreamView) => LiveHealthMetric[];
  healthLabel: string;
  heroMetaBg: string;
  heroMetaBorder: string;
  heroOverlay: string;
  inputBg: string;
  inputBorder: string;
  impactStats: LiveImpactStats;
  isLight: boolean;
  isLoading: boolean;
  labels: LiveLabels;
  loadError: string | null;
  minutesLive: number;
  pageTextMuted: string;
  pageTextPrimary: string;
  pageTextSecondary: string;
  saySomethingLabel: string;
  sendChat: () => void;
  sendLabel: string;
  setActiveStream: (index: number) => void;
  setChatInput: (value: string) => void;
  setShowHealth: (value: boolean) => void;
  showHealth: boolean;
  statusButtonBg: string;
  stream: LiveStreamView | null;
  streams: LiveStreamView[];
  surfaceBg: string;
  surfaceBorder: string;
  toggleHealth: () => void;
  watchStatText: string;
}
