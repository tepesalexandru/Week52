import { createSlice } from "@reduxjs/toolkit";

export interface MetadataState {
  currentWeek: number;
  weekSelected: number;
}

const INITIAL_STATE: MetadataState = {
  weekSelected: 0,
  currentWeek: 0,
};

export const metadataSlice = createSlice({
  name: "metadata",
  initialState: INITIAL_STATE,
  reducers: {
    setSelectedWeek: (state, action) => {
      state.weekSelected = action.payload;
    },
    setCurrentWeek: (state, action) => {
      state.currentWeek = action.payload;
    },
  },
});

export const { setSelectedWeek, setCurrentWeek } = metadataSlice.actions;
