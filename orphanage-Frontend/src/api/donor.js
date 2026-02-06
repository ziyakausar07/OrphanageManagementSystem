import api from "./axiosInstance";

// Request donor
export const donorRequest = (data) => api.post("/donor/request", data);

// Update donor status
export const updateDonor = (id, status) =>
  api.post(`/donor/update/${id}`, { status });
