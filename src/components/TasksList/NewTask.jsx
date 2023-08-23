import PropTypes from "prop-types";

// MUI components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

const NewTask = ({ onClick }) => {
  return (
    <Box
      sx={{
        display: "flex",
        px: "14px",
      }}
    >
      <Button onClick={() => onClick()} sx={{ marginLeft: "-8px" }}>
        <AddIcon sx={{ mr: 1 }} />
        <span>Click to add new task</span>
      </Button>
    </Box>
  );
};

export default NewTask;

NewTask.propTypes = {
  onClick: PropTypes.func.isRequired,
};
