// 定义缓存的名称，每次更新代码时，修改版本号可以触发更新
const CACHE_NAME = 'my-note-pwa-v1';
// 需要缓存的资源列表，确保这些文件路径正确
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/app.js',
    '/icon-192.png',
    '/icon-512.png'
];

// 安装 Service Worker
self.addEventListener('install', event => {
    console.log('Service Worker 安装中...');
    // 执行缓存
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('缓存已打开');
                return cache.addAll(urlsToCache);
            })
    );
});

// 拦截网络请求
self.addEventListener('fetch', event => {
    // console.log('请求拦截:', event.request.url);
    event.respondWith(
        // 尝试从缓存中匹配请求
        caches.match(event.request)
            .then(response => {
                // 如果找到缓存，则返回缓存；否则去网络获取
                return response || fetch(event.request);
            })
    );
});

// 激活新的 Service Worker，并清理旧缓存
self.addEventListener('activate', event => {
    console.log('Service Worker 激活中...');
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    // 删除不在白名单中的旧缓存
                    if (!cacheWhitelist.includes(cacheName)) {
                        console.log('删除旧缓存:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});