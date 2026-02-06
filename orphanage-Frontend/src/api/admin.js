// src/api/admin.js

import api from "./axiosInstance";

// Dashboard
export const getDashboard = () => api.get("/admin/dashboard");

// Children
export const getChildren = () => api.get("/admin/children");

// ✅ Add child function
export const addChild = (data) => api.post("/admin/children/add", data);

// Adoption Requests
export const getAdoptions = () => api.get("/admin/adoptions");
export const updateAdoptionStatus = (id, status) =>
  api.put(`/admin/adoption/${id}`, { status });

// Donors
// Donors
export const getDonors = () => api.get("/admin/donations");
export const updateDonorStatus = (id, status) =>
  api.put(`/admin/donations/${id}`, { status });

// Staff
export const getStaff = () => api.get("/admin/staff");
export const getStaffLeaves = () => api.get("/admin/staff-leaves");
export const updateStaffLeave = (id, status) =>
  api.put(`/admin/staff-leave/${id}`, { status });

export const getOrphanagePerformance = () =>
  api.get("/admin/orphanage-performance"); // GET request for performance metrics
// ✅ STAFF EDIT
export const updateStaff = (staffId, data) =>
  api.put(`/admin/staff/${staffId}`, data);
// src/api/admin.js

// DELETE staff
export const deleteStaff = (staffId) =>
  api.delete(`/admin/staff/${staffId}`);
export const getDonationPerformance = (type) =>
  api.get(`/admin/donation-performance?type=${type}`);
