import api from "./axiosInstance";

// Get orphanage activities summary
export const getOrphanageActivities = () =>
  api.get("/orphanage-activities");
