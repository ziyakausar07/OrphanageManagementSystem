import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../../api/auth";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!password) {
      setError("Password is required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await resetPassword(token, password);
      setMessage(res.data?.message || "Password reset successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Invalid or expired reset link. Please request a new link.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-title">Reset Password</h2>

        <p className="login-subtext">
          Enter your new password below
        </p>

        {message && (
          <p className="success-message">{message}</p>
        )}

        {error && (
          <p className="error-message">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
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
          margin-bottom: 8px;
          font-weight: 600;
        }

        .login-subtext {
          font-size: 14px;
          color: #555;
          margin-bottom: 20px;
        }

        .success-message {
          color: #16a34a;
          font-weight: 500;
          margin-bottom: 15px;
        }

        .error-message {
          color: #ef4444;
          font-weight: 500;
          margin-bottom: 15px;
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

        .login-form button:hover:not(:disabled) {
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

export default ResetPassword;
