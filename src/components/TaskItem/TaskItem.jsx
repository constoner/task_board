// React
import { useState } from "react";

// Get data
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../utils/transferData";

// MUI components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Create from "@mui/icons-material/Create";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import Done from "@mui/icons-material/Done";
import { grey } from "@mui/material/colors";

import { TextField } from "@mui/material";

const TaskItem = ({ id, name, cb }) => {
  const [editState, setEditState] = useState(false);
  const [taskName, setTaskName] = useState(name);

  if (taskName === "") {
    setTimeout(() => setEditState(true), 0);
    // setEditState(true);
  }

  const Name = ({ children }) => (
    <Box component="p" sx={{ pl: "14px" }}>
      {children}
    </Box>
  );

  // Edit task
  const editTask = (id) => {
    setDoc(doc(db, "tasks", id), {
      name: taskName.trim(),
    });
    taskName && setEditState(false);
  };

  document.addEventListener("focusout", () => editTask(id));

  return (
    <li>
      <Box id={id} sx={{ display: "flex" }}>
        {!editState ? (
          <Name>{taskName}</Name>
        ) : (
          <TextField
            placeholder="input new task"
            inputRef={(input) => input && input.focus()}
            value={taskName}
            onChange={(evt) => setTaskName(evt.target.value)}
          />
        )}

        {/* Edit */}
        {!editState ? (
          <Button
            sx={{ ml: "auto", color: grey[500] }}
            aria-label="edit task."
            onClick={() =>
              editState
                ? setTimeout(() => setEditState(true), 250)
                : setEditState(true)
            }
          >
            <Create />
          </Button>
        ) : (
          <Button sx={{ ml: "auto" }} aria-label="done editing.">
            <Done />
          </Button>
        )}

        {/* Delete */}
        <Button onClick={() => cb(id)} aria-label="Delete task.">
          <DeleteOutline sx={{ color: grey[500] }} />
        </Button>
      </Box>
    </li>
  );
};

export default TaskItem;
