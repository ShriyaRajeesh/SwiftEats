// src/services/axiosInstance.js
import axios from "axios";

// Create an Axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // Replace with your backend API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add the JWT token to the headers if available in localStorage
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
