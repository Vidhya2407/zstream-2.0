import { NextRequest } from 'next/server';
import { apiError, apiSuccess } from '@/lib/api/response';
import { resolveGamingPageContent } from '../../../lib/services/gamingService';
import { getRequestLanguage } from '../../../lib/utils/apiRequest';

export async function GET(request: NextRequest) {
  const language = getRequestLanguage(request);

  try {
    const result = await resolveGamingPageContent(language);
    return apiSuccess(result.data, { language, _demoMode: result.demoMode });
  } catch (error) {
    console.error('Gaming API error:', error);
    return apiError('Unable to load gaming content', 500, { language });
  }
}
