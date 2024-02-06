import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyBHcs4Ufi91zezP0kxddQ3AxqHRWe8uJX0",
//   authDomain: "brightroute-82814.firebaseapp.com",
//   projectId: "brightroute-82814",
//   storageBucket: "brightroute-82814.appspot.com",
//   messagingSenderId: "304907644839",
//   appId: "1:304907644839:web:12a358ce9663b2479c1082",
//   measurementId: "G-V7TCE7W6LJ",
// };

// const firebaseConfig = {
//   apiKey: "AIzaSyBgIFF6qguoiiJoGOJ_9pBJKw0sn8HUoi0",
//   authDomain: "new-project-289c7.firebaseapp.com",
//   projectId: "new-project-289c7",
//   storageBucket: "new-project-289c7.appspot.com",
//   messagingSenderId: "168133219970",
//   appId: "1:168133219970:web:134d3f2ee48505c65a469b",
//   measurementId: "G-B3ZQVKDTP2",
// };



const firebaseConfig = {
  apiKey: "AIzaSyDy84bD1v-MvFKAbbbUWqV3wr9tHgjdNWE",
  authDomain: "new3-468a7.firebaseapp.com",
  projectId: "new3-468a7",
  storageBucket: "new3-468a7.appspot.com",
  messagingSenderId: "305359932795",
  appId: "1:305359932795:web:76c59bca5f128115e241de",
  measurementId: "G-LSRG2KMPEN"
};



export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
