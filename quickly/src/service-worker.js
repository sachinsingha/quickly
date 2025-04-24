self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('quickly-cache-v1').then(cache => {
            return cache.addAll(['/', '/index.html', '/assets/styles.css']);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});