// ** MUI components ** //
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

// ** Custom components ** //
import BoardCard from "../BoardCard/BoardCard";

const BoardsList = ({ boards }) => {
  return (
    <Grid
      container
      columns={{ xs: 1, sm: 2, md: 4 }}
      spacing={[2, 3]}
      sx={{ py: [2, 3] }}
    >
      {boards.length
        ? boards.map((board) => {
            return (
              <Grid
                item
                width={["100%", "50%", "25%"]}
                key={`board_${board.name}`}
              >
                <Paper elevation={0}>
                  <BoardCard board={board} />
                </Paper>
              </Grid>
            );
          })
        : null}
    </Grid>
  );
};

export default BoardsList;
