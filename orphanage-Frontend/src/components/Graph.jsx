import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Graph = ({ values }) => {
  const data = {
    labels: ["Education", "Health", "Food", "Staff Salary"],
    datasets: [
      {
        label: "Donations",
        data: values,
        borderColor: "#f97316",
        backgroundColor: ctx => {
          const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "rgba(249,115,22,0.4)");
          gradient.addColorStop(1, "rgba(249,115,22,0.05)");
          return gradient;
        },
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 9,
        pointBackgroundColor: "#ea580c",
        pointBorderColor: "#fff",
        pointBorderWidth: 2
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1200,
      easing: "easeOutQuart"
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#9a3412",
          font: {
            size: 13,
            weight: "500"
          }
        }
      },
      tooltip: {
        backgroundColor: "#fff7ed",
        titleColor: "#9a3412",
        bodyColor: "#7c2d12",
        borderColor: "#f97316",
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: ctx => ` ₹ ${ctx.parsed.y}`
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: "#9a3412",
          font: { size: 12 }
        },
        grid: {
          display: false
        }
      },
      y: {
        ticks: {
          color: "#9a3412",
          font: { size: 12 }
        },
        grid: {
          color: "rgba(249,115,22,0.15)"
        }
      }
    }
  };

  return (
    <>
      <style>{`
        .graph-card {
          height: 360px;
          background: white;
          padding: 26px;
          border-radius: 22px;
          box-shadow: 0 14px 30px rgba(249,115,22,0.25);
          border-top: 5px solid #f97316;
        }

        .graph-title {
          font-family: 'Poppins', sans-serif;
          font-size: 18px;
          color: #9a3412;
          margin-bottom: 18px;
        }
      `}</style>

      <div className="graph-card">
        <div className="graph-title">Donation Overview</div>
        <Line data={data} options={options} />
      </div>
    </>
  );
};

export default Graph;
