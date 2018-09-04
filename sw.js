//Asignar nombre y version de la cache
const CACHE_NAME="V1_cache_josephat_PWA";

// Ficheros a cachear en la app
var urlsoCache=[
    "./", "./css/freelancer.min.css", "./img", "./scss",

];

//Install Event
//Se encarga de la instalacion del service worker y cachea archivos estaticos
self.addEventListener('install', (e)=>{

e.waitUntil(
    caches.open(CACHE_NAME).then(
        cache=>{
            return cache.addAll(urlsoCache).then(()=>{

                    self.skipWaiting();
            })
        }
    ).catch((error)=>{
        console.log("Error No se ha registrado la caché", error)
    })
)

});


//Activate Envnt

self.addEventListener('activate', e=>{

const cachewhitelist=[CACHE_NAME];
e.waitUntil(
caches.keys().then(cacheNames=>{

    return Promise.all(
        cacheNames.map(cacheName=>{
                if(cachewhitelist.indexOf(cacheName)===-1){
                    //Se borran los elementos que no se necesita
                    return caches.delete(cacheName);    
                }

        })
    );
}).then(()=>{

    self.clients.claim();
})

)

})


//Fetch

self.addEventListener('fetch', e=>{

    e.respondWith(
        caches.match(e.request).then(res=>{

            if(res){
                //devuelvo datps de cache
return res;
            }

            return fetch(e.request);
        })
    );
})