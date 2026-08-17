const CACHE_NAME = "bb-company-app-cache";

const APP_FILES = [
    "./",
    "./dashboard.html",
    "./attendance.html",
    "./chat.html",
    "./achievements.html",
    "./profile.html",
    "./mobile.css",
    "./app-update.js",
    "./manifest.json",
    "./images/BBapplogo.png",
    "./images/bb.logo.png"
];


// ================================
// INSTALL
// ================================

self.addEventListener("install", event => {

    console.log(
        "BB App Service Worker installing..."
    );

    self.skipWaiting();

});


// ================================
// ACTIVATE
// ================================

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys().then(cacheNames => {

            return Promise.all(

                cacheNames.map(cacheName => {

                    if(
                        cacheName !== CACHE_NAME
                    ){

                        return caches.delete(
                            cacheName
                        );

                    }

                })

            );

        })

    );

    self.clients.claim();

});


// ================================
// FETCH
// ================================

self.addEventListener(
    "fetch",
    event => {

        event.respondWith(

            fetch(event.request)
                .then(response => {

                    return response;

                })
                .catch(() => {

                    return caches.match(
                        event.request
                    );

                })

        );

    }
);