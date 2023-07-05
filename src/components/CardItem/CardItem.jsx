// MUI components
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// Custom components
import Tasks from "../Tasks/Tasks";

const CardItem = ({ name, id, buttonCB }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <CardContent sx={{ flexGrow: 0, flexShrink: 1 }}>
        <Typography
          variant="h5"
          component="h2"
          sx={{
            mb: 1,
            fontSize: 18,
            fontWeight: 500,
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
          title={name}
        >
          {name}
        </Typography>
        <Box variant="body2">
          <Tasks />
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end", marginTop: "-16px" }}>
        <Button variant="outlined" onClick={() => buttonCB(id)}>
          Remove
        </Button>
      </CardActions>
    </Box>
  );
};

export default CardItem;
