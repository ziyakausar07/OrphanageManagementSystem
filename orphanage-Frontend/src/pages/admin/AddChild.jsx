import { useState } from "react";
import api from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function AddChild() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    gender: "",
    date_of_birth: "",
    admission_date: "",
    education_level: "",
    health_status: "",
    overall_performance: "",
    status: "",
    image: null,
    performances: []
  });

  const [performanceForm, setPerformanceForm] = useState({
    year: "",
    marks: "",
    attendance: "",
    remarks: "",
    image: null
  });

  const addPerformance = () => {
    if (!performanceForm.year) {
      alert("Performance year is required");
      return;
    }

    setForm(prev => ({
      ...prev,
      performances: [...prev.performances, performanceForm]
    }));

    setPerformanceForm({
      year: "",
      marks: "",
      attendance: "",
      remarks: "",
      image: null
    });
  };

  const removePerformance = index => {
    setForm(prev => ({
      ...prev,
      performances: prev.performances.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      Object.keys(form).forEach(key => {
        if (key === "image" && form.image) {
          formData.append("image", form.image);
        } else if (key === "performances") {
          form.performances.forEach((p, i) => {
            Object.keys(p).forEach(pk => {
              if (pk === "image" && p.image) {
                formData.append(`performances[${i}][image]`, p.image);
              } else {
                formData.append(`performances[${i}][${pk}]`, p[pk]);
              }
            });
          });
        } else {
          formData.append(key, form[key]);
        }
      });

      await api.post("/children/child", formData);
      alert("Child added successfully!");
      navigate("/admin/children");
    } catch {
      alert("Failed to add child");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@500;600;700&display=swap');

        body {
          margin: 0;
          font-family: 'Inter', sans-serif;
          background:
            radial-gradient(circle at top left, #ffedd5, transparent 45%),
            radial-gradient(circle at bottom right, #fed7aa, transparent 45%),
            #fffaf5;
        }

        .admin-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          padding: 50px 20px;
        }

        .card {
          background: #ffffff;
          width: 100%;
          max-width: 760px;
          border-radius: 20px;
          padding: 36px;
          box-shadow: 0 18px 40px rgba(249, 115, 22, 0.25);
          border-top: 6px solid #f97316;
        }

        h2 {
          font-family: 'Poppins', sans-serif;
          font-size: 26px;
          font-weight: 600;
          color: #9a3412;
          margin-bottom: 26px;
        }

        h3 {
          font-family: 'Poppins', sans-serif;
          margin-top: 34px;
          margin-bottom: 14px;
          color: #c2410c;
          font-weight: 500;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 14px;
        }

        input, select {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          padding: 12px 14px;
          border-radius: 10px;
          border: 1px solid #fed7aa;
          background: #fff;
          outline: none;
          transition: all 0.2s ease;
        }

        input::placeholder {
          color: #9ca3af;
        }

        input:focus, select:focus {
          border-color: #f97316;
          box-shadow: 0 0 0 3px rgba(249,115,22,0.25);
        }

        .performance-box {
          display: grid;
          gap: 12px;
        }

        .performance-list {
          list-style: none;
          padding: 0;
          margin-top: 18px;
        }

        .performance-list li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #fff7ed;
          padding: 12px 16px;
          border-radius: 12px;
          margin-bottom: 8px;
          border-left: 4px solid #f97316;
          font-size: 14px;
        }

        .performance-list button {
          background: none;
          border: none;
          font-size: 18px;
          color: #ea580c;
          cursor: pointer;
        }

        .primary-btn {
          width: 100%;
          margin-top: 34px;
          padding: 15px;
          border-radius: 16px;
          border: none;
          background: linear-gradient(135deg, #f97316, #ea580c);
          color: #fff;
          font-family: 'Poppins', sans-serif;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .primary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 26px rgba(249,115,22,0.4);
        }

        .primary-btn:disabled {
          background: #fdba74;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .secondary-btn {
          padding: 11px;
          border-radius: 12px;
          border: none;
          background: #ffedd5;
          color: #9a3412;
          font-weight: 500;
          cursor: pointer;
        }

        .secondary-btn:hover {
          background: #fed7aa;
        }
      `}</style>

      <div className="admin-container">
        <div className="card">
          <h2>Add Child</h2>

          <div className="form-grid">
            <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
            <select onChange={e => setForm({ ...form, gender: e.target.value })}>
              <option value="">Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>

            <input type="date" onChange={e => setForm({ ...form, date_of_birth: e.target.value })} />
            <input type="date" onChange={e => setForm({ ...form, admission_date: e.target.value })} />
            <input placeholder="Education Level" onChange={e => setForm({ ...form, education_level: e.target.value })} />
            <input placeholder="Health Status" onChange={e => setForm({ ...form, health_status: e.target.value })} />
            <input placeholder="Overall Performance" onChange={e => setForm({ ...form, overall_performance: e.target.value })} />

            <select onChange={e => setForm({ ...form, status: e.target.value })}>
              <option value="">Status</option>
              <option value="available">Available</option>
              <option value="adopted">Adopted</option>
            </select>

            <input type="file" onChange={e => setForm({ ...form, image: e.target.files[0] })} />
          </div>

          <h3>Academic Performance</h3>

          <div className="performance-box">
            <input placeholder="Year" value={performanceForm.year}
              onChange={e => setPerformanceForm({ ...performanceForm, year: e.target.value })} />
            <input placeholder="Marks" value={performanceForm.marks}
              onChange={e => setPerformanceForm({ ...performanceForm, marks: e.target.value })} />
            <input placeholder="Attendance" value={performanceForm.attendance}
              onChange={e => setPerformanceForm({ ...performanceForm, attendance: e.target.value })} />
            <input placeholder="Remarks" value={performanceForm.remarks}
              onChange={e => setPerformanceForm({ ...performanceForm, remarks: e.target.value })} />
            <input type="file"
              onChange={e => setPerformanceForm({ ...performanceForm, image: e.target.files[0] })} />

            <button className="secondary-btn" onClick={addPerformance}>
              + Add Performance
            </button>
          </div>

          {form.performances.length > 0 && (
            <ul className="performance-list">
              {form.performances.map((p, i) => (
                <li key={i}>
                  {p.year} • Marks: {p.marks}
                  <button onClick={() => removePerformance(i)}>✕</button>
                </li>
              ))}
            </ul>
          )}

          <button
            className="primary-btn"
            disabled={!form.name || !form.gender}
            onClick={handleSubmit}
          >
            Save Child
          </button>
        </div>
      </div>
    </>
  );
}
