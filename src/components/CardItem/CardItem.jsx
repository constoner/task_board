// React
import { useContext } from "react";
import Context from "../App/context";
import PropTypes from "prop-types";

// MUI components
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
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
      <CardContent sx={{ flexGrow: 0, flexShrink: 1, p: 1 }}>
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
            isTitle={true}
            id={id}
            name={name}
            collection="cards"
            isInputBusy={isInputBusy}
            setInputState={setInputState}
            names={cards}
            setNames={setCards}
            cb={() => onDelete(id)}
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
    </Box>
  );
};

export default CardItem;

CardItem.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  taskData: PropTypes.arrayOf(PropTypes.object).isRequired,
  isInputBusy: PropTypes.bool.isRequired,
  setInputState: PropTypes.func.isRequired,
};
