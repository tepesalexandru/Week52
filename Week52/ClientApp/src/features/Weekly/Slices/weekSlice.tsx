import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Progress, Task, Week } from "../../../shared/Interfaces";
import { deleteGoal } from "../Services/goalService";
import { addProgress, completeTask, deleteTask } from "../Services/taskService";
import { getWeek } from "../Services/weekService";

const INITIAL_STATE: Week = {
  id: "",
  userId: "",
  weekNumber: 0,
  goals: [],
};

export const _fetchWeek = createAsyncThunk("week/get", (info: any) =>
  getWeek(info.userId, info.weekNumber)
);

export const _deleteGoal = createAsyncThunk("week/deleteGoal", (id: string) => {
  return deleteGoal(id);
});
export const _deleteTask = createAsyncThunk("week/deleteTask", (id: string) => {
  return deleteTask(id);
});

export const _addProgress = createAsyncThunk(
  "week/addProgress",
  (progress: Progress) => {
    return addProgress(progress.taskId, { ...progress });
  }
);

export const _completeTask = createAsyncThunk(
  "week/completeTask",
  (params: { taskId: string; day: number }) => {
    return completeTask(params.taskId, params.day);
  }
);

export const weekSlice = createSlice({
  name: "week",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(_fetchWeek.fulfilled, (state: Week, action) => {
      state = action.payload;
      return state;
    });
    builder.addCase(_deleteGoal.fulfilled, (state: Week, action) => {
      state.goals = state.goals.filter((goal) => goal.id !== action.payload);
      return state;
    });
    builder.addCase(
      _addProgress.fulfilled,
      (state: Week, action: { payload: Task }) => {
        for (let i = 0; i < state.goals.length; i++) {
          for (let j = 0; j < state.goals[i].tasks.length; j++) {
            if (state.goals[i].tasks[j].id === action.payload.id) {
              state.goals[i].tasks[j].progressByDay = [
                ...action.payload.progressByDay,
              ];
            }
          }
        }
        return state;
      }
    );
    builder.addCase(
      _completeTask.fulfilled,
      (state: Week, action: { payload: Task }) => {
        for (let i = 0; i < state.goals.length; i++) {
          for (let j = 0; j < state.goals[i].tasks.length; j++) {
            if (state.goals[i].tasks[j].id === action.payload.id) {
              state.goals[i].tasks[j].dayCompleted =
                action.payload.dayCompleted;
            }
          }
        }
        return state;
      }
    );
    builder.addCase(_deleteTask.fulfilled, (state: Week, action) => {
      for (let k = 0; k < state.goals.length; k++) {
        state.goals[k].tasks = state.goals[k].tasks.filter((task: Task) => {
          return task.id !== action.payload;
        });
      }
      return state;
    });
  },
});
