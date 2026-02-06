// src/components/UserSlider.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function UserSlider({ user, open, onClose, childrenList = [], logout }) {
  const navigate = useNavigate();

  if (!user || !open) return null;

  const handleClick = (link) => {
    navigate(link);
    if (onClose) onClose();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    if (logout) logout();
    navigate("/login");
  };

  const openAdoptionForm = () => {
    const availableChild = childrenList.find(c => c.status !== "adopted");
    if (!availableChild) return alert("No available child for adoption");

    onClose();
    navigate(`/person/child/${availableChild.child_id}`, {
      state: { userName: user?.name },
    });
  };

  return (
    <div style={styles.slider}>
      <div style={styles.header}>
        <h4 style={{ margin: 0, color: "#f97316" }}>{user.name}</h4>
        <p style={{ margin: 0, fontSize: 13, color: "#555" }}>{user.email}</p>
      </div>

      <button style={styles.btn} onClick={openAdoptionForm}>Open Adoption Form</button>
      <button style={styles.btn} onClick={() => handleClick("/person/messages")}>Messages</button>
      <button style={{ ...styles.btn, background: "#ef4444" }} onClick={handleLogout}>Logout</button>
    </div>
  );
}

const styles = {
  slider: {
    position: "absolute",
    top: 60, // Adjust based on header/profile circle
    right: 10,
    width: 200,
    background: "#fff7ed",
    borderRadius: 10,
    padding: 15,
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    zIndex: 1000,
  },
  header: {
    marginBottom: 10,
    borderBottom: "1px solid #f97316",
    paddingBottom: 8,
  },
  btn: {
    padding: "10px",
    background: "#f97316",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: "bold",
    textAlign: "left",
    transition: "0.2s",
  },
};
