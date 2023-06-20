// React
import React from "react";
import ReactDOM from "react-dom/client";

// Components
import App from "./components/App/App";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

// Disabling body scroll
// const bodyStyle = {
//   webkitOverflowScrolling: "touch",
//   overflow: "hidden",
// };

// Object.assign(document.body.style, bodyStyle);

// document.body.ontouchstart = (evt) => {
//   evt.preventDefault();
// };

// Render App
root.render(
  <>
    <App />
  </>
);
