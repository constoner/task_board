// React
import { useState } from "react";

// Get data
import * as backend from "../../data/utils";

// MUI components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Create from "@mui/icons-material/Create";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import Done from "@mui/icons-material/Done";
import { grey } from "@mui/material/colors";
import { TextField } from "@mui/material";

// Custom components
import Name from "./Name";

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

  // initial check when new task appears
  if (nameValue === "") {
    setTimeout(() => setEditState(true), 0); // zero for properly event order
  }

  // Edit name
  const setName = (id) => {
    if (nameValue !== "") {
      backend.pushName(id, collection, nameValue).catch(console.error);
      setTimeout(() => {
        setEditState(false);
        setInputState(false);
      }, 150); // testing shortest possible interval - 100ms (75ms to short without trottling); increased to 150 because dont work in firefox
    }
  };

  return (
    <Box id={id} sx={{ display: "flex" }}>
      {!editState ? (
        <Name isTitle={cb && true}>{nameValue}</Name>
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
            setName(id);
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
            if (!isInputBusy) {
              setTimeout(() => {
                setInputState(true);
                setEditState(true);
              }, 0); // zero for running in properly order
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
