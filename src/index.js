import React from "react";
import ReactDOM from "react-dom/client";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import App from "./components/App";

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { collection, getDocs, getFirestore } from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDtqTq0IiF0yiXf8fbJ5V9UuuphNFQ0Hjs",
//   authDomain: "task-board-bc141.firebaseapp.com",
//   projectId: "task-board-bc141",
//   storageBucket: "task-board-bc141.appspot.com",
//   messagingSenderId: "141695702439",
//   appId: "1:141695702439:web:2e62298adab9562605d282"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);
// const querySnapshot = await getDocs(collection(db, "boards"));
// querySnapshot.forEach((doc) => {
//   console.log(doc.id, doc.data());
// });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <App />
  </>
);
