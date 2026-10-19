import { useEffect, useState } from "react";
import { getDonors, updateDonorStatus } from "../../api/admin";

export default function Donors() {
  const [donors, setDonors] = useState([]);
  const [summary, setSummary] = useState({});

  useEffect(() => {
    getDonors()
      .then(res => {
        setDonors(res.data.list || []);
        setSummary(res.data.summary || {});
      })
      .catch(err => console.error(err));
  }, []);

  const handleUpdateStatus = (id, status) => {
    updateDonorStatus(id, status)
      .then(() => {
        setDonors(prev =>
          prev.map(d => (d._id === id ? { ...d, status } : d))
        );
      })
      .catch(err => console.error(err));
  };

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

        .donors-page {
          max-width: 1100px;
          margin: auto;
          padding: 40px 30px;
        }

        .page-title {
          font-family: 'Poppins', sans-serif;
          font-size: 26px;
          color: #9a3412;
          margin-bottom: 20px;
        }

        .summary {
          display: flex;
          gap: 20px;
          margin-bottom: 30px;
        }

        .summary-card {
          flex: 1;
          background: white;
          padding: 20px;
          border-radius: 18px;
          box-shadow: 0 10px 24px rgba(249,115,22,0.2);
          border-top: 4px solid #f97316;
        }

        .summary-card h4 {
          margin: 0;
          color: #7c2d12;
          font-weight: 500;
        }

        .summary-card p {
          font-size: 26px;
          font-weight: 600;
          margin: 10px 0 0;
          color: #9a3412;
        }

        .donor-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .donor-card {
          background: white;
          border-radius: 18px;
          padding: 18px 22px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .donor-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 30px rgba(249,115,22,0.25);
        }

        .donor-name {
          font-size: 18px;
          font-weight: 600;
          color: #9a3412;
          margin: 0;
        }

        .donor-info {
          margin: 6px 0;
          color: #7c2d12;
        }

        .status-badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
          text-transform: capitalize;
        }

        .approved {
          background: #dcfce7;
          color: #166534;
        }

        .rejected {
          background: #fee2e2;
          color: #991b1b;
        }

        .pending {
          background: #ffedd5;
          color: #9a3412;
        }

        .actions {
          display: flex;
          gap: 10px;
        }

        .btn {
          padding: 6px 14px;
          border-radius: 10px;
          border: none;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .approve {
          background: #22c55e;
          color: white;
        }

        .approve:hover {
          background: #16a34a;
        }

        .reject {
          background: #ef4444;
          color: white;
        }

        .reject:hover {
          background: #dc2626;
        }

        @media (max-width: 600px) {
          .summary {
            flex-direction: column;
          }

          .donor-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
        }
      `}</style>

      <div className="donors-page">
        <h2 className="page-title">Donations</h2>

        {/* Summary */}
        <div className="summary">
          <div className="summary-card">
            <h4>Total Donors</h4>
            <p>{summary?.totalDonors || 0}</p>
          </div>
          <div className="summary-card">
            <h4>Total Donation</h4>
            <p>₹ {summary?.totalAmount || 0}</p>
          </div>
        </div>

        {/* Donor Cards */}
        <div className="donor-list">
          {donors.length ? (
            donors.map(d => (
              <div key={d._id} className="donor-card">
                <div>
                  <h3 className="donor-name">{d.name}</h3>
                  <p className="donor-info">
                    <strong>Amount:</strong> ₹{d.amount}
                  </p>
                  <span className={`status-badge ${d.status || "pending"}`}>
                    {d.status || "pending"}
                  </span>
                </div>

                <div className="actions">
                  {d.status !== "approved" && (
                    <button
                      className="btn approve"
                      onClick={() => handleUpdateStatus(d._id, "approved")}
                    >
                      Approve
                    </button>
                  )}
                  {d.status !== "rejected" && (
                    <button
                      className="btn reject"
                      onClick={() => handleUpdateStatus(d._id, "rejected")}
                    >
                      Reject
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", color: "#64748b", padding: "30px 0" }}>No donor records found.</p>
          )}
        </div>
      </div>
    </>
  );
}
