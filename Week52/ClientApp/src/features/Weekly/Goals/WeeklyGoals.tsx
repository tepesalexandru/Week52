import React, { ReactElement, useEffect } from 'react'
import store from '../../../index';
import { weeklyGoalsSlice } from './weeklyGoalsSlice';
interface Props {
    
}

export default function WeeklyGoals({}: Props): ReactElement {

    useEffect(() => {
        store.reducerManager.add('test', weeklyGoalsSlice.reducer);
        store.replaceReducer(store.reducerManager.reduce);
        return () => {
            store.reducerManager.remove('test');
        }
    }, [])

    return (
        <div>
            Weekly Goals
        </div>
    )
}
