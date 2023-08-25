// React
import { useState } from "react";
import PropTypes from "prop-types";
import * as backend from "../../data/utils";
import useNameState from "./nameHooks";

// MUI components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import { grey } from "@mui/material/colors";
import { red } from "@mui/material/colors";
import { TextField } from "@mui/material";

// Custom components
import Name from "./Name";
import Confirmation from "../Confirmation/Confirmation";

const EditableName = ({
  isTitle = false,
  id,
  name,
  collection,
  cb = false,
  isInputBusy,
  setInputState,
  names,
  setNames,
}) => {
  const { setName } = useNameState();
  const [editState, setEditState] = useState(false);
  const [nameValue, setNameValue] = useState(name);
  const [deleting, setDeleting] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [anchor, setAnchor] = useState(null);

  const finishEditing = () => {
    if (!isInputBusy) {
      setTimeout(() => {
        setInputState(true);
        setEditState(true);
      }, 0); // zero for running in properly order
    }
  };

  // initial check when new task appears
  if (nameValue === "") {
    setTimeout(() => setEditState(true), 0); // zero for properly event order
  }

  // Edit name
  const editName = (id) => {
    if (nameValue !== "") {
      backend.pushName(id, collection, nameValue).catch(console.error);
      setName(names, id, nameValue, setNames);
      setTimeout(() => {
        setEditState(false);
        setInputState(false);
      }, 150); // testing shortest possible interval - 100ms (75ms to short without trottling); increased to 150 because dont work in firefox
    }
  };

  const onDelete = (evt) => {
    if (isTitle) {
      setAnchor(evt.currentTarget);
      setConfirmation(true);
    } else {
      cb(id, setDeleting);
    }
  };

  return (
    <Box id={id} sx={{ display: "flex" }}>
      {!editState ? (
        <Name isTitle={isTitle} onClick={finishEditing}>
          {nameValue}
        </Name>
      ) : (
        <TextField
          placeholder={`input new ${collection.slice(
            0,
            collection.length - 1
          )}`}
          multiline
          sx={{ flexGrow: 1 }}
          maxRows={10}
          inputRef={(input) => input && input.focus()}
          value={nameValue}
          onChange={(evt) => setNameValue(evt.target.value)}
          onBlur={() => {
            editName(id);
          }}
        />
      )}

      <Button
        onClick={onDelete}
        aria-label={`Delete ${collection.slice(0, collection.length - 1)}.`}
        title={isTitle ? "Delete card" : "Delete task"}
        sx={{
          minWidth: "unset",
          height: "auto",
          alignSelf: "flex-start",
          py: 2,
          marginLeft: -1,
        }}
      >
        {!deleting ? (
          <DeleteOutline
            sx={{ color: () => (isTitle ? red[700] : grey[500]) }}
          />
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
      {isTitle ? (
        <Confirmation
          oneOfElements={collection}
          anchor={anchor}
          open={confirmation}
          cb={cb}
          setDeleting={setDeleting}
          id={id}
          setConfirmation={setConfirmation}
          setAnchor={setAnchor}
        />
      ) : null}
    </Box>
  );
};

export default EditableName;

EditableName.propTypes = {
  isTitle: PropTypes.bool,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  collection: PropTypes.string.isRequired,
  cb: PropTypes.func,
  isInputBusy: PropTypes.bool.isRequired,
  setInputState: PropTypes.func.isRequired,
  names: PropTypes.arrayOf(PropTypes.object).isRequired,
  setNames: PropTypes.func.isRequired,
};
