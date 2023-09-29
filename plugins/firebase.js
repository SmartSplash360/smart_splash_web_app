import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

export default defineNuxtPlugin(nuxtApp => {

  const firebaseApp = initializeApp({
    apiKey: "AIzaSyCAHxXRoWZfrKnbi0Ly6g2AlNTrD_Z47iM",
    authDomain: "smart-splash-360-b0361.firebaseapp.com",
    projectId: "smart-splash-360-b0361",
    storageBucket: "smart-splash-360-b0361.appspot.com",
    messagingSenderId: "427224130234",
    appId: "1:427224130234:web:7bced5730af662e7889883",
    measurementId: "G-NX0X45NNF1"
  });

  const messaging = getMessaging(firebaseApp);

  getToken(messaging, { vapidKey: "qhlko1rAvosF0zs7u5U2CM669bM41Uux1CemhqQ-d-Q" });


})

