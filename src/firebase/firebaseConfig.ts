// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWgkazC1DTuQSCHj45vGro1kXiwTmBJmg",
  authDomain: "sh-admin-83e4a.firebaseapp.com",
  projectId: "sh-admin-83e4a",
  storageBucket: "sh-admin-83e4a.appspot.com",
  messagingSenderId: "296097212554",
  appId: "1:296097212554:web:a9b5171ac737f6cc31e573",
  measurementId: "G-52K7CH8WS5"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);
