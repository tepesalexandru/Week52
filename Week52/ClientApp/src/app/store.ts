import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import storageSession from "redux-persist/lib/storage/session";
import { persistReducer } from "redux-persist";
import {
  metadataSlice,
  MetadataState,
} from "../features/Weekly/Slices/metadataSlice";
import { Week } from "../shared/Interfaces";
import { weekSlice } from "../features/Weekly/Slices/weekSlice";
import {
  analyticSlice,
  IAnalytics,
} from "../features/Analytics/slices/analyticSlice";
import { authSlice, IAuthState } from "./auth/authSlice";

export interface ApplicationState {
  metadata: MetadataState;
  week: Week;
  analytics: IAnalytics;
  auth: IAuthState;
}

const persistConfig = {
  key: "root",
  storage: storageSession,
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);

// The top-level state object

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
  auth: persistedAuthReducer,
  metadata: metadataSlice.reducer,
  week: weekSlice.reducer,
  analytics: analyticSlice.reducer,
};

export function createReducerManager(initialReducers: any) {
  // Create an object which maps keys to reducers
  const reducers = { ...initialReducers };

  // Create the initial combinedReducer
  let combinedReducer = combineReducers(reducers);

  // An array which is used to delete state keys when reducers are removed
  let keysToRemove: any[] = [];

  return {
    getReducerMap: () => reducers,

    // The root reducer function exposed by this object
    // This will be passed to the store
    reduce: (state: any, action: any) => {
      // If any reducers have been removed, clean up their state first
      if (keysToRemove.length > 0) {
        state = { ...state };
        for (let key of keysToRemove) {
          delete state[key];
        }
        keysToRemove = [];
      }

      // Delegate to the combined reducer
      return combinedReducer(state, action);
    },

    // Adds a new reducer with the specified key
    add: (key: any, reducer: any) => {
      if (!key || reducers[key]) {
        return;
      }

      // Add the reducer to the reducer mapping
      reducers[key] = reducer;

      // Generate a new combined reducer
      combinedReducer = combineReducers(reducers);
    },

    // Removes a reducer with the specified key
    remove: (key: any) => {
      if (!key || !reducers[key]) {
        return;
      }

      // Remove it from the reducer mapping
      delete reducers[key];

      // Add the key to the list of keys to clean up
      keysToRemove.push(key);

      // Generate a new combined reducer
      combinedReducer = combineReducers(reducers);
    },
  };
}

export default function configureAppStore(
  reducers: any,
  initialState?: ApplicationState
) {
  const middleware: any = [thunk];

  return configureStore({
    reducer: reducers,
    preloadedState: initialState,
    middleware,
  });
}

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
  (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
