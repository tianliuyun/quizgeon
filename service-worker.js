// Service Worker — 离线缓存
const CACHE_NAME = 'quizgeon-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './src/css/main.css',
  './src/css/game.css',
  './src/js/config.js',
  './src/js/utils.js',
  './src/js/errorHandler.js',
  './src/js/main.js',
  './src/js/data/saveSystem.js',
  './src/js/data/questions.js',
  './src/js/game/player.js',
  './src/js/game/dungeon.js',
  './src/js/game/combat.js',
  './src/js/game/shop.js',
  './src/js/game/boss.js',
  './src/js/game/achievements.js',
  './src/js/game/sound.js',
  './src/js/game/themes.js'
];

// 安装：缓存核心资源
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS).catch((err) => {
        console.warn('SW install: some assets failed to cache:', err);
        // 即使部分失败也继续，不阻塞安装
        return Promise.resolve();
      });
    }).then(() => self.skipWaiting())
  );
});

// 激活：清理旧缓存
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// 拦截请求：缓存优先，网络回退
self.addEventListener('fetch', (event) => {
  const req = event.request;

  // 只缓存 GET 请求
  if (req.method !== 'GET') return;

  // 跳过非 http(s) 请求（如 chrome-extension）
  if (!req.url.startsWith('http')) return;

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;

      // 网络请求，成功后加入缓存
      return fetch(req).then((response) => {
        // 只缓存同源、状态 200 的响应
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(req, clone).catch(() => {});
          });
        }
        return response;
      }).catch(() => {
        // 离线回退：导航请求返回首页
        if (req.mode === 'navigate') {
          return caches.match('./index.html');
        }
        return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
      });
    })
  );
});
