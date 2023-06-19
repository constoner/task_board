// React
import React from "react";
import ReactDOM from "react-dom/client";

// Components
import App from "./components/App/App";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

// Disabling body scroll
const bodyStyle = {
  overflow: "hidden",
  width: "100%",
  height: "100%",
  maxHeight: "100%",
};
Object.assign(document.body.style, bodyStyle);

// Render App
root.render(
  <>
    <App />
  </>
);
