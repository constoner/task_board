// Loading data from Firebase
// https://firebase.google.com/docs/web/setup#available-libraries

// Imports
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDocs, deleteDoc } from "firebase/firestore";

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
export const initializeDataBase = () => {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  return db;
};

export const getBoards = () => {
  let boards = [];
  return getDocs(collection(initializeDataBase(), "boards"))
    .then((result) => {
      result.forEach((doc) => {
        boards.push({
          id: doc.id,
          data: { name: doc.data().name },
        });
      });
      return boards;
    });
};

export const removeBoard = (dataID) => {
  getDocs(collection(initializeDataBase(), "cards"))
    .then((result) =>
      result.forEach((card) => {
        if (card.data().boardID === dataID) {
          getDocs(collection(initializeDataBase(), "tasks"))
            .then((result) =>
              result.forEach((task) => {
                if (task.data().cardID === card.id) {
                  deleteDoc(
                    doc(initializeDataBase(), "tasks", task.id)
                  );
                }
              })
            )
            .then(() =>
              deleteDoc(doc(initializeDataBase(), "cards", card.id))
            );
        }
      })
    );
  return deleteDoc(doc(initializeDataBase(), "boards", dataID));
};

