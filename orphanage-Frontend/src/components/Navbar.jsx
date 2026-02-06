import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import SliderMenu from "./SliderMenu";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav style={styles.nav}>
      <h2>Orphanage System</h2>

      {/* Profile circle ALWAYS visible */}
      <div style={styles.userContainer}>
        <div
          style={styles.profileCircle}
          onClick={() => setIsOpen(!isOpen)}
        >
          {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
        </div>

        {isOpen && (
          <SliderMenu
            user={user}
            onClose={() => setIsOpen(false)}
            logout={logout}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 20px",
    background: "#3b82f6",
    color: "#fff",
  },
  userContainer: {
    position: "relative",
  },
  profileCircle: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    background: "#1e40af",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
