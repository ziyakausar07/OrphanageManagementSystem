import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { requestLeave } from "../../api/staff";

const LeaveRequest = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    subject: "",
    leave_date: "",
    reason: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.leave_date || !formData.reason) {
      return alert("Please fill all required fields");
    }

    const payload = {
      user_id: user.id,
      leave_date: formData.leave_date,
      reason: formData.reason,
      subject: formData.subject || "General Leave",
    };

    try {
      const res = await requestLeave(payload);
      alert(`Leave requested successfully (ID: ${res.data.leave_id})`);
      setFormData({ subject: "", leave_date: "", reason: "" });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Error submitting leave request");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.heading}>📝 Leave Request</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div>
            <label>Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Optional"
              style={styles.input}
            />
          </div>

          <div>
            <label>Leave Date</label>
            <input
              type="date"
              name="leave_date"
              value={formData.leave_date}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div>
            <label>Reason</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Explain your leave"
              required
              style={styles.textarea}
            />
          </div>

          <button type="submit" style={styles.button}>
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default LeaveRequest;

/* ===================== STYLES ===================== */

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #fff7ed, #ffedd5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  container: {
    width: "100%",
    maxWidth: 500,
    background: "#ffffff",
    padding: 30,
    borderRadius: 16,
    boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
  },

  heading: {
    textAlign: "center",
    marginBottom: 25,
    color: "#9a3412",
    borderBottom: "2px solid #fed7aa",
    paddingBottom: 10,
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },

  input: {
    width: "100%",
    padding: 12,
    marginTop: 6,
    borderRadius: 8,
    border: "1px solid #d1d5db",
    fontSize: 14,
  },

  textarea: {
    width: "100%",
    padding: 12,
    marginTop: 6,
    borderRadius: 8,
    border: "1px solid #d1d5db",
    minHeight: 100,
    resize: "vertical",
    fontSize: 14,
  },

  button: {
    marginTop: 10,
    padding: 12,
    background: "#f97316",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontWeight: "bold",
    fontSize: 16,
    cursor: "pointer",
    transition: "0.2s",
  },
};
