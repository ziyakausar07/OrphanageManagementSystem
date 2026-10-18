import React from "react";

const getCardIcon = (title = "") => {
  const t = title.toLowerCase();
  if (t.includes("child") || t.includes("kids")) return "👶";
  if (t.includes("donor") || t.includes("donation") || t.includes("money")) return "💝";
  if (t.includes("staff") || t.includes("employee")) return "👥";
  if (t.includes("adopt") || t.includes("request")) return "🏡";
  if (t.includes("activit") || t.includes("event")) return "🎨";
  if (t.includes("task") || t.includes("work")) return "📋";
  if (t.includes("leave")) return "📝";
  return "✨";
};

const Card = ({ title, value, monthly, yearly, icon }) => {
  const displayIcon = icon || getCardIcon(title);

  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <span className="stat-card-title">{title}</span>
        <div className="stat-icon-bubble">{displayIcon}</div>
      </div>

      <div className="stat-card-body">
        {monthly !== undefined && yearly !== undefined ? (
          <div className="stat-split">
            <div className="stat-split-item">
              <span className="stat-split-label">Monthly</span>
              <span className="stat-split-val">{monthly}</span>
            </div>
            <div className="stat-split-divider" />
            <div className="stat-split-item">
              <span className="stat-split-label">Yearly</span>
              <span className="stat-split-val">{yearly}</span>
            </div>
          </div>
        ) : (
          <div className="stat-main-value">
            {value !== undefined ? value : "-"}
          </div>
        )}
      </div>

      <style>{`
        .stat-card {
          background: #ffffff;
          border-radius: 18px;
          padding: 22px 24px;
          border: 1px solid rgba(254, 215, 170, 0.7);
          box-shadow: 0 10px 24px -6px rgba(249, 115, 22, 0.12), 0 4px 6px -4px rgba(0, 0, 0, 0.04);
          position: relative;
          overflow: hidden;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #f97316 0%, #fb923c 50%, #f59e0b 100%);
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 32px -8px rgba(249, 115, 22, 0.22);
          border-color: rgba(249, 115, 22, 0.5);
        }

        .stat-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 14px;
        }

        .stat-card-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #9a3412;
        }

        .stat-icon-bubble {
          width: 38px;
          height: 38px;
          border-radius: 12px;
          background: #fff7ed;
          border: 1px solid #fed7aa;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }

        .stat-main-value {
          font-family: 'Outfit', sans-serif;
          font-size: 32px;
          font-weight: 800;
          color: #1e293b;
          line-height: 1.1;
        }

        .stat-split {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-top: 4px;
        }

        .stat-split-item {
          display: flex;
          flex-direction: column;
        }

        .stat-split-label {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          color: #94a3b8;
        }

        .stat-split-val {
          font-family: 'Outfit', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: #ea580c;
        }

        .stat-split-divider {
          width: 1px;
          height: 30px;
          background: #fed7aa;
        }
      `}</style>
    </div>
  );
};

export default Card;
