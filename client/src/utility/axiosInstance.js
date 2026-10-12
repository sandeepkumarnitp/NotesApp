import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Your backend API root
  withCredentials: true,
  timeout: 10000, // 10-second request timeout
  headers: {
    "Content-Type": "application/json",
  },
});
