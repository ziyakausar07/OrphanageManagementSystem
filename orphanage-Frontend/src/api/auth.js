import api from "./axiosInstance";

// ✅ Remove "./" from paths
export const login = (data) => api.post("/auth/login", data);
export const signup = (data) => api.post("/auth/register", data);
