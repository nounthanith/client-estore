const API = import.meta.env.VITE_API_URL;
import axios from "axios";

const api = axios.create({
  baseURL: API,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
