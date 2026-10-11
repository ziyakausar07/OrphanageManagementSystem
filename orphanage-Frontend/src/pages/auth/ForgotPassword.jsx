import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../api/auth";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    console.log("📧 Forgot Password Email:", email); // 👈 console check

    try {
      const res = await forgotPassword(email);
      console.log("✅ API Response:", res.data);

      setMessage("Password reset link has been sent to your email");
      setEmail("");
    } catch (err) {
      console.error("❌ Forgot Password Error:", err);

      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-title">Forgot Password</h2>

        <p style={{ color: "#555", marginBottom: "15px" }}>
          Enter your registered email to reset your password
        </p>

        {message && (
          <p style={{ color: "#16a34a", fontWeight: "500", marginBottom: "15px" }}>
            {message}
          </p>
        )}

        {error && (
          <p style={{ color: "#ef4444", fontWeight: "500", marginBottom: "15px" }}>
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p
          onClick={() => navigate("/login")}
          className="signup-link"
          style={{ marginTop: "20px", display: "inline-block" }}
        >
          ← Back to Login
        </p>
      </div>

      {/* ===== CSS ===== */}
      <style>{`
        body {
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(135deg, #ffedd5, #fed7aa);
        }

        .login-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          padding: 20px;
        }

        .login-card {
          background: #fff;
          padding: 40px;
          border-radius: 16px;
          max-width: 400px;
          width: 100%;
          box-shadow: 0 12px 28px rgba(0,0,0,0.15);
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .login-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 36px rgba(0,0,0,0.2);
        }

        .login-title {
          font-size: 26px;
          color: #c2410c;
          margin-bottom: 10px;
          font-weight: 600;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .login-form input {
          padding: 14px;
          border-radius: 8px;
          border: 1px solid #f97316;
          font-size: 16px;
          outline: none;
          transition: 0.3s;
        }

        .login-form input:focus {
          border-color: #c2410c;
          box-shadow: 0 0 6px rgba(194,65,12,0.3);
        }

        .login-form button {
          padding: 14px;
          background: #f97316;
          color: white;
          font-size: 16px;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: 0.3s;
        }

        .login-form button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .login-form button:hover {
          background: #c2410c;
        }

        .signup-link {
          color: #f97316;
          font-weight: 600;
          cursor: pointer;
        }

        .signup-link:hover {
          text-decoration: underline;
        }

        @media (max-width: 480px) {
          .login-card {
            padding: 30px 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default ForgotPassword;
