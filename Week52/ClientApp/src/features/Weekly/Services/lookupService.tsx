import axios from 'axios';

export const getGoalsForWeek = async (weekNumber: number) => {
    const response = await axios.get(`api/Lookup/Goals/${weekNumber}`);
    return response.data;
}

export const getTasksForGoal = async (goalId: string) => {
    const response = await axios.get(`api/Lookup/Tasks/${goalId}`);
    return response.data;
}