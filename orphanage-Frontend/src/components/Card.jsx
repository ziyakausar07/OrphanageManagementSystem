import React from "react";

const Card = ({ title, value, monthly, yearly }) => {
  return (
    <div style={styles.card}>
      <h4>{title}</h4>

      {/* Show monthly/yearly if provided, else show value */}
      {monthly !== undefined && yearly !== undefined ? (
        <div>
          <p>Monthly: {monthly}</p>
          <p>Yearly: {yearly}</p>
        </div>
      ) : (
        <p>{value !== undefined ? value : "-"}</p> // fallback to "-" if nothing
      )}
    </div>
  );
};

export default Card;

const styles = {
  card: {
    background: "#f5f5f5",
    padding: 20,
    borderRadius: 10,
    textAlign: "center",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    minWidth: 150,
    margin: 10,
    wordBreak: "break-word", // ensures long text doesn't overflow
  },
};
