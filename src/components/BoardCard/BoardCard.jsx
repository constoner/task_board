// Import data functions
import { deleteData } from "../../utils/transferData";

// MUI components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

const BoardCard = ({ boardName, id, onDelete }) => {
  const removeBoard = () => {
    deleteData("boards", id, onDelete).catch((err) => console.err(err));
  };

  return (
    <Card>
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
              fontSize: 14,
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
            title={boardName}
          >
            {boardName}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="outlined" onClick={() => removeBoard(id)}>
            Delete
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
};

export default BoardCard;
