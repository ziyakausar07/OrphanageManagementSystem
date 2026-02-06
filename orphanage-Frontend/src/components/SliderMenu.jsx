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
        <div>
          <p className="staff-name">{user?.name || "Staff User"}</p>
          <p className="staff-email">{user?.email || "staff@email.com"}</p>
        </div>
      </div>

      <div className="divider" />

      {/* MENU BUTTONS */}
      <button className="slider-btn" onClick={() => go("/staff/message")}>
        📩 Message Box
      </button>
      <button className="slider-btn" onClick={() => go("/staff/leave-request")}>
        📝 Leave Form
      </button>
      <button className="slider-btn" onClick={() => go("/staff/daily-work")}>
        📋 Daily Work
      </button>
      <button className="slider-btn" onClick={() => go("/staff/profile")}>
        👤 Profile
      </button>

      <button className="slider-btn logout-btn" onClick={handleLogout}>
        🚪 Logout
      </button>

      {/* CSS */}
      <style>{`
        .staff-slider {
          position: absolute;
          top: 60px;
          right: 10px;
          width: 240px;
          background: #fff7ed;
          padding: 18px;
          border-radius: 14px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.25);
          z-index: 1000;
          animation: slideIn 0.25s ease;
          font-family: 'Poppins', sans-serif;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .staff-profile {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .staff-avatar {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: #f97316;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 18px;
        }

        .staff-name {
          margin: 0;
          font-weight: 600;
          color: #9a3412;
        }

        .staff-email {
          margin: 0;
          font-size: 12px;
          color: #555;
        }

        .divider {
          height: 1px;
          background: #fed7aa;
          margin: 12px 0;
        }

        .slider-btn {
          width: 100%;
          padding: 10px 12px;
          background: #f97316;
          color: #fff;
          border: none;
          border-radius: 8px;
          margin-top: 8px;
          cursor: pointer;
          text-align: left;
          font-weight: 500;
          transition: background 0.2s, transform 0.2s;
        }

        .slider-btn:hover {
          background: #c2410c;
          transform: translateX(3px);
        }

        .logout-btn {
          background: #ef4444;
        }

        .logout-btn:hover {
          background: #b91c1c;
        }
      `}</style>
    </div>
  );
};

export default SliderMenu;
