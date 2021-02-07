import {createSlice} from '@reduxjs/toolkit';

export const weeklyGoalsSlice = createSlice({
    name: 'weeklyGoals',
    initialState: [1, 2, 3],
    reducers: {
        keep: (state) => {
            state[2] = 34;
        }
    },
    extraReducers: {

    }
})