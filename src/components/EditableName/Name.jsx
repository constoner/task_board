import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./nameStyle.css";

// MUI components
import Box from "@mui/material/Box";

const Name = ({ children, isTitle = false, onClick, done }) => {
  const nameField = useRef({});

  useEffect(() => {
    const nameElement = nameField.current;
    nameElement.addEventListener("click", onClick);

    return () => {
      nameElement.removeEventListener("click", onClick);
    };
  }, [onClick]);

  return (
    <p className="name_element" ref={nameField}>
      <Box
        component="span"
        title={children}
        sx={{
          overflowWrap: "break-word",
          textDecoration: () => (done ? "line-through" : "unset"),
          color: () => (done ? "grey" : "unset"),
        }}
      >
        {children}
      </Box>
    </p>
  );
};

export default Name;

Name.propTypes = {
  children: PropTypes.string.isRequired,
  isTitle: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};
