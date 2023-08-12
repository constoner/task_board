// React
import React from "react";
import ReactDOM from "react-dom/client";

// Components
import * as style from "./style";
import App from "./components/App/App";

const rootElement = document.querySelector("#root");
const root = ReactDOM.createRoot(rootElement);

style.documentStyle(rootElement);

// Render App
root.render(
  <>
    <App />
  </>
);
