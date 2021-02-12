import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteGoal, getGoals, getGoalsForWeek } from "../Services/goalService";
import { deleteTask, getTasks } from "../Services/taskService";

export interface Task {
  id: string;
  name: string;
  duration: number;
}

export interface Goal {
  id: string;
  name: string;
  weekNumber?: number;
  tasks: Task[];
}

const INITIAL_STATE: Goal[] = [];

export const _fetchTasks = createAsyncThunk("weeklyGoals/getTasks", () =>
  getTasks()
);
export const _fetchGoals = createAsyncThunk("weeklyGoals/getGoals", () =>
  getGoals()
);
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
export const _fetchGoalsForWeek = createAsyncThunk(
  "weeklyGoals/getGoalsForWeek",
  (weekNumber: number) => getGoalsForWeek(weekNumber)
);

export const weeklyGoalsSlice = createSlice({
  name: "weeklyGoals",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(_fetchGoals.fulfilled, (state: Goal[], action) => {
      state = action.payload;
      return state;
    });
    builder.addCase(_fetchGoalsForWeek.fulfilled, (state: Goal[], action) => {
      state = action.payload;
      return state;
    });
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
