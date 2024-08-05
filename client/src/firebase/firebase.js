// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {

  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-ums-23f53.firebaseapp.com",
  projectId: "mern-ums-23f53",
  storageBucket: "mern-ums-23f53.appspot.com",
  messagingSenderId: "77224437717",
  appId: "1:77224437717:web:02be44af3a07f11bab3f5c",
  
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);