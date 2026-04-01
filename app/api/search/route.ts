import { NextRequest } from 'next/server';
import { apiError, apiSuccess } from '@/lib/api/response';
import {
  filterSearchResults,
  resolveSearchPageContent,
  sanitizeSearchQuery,
} from '../../../lib/services/searchService';
import { getRequestLanguage, getRequestNumber, getRequestString } from '../../../lib/utils/apiRequest';

export async function GET(request: NextRequest) {
  const language = getRequestLanguage(request);

  try {
    const result = await resolveSearchPageContent(language);
    const data = result.data;
    const query = sanitizeSearchQuery(getRequestString(request, 'q'));
    const genre = getRequestString(request, 'genre', 'All');
    const type = getRequestString(request, 'type', 'All');
    const contentLanguage = getRequestString(request, 'contentLanguage', 'All');
    const minCarbon = getRequestNumber(request, 'minCarbon', 0);

    const results = filterSearchResults(data.results, {
      query,
      genre,
      type,
      language: contentLanguage,
      minCarbon,
    });

    return apiSuccess(
      {
        ...data,
        results,
      },
      {
        language,
        _demoMode: result.demoMode,
        filters: {
          query,
          genre,
          type,
          contentLanguage,
          minCarbon,
        },
      },
    );
  } catch (error) {
    console.error('Search API error:', error);
    return apiError('Unable to load search results', 500, { language });
  }
}


