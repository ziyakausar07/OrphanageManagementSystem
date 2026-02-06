import React, { useEffect, useState } from "react";
import { getChildrenPerformance } from "../../api/children";
import { useAuth } from "../../context/AuthContext";
import UserSlider from "../../components/UserSlider.jsx";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [children, setChildren] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getChildrenPerformance()
      .then(res => setChildren(res.data || []))
      .catch(err => console.error(err));
  }, []);

  const total = children.length;
  const adopted = children.filter(c => c.status === "adopted").length;
  const available = total - adopted;

  return (
    <div className="dashboard-wrapper">
      {/* Header */}
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <div className="profile-circle" onClick={() => setOpen(true)}>
          {user?.name?.charAt(0).toUpperCase()}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="card-grid">
        <StatCard title="Total Children" value={total} />
        <StatCard title="Adopted Children" value={adopted} />
        <StatCard title="Available Children" value={available} />
      </div>

      {/* Children Performance */}
      <div className="children-section">
        <h3>Children Performance</h3>
        {children.length === 0 && <p>No children found.</p>}

        <div className="children-column">
          {children.map(child => (
            <div key={child.child_id} className="child-card">
              <h4>{child.name}</h4>
              {child.image && (
                <img
                  src={`http://127.0.0.1:5000/${child.image}`}
                  alt={child.name}
                  className="child-img"
                />
              )}

              {child.performances && child.performances.length > 0 ? (
                <ul className="performance-list">
                  {child.performances.map(p => (
                    <li key={p.performance_id} className="performance-item">
                      <div><strong>Year:</strong> {p.year}</div>
                      <div><strong>Marks:</strong> {p.marks}</div>
                      <div><strong>Attendance:</strong> {p.attendance}</div>
                      <div><strong>Remarks:</strong> {p.remarks}</div>
                      {p.image && (
                        <img
                          src={`http://127.0.0.1:5000/${p.image}`}
                          alt="Performance"
                          className="performance-img"
                        />
                      )}
                    </li>
                  ))}
                </ul>
              ) : <p>No performance records.</p>}
            </div>
          ))}
        </div>
      </div>

      {/* User Slider */}
      <UserSlider
        user={user}
        open={open}
        onClose={() => setOpen(false)}
        childrenList={children}
        logout={logout}
      />

      {/* CSS */}
      <style>{`
        .dashboard-wrapper {
          font-family: 'Poppins', sans-serif;
          background: #fff7ed;
          min-height: 100vh;
          padding: 20px;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .profile-circle {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #f97316;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 20px;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .profile-circle:hover { transform: scale(1.1); }

        .card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .stat-card {
          background: #fff;
          border-left: 6px solid #f97316;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .stat-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }
        .stat-card h3 { margin-bottom: 10px; color: #c2410c; }
        .stat-card p { font-size: 28px; font-weight: bold; color: #f97316; }

        .children-section h3 { margin-bottom: 15px; color: #c2410c; }

        /* COLUMN LAYOUT */
        .children-column {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .child-card {
          background: #fff;
          border-radius: 12px;
          padding: 15px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .child-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 18px rgba(249,115,22,0.3);
        }
        .child-card h4 { color: #f97316; margin-bottom: 10px; }
        .child-img { width: 100px; height: 100px; border-radius: 10px; margin-bottom: 10px; object-fit: cover; }

        .performance-list {
          list-style: none;
          padding-left: 0;
          margin-top: 10px;
          max-height: 200px;
          overflow-y: auto;
        }
        .performance-item {
          background: #fff3e0;
          border-radius: 8px;
          padding: 8px;
          margin-bottom: 8px;
        }
        .performance-item div {
          margin-bottom: 4px;
        }
        .performance-img {
          width: 50px;
          height: 50px;
          border-radius: 5px;
          margin-top: 5px;
          object-fit: cover;
        }
        .performance-list::-webkit-scrollbar {
          width: 6px;
        }
        .performance-list::-webkit-scrollbar-thumb {
          background: #f97316;
          border-radius: 3px;
        }

        @media (max-width: 480px) {
          .card-grid { grid-template-columns: 1fr; }
          .child-img, .performance-img { width: 80px; height: 80px; }
        }
      `}</style>
    </div>
  );
}

/* ================= STAT CARD ================= */
const StatCard = ({ title, value }) => (
  <div className="stat-card">
    <h3>{title}</h3>
    <p>{value}</p>
  </div>
);
