import { apiSuccess } from '@/lib/api/response';
import { appEnv } from '@/lib/config/env';
import dbConnect, { getMongoConnectionState } from '@/lib/db/mongodb';

export async function GET() {
  let database = 'disconnected';

  try {
    await dbConnect();
    database = getMongoConnectionState();
  } catch {
    database = 'error';
  }

  return apiSuccess({
    service: 'zstream',
    status: database === 'connected' ? 'ok' : 'degraded',
    environment: appEnv.isProduction ? 'production' : 'development',
    cacheProvider: appEnv.cacheProvider,
    database,
  });
}
