// Get data
import * as backend from "../../data/utils";
import { useState } from "react";
import { useEffect } from "react";

// MUI components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

// Custom components
import BoardItem from "../BoardItem/BoardItem";

const BoardsList = ({ reloadTrigger, triggerReload, onBoardClick }) => {
  const [loadingState, setLoadingState] = useState(true);
  const [boards, setBoards] = useState([]);

  // get docs from firebase
  useEffect(() => {
    setLoadingState(true);
    triggerReload(false);
    backend
      .getBoards()
      .then((loadedBoards) => setBoards(loadedBoards))
      .catch(console.error)
      .finally(() => setLoadingState(false));
  }, [reloadTrigger, triggerReload]);

  // Delete doc from firebase
  const deleteBoard = (dataID, cb) => {
    cb(true);
    backend
      .removeBoard(dataID)
      .catch(console.error)
      .then(() => {
        const removedBoardIndex = boards.findIndex((boardItem) => {
          return boardItem.id === dataID;
        });
        boards.splice(removedBoardIndex, 1);
        setBoards([...boards]);
      })
      .finally(() => cb(false));
  };

  return (
    <>
      <Backdrop
        sx={{ backgroundColor: "rgba(255, 255, 255, 1)", zIndex: 100 }}
        open={loadingState}
      >
        <CircularProgress />
      </Backdrop>
      {!boards.length ? (
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
                  <BoardItem
                    boards={boards}
                    boardName={data.name}
                    id={id}
                    buttonCB={deleteBoard}
                    onBoardClick={onBoardClick}
                  />
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
