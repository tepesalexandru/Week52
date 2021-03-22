import axios from "axios";
import { Tag } from "../../../shared/Interfaces";

export const getTags = async (userId: string) => {
  const response = await axios.get(`api/Tag/getByUserId/${userId}`);
  return response.data;
};

export const createTag = async (tag: Tag) => {
  const response = await axios.post(`api/Tag/create`, tag);
  return response.data;
};

export const assignTag = async (taskId: string, tag: Tag) => {
  const response = await axios.post(`api/Tag/assignTo/${taskId}`, tag);
  return response.data;
};

export const removeTag = async (taskId: string, tag: Tag) => {
  const response = await axios.patch(`api/Tag/removeFrom/${taskId}`, tag);
  return response.data;
};
