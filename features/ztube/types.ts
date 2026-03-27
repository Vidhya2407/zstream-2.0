export type ZTubeTab = 'forYou' | 'trending' | 'new' | 'subscriptions' | 'creators';
export type ContentType = 'all' | 'videos' | 'music' | 'podcasts';

export interface ZVideo {
  id: number | string;
  title: string;
  channel: string;
  views: string;
  duration: string;
  daysAgo: number;
  imageIdx: number;
  verified: boolean;
  subscribers: string;
  carbonScore: number;
  type: 'video' | 'music' | 'podcast';
  likes: string;
}

export interface ZCreator {
  id: number;
  name: string;
  subscribers: string;
  videos: number;
  category: string;
  imageIdx: number;
  carbonOffset: string;
  verified: boolean;
}

export interface ZTubeTabOption {
  id: ZTubeTab;
  label: string;
  emoji: string;
}

export interface ZTubeTypeFilter {
  id: ContentType;
  label: string;
  icon: string;
}
