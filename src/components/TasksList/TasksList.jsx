//React
import { useState } from "react";

// Get data
import { collection, doc, getDoc, addDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../utils/transferData";

// MUI components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import AddIcon from "@mui/icons-material/Add";

// Custom components
import EditableName from "../EditableName/EditableName";

const TasksList = ({ loadedContent }) => {
  const [tasks, setTasks] = useState(loadedContent);

  // Push new doc to firebase
  const addTask = () => {
    addDoc(collection(db, "tasks"), {
      name: "",
    })
      .then((docRef) => getDoc(docRef))
      .then((doc) => {
        setTasks([
          ...tasks,
          {
            id: doc.id,
            data: doc.data(),
          },
        ]);
      });
  };

  // Delete doc from firebase
  const deleteTask = (dataID, cb) => {
    cb(true);
    deleteDoc(doc(db, "tasks", dataID)).then(() => {
      const removedTaskIndex = tasks.findIndex((task) => {
        return task.id === dataID;
      });
      cb(false);
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
          <EditableName
            key={id}
            id={id}
            name={data.name}
            collection="tasks"
            cb={deleteTask}
          />
        );
      })}

      {/* Add new task */}
      <li>
        <Box sx={{ display: "flex" }}>
          <Button onClick={() => addTask()} sx={{ marginLeft: "-8px" }}>
            <AddIcon sx={{ mr: 1 }} />
            <span>Click to add new task</span>
          </Button>
        </Box>
      </li>
    </List>
  );
};

export default TasksList;
