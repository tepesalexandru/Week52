import { createSlice } from "@reduxjs/toolkit";

export interface MetadataState {
  weekSelected: number;
  dayIdSelected: string;
  currentWeek: number;
}

const INITIAL_STATE: MetadataState = {
  weekSelected: 0,
  dayIdSelected: "",
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
    setDayIdSelected: (state, action) => {
      state.dayIdSelected = action.payload;
    }
  },
});

export const { setSelectedWeek, setCurrentWeek, setDayIdSelected } = metadataSlice.actions;
