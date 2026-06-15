import axios from "axios";

const api = axios.create({
  baseURL: "/api", // for Next.js backend routes
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: request interceptor (for auth later)
api.interceptors.request.use((config) => {
  // Example: attach token later
  // const token = localStorage.getItem("token");
  // if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export default api;