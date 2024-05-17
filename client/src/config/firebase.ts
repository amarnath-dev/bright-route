import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "new-4-759de.firebaseapp.com",
  projectId: "new-4-759de",
  storageBucket: "new-4-759de.appspot.com",
  messagingSenderId: "459308759766",
  appId: "1:459308759766:web:5b8b2df8c54576c66ee777",
  measurementId: "G-0SG2FY50RN",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
