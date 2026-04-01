import { getContentById, getRelatedContent, type WatchContent } from '../data/watchContent';
import { validateWatchContentRecord } from '../utils/catalogValidation';
import { toWatchContentDto, type WatchContentDto } from './dto/watchDto';
import type { ContentResolution } from './homeService';

export interface WatchPageContent {
  content: WatchContent | null;
  related: WatchContent[];
  dto: WatchContentDto | null;
  relatedDto: WatchContentDto[];
}

export const getWatchPageFallbackContent = (id: string): WatchPageContent => {
  const content = getContentById(id);

  if (!content || !validateWatchContentRecord(content)) {
    return {
      content: null,
      related: [],
      dto: null,
      relatedDto: [],
    };
  }

  const related = getRelatedContent(content.relatedIds).filter(validateWatchContentRecord);

  return {
    content,
    related,
    dto: toWatchContentDto(content),
    relatedDto: related.map(toWatchContentDto),
  };
};

export async function getWatchPagePrimaryContent(_: string): Promise<WatchPageContent | null> {
  return null;
}

export async function resolveWatchPageContent(id: string): Promise<ContentResolution<WatchPageContent>> {
  const primary = await getWatchPagePrimaryContent(id);
  if (primary?.content) {
    return {
      data: primary,
      source: 'primary',
      demoMode: false,
    };
  }

  return {
    data: getWatchPageFallbackContent(id),
    source: 'fallback',
    demoMode: true,
  };
}

export const getWatchPageContent = getWatchPageFallbackContent;


