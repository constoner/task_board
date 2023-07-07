// Get data
import { collection, doc, getDoc, addDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../utils/transferData";
import { useState } from "react";

// MUI components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";

// Custom components
import TaskItem from "../TaskItem/TaskItem";

const Tasks = ({ loadedContent }) => {
  const [tasks, setTasks] = useState(loadedContent);

  // Push new doc to firebase
  const addTask = (dataName) => {
    addDoc(collection(db, "tasks"), {
      name: dataName,
    })
      .then((docRef) => getDoc(docRef))
      .then((doc) =>
        setTasks([
          ...tasks,
          {
            id: doc.id,
            data: doc.data(),
          },
        ])
      );
  };

  // Delete doc from firebase
  const deleteTask = (dataID) => {
    deleteDoc(doc(db, "tasks", dataID)).then(() => {
      const removedTaskIndex = tasks.findIndex((task) => {
        return task.id === dataID;
      });
      tasks.splice(removedTaskIndex, 1);
      setTasks([...tasks]);
    });
  };

  return (
    <List
      sx={{
        width: "100%",
        "& ul": { padding: 0 },
      }}
    >
      {tasks.map(({ id, data }) => {
        return (
          <TaskItem key={id}>
            <Box
              id={id}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <p>{data.name}</p>
              <Button onClick={() => deleteTask(id)}>del</Button>
            </Box>
          </TaskItem>
        );
      })}
      <TaskItem>
        <Box sx={{ display: "flex" }}>
          <Button
            onClick={() => addTask("new-task")}
            sx={{ marginLeft: "-8px" }}
          >
            Click to add new task
          </Button>
        </Box>
      </TaskItem>
    </List>
  );
};

export default Tasks;
