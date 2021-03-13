import axios from "axios";
import { Task, Progress } from "../../../shared/Interfaces";

export const getTask = async (taskId: string) => {
  const response = await axios.get(`api/Task/get/${taskId}`);
  return response.data;
};

export const createTask = async (GoalId: string, task: Task) => {
  const response = await axios.post(`api/Task/create/${GoalId}`, task);
  return response.data;
};

export const completeTask = async (taskId: string, day: number) => {
  const response = await axios.patch(`api/Task/complete/${taskId}/${day}`);
  return response.data;
};

export const deleteTask = async (id: string) => {
  const response = await axios.delete(`api/Task/delete/${id}`);
  return response.data;
};

export const addProgress = async (taskId: string, progress: Progress) => {
  const response = await axios.post(`api/Task/addProgress/${taskId}`, progress);
  return response.data;
}