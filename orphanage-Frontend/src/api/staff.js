import api from "./axiosInstance";

// -----------------------------
// Staff submits a leave request
// -----------------------------
export const requestLeave = (data) => {
  // data should be: { user_id, subject, leave_date, reason }
  return api.post("/staff/leave", data);
};

// -----------------------------
// Update leave status (admin)
// -----------------------------
export const updateLeaveStatus = (leaveId, status) => {
  // status: "approved" or "rejected"
  return api.post(`/staff/leave/update/${leaveId}`, { status });
};

// -----------------------------
// Fetch dashboard data for a staff
// -----------------------------
export const getDashboardData = (userId) => {
  return api.get(`/staff/dashboard/${userId}`);
};

// -----------------------------
// Tasks APIs
// -----------------------------

export const getTasks = (userId) => {
  return api.get(`/staff/tasks/${userId}`);
};

export const addTask = (userId, title, description = "") => {
  return api.post("/staff/tasks/add", {
    user_id: userId,
    title,
    description,
  });
};

export const deleteTask = (taskId) => {
  return api.delete(`/staff/tasks/${taskId}`);
};

export const updateTaskStatus = (taskId, status) => {
  return api.post(`/staff/tasks/update/${taskId}`, { status });
};

// -----------------------------
// Staff Profile APIs
// -----------------------------

// Get staff profile
export const getStaffProfile = (userId) => {
  return api.get(`/staff/${userId}`);
};

// ✅ Update staff profile (NEW)
export const updateStaffProfile = (userId, data) => {

  return api.put(`/staff/${userId}`, data);
};
