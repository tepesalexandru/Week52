import { createSlice } from "@reduxjs/toolkit";

export interface MetadataState {
  weekSelected: number;
  daySelected: number;
  currentWeek: number;
  weekId: string;
  navbarTitle: string;
}

const INITIAL_STATE: MetadataState = {
  weekSelected: 0,
  daySelected: 0,
  currentWeek: 0,
  weekId: "",
  navbarTitle: "Week Overview",
};

export const metadataSlice = createSlice({
  name: "metadata",
  initialState: INITIAL_STATE,
  reducers: {
    setSelectedWeek: (
      state,
      action: { payload: { weekSelected: number; weekId: string } }
    ) => {
      state.weekSelected = action.payload.weekSelected;
      state.weekId = action.payload.weekId;
    },
    setCurrentWeek: (state, action) => {
      state.currentWeek = action.payload;
    },
    setDaySelected: (state, action) => {
      state.daySelected = action.payload;
    },
    setNavbarTitle: (state, action: { payload: { title: string } }) => {
      state.navbarTitle = action.payload.title;
    },
  },
});

export const {
  setSelectedWeek,
  setCurrentWeek,
  setDaySelected,
  setNavbarTitle
} = metadataSlice.actions;
