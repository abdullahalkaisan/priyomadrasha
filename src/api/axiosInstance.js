// src/api/axios.js
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // if you use cookies or auth sessions
});

// Optional: interceptors for handling tokens / errors
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("Axios Error:", error.response || error.message);
        return Promise.reject(error);
    }
);

export default axiosInstance;
