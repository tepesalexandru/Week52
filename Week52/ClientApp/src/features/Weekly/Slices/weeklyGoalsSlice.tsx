import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Goal, Task } from "../../../shared/Interfaces";
import { deleteGoal } from "../Services/goalService";
import { deleteTask } from "../Services/taskService";

const INITIAL_STATE: Goal[] = [];

export const _deleteGoal = createAsyncThunk(
  "weeklyGoals/deleteGoal",
  (id: string) => {
    return deleteGoal(id);
  }
);
export const _deleteTask = createAsyncThunk(
  "weeklyGoals/deleteTask",
  (id: string) => {
    return deleteTask(id);
  }
);

export const weeklyGoalsSlice = createSlice({
  name: "weeklyGoals",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(_deleteGoal.fulfilled, (state: Goal[], action) => {
      state = state.filter((goal) => goal.id !== action.payload);
      return state;
    });
    builder.addCase(_deleteTask.fulfilled, (state: Goal[], action) => {
      for (let k = 0; k < state.length; k++) {
        state[k].tasks = state[k].tasks.filter((task: Task) => {
          const goalTasks = [...state[k].tasks];
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
