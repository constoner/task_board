import PropTypes from "prop-types";

// MUI components
import Box from "@mui/material/Box";
import DialogTitle from "@mui/material/DialogTitle";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";

const Confirmation = ({
  openStatus,
  setOpen,
  elementName = "",
  anchor,
  actionCB,
}) => {
  const onPopoverYes = () => {
    setOpen(false);
    actionCB();
  };

  const onPopoverNo = () => setOpen(false);

  return (
    <Popover
      open={openStatus}
      onClose={() => setOpen(false)}
      anchorEl={anchor}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      elevation={24}
    >
      <DialogTitle>Delete</DialogTitle>
      <Box sx={{ p: 2, pt: 0, px: 3 }}>
        <Typography component="p">{`Permanently delete ${elementName}? You can't undo this`}</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            maxWidth: "200px",
            mx: "auto",
            mt: 1,
          }}
        >
          <Button onClick={onPopoverYes}>
            <DoneIcon sx={{ mr: 1 }} />
            <span>Yes</span>
          </Button>
          <Button onClick={onPopoverNo}>
            <ClearIcon sx={{ mr: 1 }} />
            <span>No</span>
          </Button>
        </Box>
      </Box>
    </Popover>
  );
};

export default Confirmation;

Confirmation.propTypes = {
  openStatus: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  elementName: PropTypes.string,
  anchor: PropTypes.object,
  actionCB: PropTypes.func.isRequired,
};
