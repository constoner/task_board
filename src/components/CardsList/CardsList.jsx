// Swiper component
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "./style.css";

// React
import * as backend from "../../data/utils";
import { useState, useEffect, useRef, useContext } from "react";
import Context from "../App/context";

// MUI components
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

// Custom components
import CardItem from "../CardItem/CardItem";
import EmptyItem from "../CardItem/EmptyItem";

const CardsList = () => {
  const { activeBoard, cards, setCards, addCard, removeCard, tasks, setTasks } =
    useContext(Context);
  const [loadingState, setLoadingState] = useState(true);
  const [isInputBusy, setInputState] = useState(false);
  const swiperRef = useRef(null);

  useEffect(() => {
    backend
      .getTasks()
      .then((loadedTasks) => setTasks(loadedTasks))
      .catch(console.error);
  }, [setTasks]);

  useEffect(() => {
    backend
      .getCards(activeBoard)
      .then((loadedCards) => setCards(loadedCards))
      .catch(console.error)
      .finally(() => setLoadingState(false));
  }, [activeBoard, setCards, setTasks]);

  const createCard = () => {
    setLoadingState(true);
    backend
      .pushCard(activeBoard)
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
                    <Paper className="swiper-card" elevation={4} sx={{ mt: 3 }}>
                      <CardItem
                        name={card.data.name}
                        id={card.id}
                        onDelete={deleteCard}
                        taskData={taskData}
                        isInputBusy={isInputBusy}
                        setInputState={setInputState}
                      />
                    </Paper>
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
