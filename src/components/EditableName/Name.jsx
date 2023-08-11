// MUI components
import Box from "@mui/material/Box";

const Name = ({ children, isTitle = false }) => (
  <Box
    component="p"
    sx={{
      boxSizing: "border-box",
      margin: 0,
      padding: "16.5px 14px",
      fontSize: "1rem",
      lineHeight: "1.4375em",
      letterSpacing: "0.00938em",
      textTransform: () => (!isTitle ? "uppercase" : "unset"),
      overflow: "hidden",
      overflowWrap: "break-word",
    }}
  >
    <Box component="span" title={children} sx={{ overflowWrap: "break-word" }}>
      {children}
    </Box>
  </Box>
);

export default Name;
