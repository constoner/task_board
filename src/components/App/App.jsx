// React //
import React, { useState, useEffect } from "react";

// Get data //
import { getData } from "../../utils/transferData";

// MUI components //
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline } from "@mui/material";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

// Custom components //
import BoardsList from "../BoardsList/BoardsList";
import CustomModal from "../CustomModal/CustomModal";

// Component App //
const App = () => {
  const boardsCollection = "boards";
  const [boards, setBoards] = useState([]);
  const [modalState, setModalState] = useState(false);
  const closeModal = () => setModalState(false);
  const addBoard = (newBoard) => {
    setBoards([...boards, newBoard]);
  };

  // getting boards data from server //
  useEffect(() => {
    getData(boardsCollection, setBoards).catch((err) => console.error(err));
  }, []);

  return (
    <>
      <CssBaseline />
      <Box
        id="boards"
        sx={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <AppBar position="sticky" sx={{ py: [1, 3], bgcolor: "primary.light" }}>
          <Toolbar>
            <Box sx={{ mr: 2, "& img": { display: "block" } }}>
              <img
                width="32"
                height="32"
                src="./img/logo.png"
                alt="The Logo of the Task Board App."
              />
            </Box>
            <Typography variant="h5" component="h1">
              Task Board
            </Typography>
          </Toolbar>
        </AppBar>
        <Box component="main" sx={{ flexGrow: 1, overflow: "auto" }}>
          <Container>
            <BoardsList boards={boards} />
          </Container>
        </Box>
        <Box
          component="footer"
          sx={{
            boxShadow:
              "0px -2px 4px -1px rgba(0,0,0,0.2),0px -4px 5px 0px rgba(0,0,0,0.14),0px -1px 10px 0px rgba(0,0,0,0.12)",
          }}
        >
          <Toolbar
            color="secondary"
            sx={{ bgcolor: "primary.light", py: [2, 3] }}
          >
            <Button
              variant="contained"
              sx={{ mx: ["auto", 0] }}
              onClick={() => setModalState(true)}
            >
              Add new board
            </Button>
          </Toolbar>
        </Box>

        <CustomModal
          modalState={modalState}
          cbClose={closeModal}
          onCreate={addBoard}
        />
      </Box>
    </>
  );
};

export default App;
