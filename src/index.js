// React
import React from "react";
import ReactDOM from "react-dom/client";
import * as router from "./router/index";

// Components
import { documentStyle } from "./style";
import AppContainer from "./components/App/AppContainer";

const route = router.initialize();

const rootElement = document.querySelector("#root");
const root = ReactDOM.createRoot(rootElement);

documentStyle(rootElement);

root.render(
  <>
    <AppContainer route={route} />
  </>
);
