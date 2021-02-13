import axios from 'axios';

export const getWeek = async (weekNumber: number) => {
    const response = await axios.get(`api/Week/get/${weekNumber}`);
    return response.data;
}