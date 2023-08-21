// React
import { useState, useContext } from "react";
import Context from "../App/context";
import * as backend from "../../data/utils";

// MUI components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { grey } from "@mui/material/colors";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteOutline from "@mui/icons-material/DeleteOutline";

const BoardItem = ({ boardName, id }) => {
  const { boards, removeBoard, showCards } = useContext(Context);
  const [deleting, setDeleting] = useState(false);

  // Delete doc from firebase
  const deleteBoard = (dataID, cb) => {
    cb(true);
    backend
      .eraseBoard(dataID)
      .catch(console.error)
      .then(() => {
        removeBoard(dataID);
      })
      .finally(() => cb(false));
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
        <CardContent
          sx={{ flexGrow: 1, overflow: "hidden" }}
          onClick={() => showCards(boards, id)}
        >
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
          <Button
            onClick={() => deleteBoard(id, setDeleting)}
            aria-label="Delete board."
          >
            {!deleting ? (
              <DeleteOutline sx={{ color: grey[500] }} />
            ) : (
              <CircularProgress
                sx={{
                  width: "24px !important",
                  height: "24px !important",
                  color: grey[500],
                }}
              />
            )}
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
};

export default BoardItem;
