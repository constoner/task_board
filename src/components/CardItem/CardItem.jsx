// MUI components
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

// Custom components
import NameForm from "../NameForm/NameForm";
import TasksList from "../TasksList/TasksList";

const CardItem = ({ name, id, buttonCB, loadedContent }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <CardContent sx={{ flexGrow: 0, flexShrink: 1, p: 2 }}>
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
          title={name}
        >
          <NameForm id={id} name={name} collection="cards" />
        </Typography>
        <Box variant="body2">
          <TasksList loadedContent={loadedContent} />
        </Box>
      </CardContent>
      <CardActions
        sx={{ justifyContent: "flex-end", marginTop: "-16px", p: 2 }}
      >
        <Button variant="outlined" color="error" onClick={() => buttonCB(id)}>
          <DeleteOutlineIcon sx={{ mr: 1 }} />
          <span>Remove</span>
        </Button>
      </CardActions>
    </Box>
  );
};

export default CardItem;
