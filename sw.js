// FlatKhoj app shell: no caching, so every open shows live data. Presence of a fetch handler keeps the app installable.
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{});
