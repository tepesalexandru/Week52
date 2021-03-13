import axios from "axios";
import { Progress } from "../../../shared/Interfaces";

export const getWeek = async (userId: string, weekNumber: number) => {
  const response = await axios.get(`api/Week/get/${userId}/${weekNumber}`);
  return response.data;
};

// export const addProgress = async (dayId: string, progress: Progress) => {
//   const response = await axios.patch(`api/Week/addProgress/${dayId}`, progress);
//   return response.data;
// };
