import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { History } from "history";
import { ApplicationState, reducers } from "./store";
import { configureStore } from "@reduxjs/toolkit";

export default function configureAppStore(
  history: History,
  initialState?: ApplicationState
) {
  const middleware = [thunk, routerMiddleware(history)];

  const rootReducer = combineReducers({
    ...reducers,
    router: connectRouter(history),
  });

  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    //   middleware: compose(applyMiddleware(...middleware))
  });
}
