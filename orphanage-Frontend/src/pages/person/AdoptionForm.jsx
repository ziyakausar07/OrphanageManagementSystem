import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { requestAdoption } from "../../api/adoption";
import api from "../../api/axiosInstance";

export default function AdoptionForm() {
  const { user } = useAuth();
  const [children, setChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState("");
  const [form, setForm] = useState({ meeting_date: "", note: "" });

  useEffect(() => {
    api
      .get("/children/ChildData")
      .then(res => setChildren(res.data || []))
      .catch(err => console.error("API error:", err));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("You must be logged in");
    if (!selectedChild) return alert("Select a child");

    const childObj = children.find(c => c.child_id === Number(selectedChild));
    if (!childObj) return alert("Invalid child selected");

    const payload = {
      user_id: user.id,
      child_id: childObj.child_id,
      meeting_date: form.meeting_date,
      note: form.note,
    };

    try {
      await requestAdoption(payload);
      alert("Adoption request submitted!");
      setForm({ meeting_date: "", note: "" });
      setSelectedChild("");
    } catch (err) {
      console.error("Error submitting adoption:", err);
      alert("Failed to submit adoption request.");
    }
  };

  return (
    <div className="adoption-page">
      <div className="adoption-form-wrapper">
        <form onSubmit={handleSubmit} className="adoption-form">
          <h2>Request Adoption</h2>

          <label>Select Child:</label>
          <select
            value={selectedChild}
            onChange={(e) => setSelectedChild(e.target.value)}
            required
          >
            <option value="">-- Select a Child --</option>
            {children.map(c => (
              <option key={c.child_id} value={c.child_id}>
                {c.name} (DOB: {c.date_of_birth})
              </option>
            ))}
          </select>

          {selectedChild && (
            <div className="child-details">
              <p><strong>Name:</strong> {children.find(c => c.child_id === Number(selectedChild))?.name}</p>
              <p><strong>Date of Birth:</strong> {children.find(c => c.child_id === Number(selectedChild))?.date_of_birth}</p>
            </div>
          )}

          <label>Meeting Date:</label>
          <input
            type="date"
            name="meeting_date"
            value={form.meeting_date}
            onChange={handleChange}
            required
          />

          <label>Message (Optional):</label>
          <textarea
            name="note"
            value={form.note}
            onChange={handleChange}
          />

          <button type="submit">Submit Request</button>
        </form>
      </div>

      <style>{`
      body {
          margin: 0;
          font-family: 'Inter', sans-serif;
          background:
            radial-gradient(circle at top left, #ffedd5, transparent 45%),
            radial-gradient(circle at bottom right, #fed7aa, transparent 45%),
            #fffaf5;
        }
        .adoption-page {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;

          /* Full-page orange gradient background */
          background: linear-gradient(135deg, #ffedd5, #fed7aa);
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
          font-family: 'Poppins', sans-serif;
        }

        .adoption-form-wrapper {
          width: 100%;
          max-width: 500px;
          background: rgba(255, 255, 255, 0.95); /* slightly transparent so background shows through */
          border-radius: 12px;
          padding: 30px 35px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.12);
        }

        .adoption-form h2 {
          margin-bottom: 20px;
          color: #f97316;
          text-align: center;
        }

        .adoption-form label {
          display: block;
          margin-bottom: 6px;
          font-weight: 500;
          color: #333;
        }

        .adoption-form select,
        .adoption-form input,
        .adoption-form textarea {
          width: 100%;
          padding: 10px 12px;
          margin-bottom: 15px;
          border: 1px solid #f97316;
          border-radius: 8px;
          outline: none;
          font-size: 14px;
          transition: 0.2s;
        }

        .adoption-form select:focus,
        .adoption-form input:focus,
        .adoption-form textarea:focus {
          border-color: #c2410c;
          box-shadow: 0 0 6px rgba(194,65,12,0.2);
        }

        .adoption-form textarea {
          resize: vertical;
          min-height: 80px;
        }

        .child-details {
          background: #fff3e0;
          padding: 10px 12px;
          border-radius: 8px;
          margin-bottom: 15px;
          border-left: 4px solid #f97316;
        }

        .child-details p {
          margin: 4px 0;
          font-size: 14px;
        }

        .adoption-form button {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 8px;
          background: #f97316;
          color: #fff;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s;
        }

        .adoption-form button:hover {
          background: #c2410c;
        }

        @media (max-width: 480px) {
          .adoption-form-wrapper {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
}
