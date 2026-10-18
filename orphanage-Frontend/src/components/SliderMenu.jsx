import React from "react";
import { useNavigate } from "react-router-dom";

const SliderMenu = ({ user, onClose, logout }) => {
  const navigate = useNavigate();

  const go = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    if (logout) logout();
    navigate("/login");
  };

  return (
    <div className="staff-slider">
      {/* USER INFO */}
      <div className="staff-profile">
        <div className="staff-avatar">
          {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
        </div>
        <div className="staff-profile-text">
          <p className="staff-name">{user?.name || "Staff Member"}</p>
          <p className="staff-email">{user?.email || "staff@email.com"}</p>
          <span className="staff-role-pill">{user?.role || "STAFF"}</span>
        </div>
      </div>

      <div className="divider" />

      {/* MENU BUTTONS */}
      <div className="menu-links">
        <button className="slider-btn" onClick={() => go("/staff/message")}>
          <span className="slider-btn-icon">📩</span> Message Box
        </button>
        <button className="slider-btn" onClick={() => go("/staff/leave-request")}>
          <span className="slider-btn-icon">📝</span> Leave Application
        </button>
        <button className="slider-btn" onClick={() => go("/staff/daily-work")}>
          <span className="slider-btn-icon">📋</span> Daily Work / Tasks
        </button>
        <button className="slider-btn" onClick={() => go("/staff/profile")}>
          <span className="slider-btn-icon">👤</span> My Profile
        </button>
      </div>

      <div className="divider" />

      <button className="slider-btn logout-btn" onClick={handleLogout}>
        <span className="slider-btn-icon">🚪</span> Sign Out
      </button>

      {/* CSS */}
      <style>{`
        .staff-slider {
          position: absolute;
          top: 54px;
          right: 0;
          width: 270px;
          background: #ffffff;
          padding: 20px;
          border-radius: 18px;
          border: 1px solid rgba(254, 215, 170, 0.8);
          box-shadow: 0 20px 40px -10px rgba(249, 115, 22, 0.25), 0 10px 15px -5px rgba(0, 0, 0, 0.05);
          z-index: 1000;
          animation: slideIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-8px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .staff-profile {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .staff-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 18px;
          flex-shrink: 0;
          box-shadow: 0 4px 10px rgba(249, 115, 22, 0.3);
        }

        .staff-profile-text {
          overflow: hidden;
        }

        .staff-name {
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 15px;
          color: #1e293b;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .staff-email {
          font-size: 12px;
          color: #94a3b8;
          margin: 0 0 4px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .staff-role-pill {
          display: inline-block;
          font-size: 10px;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 12px;
          background: #eff6ff;
          color: #2563eb;
          text-transform: uppercase;
        }

        .divider {
          height: 1px;
          background: #f1f5f9;
          margin: 10px 0;
        }

        .menu-links {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .slider-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          background: transparent;
          border: none;
          border-radius: 10px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13.5px;
          font-weight: 600;
          color: #475569;
          cursor: pointer;
          transition: all 0.15s ease;
          text-align: left;
        }

        .slider-btn:hover {
          background: #fff7ed;
          color: #ea580c;
          transform: translateX(3px);
        }

        .slider-btn-icon {
          font-size: 16px;
        }

        .logout-btn {
          color: #ef4444;
          font-weight: 700;
        }

        .logout-btn:hover {
          background: #fef2f2;
          color: #dc2626;
        }
      `}</style>
    </div>
  );
};

export default SliderMenu;
