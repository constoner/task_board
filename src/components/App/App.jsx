// React
import React from "react";
import PAGE from "./costants";
import Context from "./context";
import useAppState from "./customHooks";

// MUI components
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline } from "@mui/material";
import Box from "@mui/material/Box";
import CardsPage from "../CardsPage/CardsPage";

// Custom components
import BoardsPage from "../BoardsPage/BoardsPage";

// Component App
const App = () => {
  const state = useAppState();

  return (
    <Context.Provider value={state}>
      <CssBaseline />
      <Box
        id={state.activePage}
        sx={{ display: "flex", flexDirection: "column", height: "100%" }}
      >
        {state.activePage === PAGE.BOARDS ? <BoardsPage /> : <CardsPage />}
      </Box>
    </Context.Provider>
  );
};

export default App;
