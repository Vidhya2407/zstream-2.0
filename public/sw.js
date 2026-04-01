const CACHE_NAME = 'zstream-v2';
const STATIC_ASSETS = ['/', '/music', '/live', '/minis', '/offline.html'];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS).catch(() => {}))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;

  const isApiRequest = url.pathname.startsWith('/api/');
  const isNextAsset = url.pathname.startsWith('/_next/');
  const isNavigation = e.request.mode === 'navigate';

  if (isApiRequest || isNavigation) {
    e.respondWith(
      fetch(e.request)
        .then((response) => response)
        .catch(() => caches.match(e.request).then((cached) => cached || caches.match('/offline.html')))
    );
    return;
  }

  if (isNextAsset) {
    e.respondWith(
      fetch(e.request)
        .then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') return response;
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
          return response;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then((cached) => {
      if (cached) return cached;
      return fetch(e.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') return response;
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
        return response;
      }).catch(() => caches.match('/offline.html'));
    })
  );
});

self.addEventListener('push', (e) => {
  if (!e.data) return;
  const data = e.data.json();
  e.waitUntil(
    self.registration.showNotification(data.title || 'ZSTREAM', {
      body: data.body || '',
      icon: '/logo-z.svg',
      badge: '/logo-z.svg',
      tag: data.tag || 'zstream',
      data: { href: data.href || '/' },
    })
  );
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(
    clients.openWindow(e.notification.data?.href || '/')
  );
});
