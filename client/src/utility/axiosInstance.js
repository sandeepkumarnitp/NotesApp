import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1", // Your backend API root
  withCredentials: true,
  timeout: 10000, // 10-second request timeout
  headers: {
    "Content-Type": "application/json",
  },
});
