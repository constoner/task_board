// React
import React, { useState } from "react";

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

const page = {
  boards: "boards",
  cards: "cards",
};

// Component App
const App = () => {
  const [activePage, setActivePage] = useState(page.boards);
  const [activeBoard, setActiveBoard] = useState({});

  const showCards = (boardsArray, boardID) => {
    setActiveBoard(...boardsArray.filter(({ id }) => id === boardID));
    setActivePage(page.cards);
  };

  return (
    <>
      <CssBaseline />
      <Box
        id={activePage}
        sx={{ display: "flex", flexDirection: "column", height: "100%" }}
      >
        {activePage === page.boards ? (
          <BoardsPage onBoardClick={showCards} />
        ) : (
          <CardsPage activeBoard={activeBoard} goBack={setActivePage} />
        )}
      </Box>
    </>
  );
};

export default App;
