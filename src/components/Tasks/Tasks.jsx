// Swiper component
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/a11y";
import "./style.css";

// MUI components
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

const Tasks = ({ boards }) => {
  return (
    <Box sx={{ height: "100%", py: 2 }}>
      <Swiper
        modules={[Pagination, A11y]}
        pagination={{ clickable: false }}
        spaceBetween={50}
        slidesPerView={1}
        direction="horizontal"
      >
        {!boards.lenght
          ? boards.map((board) => {
              return (
                <SwiperSlide key={board.id}>
                  <Card elevation={4} sx={{ height: "100%" }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: ["row", "row", "column"],
                      }}
                    >
                      <CardContent sx={{ flexGrow: 0, overflow: "hidden" }}>
                        <Typography
                          variant="h5"
                          component="h2"
                          sx={{
                            mb: 1,
                            fontSize: 14,
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                          }}
                          title={board.data.name}
                        >
                          {board.data.name}
                        </Typography>
                        <Typography variant="body2" component="p">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Reprehenderit, ut.
                        </Typography>
                      </CardContent>
                    </Box>
                  </Card>
                </SwiperSlide>
              );
            })
          : null}
      </Swiper>
    </Box>
  );
};

export default Tasks;
