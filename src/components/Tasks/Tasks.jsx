// Get data
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../utils/transferData";
import { useState } from "react";
import { useEffect } from "react";

// MUI components
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

// Getting collection from firebase
// const getData = async (collectionName, cb) => {
//   const querySnapshot = await getDocs(collection(db, collectionName));

//   let dataArray = [];
//   querySnapshot.forEach((doc) => {
//     const {boardID, name, cardID} = doc.data();
//     dataArray.push({
//       id: doc.id,
//       data: {boardID, name, cardID},
//     });
//   });
//   cb(dataArray);
// };

// Push new doc to firebase
// const addData = async (dataName, collectionName, parentBoard, cb) => {
//  await addDoc(collection(db, collectionName), {
//     name: dataName,
//     boardID: parentBoard,
//   })
//   .then((docRef) => getDoc(docRef))
//   .then((doc) =>
//         cb({
//           id: doc.id,
//           data: doc.data(),
//         })
//       );
// };

// Delete doc from firebase
// const deleteData = async (collectionName, dataID, cb) => {
//   await deleteDoc(doc(db, collectionName, dataID)).then(cb(dataID));
// };

const Task = ({ children }) => {
  return <li>{children}</li>;
};

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    let tasks = [];
    getDocs(collection(db, "tasks"))
      .then((result) => {
        result.forEach((doc) => {
          tasks.push({
            id: doc.id,
            data: { name: doc.data().name },
          });
        });
      })
      .then(() => setTasks(tasks));
  }, []);

  return (
    <ul>
      {tasks.map(({ id, data }) => {
        return (
          <Task key={id} id={id}>
            {data.name}
          </Task>
        );
      })}
      <li>Click to add new task</li>
    </ul>
  );
};

export default Tasks;
