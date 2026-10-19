import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axiosInstance";
import LoadingScreen from "../../components/LoadingScreen";

const Profile = () => {
  const { user: authUser } = useAuth();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authUser) {
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const res = await api.get(`/staff/${authUser.id}`);
        setUser(res.data);
        setFormData(res.data);
      } catch {
        setError("Failed to fetch profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [authUser]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async () => {
    try {
      await api.put(`/staff/${authUser.id}`, formData);
      setUser(formData);
      setEditMode(false);
      alert("Profile updated successfully");
    } catch {
      alert("Failed to update profile");
    }
  };

  if (loading) return <LoadingScreen message="Loading profile..." />;
  if (error) return <div className="center error">{error}</div>;
  if (!user) return <div className="center">No user found</div>;

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2>👤 Profile</h2>

        {!editMode ? (
          <>
            <ProfileRow label="Name" value={user.name} />
            <ProfileRow label="Email" value={user.email} />
            <ProfileRow label="Designation" value={user.designation} />
            <ProfileRow label="Salary" value={`₹${user.salary}`} />

            <button className="edit-btn" onClick={() => setEditMode(true)}>
              Edit Profile
            </button>
          </>
        ) : (
          <>
            <label>Name</label>
            <input name="name" value={formData.name} onChange={handleChange} />

            <label>Email (readonly)</label>
            <input value={formData.email} disabled />

            <label>Designation</label>
            <input
              name="designation"
              value={formData.designation}
              onChange={handleChange}
            />

            <label>Salary</label>
            <input
              name="salary"
              value={formData.salary}
              onChange={handleChange}
            />

            <div className="btn-group">
              <button className="save-btn" onClick={handleSave}>
                Save
              </button>
              <button
                className="cancel-btn"
                onClick={() => {
                  setFormData(user);
                  setEditMode(false);
                }}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>

      {/* ===== CSS INSIDE COMPONENT ===== */}
      <style>{`
        body {
          margin: 0;
          font-family: 'Inter', sans-serif;
        }

        .profile-page {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          background:
            radial-gradient(circle at top left, #ffedd5, transparent 45%),
            radial-gradient(circle at bottom right, #fed7aa, transparent 45%),
            #fffaf5;
        }

        .profile-card {
          width: 100%;
          max-width: 500px;
          background: white;
          padding: 30px;
          border-radius: 18px;
          box-shadow: 0 14px 30px rgba(249,115,22,0.25);
        }

        .profile-card h2 {
          text-align: center;
          margin-bottom: 20px;
          color: #9a3412;
          border-bottom: 2px solid #fed7aa;
          padding-bottom: 10px;
        }

        label {
          font-weight: 600;
          color: #374151;
        }

        input {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          border: 1px solid #d1d5db;
          margin: 6px 0 14px;
          font-size: 14px;
        }

        input:disabled {
          background: #f3f4f6;
        }

        .edit-btn {
          width: 100%;
          padding: 12px;
          background: #f97316;
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
          margin-top: 20px;
        }

        .btn-group {
          display: flex;
          gap: 12px;
          margin-top: 15px;
        }

        .save-btn {
          flex: 1;
          padding: 12px;
          background: #10b981;
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
        }

        .cancel-btn {
          flex: 1;
          padding: 12px;
          background: #ef4444;
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
        }

        .center {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          color: #9a3412;
        }

        .error {
          color: red;
        }
      `}</style>
    </div>
  );
};

export default Profile;

/* ===== REUSABLE ROW ===== */
const ProfileRow = ({ label, value }) => (
  <p style={{ marginBottom: 10 }}>
    <strong>{label}:</strong> {value}
  </p>
);
