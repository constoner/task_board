// React
import { useState } from "react";

// Get data
import { doc, setDoc } from "firebase/firestore";
import * as backend from "../../data/fromFirebase";

// MUI components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Create from "@mui/icons-material/Create";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import Done from "@mui/icons-material/Done";
import { grey } from "@mui/material/colors";

import { TextField } from "@mui/material";

const EditableName = ({
  id,
  name,
  collection,
  cb = false,
  isInputBusy,
  setInputState,
}) => {
  const [editState, setEditState] = useState(false);
  const [nameValue, setNameValue] = useState(name);
  const [deleting, setDeleting] = useState(false);

  if (nameValue === "") {
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
        lineHeight: "1.4375em",
        letterSpacing: "0.00938em",
        textTransform: () => (!cb ? "uppercase" : "unset"),
        overflow: "hidden",
        overflowWrap: "break-word",
      }}
    >
      <Box
        component="span"
        title={children}
        sx={{ overflowWrap: "break-word" }}
      >
        {children}
      </Box>
    </Box>
  );

  // Edit name
  const pushName = (id) => {
    setDoc(
      doc(backend.initializeDataBase(), collection, id),
      {
        name: nameValue.trim(),
      },
      { merge: true }
    );
    setEditState(false); // 200ms not compitable (to long), 100ms better but not almost, 50&75ms to short, 300ms to long
    setInputState(false);
  };

  return (
    <Box id={id} sx={{ display: "flex" }}>
      {!editState ? (
        <Name>{nameValue}</Name>
      ) : (
        <TextField
          placeholder={`input new ${collection.slice(
            0,
            collection.length - 1
          )}`}
          multiline
          maxRows={10}
          inputRef={(input) => input && input.focus()}
          value={nameValue}
          onChange={(evt) => setNameValue(evt.target.value)}
          onBlur={() => {
            pushName(id);
          }}
        />
      )}

      {/* Edit */}
      {!editState ? (
        <Button
          sx={{ ml: "auto", color: grey[500] }}
          aria-label={`edit ${collection.slice(
            0,
            collection.length - 1
          )} name.`}
          onClick={() => {
            if (isInputBusy) {
              setTimeout(() => {
                setInputState(true);
                setEditState(true);
              }, 200);
            } else {
              setEditState(true);
              setInputState(true);
            }
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
      {cb ? (
        <Button
          onClick={() => cb(id, setDeleting)}
          aria-label={`Delete ${collection.slice(0, collection.length - 1)}.`}
        >
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
      ) : null}
    </Box>
  );
};

export default EditableName;
