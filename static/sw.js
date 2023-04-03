/*
  This is a dummy service worker meant as a fallback from the IC service worker. 
  It registers itself replacing the IC service worker, then immediately unregisters itself to clean up.
*/

console.log(`Loaded empty service worker.`);

// Always install updated SW immediately
self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
  console.log(`Installed empty service worker. Unregistering...`);

  self.registration.unregister().then(() => {
    console.log(`Unregistered empty service worker.`);
  });
});

self.addEventListener("activate", (event) => {
  // upon activation take control of all clients (tabs & windows)
  event.waitUntil(self.clients.claim());
});
