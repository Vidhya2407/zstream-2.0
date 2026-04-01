export const apiRoutes = {
  home: '/api/home',
  search: '/api/search',
  music: '/api/music',
  live: '/api/live',
  gaming: '/api/gaming',
  minis: '/api/minis',
  dashboard: '/api/dashboard',
  watch: (id: string) => `/api/watch/${id}`,
} as const;


