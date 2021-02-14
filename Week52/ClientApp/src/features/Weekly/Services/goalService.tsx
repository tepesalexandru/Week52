import axios from 'axios';
import { Goal } from '../../../shared/Interfaces';

// export const getGoals = async () => {
//     const response = await axios.get("api/Goal/get");
//     return response.data;
// }

// export const getGoalsForWeek = async (weekNumber: number) => {
//     const response = await axios.get(`api/Goal/get/${weekNumber}`);
//     return response.data;
// }

export const createGoal = async (weekNumber: number, goal: Goal) => {
    const response = await axios.post(`api/Goal/create/${weekNumber}`, goal);
    return response.data;
}

export const deleteGoal = async (id: string) => {
    const response = await axios.delete(`api/Goal/delete/${id}`);
    return response.data;
}