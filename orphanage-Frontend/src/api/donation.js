import api from "./axiosInstance";

// Add donation
export const addDonation = (data) => api.post("/donation/add", data);
