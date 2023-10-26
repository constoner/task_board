import { useState, useEffect } from "react";
import debounce from "../../utils/debounce";

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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [modalState, setModalState] = useState(false);
  const [addingNewBoard, triggerAddingNewBoard] = useState(false);

  const handleWindowWidthChange = debounce(
    () => setWindowWidth(window.innerWidth),
    250
  );

  useEffect(() => {
    window.addEventListener("resize", handleWindowWidthChange);
    return () => {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  }, [handleWindowWidthChange]);

  return (
    <>
      {/* header */}
      <AppBar position="sticky" sx={{ py: [1, 2], bgcolor: "primary.light" }}>
        <Container>
          <Toolbar
            sx={{ minHeight: "unset !important", padding: "0 !important" }}
          >
            <Box sx={{ mr: 2, "& svg": { display: "block" } }}>
              <PlaylistAddCheckRoundedIcon
                sx={{ width: "40px", height: "40px" }}
                alt="The Logo of the Task Board App."
              />
            </Box>
            <Typography variant="h5" component="h1">
              TASK BOARD
            </Typography>
            {windowWidth < 900 ? null : (
              <Button
                variant="contained"
                sx={{ ml: "auto" }}
                onClick={() => setModalState(true)}
              >
                <AddIcon sx={{ mr: 1 }} />
                <span>Add new board</span>
              </Button>
            )}
          </Toolbar>
        </Container>
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
      {windowWidth >= 900 ? (
        <Box
          sx={{
            position: "absolute",
            zIndex: "100",
            bottom: "0 !important",
            width: "100%",
            height: "48px",
            padding: "16px 0 8px",
            backgroundColor: "transparent",
            backgroundImage:
              "linear-gradient(to top, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0))",
          }}
        />
      ) : (
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
            sx={{
              minHeight: "unset !important",
              bgcolor: "primary.light",
              py: [1, 2],
            }}
          >
            <Button
              variant="contained"
              sx={{ mx: "auto" }}
              onClick={() => setModalState(true)}
            >
              <AddIcon sx={{ mr: 1 }} />
              <span>Add new board</span>
            </Button>
          </Toolbar>
        </Box>
      )}

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
