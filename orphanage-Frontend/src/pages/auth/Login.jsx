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
      setError("Invalid email or password");
    } finally {
      setSubmitting(false);
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-title">Login</h2>

        {error && <p className="login-error">{error}</p>}

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {/* 🔹 Forgot Password */}
          <div className="forgot-wrapper">
            <span onClick={handleForgotPassword} className="forgot-link">
              Forgot Password?
            </span>
          </div>

          <button type="submit" disabled={submitting}>
            {submitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="signup-text">
          New user?{" "}
          <span onClick={() => navigate("/signup")} className="signup-link">
            Sign Up
          </span>
        </p>
      </div>

      {/* CSS */}
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
        }

        .login-title {
          font-size: 28px;
          color: #c2410c;
          margin-bottom: 25px;
        }

        .login-error {
          color: #ef4444;
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
        }

        .forgot-wrapper {
          text-align: right;
          margin-top: -5px;
        }

        .forgot-link {
          font-size: 13px;
          color: #f97316;
          cursor: pointer;
          font-weight: 500;
        }

        .forgot-link:hover {
          text-decoration: underline;
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
        }

        .login-form button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .login-form button:hover:not(:disabled) {
          background: #c2410c;
        }

        .signup-text {
          margin-top: 20px;
          font-size: 14px;
        }

        .signup-link {
          color: #f97316;
          font-weight: 600;
          cursor: pointer;
        }

        .signup-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default Login;
