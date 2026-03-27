import { test, expect } from '@playwright/test';
import type {
  DashboardApiResponse,
  HomeApiResponse,
  LiveApiResponse,
  MinisApiResponse,
  MusicApiResponse,
  SearchApiResponse,
  WatchApiResponse,
} from '../../lib/api/contracts';

test.describe('API contract routes', () => {
  test('home API returns localized home data', async ({ request }) => {
    const response = await request.get('/api/home?lang=de');
    expect(response.ok()).toBeTruthy();

    const payload = (await response.json()) as HomeApiResponse;
    expect(payload.language).toBe('de');
    expect(payload.data.heroItems.length).toBeGreaterThan(0);
    expect(payload.data.sectionCopy.why.length).toBeGreaterThan(0);
    expect(payload.data.features.length).toBeGreaterThan(0);
  });

  test('search API applies query and filter params', async ({ request }) => {
    const response = await request.get('/api/search?q=planet&type=Movie&genre=All&contentLanguage=All&minCarbon=0&lang=en');
    expect(response.ok()).toBeTruthy();

    const payload = (await response.json()) as SearchApiResponse;
    expect(payload.language).toBe('en');
    expect(payload.filters).toMatchObject({
      query: 'planet',
      type: 'Movie',
      genre: 'All',
      contentLanguage: 'All',
      minCarbon: 0,
    });
    expect(payload.data.results.length).toBeGreaterThan(0);
    expect(payload.data.results.every((item) => item.title.toLowerCase().includes('planet'))).toBeTruthy();
    expect(payload.data.labels.search.en).toBe('Search');
  });

  test('music API returns localized labels and genre-filtered tracks', async ({ request }) => {
    const response = await request.get('/api/music?lang=de&genre=Ambient');
    expect(response.ok()).toBeTruthy();

    const payload = (await response.json()) as MusicApiResponse;
    expect(payload.language).toBe('de');
    expect(payload.data.labels.pageTitle).toBeTruthy();
    expect(payload.data.tracks.length).toBeGreaterThan(0);
    expect(payload.data.filteredTracks.length).toBeGreaterThan(0);
    expect(payload.data.filteredTracks.every((track) => track.genre === 'Ambient')).toBeTruthy();
  });

  test('live API returns channels and localized labels', async ({ request }) => {
    const response = await request.get('/api/live?lang=de');
    expect(response.ok()).toBeTruthy();

    const payload = (await response.json()) as LiveApiResponse;
    expect(payload.language).toBe('de');
    expect(payload.data.streams.length).toBeGreaterThan(0);
    expect(payload.data.seedChat.length).toBeGreaterThan(0);
    expect(payload.data.botMessages.length).toBeGreaterThan(0);
    expect(payload.data.labels.heroTitle.length).toBeGreaterThan(0);
  });

  test('minis API returns localized item payloads', async ({ request }) => {
    const response = await request.get('/api/minis?lang=de');
    expect(response.ok()).toBeTruthy();

    const payload = (await response.json()) as MinisApiResponse;
    expect(payload.language).toBe('de');
    expect(payload.data.items.length).toBeGreaterThan(0);
    expect(typeof payload.data.items[0].title).toBe('string');
    expect(Array.isArray(payload.data.items[0].hashtags)).toBeTruthy();
    expect(typeof payload.data.items[0].music).toBe('string');
  });

  test('dashboard API returns derived stats and localized labels', async ({ request }) => {
    const response = await request.get('/api/dashboard?lang=de&totalSaved=4.2');
    expect(response.ok()).toBeTruthy();

    const payload = (await response.json()) as DashboardApiResponse;
    expect(payload.language).toBe('de');
    expect(payload.data.quickStats.length).toBeGreaterThan(0);
    expect(payload.data.continueWatching.length).toBeGreaterThan(0);
    expect(payload.data.labels.continueWatching.length).toBeGreaterThan(0);
    expect(payload.data.quickStats.some((stat) => stat.value.includes('4200.00 g'))).toBeTruthy();
  });

  test('watch API returns content and related entries for a valid id', async ({ request }) => {
    const response = await request.get('/api/watch/1');
    expect(response.ok()).toBeTruthy();

    const payload = (await response.json()) as WatchApiResponse;
    expect('data' in payload).toBeTruthy();
    if ('data' in payload) {
      expect(payload.data.content?.id).toBe('1');
      expect(payload.data.content?.title).toBeTruthy();
      expect(payload.data.related.length).toBeGreaterThan(0);
    }
  });
});
