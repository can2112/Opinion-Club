// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASSE_MESSAGE_ID,
  authDomain: "opinion-club.firebaseapp.com",
  projectId: "opinion-club",
  storageBucket: "opinion-club.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASSE_MESSAGE_ID,
  appId: "1:1021685935088:web:96de068c362d9ac9af8b35",
  measurementId: "G-TJTPJL2ZS0",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);

export default app;
