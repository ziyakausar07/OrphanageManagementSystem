import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ role, userRole, children }) => {
  // Not logged in
  if (!userRole) return <Navigate to="/login" />;

  // Role mismatch
  if (role.toLowerCase() !== userRole.toLowerCase()) return <Navigate to="/login" />;

  // All good
  return children;
};

export default ProtectedRoute;
