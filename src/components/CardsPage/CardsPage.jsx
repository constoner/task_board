import debounce from "../../utils/debounce";

// React
import { useState, useEffect, useContext } from "react";
import Context from "../App/context";
import PAGE from "../App/costants";
import { ROUTEPAGES } from "../../router";

// MUI components
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import PlaylistAddCheckRoundedIcon from "@mui/icons-material/PlaylistAddCheckRounded";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

//Custom components
import CardsList from "../CardsList/CardsList";
import { Container } from "@mui/material";

const CardsPage = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { activeBoard, setActivePage } = useContext(Context);

  const handleWindowWidthChange = debounce(
    () => setWindowWidth(window.innerWidth),
    250
  );

  useEffect(() => {
    window.addEventListener("resize", handleWindowWidthChange);
    return () => {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  }, [handleWindowWidthChange]);

  return (
    <>
      {/* header */}
      <AppBar position="sticky" sx={{ py: [1, 2], bgcolor: "primary.light" }}>
        <Container>
          <Toolbar
            sx={{ minHeight: "unset !important", padding: "0 !important" }}
          >
            <Box sx={{ mr: 2, "& svg": { display: "block" } }}>
              <PlaylistAddCheckRoundedIcon
                sx={{ width: "40px", height: "40px" }}
                alt="The Logo of the Task Board App."
              />
            </Box>
            <Typography
              variant="h5"
              component="h1"
              sx={{
                width: "75%",
                pr: 3,
                textTransform: "upperCase",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {activeBoard.data.name}
            </Typography>
            {windowWidth < 900 ? null : (
              <Button
                variant="contained"
                sx={{ minWidth: 160, ml: "auto" }}
                onClick={() => setActivePage("boards")}
              >
                <KeyboardBackspaceIcon sx={{ mr: 1 }} />
                <span>Back</span>
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      {/* main */}
      <Box
        component="main"
        sx={{ flexGrow: 1, height: "100%", overflow: "auto" }}
      >
        <Container
          sx={{
            height: "100%",
          }}
        >
          <CardsList />
        </Container>
      </Box>

      {/* footer */}
      {windowWidth >= 900 ? null : (
        <Box
          component="footer"
          sx={{
            position: "relative",
            zIndex: 10,
            boxShadow:
              "0px -2px 4px -1px rgba(0,0,0,0.2),0px -4px 5px 0px rgba(0,0,0,0.14),0px -1px 10px 0px rgba(0,0,0,0.12)",
          }}
        >
          <Toolbar
            color="secondary"
            sx={{
              minHeight: "unset !important",
              bgcolor: "primary.light",
              py: [1, 2],
            }}
          >
            <Button
              variant="contained"
              sx={{ minWidth: 160, mx: "auto" }}
              onClick={() => setActivePage(PAGE[ROUTEPAGES.boards])}
            >
              <KeyboardBackspaceIcon sx={{ mr: 1 }} />
              <span>Back</span>
            </Button>
          </Toolbar>
        </Box>
      )}
    </>
  );
};

export default CardsPage;
