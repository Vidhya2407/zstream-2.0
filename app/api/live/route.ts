import { NextRequest } from 'next/server';
import { apiError, apiSuccess } from '@/lib/api/response';
import { resolveLivePageContent } from '../../../lib/services/liveService';
import { getRequestLanguage } from '../../../lib/utils/apiRequest';

export async function GET(request: NextRequest) {
  const language = getRequestLanguage(request);

  try {
    const result = await resolveLivePageContent(language);
    return apiSuccess(result.data, { language, _demoMode: result.demoMode });
  } catch (error) {
    console.error('Live API error:', error);
    return apiError('Unable to load live content', 500, { language });
  }
}


