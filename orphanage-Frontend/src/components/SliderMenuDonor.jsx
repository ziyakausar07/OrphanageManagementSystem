import React from "react";
import { useNavigate } from "react-router-dom";

const SliderMenuDonor = ({ onClose }) => {
  const navigate = useNavigate();

  const handleClick = (link) => {
    navigate(link);
    if (onClose) onClose();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="slider-menu">
      <button onClick={() => handleClick("/donor/messages")}>Messages</button>
      <button onClick={() => handleClick("/donor/donate")}>Donate</button>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>

      <style>{`
        .slider-menu {
          position: absolute;
          top: 60px;
          right: 10px;
          width: 200px;
          background:
            radial-gradient(circle at top left, #ffedd5, transparent 45%),
            radial-gradient(circle at bottom right, #fed7aa, transparent 45%),
            #fffaf5;
          padding: 20px;
          border-radius: 18px;
          box-shadow: 0 10px 30px rgba(249,115,22,0.25);
          display: flex;
          flex-direction: column;
          gap: 12px;
          z-index: 1000;
          font-family: 'Inter', sans-serif;
        }

        .slider-menu button {
          padding: 12px;
          background: #f97316;
          color: #fff;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          text-align: left;
          font-weight: 600;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }

        .slider-menu button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(0,0,0,0.15);
        }

        .slider-menu .logout-btn {
          background: #ef4444;
        }
      `}</style>
    </div>
  );
};

export default SliderMenuDonor;
