const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/styles.css",
  "/index.js",
  "/db.js",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
];

const PRECACHE = "precache-v1";
const RUNTIME = "runtime";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(PRECACHE)
      .then((cache) => cache.addAll(FILES_TO_CACHE))
      .then(self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return cacheNames.filter(
          (cacheName) => !currentCaches.includes(cacheName)
        );
      })
      .then((cachesToDelete) => {
        return Promise.all(
          cachesToDelete.map((cacheToDelete) => {
            return caches.delete(cacheToDelete);
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.open(RUNTIME).then((cache) => {
      console.log("[Service Worker] Fetching resource: " + e.request.url);
      return fetch(e.request).then((response) => {
        console.log(response);
        cache.put(e.request.url, response.clone());
        return response;
      });
    })
  );
});
