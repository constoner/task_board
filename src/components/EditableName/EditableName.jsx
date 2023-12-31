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
import { grey, red } from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";

// Custom components
import Name from "./Name";
import Confirmation from "../Confirmation/Confirmation";
import setNameStyle from "./editableNameStyle";
import debounce from "../../utils/debounce";

const EditableName = ({
  isTitle = false,
  id,
  name,
  done,
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
  const [doneState, setDoneState] = useState(done);
  const [prevName, setPrevName] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [popoverStatus, setPopoverStatus] = useState(false);
  const [anchor, setAnchor] = useState(null);

  const finishEditing = () => {
    if (!isInputBusy) {
      setInputState(true);
      setEditState(true);
    }
  };

  const editCheckBox = (id) => {
    backend
      .pushName(id, collection, nameValue, !doneState)
      .catch(console.error);
    setName(names, id, nameValue, !doneState, setNames);
  };

  const debouncedEditCheckBox = debounce(editCheckBox, 1000);

  const editName = (id) => {
    if (nameValue === prevName) {
      setEditState(false);
      setInputState(false);
      return;
    }
    setNameValue(nameValue.trim());
    setPrevName(nameValue);
    backend.pushName(id, collection, nameValue, doneState).catch(console.error);
    setName(names, id, nameValue, doneState, setNames);
    setEditState(false);
    setInputState(false);
  };

  const onDelete = (evt) => {
    if (isTitle) {
      setAnchor(evt.currentTarget);
      setPopoverStatus(true);
    } else {
      cb(id, setDeleting);
    }
  };

  return (
    <Box id={id} sx={setNameStyle(isTitle, grey[500])}>
      {!isTitle ? (
        <Checkbox
          checked={doneState}
          onChange={(evt) => {
            setDoneState(evt.target.checked);
            debouncedEditCheckBox(id);
          }}
          sx={{
            width: "42px",
            height: "42px",
            flexShrink: 0,
            marginLeft: 0,
            marginRight: -1,
            padding: 0,
            color: grey[500],
          }}
        />
      ) : null}

      {!editState ? (
        <Name isTitle={isTitle} onClick={finishEditing} done={doneState}>
          {nameValue}
        </Name>
      ) : (
        <TextField
          placeholder={`input new ${collection.slice(
            0,
            collection.length - 1
          )}`}
          multiline
          sx={{ flexGrow: 1, borderColor: "rgba(255,255,255,1)" }}
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
          openStatus={popoverStatus}
          setOpen={setPopoverStatus}
          elementName={"card"}
          anchor={anchor}
          actionCB={() => cb(id, setDeleting)}
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
