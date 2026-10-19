import { useEffect, useState } from "react";
import LoadingScreen from "../../components/LoadingScreen";
import api from "../../api/axiosInstance";
import { getDonationPerformance } from "../../api/admin";
import Card from "../../components/Card";
import Graph from "../../components/Graph1";
import ProfileMenu from "../../components/ProfileMenu";
import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("weekly");
  const [graphData, setGraphData] = useState(null);
  const { user: admin } = useAuth();

  const fetchDashboard = () => {
    setLoading(true);
    setError(null);
    api.get("/admin/dashboard")
      .then(res => {
        setDashboard(res.data);
        setError(null);
      })
      .catch(err => {
        console.error("Dashboard error:", err);
        setError("Unable to connect to backend server. Render free tier may take 30-50s to wake up.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  // Graph data
  useEffect(() => {
    setGraphData(null);
    getDonationPerformance(activeTab)
      .then(res => {
        setGraphData(res.data);
      })
      .catch(err => console.error("Graph error:", err));
  }, [activeTab]);

  if (loading && !dashboard) return <LoadingScreen message="Loading admin dashboard..." />;

  if (error && !dashboard) {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "70vh",
        padding: "24px",
        fontFamily: "'Outfit', sans-serif",
        textAlign: "center"
      }}>
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>⚠️</div>
        <h2 style={{ color: "#9a3412", marginBottom: "8px" }}>Dashboard Connection Issue</h2>
        <p style={{ color: "#64748b", maxWidth: "480px", marginBottom: "20px", fontSize: "14px" }}>
          {error}
        </p>
        <button
          onClick={fetchDashboard}
          style={{
            padding: "10px 24px",
            background: "linear-gradient(135deg, #f97316, #ea580c)",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            fontWeight: "700",
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(249, 115, 22, 0.4)"
          }}
        >
          🔄 Retry Connection
        </button>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700;800&family=Outfit:wght@600;700;800&display=swap');

        body {
          margin: 0;
          font-family: 'Inter', sans-serif;
          background:
            radial-gradient(circle at top left, #ffedd5, transparent 45%),
            radial-gradient(circle at bottom right, #fed7aa, transparent 45%),
            #fffaf5;
        }

        .dashboard {
          max-width: 1260px;
          margin: auto;
          padding: 40px 30px;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .dashboard-header h2 {
          font-family: 'Poppins', sans-serif;
          font-size: 26px;
          color: #9a3412;
          margin: 0;
        }

        .dashboard-welcome {
          font-size: 14px;
          color: #b45309;
          margin-top: 4px;
          font-weight: 500;
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 18px;
          margin-bottom: 35px;
        }

        /* ── Tab Buttons ── */
        .tab-section {
          margin-top: 10px;
        }

        .tab-buttons {
          display: flex;
          gap: 8px;
          margin-bottom: 22px;
          background: rgba(255, 255, 255, 0.7);
          padding: 6px;
          border-radius: 14px;
          border: 1px solid rgba(254, 215, 170, 0.5);
          width: fit-content;
          backdrop-filter: blur(8px);
        }

        .tab-buttons button {
          padding: 10px 24px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          background: transparent;
          color: #9a3412;
          font-weight: 600;
          font-size: 13px;
          font-family: 'Inter', sans-serif;
          letter-spacing: 0.02em;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .tab-buttons button:hover:not(.active) {
          background: #fff7ed;
        }

        .tab-buttons button.active {
          background: linear-gradient(135deg, #f97316, #ea580c);
          color: white;
          box-shadow: 0 4px 14px rgba(249, 115, 22, 0.35);
          transform: scale(1.02);
        }

        .graph-loading {
          text-align: center;
          padding: 60px;
          color: #b45309;
          font-size: 15px;
          font-weight: 500;
        }

        .graph-loading-spinner {
          width: 36px;
          height: 36px;
          border: 3px solid #fed7aa;
          border-top: 3px solid #f97316;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin: 0 auto 14px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 600px) {
          .dashboard {
            padding: 25px 16px;
          }
        }
      `}</style>

      <div className="dashboard">
        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h2>Admin Dashboard</h2>
            <div className="dashboard-welcome">
              Welcome back{admin?.name ? `, ${admin.name}` : ""} 👋
            </div>
          </div>
          <ProfileMenu admin={admin} />
        </div>

        {/* Cards */}
        <div className="cards-grid">
          <Card title="Children" value={dashboard.children} />
          <Card title="Staff" value={dashboard.staff} />
          <Card title="Donors" value={dashboard.donors} />
          <Card
            title="Donations"
            monthly={`₹${Number(dashboard.monthly_donation || 0).toLocaleString("en-IN")}`}
            yearly={`₹${Number(dashboard.yearly_donation || 0).toLocaleString("en-IN")}`}
            icon="💰"
          />
        </div>

        {/* Graph Section */}
        <div className="tab-section">
          <div className="tab-buttons">
            {["weekly", "monthly", "yearly"].map(type => (
              <button
                key={type}
                className={activeTab === type ? "active" : ""}
                onClick={() => setActiveTab(type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          {!graphData ? (
            <div className="graph-loading">
              <div className="graph-loading-spinner" />
              Loading chart data...
            </div>
          ) : (
            <Graph
              labels={graphData.labels || []}
              donations={graphData.donations || graphData.values || []}
              usage={graphData.usage || []}
              totalDonations={graphData.total_donations || graphData.total || 0}
              totalUsed={graphData.total_used || 0}
              categories={graphData.categories || {}}
              activeTab={activeTab}
            />
          )}
        </div>
      </div>
    </>
  );
}
