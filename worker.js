console.log("Service Worker Loaded...");


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
   // event.waitUntil(clients.openWindow('weather/advisory'));  
   
 event.waitUntil(clients.matchAll({ type: 'window' }).then(clientsArr => {
  const hadWindowToFocus = clientsArr.some(postMessage);

    // If a Window tab matching the targeted URL already exists, focus that;
   // const hadWindowToFocus = clientsArr.some(windowClient => windowClient.url === windowClient.url ? (windowClient.focus(), true) : false);
    // Otherwise, open a new tab to the applicable URL and focus it.
  //  if (!hadWindowToFocus) clients.openWindow(event.notification.data.url).then(windowClient => windowClient ? windowClient.focus() : null);
  }));

  clients.openWindow("https://dialogflowvivektemp2.azurewebsites.net/?operation=attendance").then(windowClient => windowClient ? windowClient.focus() : null);
  
});

function postMessage(windowClient)
{
  if( windowClient.url === windowClient.url )
  {
    
    windowClient.postMessage({
      msg: "Please mark my attendance",
      url: event.request.url
    });
return true;

  }

  return false;


};
