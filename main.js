// main.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-messaging.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD2ZjuvmhXh_fK4hT13O4rgIv_8zDmh5yA",
  authDomain: "futuresearchvv.firebaseapp.com",
  projectId: "futuresearchvv",
  storageBucket: "futuresearchvv.firebasestorage.app",
  messagingSenderId: "918841828994",
  appId: "1:918841828994:web:42bf73582cbb05487ab69b",
  measurementId: "G-JEN39X6EGL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then(registration => console.log('Service Worker registered', registration.scope))
    .catch(err => console.error('SW registration failed:', err));
}

// Request permission for notifications
Notification.requestPermission().then(permission => {
  if (permission === "granted") {
    getToken(messaging, { vapidKey: "BM1H0Mzew-VIVuaTlQIUSDRW_axrqL_4LScckPnEbg0nvGKD1qj4QyaaLTZe-d5si5Gjpp99zn23nQaUfZi1CRc" })
      .then(token => {
        console.log("FCM Token:", token);
        // Send token to Netlify backend
        fetch("/.netlify/functions/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token })
        });
      });
  } else {
    console.log("Notification permission denied");
  }
});

// Optional: handle messages while site is open
onMessage(messaging, payload => {
  alert(`Notification: ${payload.notification.title} - ${payload.notification.body}`);
});
