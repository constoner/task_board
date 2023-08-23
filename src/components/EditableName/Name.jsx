import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./style.css";

// MUI components
import Box from "@mui/material/Box";

const Name = ({ children, isTitle = false, onClick }) => {
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
          textTransform: () => (isTitle ? "upperCase" : "unset"),
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
