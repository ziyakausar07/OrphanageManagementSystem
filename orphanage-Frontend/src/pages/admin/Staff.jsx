import { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import { useAuth } from "../../context/AuthContext";

export default function Staff() {
  const { user } = useAuth();
  const [staff, setStaff] = useState([]);
  const [editStaff, setEditStaff] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!user?.id) return;
    api.get(`/admin/staff?user_id=${user.id}`)
      .then(res => setStaff(res.data || []));
  }, [user]);

  const fetchNotifications = () => {
    api.get(`/admin/staff-leaves?user_id=${user.id}`)
      .then(res => setNotifications(res.data.filter(l => l.status === "pending")));
  };

  const toggleNotifications = () => {
    setShowNotifications(p => !p);
    if (!showNotifications) fetchNotifications();
  };

  const leaveAction = (leaveId, staffId, status) => {
    api.put(`/admin/staff-leave/${leaveId}`, { status })
      .then(() => {
        setNotifications(prev => prev.filter(l => l.id !== leaveId));
        setStaff(prev =>
          prev.map(s => s.id === staffId ? { ...s, leave_requests: [] } : s)
        );
      });
  };

  const updateSalary = id => {
    api.put(`/admin/staff/${id}/salary`)
      .then(() =>
        setStaff(prev =>
          prev.map(s => s.id === id ? { ...s, salary: s.salary + 1000 } : s)
        )
      );
  };

  const deleteStaff = id => {
    if (!window.confirm("Delete staff?")) return;
    api.delete(`/admin/staff/${id}`)
      .then(() => setStaff(prev => prev.filter(s => s.id !== id)));
  };

  const handleChange = e =>
    setEditStaff(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const saveEdit = () => {
    api.put(`/admin/staff/${editStaff.id}`, editStaff)
      .then(() => {
        setStaff(prev => prev.map(s => s.id === editStaff.id ? editStaff : s));
        setEditStaff(null);
      });
  };

  return (
    <>
      <style>{`
        body {
          font-family: Inter, sans-serif;
          background: #fffaf5;
        }

        .page {
          max-width: 1100px;
          margin: auto;
          padding: 30px 20px;
        }

        .topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
        }

        h2 {
          color: #9a3412;
          margin: 0;
        }

        .bell {
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          position: relative;
        }

        .badge {
          position: absolute;
          top: -6px;
          right: -8px;
          background: #f97316;
          color: white;
          font-size: 11px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .notify {
          position: absolute;
          right: 20px;
          top: 70px;
          background: white;
          border: 1px solid #eee;
          width: 260px;
          border-radius: 8px;
          padding: 12px;
        }

        .staff-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px,1fr));
          gap: 18px;
        }

        .card {
          background: white;
          border: 1px solid #eee;
          border-radius: 10px;
          padding: 16px;
        }

        .card h3 {
          margin: 0 0 8px;
          color: #7c2d12;
        }

        .actions {
          display: flex;
          gap: 8px;
          margin-top: 10px;
        }

        .btn {
          padding: 6px 10px;
          border-radius: 6px;
          border: 1px solid #ddd;
          background: white;
          cursor: pointer;
          font-size: 13px;
        }

        .primary {
          background: #f97316;
          color: white;
          border: none;
        }

        .danger {
          border-color: #ef4444;
          color: #ef4444;
        }

        .modal {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,.4);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modal-box {
          background: white;
          padding: 20px;
          width: 300px;
          border-radius: 10px;
        }

        input {
          width: 100%;
          padding: 7px;
          margin-bottom: 8px;
          border-radius: 6px;
          border: 1px solid #ccc;
        }
      `}</style>

      <div className="page">
        <div className="topbar">
          <h2>Staff Management</h2>
          <button className="bell" onClick={toggleNotifications}>
            🔔
            {notifications.length > 0 && <span className="badge">{notifications.length}</span>}
          </button>
        </div>

        {showNotifications && (
          <div className="notify">
            <h4>Leave Requests</h4>
            {notifications.map(l => (
              <div key={l.id}>
                <p>{l.staff}</p>
                <button className="btn primary" onClick={() => leaveAction(l.id, l.staff_id, "approved")}>Approve</button>
                <button className="btn danger" onClick={() => leaveAction(l.id, l.staff_id, "rejected")}>Reject</button>
              </div>
            ))}
          </div>
        )}

        <div className="staff-grid">
          {staff.map(s => (
            <div key={s.id} className="card">
              <h3>{s.name}</h3>
              <p>Designation: {s.designation}</p>
              <p>Salary: ₹{s.salary}</p>
              <p>Performance: {s.performance}</p>

              <div className="actions">
                <button className="btn primary" onClick={() => updateSalary(s.id)}>+ Salary</button>
                <button className="btn" onClick={() => setEditStaff({ ...s })}>Edit</button>
                <button className="btn danger" onClick={() => deleteStaff(s.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        {editStaff && (
          <div className="modal">
            <div className="modal-box">
              <h3>Edit Staff</h3>
              <input name="name" value={editStaff.name} onChange={handleChange} />
              <input name="designation" value={editStaff.designation} onChange={handleChange} />
              <input name="salary" type="number" value={editStaff.salary} onChange={handleChange} />
              <input name="performance" value={editStaff.performance} onChange={handleChange} />
              <button className="btn primary" onClick={saveEdit}>Save</button>
              <button className="btn" onClick={() => setEditStaff(null)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
