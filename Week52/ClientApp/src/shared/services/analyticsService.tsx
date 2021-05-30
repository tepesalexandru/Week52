import axios from "axios";

export const getProgressOnWeeks = async (userId: string) => {
  const response = await axios.get(`api/Analytics/progressOnWeeks/${userId}`);
  return response.data;
};
