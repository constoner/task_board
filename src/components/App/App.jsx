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

  // boards
  const [boards, setBoards] = useState([]);

  const removeBoard = (dataID) => {
    const removedBoardIndex = boards.findIndex((boardItem) => {
      return boardItem.id === dataID;
    });
    boards.splice(removedBoardIndex, 1);
    setBoards([...boards]);
  };

  const addBoard = (doc) => {
    setBoards([
      ...boards,
      {
        id: doc.id,
        data: doc.data(),
      },
    ]);
  };

  // cards
  const [cards, setCards] = useState([]);

  const addCard = (doc) => {
    setCards([
      ...cards,
      {
        id: doc.id,
        data: doc.data(),
      },
    ]);
  };

  const removeCard = (dataID) => {
    const removedCardIndex = cards.findIndex((card) => {
      return card.id === dataID;
    });
    cards.splice(removedCardIndex, 1);
    setCards([...cards]);
  };

  return (
    <>
      <CssBaseline />
      <Box
        id={activePage}
        sx={{ display: "flex", flexDirection: "column", height: "100%" }}
      >
        {activePage === page.boards ? (
          <BoardsPage
            onBoardClick={showCards}
            addBoard={addBoard}
            removeBoard={removeBoard}
            boards={boards}
            setBoards={setBoards}
          />
        ) : (
          <CardsPage
            activeBoard={activeBoard}
            goBack={setActivePage}
            addCard={addCard}
            removeCard={removeCard}
            cards={cards}
            setCards={setCards}
          />
        )}
      </Box>
    </>
  );
};

export default App;
