import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../api/auth";

const Signup = ({ setUserRole }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "PERSON",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

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

        setSuccess("Registration successful! Redirecting...");

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
        setError("User already exists. Please login.");
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Signup failed. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        <h2 className="signup-title">Create Your Account</h2>

        {error && <p className="signup-error">{error}</p>}
        {success && <p className="signup-success">{success}</p>}

        <form onSubmit={handleSubmit} className="signup-form">
          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            placeholder="Email Address"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="PERSON">Person</option>
            <option value="DONOR">Donor</option>
            <option value="STAFF">Staff</option>
            <option value="ADMIN">Admin</option>
          </select>

          <button type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="login-prompt">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className="login-link">
            Login
          </span>
        </p>
      </div>

      {/* CSS */}
      <style>{`
        body {
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(135deg, #ffedd5, #fed7aa);
        }

        .signup-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          padding: 20px;
        }

        .signup-card {
          background: #fff;
          padding: 40px;
          border-radius: 16px;
          max-width: 420px;
          width: 100%;
          box-shadow: 0 12px 28px rgba(0,0,0,0.15);
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .signup-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 36px rgba(0,0,0,0.2);
        }

        .signup-title {
          font-size: 28px;
          color: #c2410c;
          margin-bottom: 25px;
          font-weight: 600;
        }

        .signup-error {
          color: #ef4444;
          margin-bottom: 15px;
          font-weight: 500;
        }

        .signup-success {
          color: #28a745;
          margin-bottom: 15px;
          font-weight: 500;
        }

        .signup-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .signup-form input,
        .signup-form select {
          padding: 14px;
          border-radius: 8px;
          border: 1px solid #f97316;
          font-size: 16px;
          outline: none;
          transition: 0.3s;
        }

        .signup-form input:focus,
        .signup-form select:focus {
          border-color: #c2410c;
          box-shadow: 0 0 6px rgba(194,65,12,0.3);
        }

        .signup-form button {
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

        .signup-form button:hover {
          background: #c2410c;
        }

        .login-prompt {
          margin-top: 20px;
          font-size: 14px;
          color: #555;
        }

        .login-link {
          color: #f97316;
          font-weight: 600;
          cursor: pointer;
        }

        .login-link:hover {
          text-decoration: underline;
        }

        @media (max-width: 480px) {
          .signup-card {
            padding: 30px 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default Signup;
