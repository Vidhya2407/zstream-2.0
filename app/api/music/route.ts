import { NextRequest } from 'next/server';
import { apiError, apiSuccess } from '@/lib/api/response';
import { resolveMusicPageContent } from '../../../lib/services/musicService';
import { getRequestLanguage, getRequestString } from '../../../lib/utils/apiRequest';

export async function GET(request: NextRequest) {
  const language = getRequestLanguage(request);
  const genre = getRequestString(request, 'genre');

  try {
    const result = await resolveMusicPageContent(language, genre);
    return apiSuccess(result.data, { language, _demoMode: result.demoMode });
  } catch (error) {
    console.error('Music API error:', error);
    return apiError('Unable to load music content', 500, { language });
  }
}


