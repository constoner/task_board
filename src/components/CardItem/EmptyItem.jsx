import PropTypes from "prop-types";

// MUI components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

const EmptyItem = ({ onClick }) => {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        onClick={() => setTimeout(() => onClick("New task list"), 100)}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>Add new task list</Typography>
        <AddIcon />
      </Button>
    </Box>
  );
};

export default EmptyItem;

EmptyItem.propTypes = {
  onClick: PropTypes.func.isRequired,
};
