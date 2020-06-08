console.log("Service Worker Loaded...");
const CACHE_NAME = 'static-cache-v1';

// CODELAB: Add list of files to cache here.
const FILES_TO_CACHE = [
];

self.addEventListener('install', (evt) => {
  console.log('[ServiceWorker] Install');
  // CODELAB: Precache static resources here.

  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  console.log('[ServiceWorker] Activate');
  // CODELAB: Remove previous cached data from disk.

  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  console.log('[ServiceWorker] Fetch', evt.request.url);
  // CODELAB: Add fetch event handler here.

});



self.addEventListener("push", e => {
  const data = e.data.json();
  console.log("Push Recieved...");
  self.registration.showNotification(data.title, {
    body: "Please mark attendance",
    icon: "https://image.ibb.co/frYOFd/tmlogo.png"
  });
});


self.addEventListener('notificationclick', function(event) {
    event.notification.close();
   
    event.waitUntil(clients.matchAll({
      type: "window"
    }).then(function(clientList) {
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        client.postMessage({
          message: 'Received a push message.',
          time: new Date().toString()
        });
          client.focus();
          return false;
          break;
        
      }
     if (clients.openWindow)
      return clients.openWindow('/?operation=attendance');
    }));
  });
  

function postMessage(windowClient)
{
  if( windowClient.url === windowClient.url )
  {
    
    windowClient.postMessage({
      msg: "Please mark my attendance"
      
    });
return true;

  }

  return false;


};
