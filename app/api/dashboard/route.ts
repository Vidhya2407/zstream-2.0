import { NextRequest } from 'next/server';
import { apiError, apiSuccess } from '@/lib/api/response';
import { resolveDashboardPageContent } from '../../../lib/services/dashboardService';
import { getRequestLanguage, getRequestNumber } from '../../../lib/utils/apiRequest';

export async function GET(request: NextRequest) {
  const language = getRequestLanguage(request);
  const totalSaved = getRequestNumber(request, 'totalSaved', 0);

  try {
    const result = await resolveDashboardPageContent(language, totalSaved);
    return apiSuccess(result.data, { language, _demoMode: result.demoMode });
  } catch (error) {
    console.error('Dashboard API error:', error);
    return apiError('Unable to load dashboard content', 500, { language });
  }
}


