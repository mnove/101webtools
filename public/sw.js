// Minimal service worker that does nothing but register itself
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});

// No fetch handler - browser will use normal network requests
