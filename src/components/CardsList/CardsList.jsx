// Swiper component
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
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

// Custom components
import CardItem from "../CardItem/CardItem";

const CardsList = ({ parentBoard }) => {
  const [loadingState, setLoadingState] = useState(true);
  const [cards, setCards] = useState([]);

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
      .then(() => setCards(cards))
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
        const removedTaskIndex = cards.findIndex((task) => {
          return task.id === dataID;
        });
        cards.splice(removedTaskIndex, 1);
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
  ) : !cards.length ? (
    <Typography
      variant="h2"
      component="p"
      align="center"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pt: "25%",
        fontWeight: 500,
        color: "grey.300",
      }}
    >
      Add new taskboard!
    </Typography>
  ) : (
    <Box sx={{ height: "100%", py: 2 }}>
      <Swiper spaceBetween={50} slidesPerView={1} direction="horizontal">
        {cards.map((card) => {
          return (
            <SwiperSlide key={card.id} id={card.id} style={{ height: "100%" }}>
              <Card
                elevation={4}
                sx={{
                  maxHeight: "95%",
                  p: 2,
                  overflow: "auto",
                }}
              >
                <CardItem
                  name={card.data.name}
                  id={card.id}
                  buttonCB={deleteCard}
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
              <p>+</p>
            </Button>
          </Box>
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};

export default CardsList;
