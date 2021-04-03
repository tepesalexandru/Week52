import WeeklyGoals from "../../features/Weekly/Goals/WeeklyGoals";
import CreateTask from "../../features/Weekly/WeekPlans/CreateTask";
import CreateGoal from "../../features/Weekly/WeekPlans/CreateGoal";
import YearOverview from "../../features/Weekly/WeekPlans/YearOverview";
import WeekPlan from "../../features/Weekly/WeekPlans/WeekPlan";
import AddProgress from "../../features/Weekly/Goals/AddProgress";
import Landing from "../../features/Login/Landing";
import CreateUser from "../../features/Login/CreateUser";
import Dashboard from '../../features/Analytics/Dashboard';

export const routes = [
  {
    path: "/",
    component: Landing,
    exact: true
  },
  {
    path: "/create-user",
    component: CreateUser,
    exact: true
  },
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
  {
    path: "/dashboard",
    component: Dashboard,
  },
];
