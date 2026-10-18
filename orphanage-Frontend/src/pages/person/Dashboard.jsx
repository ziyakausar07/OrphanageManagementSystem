import React, { useEffect, useState } from "react";
import { getChildrenPerformance } from "../../api/children";
import { useAuth } from "../../context/AuthContext";
import UserSlider from "../../components/UserSlider.jsx";

const getImageUrl = (path) => {
  if (!path) return "https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=300&q=80";
  if (path.startsWith("http")) return path;
  const baseUrl = import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL.replace(/\/api\/?$/, "")
    : "http://127.0.0.1:5000";
  return `${baseUrl}/${path.replace(/^\//, "")}`;
};

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [children, setChildren] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getChildrenPerformance()
      .then(res => setChildren(res.data || []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const total = children.length;
  const adopted = children.filter(c => c.status === "adopted").length;
  const available = total - adopted;

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <div>
            <span className="welcome-tag">Adopter & Public Portal</span>
            <h2 className="dashboard-title">Welcome, {user?.name || "Friend"} 👋</h2>
          </div>
          <div className="profile-circle" onClick={() => setOpen(true)} title="Menu">
            {user?.name?.charAt(0).toUpperCase() || "U"}
            <span className="online-indicator" />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="card-grid">
          <StatCard title="Total Children" value={total} icon="👶" color="#f97316" />
          <StatCard title="Adopted Children" value={adopted} icon="🏡" color="#10b981" />
          <StatCard title="Available for Adoption" value={available} icon="🌟" color="#0284c7" />
        </div>

        {/* Children Performance Section */}
        <div className="children-section">
          <div className="section-title-row">
            <div>
              <h3 className="section-heading">Children Profile & Growth Records</h3>
              <p className="section-sub">Track attendance, academic records and health progress</p>
            </div>
            <button className="btn-adoption-open" onClick={() => setOpen(true)}>
              View Actions & Options ➔
            </button>
          </div>

          {loading ? (
            <div className="loading-state">Loading children records...</div>
          ) : children.length === 0 ? (
            <div className="empty-state">No children records found.</div>
          ) : (
            <div className="children-grid">
              {children.map(child => (
                <div key={child.child_id} className="child-card">
                  <div className="child-card-header">
                    <img
                      src={getImageUrl(child.image)}
                      alt={child.name}
                      className="child-img"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=300&q=80";
                      }}
                    />
                    <div className="child-info">
                      <h4 className="child-name">{child.name}</h4>
                      <span className={`child-status-badge badge-${child.status || "available"}`}>
                        {child.status || "Available"}
                      </span>
                    </div>
                  </div>

                  <div className="performance-container">
                    <h5 className="perf-title">Academic & Attendance</h5>
                    {child.performances && child.performances.length > 0 ? (
                      <div className="performance-list">
                        {child.performances.map(p => (
                          <div key={p.performance_id} className="performance-item">
                            <div className="perf-row">
                              <span className="perf-year">Year {p.year}</span>
                              <span className="perf-marks">Score: {p.marks}%</span>
                            </div>
                            <div className="perf-row secondary">
                              <span>Attendance: {p.attendance}%</span>
                              <span>Remark: {p.remarks}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="no-perf-text">Record in progress.</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User Slider */}
        <UserSlider
          user={user}
          open={open}
          onClose={() => setOpen(false)}
          childrenList={children}
          logout={logout}
        />
      </div>

      {/* CSS */}
      <style>{`
        .dashboard-wrapper {
          min-height: 100vh;
          background: #fafaf9;
          background-image: radial-gradient(circle at 10% 10%, #fff7ed 0%, #fafaf9 60%, #fff1f2 100%);
          padding: 30px 24px;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .dashboard-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(12px);
          padding: 20px 28px;
          border-radius: 20px;
          border: 1px solid rgba(254, 215, 170, 0.7);
          box-shadow: 0 4px 18px rgba(249, 115, 22, 0.06);
        }

        .welcome-tag {
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #f97316;
        }

        .dashboard-title {
          font-size: 24px;
          font-weight: 800;
          color: #7c2d12;
          margin: 4px 0 0 0;
        }

        .profile-circle {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 18px;
          cursor: pointer;
          position: relative;
          box-shadow: 0 4px 14px rgba(249, 115, 22, 0.35);
          transition: transform 0.2s;
        }

        .profile-circle:hover {
          transform: scale(1.06);
        }

        .online-indicator {
          position: absolute;
          bottom: 1px;
          right: 1px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #10b981;
          border: 2px solid #ffffff;
        }

        .card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
          margin-bottom: 36px;
        }

        .stat-card-custom {
          background: #ffffff;
          border-radius: 18px;
          padding: 22px 24px;
          border: 1px solid rgba(254, 215, 170, 0.7);
          box-shadow: 0 10px 24px -5px rgba(249, 115, 22, 0.08);
          position: relative;
          overflow: hidden;
          transition: all 0.25s ease;
        }

        .stat-card-custom:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 30px -5px rgba(249, 115, 22, 0.18);
        }

        .stat-top-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .stat-card-title {
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          color: #9a3412;
        }

        .stat-card-icon {
          font-size: 20px;
        }

        .stat-card-value {
          font-family: 'Outfit', sans-serif;
          font-size: 32px;
          font-weight: 800;
          color: #1e293b;
          margin: 0;
        }

        .children-section {
          background: #ffffff;
          border-radius: 24px;
          padding: 32px 28px;
          border: 1px solid rgba(254, 215, 170, 0.7);
          box-shadow: 0 10px 25px rgba(249, 115, 22, 0.06);
        }

        .section-title-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 26px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .section-heading {
          font-size: 20px;
          color: #1e293b;
          margin: 0 0 4px 0;
        }

        .section-sub {
          font-size: 13.5px;
          color: #64748b;
          margin: 0;
        }

        .btn-adoption-open {
          padding: 10px 20px;
          background: #fff7ed;
          border: 1.5px solid #fed7aa;
          color: #ea580c;
          border-radius: 12px;
          font-weight: 700;
          font-size: 13.5px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-adoption-open:hover {
          background: #ffedd5;
          transform: translateY(-2px);
        }

        .children-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 22px;
        }

        .child-card {
          background: #fffaf5;
          border-radius: 18px;
          padding: 20px;
          border: 1px solid rgba(254, 215, 170, 0.8);
          transition: all 0.25s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .child-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 14px 28px rgba(249, 115, 22, 0.15);
          background: #ffffff;
        }

        .child-card-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 16px;
        }

        .child-img {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          object-fit: cover;
          border: 2px solid #ffffff;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .child-name {
          font-family: 'Outfit', sans-serif;
          font-size: 17px;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 4px 0;
        }

        .child-status-badge {
          display: inline-block;
          padding: 2px 10px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 700;
          text-transform: capitalize;
        }

        .badge-available {
          background: #e0f2fe;
          color: #0369a1;
        }

        .badge-adopted {
          background: #dcfce7;
          color: #15803d;
        }

        .perf-title {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          color: #94a3b8;
          margin-bottom: 8px;
        }

        .performance-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .performance-item {
          background: #ffffff;
          border-radius: 10px;
          padding: 8px 12px;
          border: 1px solid #fed7aa;
          font-size: 12.5px;
        }

        .perf-row {
          display: flex;
          justify-content: space-between;
          font-weight: 600;
          color: #1e293b;
        }

        .perf-row.secondary {
          font-size: 11.5px;
          color: #64748b;
          margin-top: 3px;
        }

        .no-perf-text {
          font-size: 12.5px;
          color: #94a3b8;
          font-style: italic;
          margin: 0;
        }

        .loading-state, .empty-state {
          text-align: center;
          padding: 40px;
          color: #94a3b8;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}

const StatCard = ({ title, value, icon, color }) => (
  <div className="stat-card-custom">
    <div className="stat-top-row">
      <span className="stat-card-title">{title}</span>
      <span className="stat-card-icon">{icon}</span>
    </div>
    <p className="stat-card-value" style={{ color }}>{value}</p>
  </div>
);
