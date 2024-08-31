// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0zKg6S8goQgA_ryzC0-qZm2lqXpnLwPQ",
  authDomain: "opensourceit-9bcb1.firebaseapp.com",
  projectId: "opensourceit-9bcb1",
  storageBucket: "opensourceit-9bcb1.appspot.com",
  messagingSenderId: "533728281781",
  appId: "1:533728281781:web:5caf6521b359df077daafc",
  measurementId: "G-ZSQ1D3VXRB",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
