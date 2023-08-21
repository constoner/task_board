// Loading data from Firebase
// https://firebase.google.com/docs/web/setup#available-libraries

// Imports
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, doc, getDoc, getDocs, deleteDoc, setDoc } from "firebase/firestore";

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

// BOARDS
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

export const eraseBoard = (dataID) => {
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

export const pushBoard = (dataName) => {
  const docRef = doc(initializeDataBase(), "boards", `b${Date.now()}`);

  return setDoc(docRef, {
    name: dataName,
  })
    .then(() => getDoc(docRef));
};

// CARDS and TASKS
export const getTasks = () => {
  let tasks = [];
  return getDocs(collection(initializeDataBase(), "tasks"))
    .then((result) => {
      result.forEach((doc) => {
        tasks.push({
          id: doc.id,
          data: {
            name: doc.data().name,
            cardID: doc.data().cardID,
          },
        });
      });
      return tasks;
    });
};

export const getCards = (activeBoard) => {
  let cards = [];
  return getDocs(
    query(
      collection(initializeDataBase(), "cards"),
      where("boardID", "==", activeBoard.id)
    )
  )
    .then((result) => {
      result.forEach((doc) => {
        cards.push({
          id: doc.id,
          data: { name: doc.data().name },
        });
      });
      return cards;
    })
};

export const pushCard = (dataName, activeBoard) => {
  const docRef = doc(initializeDataBase(), "cards", `c${Date.now()}`)

  return setDoc(docRef, {
    name: dataName,
    boardID: activeBoard.id,
  })
    .then(() => getDoc(docRef));
};

export const eraseCard = (dataID) => {
  getDocs(collection(initializeDataBase(), "tasks")).then((result) =>
    result.forEach((task) => {
      if (task.data().cardID === dataID) {
        deleteDoc(doc(initializeDataBase(), "tasks", task.id));
      }
    })
  );

  return deleteDoc(doc(initializeDataBase(), "cards", dataID));
};

export const pushTask = (dataID) => {
  const docRef = doc(initializeDataBase(), "tasks", `t${Date.now()}`)

  return setDoc(docRef, {
    name: "",
    cardID: dataID,
  })
    .then(() => getDoc(docRef));
};

export const eraseTask = (dataID) => {
  return deleteDoc(doc(initializeDataBase(), "tasks", dataID));
};

export const pushName = (id, collectionName, newName) => {
  const docRef = doc(initializeDataBase(), collectionName, id)

  return setDoc(docRef, { name: newName.trim() }, { merge: true });
};
