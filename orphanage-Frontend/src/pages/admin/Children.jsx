import React, { useEffect, useState } from "react";
import { getChildrenAdmin } from "../../api/children";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ChildrenDashboard() {
  const { user } = useAuth();
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const res = await getChildrenAdmin();
        setChildren(res.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load children.");
      } finally {
        setLoading(false);
      }
    };
    fetchChildren();
  }, []);

  if (loading) return <p style={{ padding: 20 }}>Loading children...</p>;
  if (error) return <p style={{ padding: 20, color: "red" }}>{error}</p>;

  const total = children.length;
  const adopted = children.filter(c => c.status === "adopted").length;
  const available = total - adopted;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@500;600&display=swap');

        body {
          margin: 0;
          font-family: 'Inter', sans-serif;
          background:
            radial-gradient(circle at top left, #ffedd5, transparent 45%),
            radial-gradient(circle at bottom right, #fed7aa, transparent 45%),
            #fffaf5;
        }

        .dashboard {
          padding: 40px 30px;
          max-width: 1200px;
          margin: auto;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        h2 {
          font-family: 'Poppins', sans-serif;
          color: #9a3412;
          font-size: 26px;
        }

        .add-btn {
          padding: 12px 18px;
          border-radius: 14px;
          border: none;
          background: linear-gradient(135deg, #f97316, #ea580c);
          color: white;
          font-weight: 500;
          cursor: pointer;
          box-shadow: 0 6px 16px rgba(249,115,22,0.4);
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 35px;
        }

        .stat-card {
          background: white;
          padding: 22px;
          border-radius: 18px;
          box-shadow: 0 10px 25px rgba(249,115,22,0.2);
          border-top: 4px solid #f97316;
        }

        .stat-card h4 {
          margin: 0;
          color: #9a3412;
          font-weight: 500;
        }

        .stat-card p {
          font-size: 28px;
          font-weight: 600;
          margin-top: 10px;
          color: #ea580c;
        }

        .children-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }

        .child-card {
          background: white;
          padding: 20px;
          border-radius: 18px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
          border-left: 5px solid #f97316;
          transition: transform 0.2s;
        }

        .child-card:hover {
          transform: translateY(-3px);
        }

        .child-card h3 {
          margin-top: 0;
          font-family: 'Poppins', sans-serif;
          color: #9a3412;
        }

        .child-card p {
          margin: 6px 0;
          font-size: 14px;
        }

        .status {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 500;
          background: #ffedd5;
          color: #9a3412;
        }

        .toggle-btn {
          margin-top: 12px;
          background: #ffedd5;
          border: none;
          padding: 8px 12px;
          border-radius: 10px;
          cursor: pointer;
          color: #9a3412;
          font-weight: 500;
        }

        .performance-list {
          margin-top: 12px;
          padding-left: 16px;
        }

        .performance-list li {
          font-size: 13px;
          margin-bottom: 6px;
        }

        .perf-img {
          width: 45px;
          height: 45px;
          border-radius: 8px;
          object-fit: cover;
          margin-right: 8px;
        }
      `}</style>

      <div className="dashboard">
        <div className="header">
          <h2>Children Dashboard</h2>
          <button className="add-btn" onClick={() => navigate("/admin/children/add-child")}>
            + Add Child
          </button>
        </div>

        <div className="stats">
          <StatCard title="Total Children" value={total} />
          <StatCard title="Adopted" value={adopted} />
          <StatCard title="Available" value={available} />
        </div>

        <div className="children-grid">
          {children.map(child => (
            <ChildCard key={child.child_id} child={child} />
          ))}
        </div>
      </div>
    </>
  );
}

/* ================= CHILD CARD ================= */

function ChildCard({ child }) {
  const [showPerformance, setShowPerformance] = useState(false);

  return (
    <div className="child-card">
      <h3>{child.name}</h3>

      <p><strong>Gender:</strong> {child.gender}</p>
      <p><strong>DOB:</strong> {child.date_of_birth}</p>
      <p><strong>Education:</strong> {child.education_level}</p>
      <p><strong>Health:</strong> {child.health_status}</p>
      <p><strong>Status:</strong> <span className="status">{child.status}</span></p>

      {child.performances?.length > 0 && (
        <button
          className="toggle-btn"
          onClick={() => setShowPerformance(prev => !prev)}
        >
          {showPerformance ? "Hide Performances" : "Show Performances"}
        </button>
      )}

      {showPerformance && (
        <ul className="performance-list">
          {child.performances.map(p => (
            <li key={p.performance_id}>
              <strong>{p.year}</strong> — Marks: {p.marks}, Attendance: {p.attendance}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ================= STAT CARD ================= */

const StatCard = ({ title, value }) => (
  <div className="stat-card">
    <h4>{title}</h4>
    <p>{value}</p>
  </div>
);
