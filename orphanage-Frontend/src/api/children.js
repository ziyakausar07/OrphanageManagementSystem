import api from "./axiosInstance";

// ------------------ Adoption Person ------------------
// Get children with only performance info
export const getChildrenPerformance = () => api.get("/children/performance");

// ------------------ Admin ------------------
// Get full children details for admin dashboard
export const getChildrenAdmin = () => api.get("/children/admin");

// Add a new child (with optional image and multiple performances)
export const addChild = (formData) =>
  api.post("/children/child", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ------------------ General ------------------
// Get basic children info (for dropdowns, etc.)
export const getChildren = () => api.get("/children/ChildData");
