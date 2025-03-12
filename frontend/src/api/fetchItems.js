import axios from "axios";
const API_BASE_URL = "http://localhost:5000/api";

export const fetchItems = async()=>{
    try {
        const response = await axios.get(`${API_BASE_URL}`)
        return response.data;
    } catch (error) {
        console.error("Error fetching Items:", error);
        throw error;
    }
}