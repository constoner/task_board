// React
import React from "react";

// MUI components
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline } from "@mui/material";
import Box from "@mui/material/Box";
import CardsPage from "../CardsPage/CardsPage";

// const page = {
//   boards: "boards",
//   cards: "cards",
// };

// Component App
const App = () => {
  return (
    <>
      <CssBaseline />
      {/* <Box
        id="all-boards"
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
          <Container
            sx={{
              height: "100%",
            }}
          >
            {loadingState ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  fontWeight: 500,
                  color: "grey.300",
                }}
              >
                <CircularProgress></CircularProgress>
              </Box>
            ) : !boards.length ? (
              <Typography
                variant="h2"
                component="p"
                align="center"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  pt: "25%",
                  fontWeight: 500,
                  color: "grey.300",
                }}
              >
                Add new taskboard!
              </Typography>
            ) : (
              <BoardsList boards={boards} onDelete={deleteBoard} />
            )}
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
      </Box> */}

      <Box
        id="one-board"
        sx={{ display: "flex", flexDirection: "column", height: "100%" }}
      >
        <CardsPage parentBoard={"HhZOSnz7NAZp4sPTYSsa"} />
      </Box>
    </>
  );
};

export default App;
