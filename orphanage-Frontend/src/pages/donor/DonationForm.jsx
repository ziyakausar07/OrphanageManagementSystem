import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { addDonation } from "../../api/donation";

const DonationForm = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    donation_type: "",
    amount: "",
    payment_method: "",
    food_count: "",
    food_type: "",
    clothes_count: "",
    clothes_type: "",
    other_details: "",
    message: "",
    donation_date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      alert("Please login first!");
      return;
    }

    try {
      const payload = { ...formData, user_id: user.id };
      const res = await addDonation(payload);
      alert(res.data.message);

      setFormData({
        donation_type: "",
        amount: "",
        payment_method: "",
        food_count: "",
        food_type: "",
        clothes_count: "",
        clothes_type: "",
        other_details: "",
        message: "",
        donation_date: "",
      });
    } catch (err) {
      alert(err.response?.data?.error || "Failed to send donation request");
    }
  };

  return (
    <div style={styles.page}>
      {/* FRAME */}
      <div style={styles.wrapper}>
        <h2 style={styles.title}>Make a Donation</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Donation Type</label>
          <select
            name="donation_type"
            value={formData.donation_type}
            onChange={handleChange}
            style={styles.select}
            required
          >
            <option value="">Select</option>
            <option value="Money">Money</option>
            <option value="Food">Food</option>
            <option value="Clothes">Clothes</option>
            <option value="Other">Other</option>
          </select>

          {formData.donation_type === "Money" && (
            <>
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={formData.amount}
                onChange={handleChange}
                style={styles.input}
                required
              />
              <select
                name="payment_method"
                value={formData.payment_method}
                onChange={handleChange}
                style={styles.select}
                required
              >
                <option value="">Payment Method</option>
                <option value="UPI">UPI</option>
                <option value="Card">Card</option>
                <option value="NetBanking">Net Banking</option>
              </select>
            </>
          )}

          {formData.donation_type === "Food" && (
            <>
              <input
                type="number"
                name="food_count"
                placeholder="Number of people"
                value={formData.food_count}
                onChange={handleChange}
                style={styles.input}
                required
              />
              <select
                name="food_type"
                value={formData.food_type}
                onChange={handleChange}
                style={styles.select}
                required
              >
                <option value="">Food Type</option>
                <option value="Veg">Veg</option>
                <option value="Non-Veg">Non-Veg</option>
              </select>
            </>
          )}

          {formData.donation_type === "Clothes" && (
            <>
              <input
                type="number"
                name="clothes_count"
                placeholder="Number of clothes"
                value={formData.clothes_count}
                onChange={handleChange}
                style={styles.input}
                required
              />
              <input
                type="text"
                name="clothes_type"
                placeholder="Clothes description"
                value={formData.clothes_type}
                onChange={handleChange}
                style={styles.input}
              />
            </>
          )}

          {formData.donation_type === "Other" && (
            <textarea
              name="other_details"
              placeholder="Donation details"
              value={formData.other_details}
              onChange={handleChange}
              style={styles.textarea}
              required
            />
          )}

          <label style={styles.label}>Donation Date</label>
          <input
            type="date"
            name="donation_date"
            value={formData.donation_date}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <textarea
            name="message"
            placeholder="Message (optional)"
            value={formData.message}
            onChange={handleChange}
            style={styles.textarea}
          />

          <button type="submit" style={styles.button}>
            Submit Donation
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonationForm;

/* ===================== STYLES ===================== */

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    padding: 0,
    margin: 0,
    fontFamily: "'Inter', sans-serif",
    background: `
      radial-gradient(circle at top left, #ffedd5, transparent 45%),
      radial-gradient(circle at bottom right, #fed7aa, transparent 45%),
      #fffaf5
    `,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  wrapper: {
    width: "100%",
    maxWidth: 600,
    background: "#fff",
    padding: "35px 40px",
    borderRadius: 20,
    boxShadow: "0 15px 35px rgba(249,115,22,0.25)",
  },

  title: {
    textAlign: "center",
    marginBottom: 30,
    fontSize: 26,
    fontWeight: 600,
    color: "#9a3412",
    fontFamily: "'Poppins', sans-serif",
    borderBottom: "2px solid #fed7aa",
    paddingBottom: 10,
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },

  label: {
    fontWeight: 600,
    color: "#374151",
  },

  input: {
    padding: "12px 16px",
    borderRadius: 12,
    border: "1px solid #d1d5db",
    fontSize: 15,
  },

  select: {
    padding: "12px 16px",
    borderRadius: 12,
    border: "1px solid #d1d5db",
    fontSize: 15,
    background: "#fff",
  },

  textarea: {
    padding: "12px 16px",
    borderRadius: 12,
    border: "1px solid #d1d5db",
    fontSize: 15,
    minHeight: 90,
    resize: "vertical",
  },

  button: {
    marginTop: 15,
    padding: "14px",
    background: "#f97316",
    color: "#fff",
    fontSize: 16,
    fontWeight: 600,
    border: "none",
    borderRadius: 14,
    cursor: "pointer",
    transition: "transform 0.2s ease",
  },
};
