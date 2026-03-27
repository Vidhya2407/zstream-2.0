import { contentImages } from '../../lib/images/unsplash';

export interface WatchComment {
  id: number;
  author: string;
  avatarUrl: string;
  text: string;
  time: string;
  likes: number;
  badge?: { label: string; color: string };
  replies?: WatchComment[];
}

export interface DownloadTier {
  quality: string;
  resolution: string;
  size: string;
  codec: string;
  drm: boolean;
  requiresPremium: boolean;
  color: string;
}

export const initialComments: WatchComment[] = [
  {
    id: 1,
    author: 'EcoMindedViewer',
    avatarUrl: contentImages.creators[0].url,
    text: 'This is exactly the kind of content I signed up for. Watched the full episode and the carbon tracker said I saved 0.14g. It feels small, but knowing millions are doing the same adds up.',
    time: '2h ago',
    likes: 247,
    badge: { label: 'Eco Member', color: 'rgb(0,229,186)' },
    replies: [
      {
        id: 11,
        author: 'GreenDataNerd',
        avatarUrl: contentImages.creators[2].url,
        text: 'The math checks out. Small per stream, meaningful at platform scale.',
        time: '1h ago',
        likes: 89,
      },
    ],
  },
  {
    id: 2,
    author: 'SustainableSurf',
    avatarUrl: contentImages.creators[1].url,
    text: 'The DRM system is seamless, and the 4K quality on a sustainable platform is stunning.',
    time: '4h ago',
    likes: 183,
    badge: { label: 'Power User', color: 'rgb(0,217,255)' },
  },
  {
    id: 3,
    author: 'QuantumLeapFan',
    avatarUrl: contentImages.creators[3].url,
    text: 'Episode 3 completely changed how I think about forests. The cinematography is excellent.',
    time: '6h ago',
    likes: 312,
  },
  {
    id: 4,
    author: 'ClimateOptimist',
    avatarUrl: contentImages.creators[2].url,
    text: 'Offline viewing worked flawlessly on the train today, and the creator protection story makes the experience feel complete.',
    time: '8h ago',
    likes: 156,
    badge: { label: 'Top Fan', color: 'rgb(251,191,36)' },
  },
  {
    id: 5,
    author: 'TechEcoEngineer',
    avatarUrl: contentImages.creators[1].url,
    text: 'Would love a breakdown of the encoding pipeline. Compression efficiency looks excellent.',
    time: '10h ago',
    likes: 94,
  },
  {
    id: 6,
    author: 'WildlifePhotog',
    avatarUrl: contentImages.creators[0].url,
    text: 'The underwater sequences are among the best I have seen. Real commitment shows in the equipment choices.',
    time: '12h ago',
    likes: 427,
    badge: { label: 'Verified Creator', color: 'rgb(147,51,234)' },
  },
];

export const downloadTiers: DownloadTier[] = [
  {
    quality: 'Ultra HD',
    resolution: '4K · 2160p',
    size: '8.4 GB',
    codec: 'H.265 · Dolby Atmos',
    drm: true,
    requiresPremium: true,
    color: 'rgb(147,51,234)',
  },
  {
    quality: 'Full HD',
    resolution: '1080p',
    size: '3.2 GB',
    codec: 'H.265 · AAC 5.1',
    drm: true,
    requiresPremium: true,
    color: 'rgb(0,217,255)',
  },
  {
    quality: 'HD',
    resolution: '720p',
    size: '1.6 GB',
    codec: 'H.264 · AAC',
    drm: false,
    requiresPremium: false,
    color: 'rgb(0,229,186)',
  },
  {
    quality: 'Standard',
    resolution: '480p',
    size: '820 MB',
    codec: 'H.264 · AAC',
    drm: false,
    requiresPremium: false,
    color: 'rgb(96,165,250)',
  },
];

export const premiumDownloadFeatures = {
  de: [
    '4K Ultra-HD Offline-Downloads',
    'Widevine L1 DRM · Sichere Wiedergabe',
    'Unbegrenzte gleichzeitige Downloads',
    'Frueher Zugriff auf Neuerscheinungen',
  ],
  en: [
    '4K Ultra HD offline downloads',
    'Widevine L1 DRM · Secure playback',
    'Unlimited simultaneous downloads',
    'Early access to new releases',
  ],
} as const;
