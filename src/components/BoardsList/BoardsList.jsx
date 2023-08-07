// Get data
import { collection, doc, getDocs, deleteDoc } from "firebase/firestore";
import * as backend from "../../data/fromFirebase";
import { useState } from "react";
import { useEffect } from "react";

// MUI components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
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

    let boards = [];
    getDocs(collection(backend.initializeDataBase(), "boards"))
      .then((result) => {
        result.forEach((doc) => {
          boards.push({
            id: doc.id,
            data: { name: doc.data().name },
          });
        });
      })
      .then(() => setBoards(boards))
      .finally(() => setLoadingState(false));
  }, [reloadTrigger, triggerReload]);

  // Delete doc from firebase
  const deleteBoard = (dataID) => {
    getDocs(collection(backend.initializeDataBase(), "cards")).then((result) =>
      result.forEach((card) => {
        if (card.data().boardID === dataID) {
          getDocs(collection(backend.initializeDataBase(), "tasks"))
            .then((result) =>
              result.forEach((task) => {
                if (task.data().cardID === card.id) {
                  deleteDoc(
                    doc(backend.initializeDataBase(), "tasks", task.id)
                  );
                }
              })
            )
            .then(() =>
              deleteDoc(doc(backend.initializeDataBase(), "cards", card.id))
            );
        }
      })
    );

    deleteDoc(doc(backend.initializeDataBase(), "boards", dataID)).then(() => {
      const removedBoardIndex = boards.findIndex((boardItem) => {
        return boardItem.id === dataID;
      });
      boards.splice(removedBoardIndex, 1);
      setBoards([...boards]);
    });
  };

  return loadingState ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        fontWeight: 500,
        color: "grey.300",
      }}
    >
      <CircularProgress></CircularProgress>
    </Box>
  ) : !boards.length ? (
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
  );
};

export default BoardsList;
