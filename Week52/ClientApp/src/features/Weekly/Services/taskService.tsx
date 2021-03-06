import axios from "axios";
import { Task } from "../../../shared/Interfaces";

export const createTask = async (GoalId: string, task: Task) => {
  const response = await axios.post(`api/Task/create/${GoalId}`, task);
  return response.data;
};

export const deleteTask = async (id: string) => {
  const response = await axios.delete(`api/Task/delete/${id}`);
  return response.data;
};