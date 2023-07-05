// Swiper component
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/a11y";
import "./style.css";

// Get data
import { useState } from "react";
import { useEffect } from "react";
import { getData } from "../../utils/transferData";
import { addData } from "../../utils/transferData";
import { deleteData } from "../../utils/transferData";

// MUI components
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// Custom components
import Tasks from "../Tasks/Tasks";

const Cards = ({ parentBoard }) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    getData("cards", setCards).catch((err) => console.error(err));
  }, []);

  const newCard = {
    boardID: parentBoard,
    name: "new-card-name",
  };

  const addCard = (newCard) => {
    setCards([...cards, newCard]);
  };

  const createCard = () => {
    addData(newCard.name.trim(), "cards", newCard.boardID, addCard);
  };

  const deleteCard = (removedCardID) => {
    const removeCardIndex = cards.findIndex((card) => {
      return card.id === removedCardID;
    });
    cards.splice(removeCardIndex, 1);
    setCards([...cards]);
  };

  const removeCard = (id) => {
    deleteData("cards", id, deleteCard).catch((err) => console.err(err));
  };

  return (
    <Box sx={{ height: "100%", py: 2 }}>
      <Swiper
        modules={[Pagination, A11y]}
        pagination={{ clickable: false }}
        spaceBetween={50}
        slidesPerView={1}
        direction="horizontal"
      >
        {cards.map((card) => {
          return (
            <SwiperSlide key={card.id} id={card.id}>
              <Card elevation={4}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "column",
                  }}
                >
                  <CardContent sx={{ flexGrow: 0, overflow: "hidden" }}>
                    <Typography
                      variant="h5"
                      component="h2"
                      sx={{
                        mb: 1,
                        fontSize: 18,
                        fontWeight: 500,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                      title={card.data.name}
                    >
                      {card.data.name}
                    </Typography>
                    <Box variant="body2">
                      <Tasks />
                    </Box>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "flex-end" }}>
                    <Button
                      variant="outlined"
                      onClick={() => removeCard(card.id)}
                    >
                      Remove
                    </Button>
                  </CardActions>
                </Box>
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
              onClick={() => createCard()}
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

export default Cards;
