// React
import React from "react";
import ReactDOM from "react-dom/client";

// Components
import App from "./components/App/App";

const htmlElement = document.querySelector("html");
const bodyElement = document.querySelector("body");
const rootElement = document.querySelector("#root");
const root = ReactDOM.createRoot(rootElement);

// Disabling body scroll
const htmlStyle = {
 height: "100%",
};

const bodyStyle = {
  webkitOverflowScrolling: "touch",
  height: "100%",
  margin: 0,
  padding: 0,
  overflow: "hidden",
};

const rootStyle = {
  minHeight: "100%",
  height: "100%",
};

Object.assign(htmlElement.style, htmlStyle);
Object.assign(bodyElement.style, bodyStyle);
Object.assign(rootElement.style, rootStyle);

document.body.ontouchstart = (evt) => {
  evt.preventDefault();
};

// Render App
root.render(
  <>
    <App />
  </>
);
