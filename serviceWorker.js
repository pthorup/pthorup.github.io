const cacheName = 'my-travel-v7';
const assets = [
  '/',
  '/index.html',
  '/photos.html',
  '/css/styles.css',
  '/js/app.js',
  '/manifest.json',
  '/assets/images/beach.jpg',
  '/assets/images/shenzhen.jpg',
  '/assets/images/travel.gif',
  '/assets/icons/android-chrome-192x192.png',
  '/assets/icons/favicon-16x16.png',
  '/assets/icons/favicon-32x32.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('caching assets');
      cache.addAll(assets);
    }),
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      // Filter through an array of caches and delete all where is not equal to current cacheName and return an array of promises.
      return Promise.all(cacheNames.filter((val) => val !== cacheName).map((val) => caches.delete(val)));
    }),
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(e.request);
    }),
  );
});
