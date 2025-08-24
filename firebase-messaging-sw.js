importScripts('https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/12.1.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyD2ZjuvmhXh_fK4hT13O4rgIv_8zDmh5yA",
  authDomain: "futuresearchvv.firebaseapp.com",
  projectId: "futuresearchvv",
  storageBucket: "futuresearchvv.firebasestorage.app",
  messagingSenderId: "918841828994",
  appId: "1:918841828994:web:42bf73582cbb05487ab69b",
  measurementId: "G-JEN39X6EGL"
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/favicon.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
