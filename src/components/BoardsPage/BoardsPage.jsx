import { useState } from "react";

// MUI components
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import PlaylistAddCheckRoundedIcon from "@mui/icons-material/PlaylistAddCheckRounded";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

// Custom components
import BoardsList from "../BoardsList/BoardsList";
import CustomModal from "../CustomModal/CustomModal";

const BoardsPage = () => {
  const [modalState, setModalState] = useState(false);
  const [addingNewBoard, triggerAddingNewBoard] = useState(false);

  return (
    <>
      {/* header */}
      <AppBar position="sticky" sx={{ py: [1, 3], bgcolor: "primary.light" }}>
        <Toolbar sx={{ minHeight: "unset" }}>
          <Box sx={{ mr: 2, "& svg": { display: "block" } }}>
            <PlaylistAddCheckRoundedIcon
              sx={{ width: "40px", height: "40px" }}
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
          <BoardsList
            reloadTrigger={addingNewBoard}
            triggerReload={triggerAddingNewBoard}
          />
        </Container>
      </Box>

      {/* footer */}
      <Box
        component="footer"
        sx={{
          position: "relative",
          zIndex: "10",
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
            <AddIcon sx={{ mr: 1 }} />
            <span>Add new board</span>
          </Button>
        </Toolbar>
      </Box>

      {/* modal */}
      <CustomModal
        modalState={modalState}
        setModalState={setModalState}
        cb={triggerAddingNewBoard}
      />
    </>
  );
};

export default BoardsPage;
