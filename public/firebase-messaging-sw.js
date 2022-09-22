
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { onBackgroundMessage } from "firebase/messaging/sw";

// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyCF8C5DLLcyVdbWUV0ZSt_hhKNmIaJ8h-U",
  authDomain: "ddangddang-d4a3f.firebaseapp.com",
  projectId: "ddangddang-d4a3f",
  storageBucket: "ddangddang-d4a3f.appspot.com",
  messagingSenderId: "87953491272",
  appId: "1:87953491272:web:c29f621403d62cf3ff1f7d",
  measurementId: "G-CQWF431WLQ",
};

// // eslint-disable-next-line no-undef
// firebase.initializeApp(firebaseConfig);

// // Retrieve firebase messaging
// // eslint-disable-next-line no-undef
// const messaging = firebase.messaging();

const app = initializeApp(firebaseConfig);
const messaging = getMessaging();

onBackgroundMessage(messaging, (payload) => {
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