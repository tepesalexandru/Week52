import { lazy } from 'react';
import Landing from '../../shared/Home';

import WeeklyGoals from '../../features/Weekly/Goals/WeeklyGoals';

export const routes = [
    {
        path: '/',
        component: Landing,
        exact: true
    },
    {
        path: '/weekly-goals',
        component: WeeklyGoals
    }
]