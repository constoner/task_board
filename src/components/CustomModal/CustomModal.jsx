// Get data
import { collection, getDoc, addDoc } from "firebase/firestore";
import * as backend from "../../data/fromFirebase";
import { useState } from "react";

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
import TextField from "@mui/material/TextField";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";

// Temporary styles for modal window
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

// Custom modal window component
const CustomModal = ({ modalState, setModalState, cb }) => {
  // const [loadingState, setLoadingState] = useState(false);
  const [boards, setBoards] = useState("");
  const [boardName, setName] = useState("");

  const reset = () => {
    setName("");
  };

  // Push new doc to firebase
  const addBoard = (dataName) => {
    // setLoadingState(true);
    addDoc(collection(backend.initializeDataBase(), "boards"), {
      name: dataName,
    })
      .then((docRef) => getDoc(docRef))
      .then((doc) =>
        setBoards([
          ...boards,
          {
            id: doc.id,
            data: doc.data(),
          },
        ])
      );
    // .finally(() => setLoadingState(false));
  };

  const createBoard = (evt) => {
    if (evt) {
      evt.preventDefault();
    }

    // Declining the empty input
    if (!boardName.trim().length) {
      return;
    }

    // Send data to server
    addBoard(boardName.trim());

    // Closing the modal window
    reset();
    setModalState(false);
    cb(true);
  };

  return (
    <Modal
      open={modalState}
      onClose={(_, reason) => {
        reason !== "backdropClick" && setModalState(false);
      }}
      onKeyDown={(evt) => {
        evt.key === "Enter" && createBoard(evt);
      }}
      closeAfterTransition
      keepMounted={true}
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
            <Typography variant="h6">Create a new board</Typography>
            <Box component="form" noValidate autoComplete="off">
              <FormControl>
                <InputLabel></InputLabel>
                <TextField
                  id="new-board-name"
                  label="New board name"
                  variant="filled"
                  value={boardName}
                  inputRef={(input) =>
                    input && setTimeout(() => input.focus(), 250)
                  }
                  onChange={(evt) => setName(evt.target.value)}
                />
              </FormControl>
            </Box>
            <Button onClick={() => createBoard()}>
              <DoneIcon sx={{ mr: 1 }} />
              <span>Create</span>
            </Button>
            <Button
              onClick={() => {
                reset();
                setModalState(false);
              }}
            >
              <ClearIcon sx={{ mr: 1 }} />
              <span>Cancel</span>
            </Button>
          </Container>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CustomModal;
