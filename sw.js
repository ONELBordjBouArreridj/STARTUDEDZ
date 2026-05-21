const CACHE_NAME = 'startude-cache-v6';
const ASSETS = [
  './',
  './index.html',
  './terms.html',
  './privacy.html',
  './maintenance.html',
  './admin.html',
  './assets/css/style.css',
  './assets/js/main.js',
  './assets/js/tsparticles.bundle.min.js',
  './favicon.svg',
  './startude-logo.png',
  './onel-logo.png',
  './ministry-logo.png',
  './icons.svg'
];

// Install Event
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching assets...');
      return cache.addAll(ASSETS).catch((err) => {
        console.warn('[Service Worker] Asset caching warning:', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate Event
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Removing old cache:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event - Network First with Cache Fallback
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;

  // Ignore external CDN requests for now to prevent caching issues if offline/unstable
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.endsWith('sw.js')) return;


  e.respondWith(
    fetch(e.request)
      .then((res) => {
        if (res.status === 200) {
          const resClone = res.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, resClone);
          });
        }
        return res;
      })
      .catch(() => {
        return caches.match(e.request);
      })
  );
});
