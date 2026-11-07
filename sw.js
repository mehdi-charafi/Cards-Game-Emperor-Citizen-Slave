const CACHE_NAME = 'emperor-game-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './src/output.css',
  './src/main.js',
  './src/players.js',
  './src/storage.js',
  './src/ui.js',
  './src/gameState.js',
  './src/game.js',
  './images/bg.jpg',
  './images/bg-card.jpg',
  './images/citizen.png',
  './images/emperor.png',
  './images/slave.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});