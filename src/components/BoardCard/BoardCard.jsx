// MUI components //
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

const BoardCard = ({ boardName, id, onDelete }) => {
  const deleteBoard = () => {
    onDelete(id);
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
        <CardContent>
          <Typography variant="h5" component="h2" sx={{ fontSize: 14 }}>
            {boardName}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="outlined">Open</Button>
          <Button variant="outlined" onClick={deleteBoard}>
            Delete
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
};

export default BoardCard;
