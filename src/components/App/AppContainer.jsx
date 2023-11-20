// React
import React from "react";
import Context from "./context";
import useAppState from "./customHooks";
import { RouterProvider } from "react-router5";

// Custom components
import App from "./App";
import ErrorCatcher from "../ErrorCatcher/ErrorCatcher";

// Component App
const AppContainer = ({ route }) => {
  const state = useAppState();

  return (
    <RouterProvider router={route}>
      <ErrorCatcher>
        <Context.Provider value={state}>
          <App />
        </Context.Provider>
      </ErrorCatcher>
    </RouterProvider>
  );
};

export default AppContainer;
