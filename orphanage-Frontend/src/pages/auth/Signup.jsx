import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../api/auth";

const Signup = ({ setUserRole }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "DONOR",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const setRole = (role) => {
    setFormData({ ...formData, role });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await signup(formData);

      if (res.data?.token && res.data?.user) {
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        if (setUserRole) setUserRole(user.role);

        setSuccess("Registration successful! Redirecting to dashboard...");

        setTimeout(() => {
          const role = user.role.toUpperCase();
          switch (role) {
            case "ADMIN":
              navigate("/admin/dashboard");
              break;
            case "PERSON":
              navigate("/person/dashboard");
              break;
            case "DONOR":
              navigate("/donor/dashboard");
              break;
            case "STAFF":
              navigate("/staff/dashboard");
              break;
            default:
              navigate("/login");
          }
        }, 1200);
        return;
      }
      setError("Signup succeeded but backend response is invalid.");
    } catch (err) {
      console.error("Signup error:", err);
      if (err.response?.status === 409) {
        setError("An account with this email already exists. Please sign in.");
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Registration could not be completed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const rolesList = [
    { key: "DONOR", label: "Donor / Supporter", icon: "💝" },
    { key: "PERSON", label: "Prospective Adopter", icon: "🏡" },
    { key: "STAFF", label: "Staff Member", icon: "👥" },
    { key: "ADMIN", label: "Administrator", icon: "🛡️" },
  ];

  return (
    <div className="auth-page-wrapper">
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
            <div className="auth-logo-badge">🌟</div>
            <h2 className="auth-title">Create Account</h2>
            <p className="auth-subtitle">Join Sushanti Children Home family today</p>
          </div>

          {error && (
            <div className="auth-alert-error">
              <span>⚠️</span> {error}
            </div>
          )}

          {success && (
            <div className="auth-alert-success">
              <span>🎉</span> {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            {/* Role Selection Tabs */}
            <div className="role-selector-group">
              <label className="section-label">Select Your Role</label>
              <div className="role-buttons-grid">
                {rolesList.map((r) => (
                  <button
                    type="button"
                    key={r.key}
                    onClick={() => setRole(r.key)}
                    className={`role-select-btn ${formData.role === r.key ? "active" : ""}`}
                  >
                    <span className="role-btn-icon">{r.icon}</span>
                    <span className="role-btn-name">{r.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="input-group">
              <label>Full Name</label>
              <div className="input-with-icon">
                <span className="input-icon">👤</span>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

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
              <label>Password</label>
              <div className="input-with-icon">
                <span className="input-icon">🔒</span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a strong password"
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
              disabled={loading}
            >
              {loading ? "Registering account..." : "Complete Registration ✨"}
            </button>
          </form>

          <div className="auth-footer-prompt">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")} className="auth-link-bold">
              Sign In Instead
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
          background: #ccfbf1;
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
          max-width: 480px;
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          border: 1px solid rgba(254, 215, 170, 0.8);
          box-shadow: 0 20px 45px -10px rgba(249, 115, 22, 0.18), 0 10px 20px -5px rgba(0, 0, 0, 0.04);
          padding: 36px;
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
          margin-bottom: 4px;
          letter-spacing: -0.02em;
        }

        .auth-subtitle {
          font-size: 14px;
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
          gap: 16px;
        }

        .role-selector-group {
          margin-bottom: 4px;
        }

        .section-label {
          font-size: 13px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 8px;
          display: block;
        }

        .role-buttons-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        .role-select-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          border-radius: 12px;
          border: 1.5px solid #fed7aa;
          background: #ffffff;
          cursor: pointer;
          font-family: inherit;
          font-size: 12.5px;
          font-weight: 600;
          color: #475569;
          transition: all 0.2s ease;
          text-align: left;
        }

        .role-select-btn:hover {
          background: #fff7ed;
          border-color: #f97316;
          color: #ea580c;
        }

        .role-select-btn.active {
          background: #fff7ed;
          border-color: #ea580c;
          color: #c2410c;
          box-shadow: 0 0 0 2px rgba(234, 88, 12, 0.2);
          font-weight: 700;
        }

        .role-btn-icon {
          font-size: 16px;
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
          padding: 12px 44px 12px 42px;
          border-radius: 14px;
          border: 1.5px solid #fed7aa;
          background: #ffffff;
          font-size: 14px;
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

export default Signup;
