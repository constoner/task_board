import PropTypes from "prop-types";

// MUI components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { blue } from "@mui/material/colors";

const EmptyItem = ({ onClick }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "150px",
        margin: "24px 8px 128px",
        border: `2px dashed ${blue[500]}`,
        borderRadius: "16px",
        boxSizing: "border-box",
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
