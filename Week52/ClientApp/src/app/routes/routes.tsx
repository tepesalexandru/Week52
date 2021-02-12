import Landing from '../../shared/Home';

import WeeklyGoals from '../../features/Weekly/Goals/WeeklyGoals';
import CreateTask from '../../features/Weekly/Goals/CreateTask';
import CreateGoal from '../../features/Weekly/Goals/CreateGoal';
import YearOverview from '../../features/Weekly/WeekPlans/YearOverview';
import WeekPlan from '../../features/Weekly/WeekPlans/WeekPlan';

export const routes = [
    {
        path: '/',
        component: WeeklyGoals,
        exact: true
    },
    {
        path: '/create-task/:id',
        component: CreateTask
    },
    {
        path: '/create-goal',
        component: CreateGoal
    },
    {
        path: '/year-overview',
        component: YearOverview
    }
    ,
    {
        path: '/week-plan/:weekNumber',
        component: WeekPlan
    }
]