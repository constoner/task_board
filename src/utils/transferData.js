// Loading data from Firebase //
// https://firebase.google.com/docs/web/setup#available-libraries //

// imports //
import { initializeApp } from "firebase/app";
import { collection, getDocs, addDoc, getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration //
const firebaseConfig = {
  apiKey: "AIzaSyDtqTq0IiF0yiXf8fbJ5V9UuuphNFQ0Hjs",
  authDomain: "task-board-bc141.firebaseapp.com",
  projectId: "task-board-bc141",
  storageBucket: "task-board-bc141.appspot.com",
  messagingSenderId: "141695702439",
  appId: "1:141695702439:web:2e62298adab9562605d282"
};

// Initialize Firebase //
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// getting data from firebase //
const getData = async (collectionName, cb) => {
  const querySnapshot = await getDocs(collection(db, collectionName));

  let dataArray = [];
  querySnapshot.forEach((doc) => {
    dataArray.push(doc.data());
  });
  cb(dataArray);
};

// push new data to firebase //
const addData = async (dataName, collectionName) => {
await addDoc(collection(db, collectionName), {
    name: dataName,
  });
};

export { getData, addData };
