// React
import React, { useState } from "react";

// Import data functions
import { addData } from "../../utils/transferData";

// MUI components
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";

// Temporary styles for modal window
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// Statuses for validation
const STATUSES = {
  default: "default",
  error: "error",
};

// Custom modal window component
const CustomModal = ({ modalState, cbClose, onCreate }) => {
  const [boardName, setName] = useState("");
  const [status, setStatus] = useState(STATUSES.default);

  const reset = () => {
    setStatus(STATUSES.default);
    setName("");
  };

  const createBoard = (evt) => {
    if (evt) {
      evt.preventDefault();
    }

    // Declining the empty input
    if (!boardName.trim().length) {
      setStatus(STATUSES.error);
      return;
    }

    // Send data to server
    addData(boardName.trim(), "boards", onCreate)
      .then(reset)
      .catch((err) => console.error(err));

    // Closing the modal window
    cbClose();
  };

  return (
    <Modal
      open={modalState}
      onClose={(_, reason) => {
        reason !== "backdropClick" && cbClose();
      }}
      closeAfterTransition
      keepMounted
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 250,
        },
      }}
      aria-labelledby="new board"
      aria-describedby="creating new board"
    >
      <Fade in={modalState}>
        <Box sx={style}>
          <Container>
            <Typography variant="h6">New Board</Typography>
            <Typography variant="body2" component="p">
              Create a new board
            </Typography>
            <Box component="form" noValidate autoComplete="off">
              <FormControl>
                <InputLabel></InputLabel>
                <FormHelperText>Please, fill the name</FormHelperText>
                <TextField
                  id="new-board-name"
                  label="New board name"
                  placeholder="New board name"
                  variant="filled"
                  value={boardName}
                  status={status}
                  inputRef={(input) => input && input.focus()}
                  onChange={(evt) => setName(evt.target.value)}
                />
              </FormControl>
            </Box>
            <Button onClick={() => createBoard()}>Save</Button>
            <Button
              onClick={() => {
                cbClose();
                reset();
              }}
            >
              Undo
            </Button>
          </Container>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CustomModal;
