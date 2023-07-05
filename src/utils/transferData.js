// Loading data from Firebase
// https://firebase.google.com/docs/web/setup#available-libraries

// Imports
import { initializeApp } from "firebase/app";
import {getFirestore, collection, doc, getDocs, getDoc, addDoc, deleteDoc } from "firebase/firestore";

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
const db = getFirestore(app);

export {app, db};

// Getting collection from firebase
const getData = async (collectionName, cb) => {
  const querySnapshot = await getDocs(collection(db, collectionName));

  let dataArray = [];
  querySnapshot.forEach((doc) => {
    const {boardID, name, cardID} = doc.data();
    dataArray.push({
      id: doc.id,
      data: {boardID, name, cardID},
    });
  });
  cb(dataArray);
};

// Push new doc to firebase
const addData = async (dataName, collectionName, parentBoard, cb) => {
 await addDoc(collection(db, collectionName), {
    name: dataName,
    boardID: parentBoard,
  })
  .then((docRef) => getDoc(docRef))
  .then((doc) =>
        cb({
          id: doc.id,
          data: doc.data(),
        })
      );
};

// Delete doc from firebase
const deleteData = async (collectionName, dataID, cb) => {
  await deleteDoc(doc(db, collectionName, dataID)).then(cb(dataID));
};

export { getData, addData, deleteData };
