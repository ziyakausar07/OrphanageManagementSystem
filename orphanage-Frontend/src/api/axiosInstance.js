import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api",
  // Optionally include credentials if backend uses cookies
  // withCredentials: true
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    if (!config.headers) config.headers = {}; // ensure headers object exists
    config.headers.Authorization = `Bearer ${token}`; // add Bearer prefix
  }
  return config;
});

export default api;
