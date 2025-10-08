self.addEventListener('install', (e) => {
  e.waitUntil(caches.open('rcpn-v1').then(c => c.addAll([
    '/', '/manifest.webmanifest'
  ])));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k=>k!=='rcpn-v1').map(k=>caches.delete(k)))));
});
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.mode === 'navigate') {
    e.respondWith(fetch(e.request).catch(()=>caches.match('/')));
  }
});
