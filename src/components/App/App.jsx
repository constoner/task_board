// React
import React from "react";
import { useRoute } from "react-router5";
import PAGE from "./costants";
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
  const { activePage } = useAppState();
  const { route } = useRoute();
  console.log(route);

  return (
    <>
      <CssBaseline />
      <Box
        id={activePage}
        sx={{ display: "flex", flexDirection: "column", height: "100%" }}
      >
        {activePage === PAGE.BOARDS ? <BoardsPage /> : <CardsPage />}
      </Box>
    </>
  );
};

export default App;
