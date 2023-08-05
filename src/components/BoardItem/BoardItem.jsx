// MUI components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { grey } from "@mui/material/colors";

const BoardItem = ({ boards, boardName, id, buttonCB, onBoardClick }) => {
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
          onClick={() => onBoardClick(boards, id)}
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
          <Button onClick={() => buttonCB(id)} aria-label="Delete board.">
            <DeleteOutlineIcon sx={{ color: grey[500] }} />
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
};

export default BoardItem;
