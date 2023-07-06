// Get data
import { collection, doc, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "../../utils/transferData";
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

const BoardsList = ({ reloadTrigger }) => {
  const [loadingState, setLoadingState] = useState(true);
  const [boards, setBoards] = useState([]);

  // get docs from firebase
  useEffect(() => {
    let boards = [];
    getDocs(collection(db, "boards"))
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
  }, [reloadTrigger]);

  // Delete doc from firebase
  const deleteBoard = (dataID) => {
    deleteDoc(doc(db, "boards", dataID)).then(() => {
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
    <Typography
      variant="h2"
      component="p"
      align="center"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pt: "25%",
        fontWeight: 500,
        color: "grey.300",
      }}
    >
      Add new taskboard!
    </Typography>
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
              <BoardItem boardName={data.name} id={id} buttonCB={deleteBoard} />
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default BoardsList;
