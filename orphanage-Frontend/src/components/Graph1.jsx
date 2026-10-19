import React from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
);

const Graph1 = ({
  labels = [],
  donations = [],
  usage = [],
  totalDonations = 0,
  totalUsed = 0,
  categories = {},
  activeTab = "weekly"
}) => {
  // ── Line Chart Data ──
  const lineData = {
    labels,
    datasets: [
      {
        label: "Donations Received (₹)",
        data: donations,
        borderColor: "#f97316",
        backgroundColor: ctx => {
          const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 280);
          gradient.addColorStop(0, "rgba(249,115,22,0.35)");
          gradient.addColorStop(1, "rgba(249,115,22,0.02)");
          return gradient;
        },
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 10,
        pointBackgroundColor: "#ea580c",
        pointBorderColor: "#fff",
        pointBorderWidth: 2.5,
        borderWidth: 3
      },
      {
        label: "Amount Used (₹)",
        data: usage,
        borderColor: "#10b981",
        backgroundColor: ctx => {
          const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 280);
          gradient.addColorStop(0, "rgba(16,185,129,0.25)");
          gradient.addColorStop(1, "rgba(16,185,129,0.02)");
          return gradient;
        },
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 9,
        pointBackgroundColor: "#059669",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        borderWidth: 2.5,
        borderDash: [5, 5]
      }
    ]
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 1200, easing: "easeOutQuart" },
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#7c2d12",
          font: { size: 12, weight: "600", family: "'Inter', sans-serif" },
          usePointStyle: true,
          pointStyle: "circle",
          padding: 18
        }
      },
      tooltip: {
        backgroundColor: "#fffbf5",
        titleColor: "#9a3412",
        bodyColor: "#7c2d12",
        borderColor: "#fed7aa",
        borderWidth: 1,
        padding: 14,
        cornerRadius: 12,
        callbacks: {
          label: ctx => ` ${ctx.dataset.label}: ₹${ctx.parsed.y.toLocaleString("en-IN")}`
        }
      }
    },
    scales: {
      x: {
        ticks: { color: "#9a3412", font: { size: 11, weight: "500" } },
        grid: { display: false }
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#9a3412",
          font: { size: 11 },
          callback: val => `₹${val >= 1000 ? (val / 1000).toFixed(0) + "k" : val}`
        },
        grid: { color: "rgba(249,115,22,0.08)", drawBorder: false }
      }
    }
  };

  // ── Category Doughnut ──
  const catLabels = Object.keys(categories).map(k => k.charAt(0).toUpperCase() + k.slice(1));
  const catValues = Object.values(categories);
  const catColors = ["#f97316", "#10b981", "#3b82f6", "#a855f7", "#f43f5e"];

  const doughnutData = {
    labels: catLabels.length > 0 ? catLabels : ["No Data"],
    datasets: [{
      data: catValues.length > 0 ? catValues : [1],
      backgroundColor: catValues.length > 0 ? catColors.slice(0, catLabels.length) : ["#e2e8f0"],
      borderWidth: 3,
      borderColor: "#fff",
      hoverOffset: 8
    }]
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "68%",
    animation: { animateRotate: true, duration: 1500 },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#7c2d12",
          font: { size: 11, weight: "600" },
          usePointStyle: true,
          padding: 12
        }
      },
      tooltip: {
        backgroundColor: "#fffbf5",
        titleColor: "#9a3412",
        bodyColor: "#7c2d12",
        borderColor: "#fed7aa",
        borderWidth: 1,
        padding: 10,
        cornerRadius: 10,
        callbacks: {
          label: ctx => ` ₹${ctx.parsed.toLocaleString("en-IN")}`
        }
      }
    }
  };

  const remaining = totalDonations - totalUsed;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700&family=Outfit:wght@600;700;800&display=swap');

        .perf-section-title {
          font-family: 'Poppins', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: #9a3412;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .perf-section-title::before {
          content: '';
          width: 4px;
          height: 24px;
          border-radius: 4px;
          background: linear-gradient(180deg, #f97316, #ea580c);
        }

        /* ── Summary Stats ── */
        .perf-summary-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }

        .perf-stat-card {
          background: #fff;
          border-radius: 16px;
          padding: 18px 20px;
          border: 1px solid rgba(254, 215, 170, 0.6);
          box-shadow: 0 6px 18px -4px rgba(249, 115, 22, 0.1);
          position: relative;
          overflow: hidden;
          transition: transform 0.2s ease;
        }

        .perf-stat-card:hover {
          transform: translateY(-3px);
        }

        .perf-stat-card::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
        }

        .perf-stat-card.donations::after { background: #f97316; }
        .perf-stat-card.used::after { background: #10b981; }
        .perf-stat-card.remaining::after { background: #3b82f6; }

        .perf-stat-label {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: #94a3b8;
          margin-bottom: 6px;
        }

        .perf-stat-value {
          font-family: 'Outfit', sans-serif;
          font-size: 26px;
          font-weight: 800;
          color: #1e293b;
        }

        .perf-stat-value.orange { color: #ea580c; }
        .perf-stat-value.green { color: #059669; }
        .perf-stat-value.blue { color: #2563eb; }

        /* ── Charts Grid ── */
        .perf-charts-grid {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 20px;
        }

        .perf-line-card {
          background: #fff;
          border-radius: 20px;
          padding: 24px;
          border: 1px solid rgba(254, 215, 170, 0.5);
          box-shadow: 0 10px 28px -6px rgba(249, 115, 22, 0.12);
          position: relative;
          overflow: hidden;
        }

        .perf-line-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, #f97316, #fb923c, #f59e0b);
        }

        .perf-line-chart-wrap {
          height: 300px;
        }

        .perf-doughnut-card {
          background: #fff;
          border-radius: 20px;
          padding: 24px;
          border: 1px solid rgba(254, 215, 170, 0.5);
          box-shadow: 0 10px 28px -6px rgba(249, 115, 22, 0.12);
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }

        .perf-doughnut-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, #10b981, #3b82f6, #a855f7);
        }

        .perf-doughnut-title {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #7c2d12;
          margin-bottom: 16px;
          text-align: center;
        }

        .perf-doughnut-wrap {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 220px;
        }

        /* ── Empty State ── */
        .perf-empty {
          text-align: center;
          padding: 40px;
          color: #94a3b8;
          font-family: 'Inter', sans-serif;
        }

        .perf-empty-icon {
          font-size: 48px;
          margin-bottom: 12px;
        }

        @media (max-width: 768px) {
          .perf-charts-grid {
            grid-template-columns: 1fr;
          }
          .perf-summary-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div>
        <div className="perf-section-title">
          Donation Performance — {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </div>

        {/* Summary Stats */}
        <div className="perf-summary-row">
          <div className="perf-stat-card donations">
            <div className="perf-stat-label">💰 Total Received</div>
            <div className="perf-stat-value orange">₹{totalDonations.toLocaleString("en-IN")}</div>
          </div>
          <div className="perf-stat-card used">
            <div className="perf-stat-label">📊 Total Used</div>
            <div className="perf-stat-value green">₹{totalUsed.toLocaleString("en-IN")}</div>
          </div>
          <div className="perf-stat-card remaining">
            <div className="perf-stat-label">🏦 Remaining</div>
            <div className="perf-stat-value blue">₹{remaining.toLocaleString("en-IN")}</div>
          </div>
        </div>

        {/* Charts */}
        {donations.length === 0 && usage.length === 0 ? (
          <div className="perf-empty">
            <div className="perf-empty-icon">📈</div>
            <div>No donation data for this period yet.</div>
          </div>
        ) : (
          <div className="perf-charts-grid">
            <div className="perf-line-card">
              <div className="perf-line-chart-wrap">
                <Line data={lineData} options={lineOptions} />
              </div>
            </div>

            <div className="perf-doughnut-card">
              <div className="perf-doughnut-title">Usage Breakdown</div>
              <div className="perf-doughnut-wrap">
                <Doughnut data={doughnutData} options={doughnutOptions} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Graph1;
