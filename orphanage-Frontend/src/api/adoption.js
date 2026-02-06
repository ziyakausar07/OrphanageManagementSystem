import api from "./axiosInstance";

// Create adoption request
export const requestAdoption = (data) => api.post("/adoption/request", data);

// Update adoption (approve/reject)
export const updateAdoption = (id, status) =>
  api.post(`/adoption/update/${id}`, { status });
export const getAdoptionRequests = () =>
  api.get("/adoption/adoptions_status");

export const updateAdoptionStatus = (id, data) =>
  api.post(`/adoption/adoption/${id}`, data);
