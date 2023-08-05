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
import { db } from "../../utils/transferData";
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
  const [cards, setCards] = useState([]);
  const [tasks, setTasks] = useState([]);
  const swiperRef = useRef(null);

  // get docs from firebase
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

  useEffect(() => {
    let cards = [];
    getDocs(
      query(collection(db, "cards"), where("boardID", "==", activeBoard.id))
    )
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
  });

  // Push new doc to firebase
  const addCard = (dataName) => {
    setLoadingState(true);
    addDoc(collection(db, "cards"), {
      name: dataName,
      boardID: activeBoard.id,
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
      .then(() => setLoadingState(false));
  };

  // Delete doc from firebase
  const deleteCard = (dataID) => {
    setLoadingState(true);
    deleteDoc(doc(db, "cards", dataID))
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
