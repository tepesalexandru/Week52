import axios from "axios";

export const createUser = async (username: string) => {
  const response = await axios.post(`api/User/create`, {
    name: username,
  });
  return response.data;
};

export const getUsers = async () => {
  const response = await axios.get(`api/User/get`);
  return response.data;
};
