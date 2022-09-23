// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getMessaging, getToken, onMessage } from "firebase/messaging";
// import { onBackgroundMessage } from "firebase/messaging/sw";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import firebase from "firebase/app";
import "firebase/messaging";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FCM_API_KEY,
  authDomain: process.env.REACT_APP_FCM_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FCM_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FCM_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FCM_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FCM_APP_ID,
  measurementId: process.env.REACT_APP_FCM_MEASUREMENT_ID,
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// // Initialize Firebase Cloud Messaging and get a reference to the service
// const messaging = getMessaging(app);

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

export const requestPermission = () => {
  // [START messaging_request_permission]
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
      // TODO(developer): Retrieve a registration token for use with FCM.
      // ...
    } else {
      console.log("Unable to get permission to notify.");
    }
  });
  // [END messaging_request_permission]
};

export const getTokenFunc = async (setTokenFound) => {
  let currentToken = "";

  messaging
    .getToken({
      vapidKey: process.env.REACT_APP_FCM_VAPID_KEY,
    })
    .then((token) => {
      console.log(token);
      if (token) {
        // Send the token to your server and update the UI if necessary
        currentToken = token;
        setTokenFound(true);
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one.",
        );
        setTokenFound(false);
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });

  return currentToken;
};

export const onMessageListener = () => {
  return new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });
};
