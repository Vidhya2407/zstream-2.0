import { apiError, apiSuccess } from '@/lib/api/response';
import { resolveWatchPageContent } from '../../../../lib/services/watchService';

export async function GET(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  try {
    const result = await resolveWatchPageContent(id);

    if (!result.data.content) {
      return apiError('Content not found', 404, { _demoMode: result.demoMode });
    }

    return apiSuccess(result.data, { _demoMode: result.demoMode });
  } catch (error) {
    console.error('Watch API error:', error);
    return apiError('Unable to load watch content', 500);
  }
}


