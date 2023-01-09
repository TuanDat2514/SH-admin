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
  apiKey: "AIzaSyB3Ink47n-bTLP2szfXK0q8ErRU0CgFzwE",
  authDomain: "fire-client-7fc2a.firebaseapp.com",
  projectId: "fire-client-7fc2a",
  storageBucket: "fire-client-7fc2a.appspot.com",
  messagingSenderId: "558036469518",
  appId: "1:558036469518:web:6b721d5f95ba685b4a795f",
  measurementId: "G-4NQN3Q3D0C"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);
