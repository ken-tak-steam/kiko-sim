const CACHE = 'kiko-sim-offline-v1';
const FILES = ['./','./index.html','./download.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install', event => { event.waitUntil((async () => {const cache = await caches.open(CACHE);await cache.addAll(FILES);await self.skipWaiting();})()); });
self.addEventListener('activate', event => {event.waitUntil((async () => {for(const name of await caches.keys())if(name.startsWith('kiko-sim-offline-') && name !== CACHE)await caches.delete(name);await self.clients.claim();})());});
self.addEventListener('fetch', event => {
 const url = new URL(event.request.url);
 if(event.request.method !== 'GET' || url.origin !== self.location.origin)return;
 event.respondWith((async () => {const cache = await caches.open(CACHE);const saved = await cache.match(event.request, {ignoreSearch:true});if(saved)return saved;try{return await fetch(event.request);}catch(error){if(event.request.mode === 'navigate')return await cache.match('./index.html');throw error;}})());
});
