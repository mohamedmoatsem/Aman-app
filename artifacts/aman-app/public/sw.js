const SHELL_CACHE = 'aman-shell-v3';
const ASSET_CACHE = 'aman-assets-v3';
const API_CACHE   = 'aman-api-v3';
const FONT_CACHE  = 'aman-fonts-v3';

const ALL_CACHES = [SHELL_CACHE, ASSET_CACHE, API_CACHE, FONT_CACHE];

// ─── Install: activate immediately ────────────────────────────────────────────
self.addEventListener('install', () => self.skipWaiting());

// ─── Activate: clean stale caches ─────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => !ALL_CACHES.includes(k)).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// ─── Fetch handler ─────────────────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle http/https
  if (!url.protocol.startsWith('http')) return;

  // ── Google Fonts: Cache First (long TTL) ──
  if (url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com')) {
    event.respondWith(cacheFirst(request, FONT_CACHE));
    return;
  }

  // ── API calls: Network First with 5s timeout, fallback to cache ──
  if (url.pathname.startsWith('/api/') || url.pathname.includes('/api/')) {
    // Only cache GET — POST/PUT/DELETE go straight to network
    if (request.method !== 'GET') {
      event.respondWith(
        fetch(request).catch(() => new Response(
          JSON.stringify({ error: 'offline' }),
          { status: 503, headers: { 'Content-Type': 'application/json' } }
        ))
      );
      return;
    }
    event.respondWith(networkFirstWithTimeout(request, API_CACHE, 5000));
    return;
  }

  // ── Static assets with content-hash (JS/CSS/images/fonts) ──
  // These are safe to cache forever because filenames change on rebuild
  if (/\.(js|css|png|jpg|jpeg|svg|gif|ico|woff2?|ttf|eot|webp|mp3)(\?.*)?$/.test(url.pathname)) {
    event.respondWith(cacheFirst(request, ASSET_CACHE));
    return;
  }

  // ── HTML / navigation: Network First → cached shell fallback ──
  event.respondWith(networkFirstShell(request));
});

// ─── Strategy: Cache First ─────────────────────────────────────────────────────
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch {
    return new Response('', { status: 503, statusText: 'Offline' });
  }
}

// ─── Strategy: Network First with timeout, cache fallback ─────────────────────
async function networkFirstWithTimeout(request, cacheName, ms) {
  const cache = await caches.open(cacheName);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);

  try {
    const response = await fetch(request, { signal: controller.signal });
    clearTimeout(timer);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch {
    clearTimeout(timer);
    const cached = await cache.match(request);
    if (cached) {
      // Add a header so the app knows it's stale
      const headers = new Headers(cached.headers);
      headers.set('X-From-Cache', 'true');
      const body = await cached.text();
      return new Response(body, { status: cached.status, headers });
    }
    return new Response(
      JSON.stringify({ error: 'offline', cached: false }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// ─── Strategy: Network First for HTML, fallback to cached shell ───────────────
async function networkFirstShell(request) {
  const cache = await caches.open(SHELL_CACHE);
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch {
    const cached = await cache.match(request) || await cache.match('/');
    if (cached) return cached;
    return new Response('<h1>أمان — يعمل بدون اتصال</h1>', {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  }
}
