// Swiper component
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "./style.css";

// Get data
import * as backend from "../../data/utils";
import { useState, useEffect, useRef } from "react";

// MUI components
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

// Custom components
import CardItem from "../CardItem/CardItem";
import EmptyItem from "../CardItem/EmptyItem";

const CardsList = ({ activeBoard, addCard, removeCard, cards, setCards }) => {
  const [loadingState, setLoadingState] = useState(true);
  const [isInputBusy, setInputState] = useState(false);
  const swiperRef = useRef(null);

  const [tasks, setTasks] = useState([]);

  const addTask = (cardID) => {
    backend
      .pushTask(cardID)
      .then((doc) => {
        setTasks([
          ...tasks,
          {
            id: doc.id,
            data: doc.data(),
          },
        ]);
      })
      .catch(console.error);
  };

  const removeTask = (dataID, cb) => {
    cb(true);
    backend
      .eraseTask(dataID)
      .then(() => {
        const removedTaskIndex = tasks.findIndex((task) => {
          return task.id === dataID;
        });
        cb(false);
        tasks.splice(removedTaskIndex, 1);
        setTasks([...tasks]);
      })
      .catch(console.error);
  };

  useEffect(() => {
    backend
      .getTasks()
      .then((loadedTasks) => setTasks(loadedTasks))
      .catch(console.error);
  }, []);

  useEffect(() => {
    backend
      .getCards(activeBoard)
      .then((loadedCards) => setCards(loadedCards))
      .catch(console.error)
      .finally(() => setLoadingState(false));
  }, [activeBoard, setCards, setTasks]);

  const createCard = (dataName) => {
    setLoadingState(true);
    backend
      .pushCard(dataName, activeBoard)
      .then((doc) => addCard(doc))
      .catch(console.error)
      .finally(() => setLoadingState(false));
  };

  const deleteCard = (dataID) => {
    setLoadingState(true);
    backend
      .eraseCard(dataID)
      .then(() => {
        removeCard(dataID);
      })
      .catch(console.error)
      .finally(() => setLoadingState(false));
  };

  // Component
  return (
    <>
      <Backdrop
        sx={{ backgroundColor: "rgba(255, 255, 255, 0.8)", zIndex: 100 }}
        open={loadingState}
      >
        <CircularProgress />
      </Backdrop>
      <Box sx={{ height: "100%" }}>
        <Swiper
          ref={swiperRef}
          modules={[Pagination]}
          pagination={true}
          spaceBetween={50}
          slidesPerView={1}
          direction="horizontal"
        >
          {cards.length
            ? cards.map((card) => {
                const taskData = tasks.filter(
                  (taskItem) => taskItem.data.cardID === card.id
                );
                return (
                  <SwiperSlide
                    key={card.id}
                    id={card.id}
                    style={{ height: "100%" }}
                  >
                    <Card className="swiper-card" elevation={4}>
                      <CardItem
                        name={card.data.name}
                        id={card.id}
                        buttonCB={deleteCard}
                        taskData={taskData}
                        isInputBusy={isInputBusy}
                        setInputState={setInputState}
                        cards={cards}
                        setCards={setCards}
                        addTask={addTask}
                        removeTask={removeTask}
                        tasks={tasks}
                        setTasks={setTasks}
                      />
                    </Card>
                  </SwiperSlide>
                );
              })
            : null}
          <SwiperSlide>
            <EmptyItem onClick={createCard} />
          </SwiperSlide>
        </Swiper>
      </Box>
    </>
  );
};

export default CardsList;
