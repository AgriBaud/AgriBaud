/* JardinExpress Service Worker - Mode 100% Hors-Ligne */
const CACHE_NAME = 'jardinexpress-v1.0';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './calendrier.html',
  './reconnaissance.html',
  './alertes.html',
  './apropos.html',
  './plante.html',
  './parcelle.html',
  './agronome-ia.html',
  './marketplace.html',
  './manifest.json',
  './logo.png',
  './logo-jardin.jpg',
  './feuilles.jpg',
  './fruits.jpg',
  './bulbes.jpg',
  './racines.jpg',
  './tubercules.jpg',
  './tiges.jpg',
  './fleurs.jpg',
  './graines.jpg',
  './tomate.jpg',
  './carotte.jpg',
  './piment.jpg',
  './oignon.jpg',
  './chou.jpg',
  './laitue.jpg',
  './poivron.jpg',
  './ail.jpg',
  './pomme_de_terre.jpg',
  './haricot.jpg',
  './poireau.jpg',
  './betterave.jpg',
  './epinard.jpg',
  './chou_fleur.jpg',
  './brocoli.jpg',
  './amarante.jpg',
  './concombre.jpg',
  './gombo.jpg',
  './oignon_vert.jpg',
  './pasteque.jpg',
  './gingembre.jpg',
  'https://cdn.jsdelivr.net/npm/fullcalendar@5.11.3/main.min.css',
  'https://cdn.jsdelivr.net/npm/fullcalendar@5.11.3/main.min.js'
];

// Installation du Service Worker et mise en cache des fichiers
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Mise en cache des ressources globales');
      return cache.addAll(ASSETS_TO_CACHE).catch(err => {
        console.warn('[Service Worker] Certains assets optionnels n\'ont pas pu être cachés:', err);
      });
    })
  );
  self.skipWaiting();
});

// Activation et nettoyage des anciens caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Nettoyage ancien cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Interception des requêtes réseau (Stratégie Cache First, fallback Network)
self.addEventListener('fetch', (event) => {
  // Ignorer les requêtes non-GET et les requêtes externes dynamiques si nécessaire
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        // Enregistrer dynamique dans le cache si valide
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Mode déconnecté absolu si page HTML demandée
        if (event.request.headers.get('accept').includes('text/html')) {
          return caches.match('./index.html');
        }
      });
    })
  );
});
