import { ZTUBE_VIDEOS, normalizeContentType } from '../config';
import type { ContentType, ZTubeTab, ZVideo } from '../types';

interface ZtubeApiItem {
  _id?: number | string;
  carbonFootprint?: number;
  duration?: string;
  likes?: number;
  title?: string;
  views?: number;
}

interface ZtubeEnvelope {
  success: boolean;
  data: ZtubeApiItem[] | null;
  error: string | null;
  timestamp: string;
  _demoMode?: boolean;
}

export async function fetchZtubeVideos(tab: ZTubeTab, category: ContentType, query: string): Promise<{ demoMode: boolean; videos: ZVideo[] }> {
  try {
    const response = await fetch(`/api/ztube?tab=${tab}&category=${category}&q=${encodeURIComponent(query)}`);
    const payload = (await response.json()) as ZtubeEnvelope;
    const rawItems = Array.isArray(payload?.data) ? payload.data : [];

    if (!response.ok || !payload.success || !rawItems.length) {
      return { demoMode: Boolean(payload?._demoMode), videos: ZTUBE_VIDEOS };
    }

    return {
      demoMode: Boolean(payload?._demoMode),
      videos: rawItems.map((item: ZtubeApiItem, index: number) => ({
        carbonScore: (item.carbonFootprint ?? 5) / 100,
        channel: 'TechGreen Labs',
        daysAgo: 0,
        duration: item.duration ?? '00:00',
        id: item._id ?? index + 1,
        imageIdx: index % 2,
        likes: String(item.likes ?? 0),
        subscribers: '1.8M',
        title: item.title ?? 'Untitled',
        type: normalizeContentType(category),
        verified: true,
        views: String(item.views ?? 0),
      })),
    };
  } catch {
    return { demoMode: true, videos: ZTUBE_VIDEOS };
  }
}


