//React
import { useState } from "react";

// Get data
import * as backend from "../../data/utils";

// MUI components
import List from "@mui/material/List";

// Custom components
import EditableName from "../EditableName/EditableName";
import NewTask from "./NewTask";

const TasksList = ({ taskData, cardID, status, setStatus }) => {
  const [tasks, setTasks] = useState(taskData);

  // Push new doc to firebase
  const addTask = () => {
    backend
      .pushTask(cardID)
      .then((doc) => {
        setTasks([
          ...tasks,
          {
            id: doc.id,
            data: doc.data(),
          },
        ]);
      })
      .catch(console.error);
  };

  // Delete doc from firebase
  const deleteTask = (dataID, cb) => {
    cb(true);
    backend
      .removeTask(dataID)
      .then(() => {
        const removedTaskIndex = tasks.findIndex((task) => {
          return task.id === dataID;
        });
        cb(false);
        tasks.splice(removedTaskIndex, 1);
        setTasks([...tasks]);
      })
      .catch(console.error);
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
          <li key={id}>
            <EditableName
              id={id}
              name={data.name}
              collection="tasks"
              cb={deleteTask}
              isInputBusy={status}
              setInputState={setStatus}
            />
          </li>
        );
      })}

      {/* Add new task */}
      <li key="add">
        <NewTask onClick={addTask} />
      </li>
    </List>
  );
};

export default TasksList;
