import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

/* ================= AUTH PAGES ================= */
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import FrontPage from "./pages/auth/FrontPage";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";
import ResetPassword from "./pages/auth/ResetPassword";
/* ================= ADMIN PAGES ================= */
import AdminDashboard from "./pages/admin/Dashboard";
import ManageChildren from "./pages/admin/Children";
import AdoptionRequests from "./pages/admin/AdoptionRequests";
import Donations from "./pages/admin/Donors.jsx";
import AddChild from "./pages/admin/AddChild.jsx";
import OrphanageActivities from "./pages/admin/OrphanageActivities.jsx";
import Staff from "./pages/admin/Staff.jsx";

/* ================= PERSON PAGES ================= */
import UserDashboard from "./pages/person/Dashboard";
import ChildDetails from "./pages/person/AdoptionForm";
import Messages from "./pages/person/Messages";

/* ================= DONOR PAGES ================= */
import DonorDashboard from "./pages/donor/Dashboard";
import DonationForm from "./pages/donor/DonationForm";
import DonorMessages from "./pages/donor/DonorMessages.jsx";

/* ================= STAFF PAGES ================= */
import StaffDashboard from "./pages/staff/Dashboard.jsx";
import Message from "./pages/staff/Message.jsx";
import LeaveRequest from "./pages/staff/LeaveRequest.jsx";
import DailyWork from "./pages/staff/DailyWork.jsx";
import Profile from "./pages/staff/Profile.jsx";

/* ================= PROTECTED ROUTE ================= */
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUserRole(parsedUser?.role?.toLowerCase() || null);
      }
    } catch {
      setUserRole(null);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <h3 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h3>;
  }

  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<FrontPage />} />
      <Route path="/login" element={<Login setUserRole={setUserRole} />} />
      <Route path="/signup" element={<Signup setUserRole={setUserRole} />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* ADMIN */}
      <Route path="/admin/dashboard" element={<ProtectedRoute role="admin" userRole={userRole}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/children" element={<ProtectedRoute role="admin" userRole={userRole}><ManageChildren /></ProtectedRoute>} />
      <Route path="/admin/children/add-child" element={<ProtectedRoute role="admin" userRole={userRole}><AddChild /></ProtectedRoute>} />
      <Route path="/admin/adoptions" element={<ProtectedRoute role="admin" userRole={userRole}><AdoptionRequests /></ProtectedRoute>} />
      <Route path="/admin/donations" element={<ProtectedRoute role="admin" userRole={userRole}><Donations /></ProtectedRoute>} />
      <Route path="/admin/orphanage-activities" element={<ProtectedRoute role="admin" userRole={userRole}><OrphanageActivities /></ProtectedRoute>} />
      <Route path="/admin/staff" element={<ProtectedRoute role="admin" userRole={userRole}><Staff /></ProtectedRoute>} />

      {/* PERSON */}
      <Route path="/person/dashboard" element={<ProtectedRoute role="person" userRole={userRole}><UserDashboard /></ProtectedRoute>} />
      <Route path="/person/child/:id" element={<ProtectedRoute role="person" userRole={userRole}><ChildDetails /></ProtectedRoute>} />
      <Route path="/person/messages" element={<ProtectedRoute role="person" userRole={userRole}><Messages /></ProtectedRoute>} />

      {/* DONOR */}
      <Route path="/donor/dashboard" element={<ProtectedRoute role="donor" userRole={userRole}><DonorDashboard /></ProtectedRoute>} />
      <Route path="/donor/donate" element={<ProtectedRoute role="donor" userRole={userRole}><DonationForm /></ProtectedRoute>} />
      <Route path="/donor/messages" element={<ProtectedRoute role="donor" userRole={userRole}><DonorMessages /></ProtectedRoute>} />

      {/* STAFF */}
      <Route path="/staff/dashboard" element={<ProtectedRoute role="staff" userRole={userRole}><StaffDashboard /></ProtectedRoute>} />
      <Route path="/staff/message" element={<ProtectedRoute role="staff" userRole={userRole}><Message /></ProtectedRoute>} />
      <Route path="/staff/leave-request" element={<ProtectedRoute role="staff" userRole={userRole}><LeaveRequest /></ProtectedRoute>} />
      <Route path="/staff/daily-work" element={<ProtectedRoute role="staff" userRole={userRole}><DailyWork /></ProtectedRoute>} />
      <Route path="/staff/profile" element={<ProtectedRoute role="staff" userRole={userRole}><Profile /></ProtectedRoute>} />
      
<Route path="/reset-password/:token" element={<ResetPassword />} />
      {/* FALLBACK */}
      <Route path="*" element={<h2 style={{ textAlign: "center" }}>Page Not Found</h2>} />
    </Routes>
  );
};

export default App;
