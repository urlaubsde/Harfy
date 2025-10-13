// This is the service worker script for the PWA

const CACHE_NAME = 'harfy-cache-v1';
const urlsToCache = [
  '/',
  'index.html',
  // Note: We cannot cache external resources like Google Fonts or Tailwind CDN in a simple setup.
  // The service worker will handle the main application files.
];

// Install event: cache the application shell
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_A_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event: serve from cache first, then network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // Not in cache - fetch from network
        return fetch(event.request);
      }
    )
  );
});
