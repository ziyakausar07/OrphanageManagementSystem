import React from "react";
import { useNavigate } from "react-router-dom";

const FrontPage = () => {
  const navigate = useNavigate();

  return (
    <div className="front-page">
      {/* ===== NAVBAR ===== */}
      <div className="navbar">
        <h2 className="logo">WELCOME TO SUSHANTI CHILDREN HOME</h2>

        <div className="nav-buttons">
          <button className="login-btn" onClick={() => navigate("/login")}>
            Login
          </button>
          
        </div>
      </div>

      {/* ===== HERO SECTION ===== */}
      <div className="hero">
        <div className="hero-text">
          <h1>Together We Can Change Their Tomorrow</h1>
          <p>
            Thousands of children in orphanages are waiting for care, love and
            opportunities. Your small help can bring a big smile.
          </p>

          <button className="cta" onClick={() => navigate("/signup")}>
            Get Started
          </button>
        </div>

        {/* Images */}
        <div className="hero-images">
          <img
            src="https://images.unsplash.com/photo-1509099836639-18ba1795216d"
            alt="Orphan kids"
          />
          <img
            src="https://images.unsplash.com/photo-1504151932400-72d4384f04b3"
            alt="Happy children"
          />
        </div>
      </div>

      {/* ===== CSS INSIDE COMPONENT ===== */}
      <style>{`
        body {
          margin: 0;
          font-family: 'Inter', sans-serif;
        }

        .front-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background:
            linear-gradient(to bottom right, rgba(255,237,213,0.9), rgba(254,215,170,0.9)),
            url("https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e");
          background-size: cover;
          background-position: center;
        }

        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 22px 50px;
          backdrop-filter: blur(6px);
        }

        .logo {
          color: #9a3412;
          font-weight: 700;
          font-size: 26px;
        }

        .nav-buttons {
          display: flex;
          gap: 14px;
        }

        .login-btn {
          padding: 10px 20px;
          background: transparent;
          border: 2px solid #f97316;
          color: #f97316;
          border-radius: 14px;
          font-weight: 600;
          cursor: pointer;
        }

        .signup-btn {
          padding: 10px 20px;
          background: #f97316;
          border: none;
          color: #fff;
          border-radius: 14px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 8px 18px rgba(249,115,22,0.45);
        }

        .hero {
          flex: 1;
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          align-items: center;
          padding: 60px;
          gap: 40px;
        }

        .hero-text h1 {
          font-size: 46px;
          color: #7c2d12;
          margin-bottom: 18px;
          font-family: 'Poppins', sans-serif;
        }

        .hero-text p {
          font-size: 18px;
          color: #374151;
          margin-bottom: 32px;
          max-width: 520px;
          line-height: 1.6;
        }

        .cta {
          padding: 16px 34px;
          background: #f97316;
          color: white;
          border: none;
          border-radius: 18px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 12px 30px rgba(249,115,22,0.45);
        }

        .hero-images {
          display: flex;
          gap: 20px;
        }

        .hero-images img {
          width: 220px;
          height: 300px;
          object-fit: cover;
          border-radius: 22px;
          box-shadow: 0 18px 40px rgba(0,0,0,0.25);
          transition: transform 0.3s ease;
        }

        .hero-images img:hover {
          transform: translateY(-8px);
        }

        .cta:hover,
        .signup-btn:hover {
          transform: translateY(-2px);
        }

        @media (max-width: 900px) {
          .hero {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .hero-images {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default FrontPage;
