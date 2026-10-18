import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";

const Login = ({ setUserRole }) => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await login(formData);
      const { token, user } = res.data;

      if (authLogin) {
        authLogin(user, token);
      } else {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      }

      if (setUserRole) setUserRole(user.role);

      switch (user.role?.toLowerCase()) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "person":
          navigate("/person/dashboard");
          break;
        case "donor":
          navigate("/donor/dashboard");
          break;
        case "staff":
          navigate("/staff/dashboard");
          break;
        default:
          navigate("/login");
      }
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page-wrapper">
      {/* Background Orbs */}
      <div className="bg-glow orb-1" />
      <div className="bg-glow orb-2" />

      {/* Top Bar with Home Link */}
      <div className="auth-top-bar">
        <button className="btn-back-home" onClick={() => navigate("/")}>
          ← Back to Home
        </button>
      </div>

      <div className="auth-card-container">
        <div className="auth-card glass-card">
          <div className="auth-header">
            <div className="auth-logo-badge">🏡</div>
            <h2 className="auth-title">Welcome Back</h2>
            <p className="auth-subtitle">Sign in to access your portal</p>
          </div>

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
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <div className="input-label-row">
                <label>Password</label>
                <span
                  onClick={() => navigate("/forgot-password")}
                  className="link-forgot"
                >
                  Forgot?
                </span>
              </div>
              <div className="input-with-icon">
                <span className="input-icon">🔒</span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="btn-toggle-eye"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "👁️" : "🙈"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn-submit-auth"
              disabled={submitting}
            >
              {submitting ? "Signing in..." : "Sign In to Account ➔"}
            </button>
          </form>

          <div className="auth-footer-prompt">
            Don't have an account yet?{" "}
            <span onClick={() => navigate("/signup")} className="auth-link-bold">
              Create an Account
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
          background: #ffe4e6;
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
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          border: 1px solid rgba(254, 215, 170, 0.8);
          box-shadow: 0 20px 45px -10px rgba(249, 115, 22, 0.18), 0 10px 20px -5px rgba(0, 0, 0, 0.04);
          padding: 40px 36px;
          animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .auth-header {
          text-align: center;
          margin-bottom: 28px;
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
          margin-bottom: 14px;
        }

        .auth-title {
          font-size: 28px;
          font-weight: 800;
          color: #7c2d12;
          margin-bottom: 6px;
          letter-spacing: -0.02em;
        }

        .auth-subtitle {
          font-size: 14.5px;
          color: #64748b;
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
          margin-bottom: 20px;
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

        .input-label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .link-forgot {
          font-size: 12.5px;
          color: #f97316;
          font-weight: 600;
          cursor: pointer;
        }

        .link-forgot:hover {
          text-decoration: underline;
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
          padding: 13px 44px 13px 42px;
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

        .btn-toggle-eye {
          position: absolute;
          right: 12px;
          background: transparent;
          border: none;
          padding: 4px;
          font-size: 15px;
          cursor: pointer;
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
          margin-top: 24px;
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

export default Login;
