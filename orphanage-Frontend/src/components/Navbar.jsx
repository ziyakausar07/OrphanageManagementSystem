import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import SliderMenu from "./SliderMenu";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const role = user?.role ? user.role.toUpperCase() : "GUEST";

  const getDashboardPath = () => {
    switch (role) {
      case "ADMIN": return "/admin/dashboard";
      case "STAFF": return "/staff/dashboard";
      case "DONOR": return "/donor/dashboard";
      case "PERSON": return "/person/dashboard";
      default: return "/";
    }
  };

  return (
    <nav className="modern-navbar">
      {/* Brand Logo & Name */}
      <div className="nav-brand" onClick={() => navigate(getDashboardPath())}>
        <div className="nav-brand-icon">
          <img
            src="/sushanti_logo.png"
            alt="Sushanti Logo"
            className="nav-brand-logo-img"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/src/assets/sushanti_logo.png";
            }}
          />
        </div>
        <div>
          <h2 className="nav-brand-title">Sushanti Children Home</h2>
          <span className="nav-brand-subtitle">Orphanage Management System</span>
        </div>
      </div>

      {/* User Controls */}
      <div className="nav-user-area">
        {/* Role Badge */}
        <span className={`nav-role-badge role-${role.toLowerCase()}`}>
          {role}
        </span>

        {/* Profile Circle */}
        <div className="nav-profile-container">
          <div
            className="nav-profile-avatar"
            onClick={() => setIsOpen(!isOpen)}
            title={`${user?.name || "User"} (${role})`}
          >
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            <span className="online-indicator" />
          </div>

          {isOpen && (
            <SliderMenu
              user={user}
              onClose={() => setIsOpen(false)}
              logout={logout}
            />
          )}
        </div>
      </div>

      <style>{`
        .modern-navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 32px;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(254, 215, 170, 0.7);
          box-shadow: 0 4px 20px rgba(249, 115, 22, 0.06);
          position: sticky;
          top: 0;
          z-index: 900;
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          user-select: none;
        }

        .nav-brand-icon {
          width: 44px;
          height: 44px;
          border-radius: 14px;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 16px rgba(249, 115, 22, 0.25);
          overflow: hidden;
          border: 2px solid #fed7aa;
        }

        .nav-brand-logo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .nav-brand-title {
          font-family: 'Outfit', sans-serif;
          font-size: 19px;
          font-weight: 700;
          color: #7c2d12;
          margin: 0;
          line-height: 1.15;
        }

        .nav-brand-subtitle {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #9a3412;
        }

        .nav-user-area {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .nav-role-badge {
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.05em;
        }

        .role-admin {
          background: #fef2f2;
          color: #dc2626;
          border: 1px solid rgba(239, 68, 68, 0.3);
        }

        .role-staff {
          background: #eff6ff;
          color: #2563eb;
          border: 1px solid rgba(37, 99, 235, 0.3);
        }

        .role-donor {
          background: #f0fdf4;
          color: #16a34a;
          border: 1px solid rgba(22, 163, 74, 0.3);
        }

        .role-person {
          background: #fff7ed;
          color: #ea580c;
          border: 1px solid rgba(234, 88, 12, 0.3);
        }

        .nav-profile-container {
          position: relative;
        }

        .nav-profile-avatar {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Outfit', sans-serif;
          font-size: 17px;
          font-weight: 700;
          cursor: pointer;
          position: relative;
          box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
          transition: all 0.2s ease;
        }

        .nav-profile-avatar:hover {
          transform: scale(1.06);
          box-shadow: 0 6px 18px rgba(249, 115, 22, 0.45);
        }

        .online-indicator {
          position: absolute;
          bottom: 1px;
          right: 1px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #10b981;
          border: 2px solid #ffffff;
        }

        @media (max-width: 640px) {
          .modern-navbar {
            padding: 12px 16px;
          }
          .nav-brand-subtitle {
            display: none;
          }
          .nav-brand-title {
            font-size: 16px;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
