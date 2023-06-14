// React
import React from "react";
import ReactDOM from "react-dom/client";

// Components
import App from "./components/App/App";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(
  <>
    <App />
  </>
);
