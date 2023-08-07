// Loading data from Firebase
// https://firebase.google.com/docs/web/setup#available-libraries

// Imports
import { initializeApp } from "firebase/app";
import {getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtqTq0IiF0yiXf8fbJ5V9UuuphNFQ0Hjs",
  authDomain: "task-board-bc141.firebaseapp.com",
  projectId: "task-board-bc141",
  storageBucket: "task-board-bc141.appspot.com",
  messagingSenderId: "141695702439",
  appId: "1:141695702439:web:2e62298adab9562605d282"
};

// Initialize Firebase
const initializeDataBase = () => {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  return db;
};

export {initializeDataBase};

