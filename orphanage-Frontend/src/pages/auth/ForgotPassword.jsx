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

    try {
      await forgotPassword(email);
      setMessage("A password reset link has been sent to your email inbox.");
      setEmail("");
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Could not send reset email. Please verify your address and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="bg-glow orb-1" />
      <div className="bg-glow orb-2" />

      <div className="auth-top-bar">
        <button className="btn-back-home" onClick={() => navigate("/login")}>
          ← Back to Login
        </button>
      </div>

      <div className="auth-card-container">
        <div className="auth-card glass-card">
          <div className="auth-header">
            <div className="auth-logo-badge">🔑</div>
            <h2 className="auth-title">Reset Password</h2>
            <p className="auth-subtitle">
              Enter your registered email address to receive password reset instructions
            </p>
          </div>

          {message && (
            <div className="auth-alert-success">
              <span>✉️</span> {message}
            </div>
          )}

          {error && (
            <div className="auth-alert-error">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <label>Email Address</label>
              <div className="input-with-icon">
                <span className="input-icon">✉️</span>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-submit-auth"
              disabled={loading}
            >
              {loading ? "Sending link..." : "Send Reset Link ➔"}
            </button>
          </form>

          <div className="auth-footer-prompt">
            Remembered your password?{" "}
            <span onClick={() => navigate("/login")} className="auth-link-bold">
              Return to Login
            </span>
          </div>
        </div>
      </div>

      <style>{`
        .auth-page-wrapper {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          position: relative;
          background: #fafaf9;
          overflow: hidden;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .bg-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          z-index: 0;
          opacity: 0.6;
          pointer-events: none;
        }

        .orb-1 {
          width: 450px;
          height: 450px;
          background: #fed7aa;
          top: -100px;
          right: -100px;
        }

        .orb-2 {
          width: 500px;
          height: 500px;
          background: #fef08a;
          bottom: -100px;
          left: -150px;
        }

        .auth-top-bar {
          padding: 24px 36px;
          position: relative;
          z-index: 10;
        }

        .btn-back-home {
          background: #ffffff;
          border: 1px solid #fed7aa;
          color: #9a3412;
          padding: 8px 18px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 13.5px;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          transition: all 0.2s ease;
        }

        .btn-back-home:hover {
          background: #fff7ed;
          transform: translateX(-3px);
        }

        .auth-card-container {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          position: relative;
          z-index: 10;
        }

        .auth-card {
          width: 100%;
          max-width: 440px;
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          border: 1px solid rgba(254, 215, 170, 0.8);
          box-shadow: 0 20px 45px -10px rgba(249, 115, 22, 0.18), 0 10px 20px -5px rgba(0, 0, 0, 0.04);
          padding: 38px 34px;
          animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .auth-header {
          text-align: center;
          margin-bottom: 24px;
        }

        .auth-logo-badge {
          width: 52px;
          height: 52px;
          border-radius: 16px;
          background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
          box-shadow: 0 8px 18px rgba(249, 115, 22, 0.35);
          margin-bottom: 12px;
        }

        .auth-title {
          font-size: 26px;
          font-weight: 800;
          color: #7c2d12;
          margin-bottom: 6px;
          letter-spacing: -0.02em;
        }

        .auth-subtitle {
          font-size: 13.5px;
          color: #64748b;
          line-height: 1.5;
          margin: 0;
        }

        .auth-alert-error {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #dc2626;
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 13.5px;
          font-weight: 600;
          margin-bottom: 18px;
        }

        .auth-alert-success {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #ecfdf5;
          border: 1px solid #a7f3d0;
          color: #059669;
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 13.5px;
          font-weight: 600;
          margin-bottom: 18px;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
        }

        .input-group label {
          font-size: 13.5px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 6px;
        }

        .input-with-icon {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 14px;
          font-size: 16px;
          pointer-events: none;
        }

        .input-with-icon input {
          width: 100%;
          padding: 13px 14px 13px 42px;
          border-radius: 14px;
          border: 1.5px solid #fed7aa;
          background: #ffffff;
          font-size: 14.5px;
          color: #1e293b;
          transition: all 0.2s ease;
          margin: 0;
        }

        .input-with-icon input:focus {
          border-color: #f97316;
          box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.15);
          outline: none;
        }

        .btn-submit-auth {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
          color: white;
          border: none;
          border-radius: 14px;
          font-family: 'Outfit', sans-serif;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 10px 24px rgba(249, 115, 22, 0.4);
          transition: all 0.2s ease;
          margin-top: 6px;
        }

        .btn-submit-auth:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 14px 28px rgba(249, 115, 22, 0.5);
        }

        .auth-footer-prompt {
          text-align: center;
          margin-top: 22px;
          font-size: 14px;
          color: #64748b;
        }

        .auth-link-bold {
          color: #ea580c;
          font-weight: 700;
          cursor: pointer;
          margin-left: 4px;
        }

        .auth-link-bold:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default ForgotPassword;
