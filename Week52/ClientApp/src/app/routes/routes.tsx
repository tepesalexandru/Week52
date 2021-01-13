import { lazy } from 'react';
import Landing from '../../shared/Home';

const WeeklyGoals = lazy(() => import('../../features/Weekly/Goals/WeeklyGoals'));

export const routes = [
    {
        path: '/',
        component: Landing
    },
    {
        path: '/weekly-goals',
        component: WeeklyGoals
    }
]