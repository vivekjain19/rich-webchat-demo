const publicVapidKey =
  "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";

// Check for service worker
if ("serviceWorker" in navigator) {
  send().catch(err => console.error(err));
}

navigator.serviceWorker.addEventListener('message', function(event) {
  $("#message").val('Please mark my attendance');
  $('#submit').submit();  
});


$( window ).on( "load", function(){

  var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

  for (var i = 0; i < url.length; i++) {  
    var urlparam = url[i].split('=');  
    if (urlparam[0] == 'operation') {  
      $("#message").val('Please mark my attendance');
      $('#submit').submit();  
    }  
}

var uri = window.location.toString();
	if (uri.indexOf("?") > 0) {
	    var clean_uri = uri.substring(0, uri.indexOf("?"));
	    window.history.replaceState({}, document.title, clean_uri);
	}

});

$(document).ready(function() {


  $('#testNotify').click(function(){
   sendNotification();
    return false;
    });

});

async function sendNotification()
{
  const register = await navigator.serviceWorker.register("/worker.js", {
    scope: "/"
  });
  console.log("Service Worker Registered...");

  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });
  console.log("Push Registered...");
// Send Push Notification
console.log("Sending Push...");
await fetch("https://vivekdialogflowtemp.azurewebsites.net/subscribe", {
  method: "POST",
  body: JSON.stringify(subscription),
  headers: {
    "content-type": "application/json"
  }
});
console.log("Push Sent...");

}

// Register SW, Register Push, Send Push
async function send() {
  // Register Service Worker
  console.log("Registering service worker...");
  const register = await navigator.serviceWorker.register("/worker.js", {
    scope: "/"
  });
  console.log("Service Worker Registered...");
  }

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
