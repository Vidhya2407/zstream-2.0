import dbConnect from '@/lib/db/mongodb';
import { apiSuccess } from '@/lib/api/response';
import Video from '@/lib/models/Video';

function mapCategoryToContentType(category: string | null) {
  switch (category) {
    case 'videos':
      return 'video';
    case 'music':
      return 'music';
    default:
      return null;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const query = searchParams.get('q');
  const tab = searchParams.get('tab') || 'forYou';

  try {
    const connection = await dbConnect();
    if (!connection) {
      return apiSuccess([], { _demoMode: true });
    }

    const filter: Record<string, unknown> = { status: 'published' };
    const contentType = mapCategoryToContentType(category);

    if (contentType) {
      filter.contentType = contentType;
    }

    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ];
    }

    let sort: Record<string, 1 | -1> = { createdAt: -1 };
    if (tab === 'trending') sort = { views: -1 };

    const videos = await Video.find(filter).sort(sort).limit(40);
    return apiSuccess(videos, { _demoMode: videos.length === 0 });
  } catch (error) {
    console.error('ZTube API error, falling back to demo catalog:', error);
    return apiSuccess([], { _demoMode: true });
  }
}
