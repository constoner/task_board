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

const PAGE = {
  BOARDS: "boards",
  CARDS: "cards",
};

// Component App
const App = () => {
  const { showCards, activePage, activeBoard, setActivePage } = useAppState();
  const { boards, setBoards, removeBoard, addBoard } = useBoardsState();
  const { cards, setCards, addCard, removeCard } = useCardsState();

  return (
    <>
      <CssBaseline />
      <Box
        id={activePage}
        sx={{ display: "flex", flexDirection: "column", height: "100%" }}
      >
        {activePage === PAGE.BOARDS ? (
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

// Custom hooks for states

// App
const useAppState = () => {
  const [activePage, setActivePage] = useState(PAGE.BOARDS);
  const [activeBoard, setActiveBoard] = useState({});

  const showCards = (boardsArray, boardID) => {
    setActiveBoard(...boardsArray.filter(({ id }) => id === boardID));
    setActivePage(PAGE.CARDS);
  };

  return { showCards, activePage, activeBoard, setActivePage };
};

// Boards
const useBoardsState = () => {
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

  return { boards, setBoards, removeBoard, addBoard };
};

// Cards
const useCardsState = () => {
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

  return { cards, setCards, addCard, removeCard };
};
