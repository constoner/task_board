// MUI components
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import PlaylistAddCheckRoundedIcon from "@mui/icons-material/PlaylistAddCheckRounded";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

//Custom components
import CardsList from "../CardsList/CardsList";

const CardsPage = ({ parentBoard, setActivePage }) => {
  return (
    <>
      {/* header */}
      <AppBar position="sticky" sx={{ py: [1, 3], bgcolor: "primary.light" }}>
        <Toolbar>
          <Box sx={{ mr: 2, "& img": { display: "block" } }}>
            <PlaylistAddCheckRoundedIcon
              sx={{ width: "40px", height: "40px" }}
              alt="The Logo of the Task Board App."
            />
          </Box>
          <Typography variant="h5" component="h1">
            Board_Name
          </Typography>
        </Toolbar>
      </AppBar>
      {/* main */}
      <Box
        component="main"
        sx={{ flexGrow: 1, height: "100%", overflow: "auto" }}
      >
        <CardsList parentBoard="HhZOSnz7NAZp4sPTYSsa" />
      </Box>
      {/* footer */}
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
          sx={{ bgcolor: "primary.light", py: [2, 3] }}
        >
          <Button
            variant="contained"
            sx={{ minWidth: "50%", mx: ["auto", 0] }}
            onClick={() => setActivePage("boards")}
          >
            Back
          </Button>
        </Toolbar>
      </Box>
    </>
  );
};

export default CardsPage;
