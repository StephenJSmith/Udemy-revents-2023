import { initializeApp } from "firebase/app";
import 'firebase/firestore';
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "revents-2023-73374.firebaseapp.com",
  projectId: "revents-2023-73374",
  storageBucket: "revents-2023-73374.appspot.com",
  messagingSenderId: "420822276265",
  appId: "1:420822276265:web:d19db646ee12c394b0f1b8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);