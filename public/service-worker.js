var CACHE_NAME = "static-cache";
var urlsToCache = [".", "index.html"];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetchAndCache(event.request);
    })
  );
});

function fetchAndCache(url) {
  return fetch(url).then(function (response) {
    return caches.open(CACHE_NAME).then(function (cache) {
      cache.put(url, response.clone());
      return response;
    });
  });
}
