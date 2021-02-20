import WeeklyGoals from "../../features/Weekly/Goals/WeeklyGoals";
import CreateTask from "../../features/Weekly/WeekPlans/CreateTask";
import CreateGoal from "../../features/Weekly/WeekPlans/CreateGoal";
import YearOverview from "../../features/Weekly/WeekPlans/YearOverview";
import WeekPlan from "../../features/Weekly/WeekPlans/WeekPlan";
import AddProgress from "../../features/Weekly/Goals/AddProgress";
import DayOverview from "../../features/Weekly/Goals/DayOverview";

export const routes = [
  {
    path: "/week",
    component: WeeklyGoals,
  },
  {
    path: "/create-task/:id",
    component: CreateTask,
  },
  {
    path: "/create-goal",
    component: CreateGoal,
  },
  {
    path: "/year-overview",
    component: YearOverview,
  },
  {
    path: "/week-plan/:weekNumber",
    component: WeekPlan,
  },
  {
    path: "/add-progress",
    component: AddProgress,
  },
  // {
  //   path: "/week/day/:dayNumber",
  //   component: DayOverview,
  // },
];
