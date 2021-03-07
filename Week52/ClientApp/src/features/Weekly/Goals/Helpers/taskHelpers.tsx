import { Day, Goal, Progress, Task, Week } from "../../../../shared/Interfaces";

export const getTaskById = (
  week: Week,
  taskId: string,
  progress?: Progress
): Task => {
  if (progress) {
    const goal = week.goals.find((x) => x.id === progress.goalId);
    if (goal != undefined) {
      const task = goal.tasks.find((x) => x.id === progress.taskId);
      if (task != undefined) {
        return task;
      }
    }
  } else {
    let taskToReturn: Task = {} as Task;
    week.goals.forEach((goal: Goal) => {
      goal.tasks.forEach((task: Task) => {
        if (task.id === taskId) taskToReturn = task;
      });
    });
    return taskToReturn;
  }
  return {} as Task;
};

export const getTaskRequiredTime = (week: Week, taskId: string): number => {
  const task = getTaskById(week, taskId);
  if (task) {
    return task.duration;
  }
  return 0;
};

export const getPreviousTaskProgress = (
  week: Week,
  taskId: string,
  dayNumber: number
): number => {
  let previousProgress = 0;
  week.days.forEach((day: Day, idx: number) => {
    if (idx < dayNumber - 1) {
      previousProgress += getTaskProgressByDay(week, taskId, idx);
    }
  });
  return Math.min(previousProgress, getTaskRequiredTime(week, taskId));
};

export const getTaskProgressByDay = (
  week: Week,
  taskId: string,
  dayNumber: number
): number => {
  let taskProgress = 0;
  week.days[dayNumber].overview.forEach((progress: Progress) => {
    if (progress.taskId === taskId) {
      taskProgress += progress.progress;
    }
  });
  return taskProgress;
};

export const calculateRemainingTaskTime = (
  week: Week,
  dayNumber: number,
  taskId: string,
  progress: number
) => {
  return Math.max(
    getTaskRequiredTime(week, taskId) -
      getPreviousTaskProgress(week, taskId, dayNumber) -
      progress,
    0
  );
};

export const getAllTaskProgress = (week: Week, taskId: string) => {
  return getPreviousTaskProgress(week, taskId, 7);
};
