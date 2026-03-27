import { NextRequest } from 'next/server';
import { apiError, apiSuccess } from '@/lib/api/response';
import { resolveMinisPageContent } from '../../../lib/services/minisService';
import { getRequestLanguage } from '../../../lib/utils/apiRequest';

export async function GET(request: NextRequest) {
  const language = getRequestLanguage(request);

  try {
    const result = await resolveMinisPageContent(language);
    return apiSuccess(result.data, { language, _demoMode: result.demoMode });
  } catch (error) {
    console.error('Minis API error:', error);
    return apiError('Unable to load minis content', 500, { language });
  }
}
