// import { getMessaging, getToken } from "firebase/messaging";
// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
// const messaging = getMessaging();
// getToken(messaging, { vapidKey: "qhlko1rAvosF0zs7u5U2CM669bM41Uux1CemhqQ-d-Q" }).then((currentToken) => {
//   if (currentToken) {
// Send the token to your server and update the UI if necessary
//   } else {
//   Show permission request UI
//   }
// }).catch((err) => {
// });
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');
// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
// firebase.initializeApp({
//     apiKey: "AIzaSyCAHxXRoWZfrKnbi0Ly6g2AlNTrD_Z47iM",
//     authDomain: "smart-splash-360-b0361.firebaseapp.com",
//     projectId: "smart-splash-360-b0361",
//     storageBucket: "smart-splash-360-b0361.appspot.com",
//     messagingSenderId: "427224130234",
//     appId: "1:427224130234:web:7bced5730af662e7889883",
//     measurementId: "G-NX0X45NNF1"
//   });
// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
// const messaging = firebase.messaging();