import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Week } from "../../../shared/Interfaces";
import { getWeek } from "../Services/weekService";

const INITIAL_STATE: Week = {
  id: "",
  weekNumber: 0,
  days: [],
  goals: [],
};

export const _fetchWeek = createAsyncThunk("week/get", (weekNumber: number) =>
  getWeek(weekNumber)
);

export const weekSlice = createSlice({
  name: "week",
  initialState: INITIAL_STATE,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(_fetchWeek.fulfilled, (state: Week, action) => {
      state = action.payload;
      return state;
    });
  },
});
