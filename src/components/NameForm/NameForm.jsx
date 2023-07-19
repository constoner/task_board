// React
import { useState } from "react";

// Get data
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../utils/transferData";

// MUI components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CreateIcon from "@mui/icons-material/Create";
import DoneIcon from "@mui/icons-material/Done";
import { grey } from "@mui/material/colors";

import { TextField } from "@mui/material";

const NameForm = ({ id, name, collection }) => {
  const [editState, setEditState] = useState(false);
  const [nameValue, setNameValue] = useState(name);

  if (nameValue === "") {
    setTimeout(() => setEditState(true), 0);
    // setEditState(true);
  }

  const Name = ({ children }) => (
    <Box component="p" sx={{ pl: "14px" }}>
      {children}
    </Box>
  );

  // Edit task
  const editName = () => {
    setDoc(doc(db, collection, id), {
      name: nameValue.trim(),
    }).then(() => nameValue && setEditState(false));
  };

  document.addEventListener("focusout", () => editName());

  return (
    <li>
      <Box id={id} sx={{ display: "flex" }}>
        {!editState ? (
          <Name>{nameValue}</Name>
        ) : (
          <TextField
            placeholder="input new task"
            inputRef={(input) => input && input.focus()}
            value={nameValue}
            onChange={(evt) => setNameValue(evt.target.value)}
          />
        )}

        {/* Edit */}
        {!editState ? (
          <Button
            sx={{ ml: "auto", color: grey[500] }}
            onClick={() => setTimeout(() => setEditState(true), 100)}
          >
            <CreateIcon />
          </Button>
        ) : (
          <Button sx={{ ml: "auto" }} onClick={() => editName()}>
            <DoneIcon />
          </Button>
        )}
      </Box>
    </li>
  );
};

export default NameForm;
