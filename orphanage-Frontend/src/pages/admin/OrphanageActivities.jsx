// src/pages/admin/OrphanageActivities.jsx
import { useEffect, useState } from "react";
import { getOrphanagePerformance } from "../../api/admin";
import Graph from "../../components/Graph";

export default function OrphanageActivities() {
  const [data, setData] = useState({});

  useEffect(() => {
    getOrphanagePerformance()
      .then(res => setData(res.data))
      .catch(err =>
        console.error("Error fetching orphanage performance:", err)
      );
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@500;600&display=swap');

        body {
          font-family: 'Inter', sans-serif;
          background:
            radial-gradient(circle at top left, #ffedd5, transparent 45%),
            radial-gradient(circle at bottom right, #fed7aa, transparent 45%),
            #fffaf5;
        }

        .orphanage-page {
          max-width: 1100px;
          margin: auto;
          padding: 40px 30px;
        }

        .page-title {
          font-family: 'Poppins', sans-serif;
          font-size: 26px;
          color: #9a3412;
          margin-bottom: 25px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .stat-card {
          background: white;
          padding: 22px;
          border-radius: 18px;
          box-shadow: 0 10px 24px rgba(249,115,22,0.2);
          border-top: 4px solid #f97316;
        }

        .stat-card h4 {
          margin: 0;
          font-weight: 500;
          color: #7c2d12;
        }

        .stat-card p {
          margin-top: 10px;
          font-size: 24px;
          font-weight: 600;
          color: #9a3412;
        }

        .graph-section {
          margin-top: 20px;
        }
      `}</style>

      <div className="orphanage-page">
        <h2 className="page-title">Orphanage Performance</h2>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <h4>Total Donation</h4>
            <p>₹ {data?.total || 0}</p>
          </div>

          <div className="stat-card">
            <h4>Used Donation</h4>
            <p>₹ {data?.used || 0}</p>
          </div>

          <div className="stat-card">
            <h4>Remaining</h4>
            <p>₹ {data?.remaining || 0}</p>
          </div>
        </div>

        {/* Graph */}
        <div className="graph-section">
          <Graph
            values={[
              data?.education || 0,
              data?.health || 0,
              data?.food || 0,
              data?.salary || 0
            ]}
          />
        </div>
      </div>
    </>
  );
}
