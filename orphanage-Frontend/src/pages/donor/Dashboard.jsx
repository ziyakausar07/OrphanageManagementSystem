import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import SliderMenu from "../../components/SliderMenuDonor";
import { getOrphanageActivities } from "../../api/orphanageActivities";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await getOrphanageActivities();
        const formatted = res.data.map((item) => ({
          name: item.activity_type.toUpperCase(),
          value: item.total,
        }));
        setData(formatted);
      } catch (err) {
        console.error("Error fetching activities:", err);
      }
    };

    fetchActivities();
  }, []);

  return (
    <>
      {/* ===== SAME STYLE AS ADMIN DASHBOARD ===== */}
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
          min-height: 100vh;
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

        .avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #f97316;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }

        .chart-card {
          background: white;
          padding: 30px;
          border-radius: 22px;
          box-shadow: 0 14px 30px rgba(249,115,22,0.25);
        }

        .chart-card h3 {
          margin-top: 0;
          margin-bottom: 20px;
          color: #9a3412;
          border-bottom: 2px solid #fed7aa;
          padding-bottom: 8px;
          font-family: 'Poppins', sans-serif;
        }

        .empty {
          text-align: center;
          color: #6b7280;
          padding: 40px;
        }

        @media (max-width: 600px) {
          .dashboard {
            padding: 25px 16px;
          }
        }
      `}</style>

      <div className="dashboard">
        {/* HEADER */}
        <div className="dashboard-header">
          <h2>Welcome, {user?.name}</h2>

          <div style={{ position: "relative" }}>
            <div className="avatar" onClick={() => setIsOpen(!isOpen)}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            {isOpen && <SliderMenu onClose={() => setIsOpen(false)} />}
          </div>
        </div>

        {/* CHART */}
        <div className="chart-card">
          <h3>📊 Orphanage Activities Performance</h3>

          {data.length === 0 ? (
            <p className="empty">No activity data available</p>
          ) : (
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#f97316" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
