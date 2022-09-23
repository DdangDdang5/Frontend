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
  apiKey: "AIzaSyCF8C5DLLcyVdbWUV0ZSt_hhKNmIaJ8h-U",
  authDomain: "ddangddang-d4a3f.firebaseapp.com",
  projectId: "ddangddang-d4a3f",
  storageBucket: "ddangddang-d4a3f.appspot.com",
  messagingSenderId: "87953491272",
  appId: "1:87953491272:web:03a1eb4bc63e5970ff1f7d",
  measurementId: "G-CW6VVM753N"
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
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      // TODO(developer): Retrieve a registration token for use with FCM.
      // ...
    } else {
      console.log('Unable to get permission to notify.');
    }
  });
  // [END messaging_request_permission]
}


export const getTokenFunc = async (setTokenFound) => {
  let currentToken = "";

  messaging.getToken({
    vapidKey:
      "BOp2VT-WEk4xZXWnAbtabpfTiVXGvM7xDown9s-n2cpUL9TACpLLbCxk_KtpEjBfdjtbOQgLFleHU5mCyrzqO00",
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
