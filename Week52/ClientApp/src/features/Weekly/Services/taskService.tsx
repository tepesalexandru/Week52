import axios from "axios";
import { Task } from "../Slices/weeklyGoalsSlice";

export const getTasks = async () => {
  const response = await axios.get("api/Task/get");
  return response.data;
};

export const createTask = async (GoalId: string, task: Task) => {
  const response = await axios.post(`api/Task/create/${GoalId}`, task);
  return response.data;
};

export const deleteTask = async (id: string) => {
  const response = await axios.delete(`api/Task/delete/${id}`);
  return response.data;
};

export const addTaskProgress = async (taskId: string, minutes: number) => {
  const response = await axios.patch(`api/Task/addProgress/${taskId}/${minutes}`);
  return response.data;
};
