// React
import { useContext } from "react";
import Context from "../App/context";

// MUI components
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { grey } from "@mui/material/colors";

// Custom components
import EditableName from "../EditableName/EditableName";
import TasksList from "../TasksList/TasksList";

const CardItem = ({
  name,
  id,
  onDelete,
  taskData,
  isInputBusy,
  setInputState,
}) => {
  const { cards, setCards } = useContext(Context);

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
        <Box
          sx={{
            mb: 1,
            fontSize: 18,
            fontWeight: 500,
            borderBottom: `2px solid ${grey[500]}`,
            textTransform: "capitalize",
          }}
          title={name}
        >
          <EditableName
            id={id}
            name={name}
            collection="cards"
            isInputBusy={isInputBusy}
            setInputState={setInputState}
            names={cards}
            setNames={setCards}
          />
        </Box>
        <Box variant="body2">
          <TasksList
            taskData={taskData}
            status={isInputBusy}
            setStatus={setInputState}
            cardID={id}
          />
        </Box>
      </CardContent>
      <CardActions
        sx={{ justifyContent: "flex-end", marginTop: "-16px", p: 2 }}
      >
        <Button variant="outlined" color="error" onClick={() => onDelete(id)}>
          <DeleteOutlineIcon sx={{ mr: 1 }} />
          <span>Remove</span>
        </Button>
      </CardActions>
    </Box>
  );
};

export default CardItem;
