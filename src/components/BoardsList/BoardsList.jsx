// React
import * as backend from "../../data/utils";
import { useState, useEffect, useContext } from "react";
import Context from "../App/context";

// MUI components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

// Custom components
import BoardItem from "../BoardItem/BoardItem";

const BoardsList = ({ reloadTrigger, triggerReload }) => {
  const { boards, setBoards } = useContext(Context);
  const [loadingState, setLoadingState] = useState(true);

  // get docs from firebase
  useEffect(() => {
    setLoadingState(true);
    triggerReload(false);
    backend
      .getBoards()
      .then((loadedBoards) => {
        setBoards(loadedBoards);
      })
      .catch(console.error)
      .finally(() => setLoadingState(false));
  }, [reloadTrigger, triggerReload, setBoards]);

  return (
    <>
      <Backdrop
        sx={{ backgroundColor: "rgba(255, 255, 255, 1)", zIndex: 100 }}
        open={loadingState}
      >
        <CircularProgress />
      </Backdrop>
      {loadingState === false && boards.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Typography
            variant="h2"
            component="p"
            sx={{
              fontWeight: 500,
              color: "grey.300",
              textAlign: "center",
              textTransform: "uppercase",
            }}
          >
            no any boards yet...
          </Typography>
        </Box>
      ) : (
        <Grid
          container
          columns={{ xs: 1, sm: 2, md: 4 }}
          spacing={[2, 3]}
          sx={{ py: [2, 3] }}
        >
          {boards.map(({ id, data }) => {
            return (
              <Grid item width={["100%", "50%", "25%"]} key={id}>
                <Paper elevation={0}>
                  <BoardItem boardName={data.name} id={id} />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      )}
    </>
  );
};

export default BoardsList;
