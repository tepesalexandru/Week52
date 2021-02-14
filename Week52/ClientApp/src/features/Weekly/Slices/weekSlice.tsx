import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Task, Week } from "../../../shared/Interfaces";
import { deleteGoal } from "../Services/goalService";
import { deleteTask } from "../Services/taskService";
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

export const _deleteGoal = createAsyncThunk(
  "week/deleteGoal",
  (id: string) => {
    return deleteGoal(id);
  }
);
export const _deleteTask = createAsyncThunk(
  "week/deleteTask",
  (id: string) => {
    return deleteTask(id);
  }
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
    builder.addCase(_deleteGoal.fulfilled, (state: Week, action) => {
      state.goals = state.goals.filter((goal) => goal.id !== action.payload);
      return state;
    });
    builder.addCase(_deleteTask.fulfilled, (state: Week, action) => {
      for (let k = 0; k < state.goals.length; k++) {
        state.goals[k].tasks = state.goals[k].tasks.filter((task: Task) => {
          const goalTasks = [...state.goals[k].tasks];
          for (let i = 0; i < goalTasks.length; i++) {
            if (goalTasks[i].id == action.payload) return false;
          }
          return true;
        });
      }
      return state;
    });
  },
});
