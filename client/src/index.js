import React from "react";
import "./assets/loadassets";
import { render } from "react-dom";
import Router from "./routing/Router";
import AppProvider from "./providers/AppProvider";
import rootReducer from "./providers/reducers/rootReducer";
import {
  registerWorker,
  showAddToHomeScreenIos,
} from "./providers/functions/dom";

async function renderApp() {
  let state = await JSON.parse(localStorage.getItem("state"));

  state = rootReducer(state, {
    dispatch: "UPDATE_THEME",
    data: state?.theme || "LIGHT",
  });

  render(
    <AppProvider initialState={state}>
      <Router />
    </AppProvider>,
    document.getElementById("root")
  );
}

if (ENVIRONMENT == "production") {
  if (location.protocol !== "https:") {
    location.replace(
      `https:${location.href.substring(location.protocol.length)}`
    );
  }
}

renderApp();
registerWorker();
showAddToHomeScreenIos();
