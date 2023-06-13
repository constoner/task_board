
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

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
// const auth = getAuth(app);
const app = initializeApp(firebaseConfig);

const getData = async () => {
  const db = getFirestore(app);
  const querySnapshot = await getDocs(collection(db, "boards"));

  let boards = [];
  querySnapshot.forEach((doc) => {
    boards.push(doc.data());
  });
  return boards;
};

export default getData;
