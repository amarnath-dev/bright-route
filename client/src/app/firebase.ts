import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBHcs4Ufi91zezP0kxddQ3AxqHRWe8uJX0",
  authDomain: "brightroute-82814.firebaseapp.com",
  projectId: "brightroute-82814",
  storageBucket: "brightroute-82814.appspot.com",
  messagingSenderId: "304907644839",
  appId: "1:304907644839:web:12a358ce9663b2479c1082",
  measurementId: "G-V7TCE7W6LJ",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
