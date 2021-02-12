import axios from "axios";
import { useEffect, useState } from "react";

const useLookup = (url: string): {
    id: string;
    name: string;
}[] => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`api/Lookup/${url}`);
            setData(response.data);
        }
        fetchData();
    }, [])

    return data;
}
export default useLookup; 