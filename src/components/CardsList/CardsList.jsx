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
  getDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../utils/transferData";
import { useState } from "react";
import { useEffect } from "react";

// MUI components
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

// Custom components
import CardItem from "../CardItem/CardItem";

const CardsList = ({ parentBoard }) => {
  const [loadingState, setLoadingState] = useState(true);
  const [cards, setCards] = useState([]);
  const [tasks, setTasks] = useState([]);

  // get docs from firebase
  useEffect(() => {
    let cards = [];
    getDocs(collection(db, "cards"))
      .then((result) => {
        result.forEach((doc) => {
          cards.push({
            id: doc.id,
            data: { name: doc.data().name },
          });
        });
      })
      .then(() => setCards(cards));
    // .finally(() => setLoadingState(false));
  }, []);

  useEffect(() => {
    let tasks = [];
    getDocs(collection(db, "tasks"))
      .then((result) => {
        result.forEach((doc) => {
          tasks.push({
            id: doc.id,
            data: { name: doc.data().name },
          });
        });
      })
      .then(() => setTasks(tasks))
      .finally(() => setLoadingState(false));
  }, []);

  // Push new doc to firebase
  const addCard = (dataName) => {
    setLoadingState(true);
    addDoc(collection(db, "cards"), {
      name: dataName,
      boardID: parentBoard,
    })
      .then((docRef) => getDoc(docRef))
      .then((doc) =>
        setCards([
          {
            id: doc.id,
            data: doc.data(),
          },
          ...cards,
        ])
      )
      .finally(() => setLoadingState(false));
  };

  // Delete doc from firebase
  const deleteCard = (dataID) => {
    setLoadingState(true);
    deleteDoc(doc(db, "cards", dataID))
      .then(() => {
        const removedCardIndex = cards.findIndex((task) => {
          return task.id === dataID;
        });
        cards.splice(removedCardIndex, 1);
        setCards([...cards]);
      })
      .finally(() => setLoadingState(false));
  };

  // Component
  return loadingState ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        fontWeight: 500,
        color: "grey.300",
      }}
    >
      <CircularProgress></CircularProgress>
    </Box>
  ) : (
    <Box sx={{ height: "100%" }}>
      <Swiper
        modules={[Pagination]}
        pagination={true}
        spaceBetween={50}
        slidesPerView={1}
        direction="horizontal"
      >
        {cards.map((card) => {
          return (
            <SwiperSlide key={card.id} id={card.id} style={{ height: "100%" }}>
              <Card className="swiper-card" elevation={4}>
                <CardItem
                  name={card.data.name}
                  id={card.id}
                  buttonCB={deleteCard}
                  loadedContent={tasks}
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
              onClick={() => addCard("new-test-card")}
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
  );
};

export default CardsList;