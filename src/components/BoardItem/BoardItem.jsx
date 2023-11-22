// React
import { useState, useContext } from "react";
import Context from "../App/context";
import { useRouter } from "react-router5";
import * as backend from "../../data/utils";
import PropTypes from "prop-types";

// MUI components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { grey } from "@mui/material/colors";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteOutline from "@mui/icons-material/DeleteOutline";

// Custom components
import Confirmation from "../Confirmation/Confirmation";
import { ROUTEPAGES } from "../../router";

const BoardItem = ({ boardName, id }) => {
  const router = useRouter();
  const { removeBoard } = useContext(Context);
  const [deleting, setDeleting] = useState(false);
  const [popoverStatus, setPopoverStatus] = useState(false);
  const [anchor, setAnchor] = useState(null);

  const showCard = () => router.navigate(ROUTEPAGES.cards, { boardID: id });

  // Delete doc from firebase
  const onDelete = (evt) => {
    setAnchor(evt.currentTarget);
    setPopoverStatus(true);
  };

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
    <Grid item xs={1} sm={1} md={1} lg={1}>
      <Paper elevation={4}>
        <Card elevation={0}>
          <Box
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: ["row", "row", "column"],
              cursor: "pointer",
            }}
          >
            <CardContent
              sx={{ flexGrow: 1, overflow: "hidden" }}
              onClick={showCard}
            >
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  width: "100%",
                  mb: "18px",
                  fontSize: 14,
                }}
                title={boardName}
              >
                {boardName}
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                zIndex: "100",
                justifyContent: "flex-end",
                width: "auto",
                ml: "auto",
                p: 0,
              }}
            >
              <Button
                onClick={onDelete}
                aria-label="Delete board."
                sx={{ minWidth: "48px", height: "100%" }}
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
          <Confirmation
            openStatus={popoverStatus}
            setOpen={setPopoverStatus}
            elementName={"board"}
            anchor={anchor}
            actionCB={() => deleteBoard(id, setDeleting)}
          />
        </Card>
      </Paper>
    </Grid>
  );
};

export default BoardItem;

BoardItem.propTypes = {
  boardName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
