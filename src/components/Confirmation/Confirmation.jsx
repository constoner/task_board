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
  oneOfElements = "",
  anchor,
  open,
  setConfirmation,
  cb,
  id,
  setDeleting,
}) => {
  const elementName = oneOfElements.substring(0, oneOfElements.length - 1);

  const onPopoverYes = () => {
    setConfirmation(false);
    cb(id, setDeleting);
  };

  const onPopoverNo = () => setConfirmation(false);

  return (
    <Popover
      open={open}
      onClose={() => setConfirmation(false)}
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
  oneOfElements: PropTypes.string,
  open: PropTypes.bool.isRequired,
  // onYes: PropTypes.func.isRequired,
  // onNo: PropTypes.func.isRequired,
};
