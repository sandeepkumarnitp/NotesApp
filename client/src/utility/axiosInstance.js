import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1", // Your backend API root
  withCredentials: true,
  timeout: 10000, // 5-second request timeout
  headers: {
    "Content-Type": "application/json",
  },
});
