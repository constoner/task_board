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
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

const Tasks = ({ parentBoard }) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    getData("cards", setCards).catch((err) => console.error(err));
  }, []);

  const newTask = {
    boardID: parentBoard,
    name: "new-task-name",
  };

  const addTask = (newTask) => {
    setCards([...cards, newTask]);
  };

  const createTaskList = () => {
    addData(newTask.name.trim(), "cards", newTask.boardID, addTask);
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
                      <ul>
                        <li>Lorem ipsum dolor sit amet.</li>
                        <li>Fugit omnis quos corrupti a!</li>
                        <li>Qui reiciendis ducimus numquam atque?</li>
                        <li>
                          Asperiores voluptatum officiis fugit perspiciatis.
                        </li>
                        <li>Ullam quis sed dolorem est.</li>
                        <li>Quia, rem! Consectetur, provident nulla!</li>
                        <li>Hic soluta expedita maxime voluptatum?</li>
                        <li>Error voluptates amet molestiae iste.</li>
                        <li>Tenetur quis nulla dolore cumque?</li>
                        <li>Dolorum, atque? Obcaecati, itaque! Labore!</li>
                      </ul>
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
              onClick={() => createTaskList()}
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

export default Tasks;
