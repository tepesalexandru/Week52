import {
  Task,
  Progress,
  Week,
  Overview,
  Goal,
} from "../../../../shared/Interfaces";

export const getTaskProgressOnDay = (task: Task, day: number): number => {
  return task.progressByDay.find((progress: Progress) => progress.day === day)
    .minutes;
};

export const getTaskProgressUntilDay = (task: Task, day: number): number => {
  let totalProgress = 0;
  for (let i = 1; i <= day; i++) totalProgress += getTaskProgressOnDay(task, i);
  return totalProgress;
};

export const getAllTaskProgress = (task: Task): number => {
  return getTaskProgressUntilDay(task, 7);
};

export const getTaskOffsetOnDay = (task: Task, day: number) => {
  let onDay = getTaskProgressUntilDay(task, day) - task.estimation;
  for (let i = day - 1; i >= 1; i--) {
    let previousOffset = getTaskProgressUntilDay(task, i) - task.estimation;
    if (previousOffset > 0) {
      onDay -= previousOffset;
      break;
    }
  }
  return onDay;
};

export const getOverviewOnDay = (week: Week, day: number) => {
  const dayOverview: Overview[] = [];

  week.goals.forEach((goal: Goal) => {
    goal.tasks.forEach((task: Task) => {
      let taskProgress = getTaskProgressOnDay(task, day);
      let remaining = Math.max(
        0,
        task.estimation - getTaskProgressUntilDay(task, day)
      );
      let offset = 0;
      if (
        task.dayCompleted === day ||
        task.estimation - getTaskProgressUntilDay(task, day) < 0
      ) {
        offset = getTaskOffsetOnDay(task, day);
        remaining = 0
      }
      if (taskProgress > 0) {
        dayOverview.push({
          goalName: goal.name,
          task: task,
          progress: taskProgress,
          remaining: remaining,
          offset: offset,
        });
      }
    });
  });

  return dayOverview;
};

export const getProgressOnDay = (
  week: Week,
  day: number,
  withOffset: boolean = true
) => {
  const overview: Overview[] = getOverviewOnDay(week, day);
  let totalProgress = 0;
  let totalOffset = 0;
  overview.forEach((overview: Overview) => {
    totalProgress += overview.progress;
    totalOffset += overview.offset;
  });
  if (withOffset) totalProgress = totalProgress + totalOffset;
  return totalProgress;
};

export const getProgressUntilDay = (
  week: Week,
  day: number,
  withOffset: boolean = true
) => {
  let totalProgress = 0;
  for (let i = 1; i <= day; i++)
    totalProgress +=
      getProgressOnDay(week, i, withOffset) - getDayOffset(week, i);
  return totalProgress;
};

export const getDayOffset = (week: Week, day: number) => {
  return getProgressOnDay(week, day, true) - getProgressOnDay(week, day, false);
};
