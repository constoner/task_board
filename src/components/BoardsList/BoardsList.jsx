// MUI components //
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

// Custom components //
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
        ? boards.map(({ id, data }) => {
            return (
              <Grid item width={["100%", "50%", "25%"]} key={id}>
                <Paper elevation={0}>
                  <BoardCard boardName={data.name} id={id} />
                </Paper>
              </Grid>
            );
          })
        : null}
    </Grid>
  );
};

export default BoardsList;
