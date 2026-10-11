import api from "./axiosInstance";

// ================= AUTH =================
export const login = (data) => api.post("/auth/login", data);
export const signup = (data) => api.post("/auth/register", data);

// ================= FORGOT PASSWORD =================

// 1️⃣ Email bhejne ke liye (forgot password)
export const forgotPassword = (email) =>
  api.post("/auth/forgot-password", { email });

// 2️⃣ New password set karne ke liye (reset password)
export const resetPassword = (token, password) =>
  api.post(`/auth/reset-password/${token}`, { password });
