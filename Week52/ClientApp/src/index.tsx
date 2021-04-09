import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import App from "./app/App";
import { Router } from "react-router";
import configureStore, { createReducerManager, reducers } from "./app/store";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#bb86fc",
      contrastText: "#121212",
    },
    background: {
      default: "#121212",
    },
    secondary: {
      main: "#1e1e1e",
      contrastText: "#dddddd",
    },
  },
});

// Create browser history to use in the Redux store
const baseUrl = document
  .getElementsByTagName("base")[0]
  .getAttribute("href") as string;
const history = createBrowserHistory({ basename: baseUrl });

// Get the application-wide store instance, prepopulating with state from the server where available.
const reducerManager = createReducerManager(reducers);
let store: any = configureStore(reducerManager.reduce);
store.reducerManager = reducerManager;
let persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

export default store;
