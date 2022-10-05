import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB4ttuWz8SqHyqS8rIxjHeifDdBR35L730",
  authDomain: "curso-2d276.firebaseapp.com",
  projectId: "curso-2d276",
  storageBucket: "curso-2d276.appspot.com",
  messagingSenderId: "239155791838",
  appId: "1:239155791838:web:1f81a3f8c95ce88dcb3f4f",
  measurementId: "G-MJ197DDXX9",
};

export const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
