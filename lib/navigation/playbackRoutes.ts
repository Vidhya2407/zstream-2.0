export function getMovieWatchId(movieId: string): string {
  const map: Record<string, string> = {
    m1: '1',
    m2: '5',
    m3: '4',
    m7: '7',
  };
  return map[movieId] ?? '1';
}

export function getSeriesWatchId(seriesId: string): string {
  const map: Record<string, string> = {
    s1: '1',
    s7: '7',
    s8: '5',
  };
  return map[seriesId] ?? '1';
}

export function getSportsWatchId(contentId: string): string {
  const map: Record<string, string> = {
    h1: '6',
    h2: '6',
    h3: '6',
    b1: '2',
  };
  return map[contentId] ?? '6';
}

export function getGamingWatchId(gameId: number | string): string {
  const key = String(gameId);
  const map: Record<string, string> = {
    '1': '9',
    '2': '10',
    '3': '11',
    '4': '10',
    '5': '11',
    '6': '9',
  };
  return map[key] ?? '9';
}

export function getLiveWatchId(streamId: number | string): string {
  const key = String(streamId);
  const map: Record<string, string> = {
    '0': '8',
    '1': '2',
    '2': '3',
    '3': '6',
  };
  return map[key] ?? '8';
}

export function getMiniWatchId(miniId: number | string): string {
  return String(miniId) === '1' ? '12' : '12';
}

export function getMeetingRecordingWatchId(recordingId: number | string): string {
  const key = String(recordingId);
  const map: Record<string, string> = {
    '1': '1',
    '2': '4',
    '3': '6',
  };
  return map[key] ?? '1';
}

export function getMeetingWebinarWatchId(webinarId: number | string): string {
  const key = String(webinarId);
  const map: Record<string, string> = {
    '1': '8',
    '2': '6',
    '3': '5',
  };
  return map[key] ?? '8';
}

export function getSearchResultHref(result: { id?: string | number; type?: string }): string {
  const type = String(result.type ?? '').toLowerCase();
  const id = String(result.id ?? '');
  const movieMap: Record<string, string> = { '1': '1', '4': '7', '6': '4', '7': '1', '8': '4' };
  const seriesMap: Record<string, string> = { '2': '5' };
  const musicMap: Record<string, string> = { '3': '3' };
  const minisMap: Record<string, string> = { '5': '12' };

  if (type === 'movie') return getWatchHref(movieMap[id] ?? '1');
  if (type === 'series') return getWatchHref(seriesMap[id] ?? '5');
  if (type === 'music') return getWatchHref(musicMap[id] ?? '3');
  if (type === 'minis') return getWatchHref(minisMap[id] ?? '12');
  if (type === 'live') return getWatchHref(getLiveWatchId(id));
  if (type === 'ztube') return `/ztube/watch/${id || '1'}`;

  return getWatchHref('1');
}

export function getWatchHref(id: string): string {
  return `/watch/${id}`;
}


