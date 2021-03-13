import { createSlice } from "@reduxjs/toolkit";

export interface MetadataState {
  weekSelected: number;
  daySelected: number;
  currentWeek: number;
  weekId: string;
  userId: string;
  userName: string;
}

const INITIAL_STATE: MetadataState = {
  weekSelected: 0,
  daySelected: 0,
  currentWeek: 0,
  weekId: "",
  userId: "",
  userName: "",
};

export const metadataSlice = createSlice({
  name: "metadata",
  initialState: INITIAL_STATE,
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
    },
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
  },
});

export const {
  setSelectedWeek,
  setCurrentWeek,
  setDaySelected,
  setUser,
} = metadataSlice.actions;
