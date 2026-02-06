import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth";

const Login = ({ setUserRole }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await login(formData);
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUserRole(user.role);

      // Role-based redirect
      switch (user.role.toLowerCase()) {
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
    } catch (err) {
      setError("Invalid email or password");
    }
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
          <button type="submit">Login</button>
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
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .login-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 36px rgba(0,0,0,0.2);
        }

        .login-title {
          font-size: 28px;
          color: #c2410c;
          margin-bottom: 25px;
          font-weight: 600;
        }

        .login-error {
          color: #ef4444;
          margin-bottom: 15px;
          font-weight: 500;
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

        .login-form button:hover {
          background: #c2410c;
        }

        .signup-text {
          margin-top: 20px;
          font-size: 14px;
          color: #555;
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

export default Login;
