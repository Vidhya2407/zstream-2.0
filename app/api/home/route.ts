import { NextRequest } from 'next/server';
import { apiError, apiSuccess } from '@/lib/api/response';
import { resolveHomePageContent } from '../../../lib/services/homeService';
import { getRequestLanguage } from '../../../lib/utils/apiRequest';

export async function GET(request: NextRequest) {
  const language = getRequestLanguage(request);

  try {
    const result = await resolveHomePageContent(language);
    return apiSuccess(result.data, { language, _demoMode: result.demoMode });
  } catch (error) {
    console.error('Home API error:', error);
    return apiError('Unable to load home content', 500, { language });
  }
}


