import { lazy } from 'react';
import Landing from '../../shared/Home';

import WeeklyGoals from '../../features/Weekly/Goals/WeeklyGoals';
import CreateTask from '../../features/Weekly/Goals/CreateTask';
import CreateGoal from '../../features/Weekly/Goals/CreateGaol';
import CreateWeekPlan from '../../features/Weekly/WeekPlans/CreateWeekPlan';

export const routes = [
    {
        path: '/',
        component: Landing,
        exact: true
    },
    {
        path: '/weekly-goals',
        component: WeeklyGoals
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
        path: '/create-week-plan',
        component: CreateWeekPlan
    }
]