import React, { useEffect, useState } from "react";
import { getChildrenAdmin } from "../../api/children";
import { useNavigate } from "react-router-dom";

const getImageUrl = (path) => {
  if (!path) return "https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=300&q=80";
  if (path.startsWith("http")) return path;
  const baseUrl = import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL.replace(/\/api\/?$/, "")
    : "http://127.0.0.1:5000";
  return `${baseUrl}/${path.replace(/^\//, "")}`;
};

export default function ChildrenDashboard() {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const res = await getChildrenAdmin();
        setChildren(res.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load children records.");
      } finally {
        setLoading(false);
      }
    };
    fetchChildren();
  }, []);

  if (loading) return (
    <div style={{ padding: 40, textAlign: "center", color: "#ea580c", fontWeight: 600 }}>
      Loading children records...
    </div>
  );
  
  if (error) return (
    <div style={{ padding: 40, textAlign: "center", color: "#dc2626", fontWeight: 600 }}>
      {error}
    </div>
  );

  const total = children.length;
  const adopted = children.filter(c => c.status === "adopted").length;
  const available = total - adopted;

  const filteredChildren = children.filter(c => {
    const matchesSearch = c.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || c.status?.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="admin-page-wrapper">
      <div className="admin-container">
        {/* Header */}
        <div className="admin-header-card">
          <div className="header-left">
            <button className="btn-back" onClick={() => navigate("/admin/dashboard")}>
              ← Back to Dashboard
            </button>
            <h2 className="page-heading">Children Management</h2>
            <p className="page-sub">Monitor health, education, records and adoption status</p>
          </div>

          <button className="add-btn-primary" onClick={() => navigate("/admin/children/add-child")}>
            <span>+</span> Add New Child
          </button>
        </div>

        {/* Stats Strip */}
        <div className="stats-grid">
          <StatCard title="Total Children" value={total} icon="👶" color="#ea580c" />
          <StatCard title="Adopted" value={adopted} icon="🏡" color="#10b981" />
          <StatCard title="Available" value={available} icon="🌟" color="#0284c7" />
        </div>

        {/* Filter & Search Bar */}
        <div className="filter-bar">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by child's name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-chips">
            {["all", "available", "adopted"].map((st) => (
              <button
                key={st}
                className={`filter-chip ${statusFilter === st ? "active" : ""}`}
                onClick={() => setStatusFilter(st)}
              >
                {st.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Children Grid */}
        {filteredChildren.length === 0 ? (
          <div className="empty-state-box">
            <p>No children match your search criteria.</p>
          </div>
        ) : (
          <div className="children-cards-grid">
            {filteredChildren.map(child => (
              <ChildCard key={child.child_id} child={child} />
            ))}
          </div>
        )}
      </div>

      <style>{`
        .admin-page-wrapper {
          min-height: 100vh;
          background: #fafaf9;
          background-image: radial-gradient(circle at 10% 10%, #fff7ed 0%, #fafaf9 60%, #fff1f2 100%);
          padding: 30px 24px;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .admin-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .admin-header-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          padding: 24px 30px;
          border-radius: 20px;
          border: 1px solid rgba(254, 215, 170, 0.7);
          box-shadow: 0 4px 20px rgba(249, 115, 22, 0.06);
          margin-bottom: 26px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .btn-back {
          background: transparent;
          border: none;
          color: #ea580c;
          font-weight: 700;
          font-size: 13.5px;
          cursor: pointer;
          padding: 0;
          margin-bottom: 6px;
          display: inline-block;
        }

        .btn-back:hover {
          text-decoration: underline;
        }

        .page-heading {
          font-size: 26px;
          font-weight: 800;
          color: #7c2d12;
          margin: 0;
          line-height: 1.2;
        }

        .page-sub {
          font-size: 13.5px;
          color: #64748b;
          margin: 2px 0 0 0;
        }

        .add-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 26px;
          border-radius: 14px;
          border: none;
          background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
          color: white;
          font-family: 'Outfit', sans-serif;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 8px 20px rgba(249, 115, 22, 0.35);
          transition: all 0.2s ease;
        }

        .add-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(249, 115, 22, 0.45);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          margin-bottom: 26px;
        }

        .stat-card-clean {
          background: #ffffff;
          padding: 20px 24px;
          border-radius: 18px;
          border: 1px solid rgba(254, 215, 170, 0.7);
          box-shadow: 0 8px 20px rgba(249, 115, 22, 0.08);
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: transform 0.2s;
        }

        .stat-card-clean:hover {
          transform: translateY(-3px);
        }

        .stat-info-title {
          font-size: 12.5px;
          font-weight: 700;
          text-transform: uppercase;
          color: #9a3412;
        }

        .stat-info-val {
          font-family: 'Outfit', sans-serif;
          font-size: 32px;
          font-weight: 800;
          margin: 4px 0 0 0;
        }

        .stat-icon-wrap {
          font-size: 28px;
        }

        .filter-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }

        .search-box {
          position: relative;
          flex: 1;
          min-width: 260px;
        }

        .search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 15px;
        }

        .search-box input {
          width: 100%;
          padding: 12px 16px 12px 40px;
          border-radius: 14px;
          border: 1.5px solid #fed7aa;
          background: #ffffff;
          margin: 0;
          font-size: 14px;
        }

        .filter-chips {
          display: flex;
          gap: 8px;
        }

        .filter-chip {
          padding: 8px 18px;
          border-radius: 20px;
          border: 1.5px solid #fed7aa;
          background: #ffffff;
          color: #9a3412;
          font-weight: 700;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .filter-chip.active {
          background: #ea580c;
          border-color: #ea580c;
          color: #ffffff;
        }

        .children-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 22px;
        }

        .child-card-admin {
          background: #ffffff;
          padding: 22px;
          border-radius: 20px;
          border: 1px solid rgba(254, 215, 170, 0.7);
          box-shadow: 0 8px 22px rgba(249, 115, 22, 0.08);
          transition: all 0.25s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .child-card-admin:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 32px rgba(249, 115, 22, 0.16);
          border-color: #fdba74;
        }

        .child-top {
          display: flex;
          gap: 16px;
          margin-bottom: 14px;
        }

        .child-photo {
          width: 68px;
          height: 68px;
          border-radius: 18px;
          object-fit: cover;
          border: 2px solid #fed7aa;
          flex-shrink: 0;
        }

        .child-meta {
          flex: 1;
        }

        .child-heading-name {
          font-family: 'Outfit', sans-serif;
          font-size: 18px;
          font-weight: 800;
          color: #1e293b;
          margin: 0 0 4px 0;
        }

        .status-pill {
          display: inline-block;
          padding: 3px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
          text-transform: capitalize;
        }

        .status-available {
          background: #e0f2fe;
          color: #0369a1;
        }

        .status-adopted {
          background: #dcfce7;
          color: #15803d;
        }

        .child-info-list {
          display: flex;
          flex-direction: column;
          gap: 5px;
          margin-bottom: 14px;
          font-size: 13.5px;
          color: #475569;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
        }

        .info-label {
          color: #94a3b8;
          font-weight: 600;
        }

        .info-val {
          font-weight: 600;
          color: #1e293b;
        }

        .toggle-perf-btn {
          width: 100%;
          padding: 8px;
          background: #fff7ed;
          border: 1px dashed #fdba74;
          border-radius: 10px;
          color: #ea580c;
          font-size: 12.5px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.15s;
        }

        .toggle-perf-btn:hover {
          background: #ffedd5;
        }

        .perf-tray {
          margin-top: 10px;
          background: #fffaf5;
          border-radius: 12px;
          padding: 10px 14px;
          font-size: 12px;
        }

        .perf-tray-item {
          display: flex;
          justify-content: space-between;
          padding: 4px 0;
          border-bottom: 1px solid #fed7aa;
        }

        .perf-tray-item:last-child {
          border-bottom: none;
        }

        .empty-state-box {
          text-align: center;
          padding: 50px 20px;
          background: #ffffff;
          border-radius: 20px;
          border: 1px dashed #fed7aa;
          color: #94a3b8;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}

function ChildCard({ child }) {
  const [showPerformance, setShowPerformance] = useState(false);

  return (
    <div className="child-card-admin">
      <div>
        <div className="child-top">
          <img
            src={getImageUrl(child.image)}
            alt={child.name}
            className="child-photo"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=300&q=80";
            }}
          />
          <div className="child-meta">
            <h3 className="child-heading-name">{child.name}</h3>
            <span className={`status-pill status-${child.status?.toLowerCase() || "available"}`}>
              {child.status || "Available"}
            </span>
          </div>
        </div>

        <div className="child-info-list">
          <div className="info-row">
            <span className="info-label">Gender</span>
            <span className="info-val">{child.gender || "-"}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Date of Birth</span>
            <span className="info-val">{child.date_of_birth || "-"}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Education</span>
            <span className="info-val">{child.education_level || "Standard"}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Health Status</span>
            <span className="info-val">{child.health_status || "Good"}</span>
          </div>
        </div>
      </div>

      <div>
        {child.performances?.length > 0 && (
          <button
            className="toggle-perf-btn"
            onClick={() => setShowPerformance(prev => !prev)}
          >
            {showPerformance ? "▲ Hide Academic Details" : "▼ View Performance Records"}
          </button>
        )}

        {showPerformance && (
          <div className="perf-tray">
            {child.performances.map(p => (
              <div key={p.performance_id} className="perf-tray-item">
                <strong>Year {p.year}</strong>
                <span>Score: {p.marks}%</span>
                <span>Att: {p.attendance}%</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const StatCard = ({ title, value, icon, color }) => (
  <div className="stat-card-clean">
    <div>
      <span className="stat-info-title">{title}</span>
      <p className="stat-info-val" style={{ color }}>{value}</p>
    </div>
    <span className="stat-icon-wrap">{icon}</span>
  </div>
);
