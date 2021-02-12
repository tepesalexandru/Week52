import WeeklyGoals from "../../features/Weekly/Goals/WeeklyGoals";
import CreateTask from "../../features/Weekly/WeekPlans/CreateTask";
import CreateGoal from "../../features/Weekly/WeekPlans/CreateGoal";
import YearOverview from "../../features/Weekly/WeekPlans/YearOverview";
import WeekPlan from "../../features/Weekly/WeekPlans/WeekPlan";
import AddProgress from "../../features/Weekly/Goals/AddProgress";

export const routes = [
  {
    path: "/",
    component: WeeklyGoals,
    exact: true,
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
];
