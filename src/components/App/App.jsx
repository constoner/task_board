// React
import React from "react";

// MUI components
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline } from "@mui/material";
import Box from "@mui/material/Box";
// import CardsPage from "../CardsPage/CardsPage";

// Custom components
import BoardsPage from "../BoardsPage/BoardsPage";

// const page = {
//   boards: "boards",
//   cards: "cards",
// };

// Component App
const App = () => {
  return (
    <>
      <CssBaseline />
      <Box
        id="all-boards"
        sx={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <BoardsPage />
      </Box>

      {/* <Box
        id="one-board"
        sx={{ display: "flex", flexDirection: "column", height: "100%" }}
      >
        <CardsPage parentBoard={"HhZOSnz7NAZp4sPTYSsa"} />
      </Box> */}
    </>
  );
};

export default App;
