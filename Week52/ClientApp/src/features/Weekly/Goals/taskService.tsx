import axios from 'axios';
import { Task } from './weeklyGoalsSlice';

export const getTasks = async () => {
    const response = await axios.get("api/Task/get");
    return response.data;
}

export const createTask = async (GoalId: string, task: Task) => {
    const response = await axios.post(`api/Task/create/${GoalId}`, task);
    return response.data;
}