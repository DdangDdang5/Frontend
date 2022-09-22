// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { onBackgroundMessage } from "firebase/messaging/sw";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import firebase from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCF8C5DLLcyVdbWUV0ZSt_hhKNmIaJ8h-U",
  authDomain: "ddangddang-d4a3f.firebaseapp.com",
  projectId: "ddangddang-d4a3f",
  storageBucket: "ddangddang-d4a3f.appspot.com",
  messagingSenderId: "87953491272",
  appId: "1:87953491272:web:c29f621403d62cf3ff1f7d",
  measurementId: "G-CQWF431WLQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// firebase.initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app);


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

  getToken(messaging, {
    vapidKey:
      "BHKndVGw9MOoKJjBOx3pDaw9sLX_q--9N3KCvs_qCEAHqhnOAggbWUBlkTjxlTvHxxgBgf8J6mLI3v-mTVah7Nk",
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
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
};
