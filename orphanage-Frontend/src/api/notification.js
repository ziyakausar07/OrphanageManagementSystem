// src/api/notifications.js
import api from "./axiosInstance";

// Get notifications for a user
export const getNotifications = (userId) => 
  api.get(`/notification/user/${userId}`); // <-- remove extra /api

// Mark a notification as read
export const markNotificationRead = (notificationId) => 
  api.post(`/notification/read/${notificationId}`);

// Send a notification
export const sendNotification = (data) => 
  api.post(`/notification/send`, data);
