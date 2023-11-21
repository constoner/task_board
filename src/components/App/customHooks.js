import { useState } from "react";
import { useRoute } from "react-router5";
import PAGE from "./costants";
import { ROUTEPAGES } from "../../router";

const usePageState = () => {
  const router = useRoute();
  const [activePage, setActivePage] = useState(router ? router.route.name : PAGE[ROUTEPAGES.boards]);
  const [activeBoard, setActiveBoard] = useState({});

  const showCards = (boardsArray, boardID) => {
    setActiveBoard(...boardsArray.filter(({ id }) => id === boardID));
    setActivePage(PAGE[ROUTEPAGES.cards]);
  };

  const changeRoute = ({ route }) => {
    console.log(route);
    setActivePage(route.name)
  };

  return { showCards, activePage, activeBoard, setActivePage, changeRoute };
};

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

const useTasksState = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (doc) => {
    setTasks([
      ...tasks,
      {
        id: doc.id,
        data: doc.data(),
      },
    ]);
  };

  const removeTask = (dataID, cb) => {
    const removedTaskIndex = tasks.findIndex((task) => {
      return task.id === dataID;
    });
    cb(false);
    tasks.splice(removedTaskIndex, 1);
    setTasks([...tasks]);
  };

  return { tasks, setTasks, addTask, removeTask };
};

const useAppState = () => {
  const pageState = usePageState();
  const boardsState = useBoardsState();
  const cardsState = useCardsState();
  const tasksState = useTasksState();

  return {
    ...pageState,
    ...boardsState,
    ...cardsState,
    ...tasksState,
  };

}

export default useAppState;
