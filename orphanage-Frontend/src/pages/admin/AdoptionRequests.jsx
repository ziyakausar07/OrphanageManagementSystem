import { useEffect, useState } from "react";
import { getAdoptionRequests, updateAdoptionStatus } from "../../api/adoption";

export default function AdoptionRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    getAdoptionRequests()
      .then(res => setRequests(res.data))
      .catch(err => console.error(err));
  }, []);

  const action = (id, status) => {
    const remark = prompt("Admin Remark (optional):");

    updateAdoptionStatus(id, {
      status,
      admin_remark: remark
    }).then(() => {
      setRequests(prev =>
        prev.map(r =>
          r.adoption_id === id ? { ...r, status } : r
        )
      );
    });
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

        .adoption-page {
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

        .request-card {
          background: white;
          border-radius: 18px;
          padding: 22px 26px;
          margin-bottom: 18px;
          box-shadow: 0 10px 24px rgba(0,0,0,0.08);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          border-left: 5px solid #f97316;
        }

        .request-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 34px rgba(249,115,22,0.25);
        }

        .request-card h3 {
          margin-top: 0;
          margin-bottom: 12px;
          font-family: 'Poppins', sans-serif;
          color: #9a3412;
        }

        .request-info {
          margin: 4px 0;
          color: #7c2d12;
        }

        .status-badge {
          display: inline-block;
          margin-top: 8px;
          padding: 5px 12px;
          border-radius: 999px;
          font-size: 13px;
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
          margin-top: 15px;
          display: flex;
          gap: 12px;
        }

        .btn {
          padding: 7px 16px;
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
          .request-card {
            padding: 18px;
          }
        }
      `}</style>

      <div className="adoption-page">
        <h2 className="page-title">Adoption Requests</h2>

        {requests.length ? (
          requests.map(r => (
            <div key={r.adoption_id} className="request-card">
              <h3>Child: {r.child_name}</h3>

              <p className="request-info">
                <strong>Requester:</strong> {r.requester_name}
              </p>
              <p className="request-info">
                <strong>Email:</strong> {r.requester_email}
              </p>
              <p className="request-info">
                <strong>Phone:</strong> {r.requester_phone}
              </p>
              <p className="request-info">
                <strong>Address:</strong> {r.requester_address}
              </p>
              <p className="request-info">
                <strong>Requested On:</strong> {r.request_date}
              </p>

              <span className={`status-badge ${r.status || "pending"}`}>
                {r.status || "pending"}
              </span>

              <div className="actions">
                {r.status !== "approved" && (
                  <button
                    className="btn approve"
                    onClick={() => action(r.adoption_id, "approved")}
                  >
                    Approve
                  </button>
                )}
                {r.status !== "rejected" && (
                  <button
                    className="btn reject"
                    onClick={() => action(r.adoption_id, "rejected")}
                  >
                    Reject
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No adoption requests found.</p>
        )}
      </div>
    </>
  );
}
