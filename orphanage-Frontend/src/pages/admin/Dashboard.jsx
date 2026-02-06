import { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import { getDonationPerformance } from "../../api/admin";
import Card from "../../components/Card";
import Graph from "../../components/Graph1";
import ProfileMenu from "../../components/ProfileMenu";
import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [activeTab, setActiveTab] = useState("weekly");
  const [graphValue, setGraphValue] = useState(0);
  const { user: admin } = useAuth();

  // Dashboard cards
  useEffect(() => {
    api.get("/admin/dashboard")
      .then(res => setDashboard(res.data))
      .catch(err => console.error("Dashboard error:", err));
  }, []);

  // Graph data
 useEffect(() => {
  getDonationPerformance(activeTab)
    .then(res => {
      console.log("Donation perf:", res.data); // 👈 debug
      setGraphValue(res.data.total);
    })
    .catch(err => console.error("Graph error:", err));
}, [activeTab]);


  if (!dashboard) return <p>Loading...</p>;

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
          max-width: 1200px;
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
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
          gap: 18px;
          margin-bottom: 35px;
        }

        .cards-grid > * {
          background: white;
          border-radius: 18px;
          box-shadow: 0 10px 24px rgba(249,115,22,0.2);
          border-top: 4px solid #f97316;
          transition: transform 0.2s ease;
        }

        .cards-grid > *:hover {
          transform: translateY(-4px);
        }

        .tab-buttons {
          display: flex;
          gap: 12px;
          margin-bottom: 20px;
        }

        .tab-buttons button {
          padding: 8px 20px;
          border-radius: 20px;
          border: none;
          cursor: pointer;
          background: #fed7aa;
          color: #7c2d12;
          font-weight: 500;
        }

        .tab-buttons button.active {
          background: #f97316;
          color: white;
        }

        .graph-wrapper {
          background: white;
          padding: 28px;
          border-radius: 22px;
          box-shadow: 0 14px 30px rgba(249,115,22,0.25);
          border-top: 5px solid #f97316;
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
          <h2>Admin Dashboard</h2>
          <ProfileMenu admin={admin} />
        </div>

        {/* Cards */}
        <div className="cards-grid">
          <Card title="Children" value={dashboard.children} />
          <Card title="Staff" value={dashboard.staff} />
          <Card title="Donors" value={dashboard.donors} />
        </div>

        {/* Tabs */}
        <div className="tab-buttons">
          {["weekly", "monthly", "yearly"].map(type => (
            <button
              key={type}
              className={activeTab === type ? "active" : ""}
              onClick={() => setActiveTab(type)}
            >
              {type.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Graph */}
       <div className="graph-wrapper">
  <Graph
    labels={[activeTab.toUpperCase()]}
    values={[graphValue]}
  />
</div>

      </div>
    </>
  );
}
