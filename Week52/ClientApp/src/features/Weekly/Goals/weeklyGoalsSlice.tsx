import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteGoal, getGoals } from "./goalService";
import { getTasks } from "./taskService";

export interface Task {
    id: string;
    name: string;
    duration: number;
}

export interface Goal {
  id: string;
  name: string;
  tasks: Task[]
}

const INITIAL_STATE: Goal[] = [];

export const _fetchTasks = createAsyncThunk("weeklyGoals/getTasks", () => getTasks());
export const _fetchGoals = createAsyncThunk("weeklyGoals/getGoals", () => getGoals()); 
export const _deleteGoal = createAsyncThunk("weeklyGoals/deleteGoal", (id: string) => {
  console.log("i was here")
  return deleteGoal(id);
})

export const weeklyGoalsSlice = createSlice({
  name: "weeklyGoals",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(_fetchGoals.fulfilled, (state: Goal[], action) => {
      state = action.payload;
      return state;
    });
    builder.addCase(_deleteGoal.fulfilled, (state: Goal[], action) => {
      state = state.filter(goal => goal.id !== action.payload)
      return state;
    });
  },
});
