// React
import { useState } from "react";

// Get data
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../utils/transferData";

// MUI components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Create from "@mui/icons-material/Create";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import Done from "@mui/icons-material/Done";
import { grey } from "@mui/material/colors";

import { TextField } from "@mui/material";

const TaskItem = ({ id, name, cb }) => {
  const [editState, setEditState] = useState(false);
  const [taskName, setTaskName] = useState(name);
  const [deleting, setDeleting] = useState(false);

  if (taskName === "") {
    setTimeout(() => setEditState(true), 0);
  }

  const Name = ({ children }) => (
    <Box
      component="p"
      sx={{
        boxSizing: "border-box",
        margin: 0,
        padding: "16.5px 14px",
        fontSize: "1rem",
        fontWeight: 400,
        lineHeight: "1.4375em",
        letterSpacing: "0.00938em",
      }}
    >
      <span>{children}</span>
    </Box>
  );

  // Edit task
  const pushTask = (id) => {
    setDoc(doc(db, "tasks", id), {
      name: taskName.trim(),
    });
    setTimeout(() => taskName && setEditState(false), 50);
  };

  return (
    <li>
      <Box id={id} sx={{ display: "flex" }}>
        {!editState ? (
          <Name>{taskName}</Name>
        ) : (
          <TextField
            placeholder="input new task"
            multiline
            maxRows={10}
            inputRef={(input) => input && input.focus()}
            value={taskName}
            onChange={(evt) => setTaskName(evt.target.value)}
            onBlur={() => {
              pushTask(id);
            }}
          />
        )}

        {/* Edit */}
        {!editState ? (
          <Button
            sx={{ ml: "auto", color: grey[500] }}
            aria-label="edit task."
            onClick={() => {
              setEditState(true);
            }}
          >
            <Create />
          </Button>
        ) : (
          <Button sx={{ ml: "auto" }} aria-label="done editing.">
            <Done />
          </Button>
        )}

        {/* Delete */}
        <Button onClick={() => cb(id, setDeleting)} aria-label="Delete task.">
          {!deleting ? (
            <DeleteOutline sx={{ color: grey[500] }} />
          ) : (
            <CircularProgress
              sx={{
                width: "24px !important",
                height: "24px !important",
                color: grey[500],
              }}
            />
          )}
        </Button>
      </Box>
    </li>
  );
};

export default TaskItem;
