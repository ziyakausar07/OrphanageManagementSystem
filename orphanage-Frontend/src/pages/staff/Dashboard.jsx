import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import SliderMenu from "../../components/SliderMenu"; // Staff menu
import Card from "../../components/Card";
import { getDashboardData } from "../../api/staff";
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
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [timeFilter, setTimeFilter] = useState("monthly");
  const [leaves, setLeaves] = useState({
    monthlyTaken: 0,
    yearlyTaken: 0,
    monthlyRemaining: 0,
    yearlyRemaining: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.id) return;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getDashboardData(user.id);
        const data = res.data;
        setLeaves({
          monthlyTaken: data.monthlyTaken,
          yearlyTaken: data.yearlyTaken,
          monthlyRemaining: data.monthlyRemaining,
          yearlyRemaining: data.yearlyRemaining,
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const userName = user?.name || "Staff";

  const chartData = [
    {
      name: "Leaves Taken",
      value: timeFilter === "monthly" ? leaves.monthlyTaken : leaves.yearlyTaken,
    },
    {
      name: "Leaves Remaining",
      value: timeFilter === "monthly" ? leaves.monthlyRemaining : leaves.yearlyRemaining,
    },
    { name: "Daily Tasks Completed", value: 15 },
    { name: "Pending Tasks", value: 3 },
  ];

  if (loading) return <p style={{ textAlign: "center" }}>Loading dashboard...</p>;
  if (error) return <p style={{ textAlign: "center" }}>{error}</p>;

  return (
    <div className="dashboard-page">
      {/* Navbar */}
      <div className="dashboard-navbar">
        <h2>Staff Dashboard</h2>
        <div className="profile-section">
          <div className="profile-circle" onClick={() => setIsOpen(!isOpen)}>
            {userName.charAt(0).toUpperCase()}
          </div>
          {isOpen && <SliderMenu onClose={() => setIsOpen(false)} user={user} logout={logout} />}
        </div>
      </div>

      {/* Time Filter */}
      <div className="filter-container">
        <label htmlFor="timeFilter">View:</label>
        <select
          id="timeFilter"
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
        >
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      {/* Cards */}
      <div className="cards-container">
        <Card
          title="Leaves Taken"
          value={timeFilter === "monthly" ? leaves.monthlyTaken : leaves.yearlyTaken}
        />
        <Card
          title="Leaves Remaining"
          value={timeFilter === "monthly" ? leaves.monthlyRemaining : leaves.yearlyRemaining}
        />
      </div>

      {/* Bar Chart */}
      <div className="chart-container">
        <h3>Staff Performance Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#f97316" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* CSS */}
      <style>{`
      body {
          margin: 0;
          font-family: 'Inter', sans-serif;
          background:
            radial-gradient(circle at top left, #ffedd5, transparent 45%),
            radial-gradient(circle at bottom right, #fed7aa, transparent 45%),
            #fffaf5;
        }
        .dashboard-page {
          min-height: 100vh;
          padding: 20px;
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(135deg, #ffedd5, #fed7aa);
        }

        .dashboard-navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .profile-section { position: relative; }
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

        .filter-container {
          margin-bottom: 20px;
        }
        .filter-container select {
          padding: 6px 10px;
          border-radius: 6px;
          border: 1px solid #ccc;
          margin-left: 10px;
          cursor: pointer;
        }

        .cards-container {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          margin-bottom: 30px;
        }

        .chart-container {
          background: #fff;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .chart-container h3 {
          margin-bottom: 15px;
          color: #c2410c;
        }

        @media (max-width: 480px) {
          .cards-container { flex-direction: column; }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
