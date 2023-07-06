import { useState } from "react";

// MUI components
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

// Custom components
import BoardsList from "../BoardsList/BoardsList";
import CustomModal from "../CustomModal/CustomModal";

const BoardsPage = () => {
  const [modalState, setModalState] = useState(false);

  return (
    <>
      {/* header */}
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

      {/* main */}
      <Box component="main" sx={{ flexGrow: 1, overflow: "auto" }}>
        <Container
          sx={{
            height: "100%",
          }}
        >
          <BoardsList reloadTrigger={modalState} />
        </Container>
      </Box>

      {/* footer */}
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

      {/* modal */}
      <CustomModal modalState={modalState} setModalState={setModalState} />
    </>
  );
};

export default BoardsPage;
