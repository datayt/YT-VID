const CACHE_NAME = 'creative-science-v1';
const urlsToCache = [
    '/YT-VID/index5.html',      // your main page
    '/YT-VID/style.css',
    '/YT-VID/script.js',
    '/YT-VID/logo.png',
    '/YT-VID/shivam-profile.png',
    '/YT-VID/IMG-INFO.jpeg'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    // For navigation requests, always serve the cached index5.html
    if (event.request.mode === 'navigate') {
        event.respondWith(
            caches.match('/YT-VID/index5.html')
                .then(response => response || fetch(event.request))
        );
        return;
    }

    // For all other requests, try cache first, then network
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
