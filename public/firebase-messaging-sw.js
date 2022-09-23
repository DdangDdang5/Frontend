// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken, onMessage } from "firebase/messaging";
// import { onBackgroundMessage } from "firebase/messaging/sw";

// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FCM_API_KEY,
  authDomain: process.env.REACT_APP_FCM_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FCM_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FCM_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FCM_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FCM_APP_ID,
  measurementId: process.env.REACT_APP_FCM_MEASUREMENT_ID,
};

// // eslint-disable-next-line no-undef
// firebase.initializeApp(firebaseConfig);

// // Retrieve firebase messaging
// // eslint-disable-next-line no-undef
// const messaging = firebase.messaging();

// const app = initializeApp(firebaseConfig);
// const messaging = getMessaging();

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register("./firebase-messaging-sw.js")
//     .then(function (registration) {
//       console.log("Registration successful, scope is:", registration.scope);
//       messaging.getToken({
//         vapidKey:
//           "BOp2VT-WEk4xZXWnAbtabpfTiVXGvM7xDown9s-n2cpUL9TACpLLbCxk_KtpEjBfdjtbOQgLFleHU5mCyrzqO00",
//         serviceWorkerRegistration: registration,
//       })
//         .then((currentToken) => {
//           if (currentToken) {
//             console.log("current token for client: ", currentToken);

//             // Track the token -> client mapping, by sending to backend server
//             // show on the UI that permission is secured
//           } else {
//             console.log(
//               "No registration token available. Request permission to generate one.",
//             );

//             // shows on the UI that permission is required
//           }
//         })
//         .catch((err) => {
//           console.log("An error occurred while retrieving token. ", err);
//           // catch error while creating client token
//         });
//     })
//     .catch(function (err) {
//       console.log("Service worker registration failed, error:", err);
//     });
// }

messaging.onBackgroundMessage(messaging, (payload) => {
  // messaging.onBackgroundMessage((payload) => {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo192.png",
  };

  // eslint-disable-next-line no-restricted-globals
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions,
  );
});
