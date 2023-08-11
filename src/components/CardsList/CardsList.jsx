// Swiper component
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "./style.css";

// Get data
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  getDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import * as backend from "../../data/utils";
import { useState, useEffect, useRef } from "react";

// MUI components
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

// Custom components
import CardItem from "../CardItem/CardItem";

const CardsList = ({ activeBoard }) => {
  const [loadingState, setLoadingState] = useState(true);
  const [isInputBusy, setInputState] = useState(false);
  const [cards, setCards] = useState([]);
  const [tasks, setTasks] = useState([]);
  const swiperRef = useRef(null);

  // get docs from firebase
  useEffect(() => {
    let tasks = [];
    getDocs(collection(backend.initializeDataBase(), "tasks"))
      .then((result) => {
        result.forEach((doc) => {
          tasks.push({
            id: doc.id,
            data: {
              name: doc.data().name,
              cardID: doc.data().cardID,
            },
          });
        });
      })
      .then(() => setTasks(tasks));
    // .finally(() => setLoadingState(false));
  }, []);

  useEffect(() => {
    let cards = [];
    getDocs(
      query(
        collection(backend.initializeDataBase(), "cards"),
        where("boardID", "==", activeBoard.id)
      )
    )
      .then((result) => {
        result.forEach((doc) => {
          cards.push({
            id: doc.id,
            data: { name: doc.data().name },
          });
        });
      })
      .then(() => setCards(cards))
      .finally(() => setLoadingState(false));
  }, [activeBoard.id]);

  // Push new doc to firebase
  const addCard = (dataName) => {
    setLoadingState(true);
    addDoc(collection(backend.initializeDataBase(), "cards"), {
      name: dataName,
      boardID: activeBoard.id,
    })
      .then((docRef) => getDoc(docRef))
      .then((doc) =>
        setCards([
          ...cards,
          {
            id: doc.id,
            data: doc.data(),
          },
        ])
      )
      .then(() => setLoadingState(false));
  };

  // Delete doc from firebase
  const deleteCard = (dataID) => {
    setLoadingState(true);
    getDocs(collection(backend.initializeDataBase(), "tasks")).then((result) =>
      result.forEach((task) => {
        if (task.data().cardID === dataID) {
          deleteDoc(doc(backend.initializeDataBase(), "tasks", task.id));
        }
      })
    );

    deleteDoc(doc(backend.initializeDataBase(), "cards", dataID))
      .then(() => {
        const removedCardIndex = cards.findIndex((card) => {
          return card.id === dataID;
        });
        cards.splice(removedCardIndex, 1);
        setCards([...cards]);
      })
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
          {cards.map((card) => {
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
                  />
                </Card>
              </SwiperSlide>
            );
          })}
          <SwiperSlide>
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                onClick={() => setTimeout(() => addCard("New task list"), 100)}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography>Add new task list</Typography>
                <AddIcon />
              </Button>
            </Box>
          </SwiperSlide>
        </Swiper>
      </Box>
    </>
  );
};

export default CardsList;
