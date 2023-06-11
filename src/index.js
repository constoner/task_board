import React from 'react';
import ReactDOM from 'react-dom/client';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getDocs, getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const querySnapshot = await getDocs(collection(db, "boards"));
querySnapshot.forEach((doc) => {
  // console.log(`${doc.id} => ${doc.data()}`);
  console.log(doc.data);
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <h1>Hello world!</h1>
  </>
);
