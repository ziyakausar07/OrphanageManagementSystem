import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileMenu({ admin }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ position: "relative", fontFamily: "'Inter', sans-serif" }}>
      {/* PROFILE CIRCLE */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          width: 46,
          height: 46,
          borderRadius: "50%",
          background: "#f97316",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          fontWeight: 700,
          fontSize: 18,
          boxShadow: "0 6px 14px rgba(249,115,22,0.4)",
        }}
      >
        {admin?.name?.charAt(0)?.toUpperCase() || "A"}
      </div>

      {/* DROPDOWN MENU */}
      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 60,
            width: 240,
            background: "#fff",
            borderRadius: 18,
            padding: 18,
            boxShadow: "0 15px 35px rgba(249,115,22,0.3)",
            zIndex: 1000,
          }}
        >
          {/* USER INFO */}
          <div style={{ marginBottom: 12 }}>
            <p
              style={{
                margin: 0,
                fontWeight: 600,
                color: "#9a3412",
                fontSize: 15,
              }}
            >
              {admin?.name}
            </p>
            <p
              style={{
                margin: 0,
                fontSize: 12,
                color: "#6b7280",
              }}
            >
              {admin?.email}
            </p>
          </div>

          <hr style={{ border: "1px solid #fed7aa" }} />

          {/* MENU ITEMS */}
          {[
            { label: "Children", path: "/admin/children" },
            { label: "Donations", path: "/admin/donations" },
            { label: "Adoption Requests", path: "/admin/adoptions" },
            { label: "Orphanage Performance", path: "/admin/orphanage-activities" },
            { label: "Staff", path: "/admin/staff" },
          ].map((item) => (
            <div
              key={item.path}
              onClick={() => goTo(item.path)}
              style={{
                padding: "10px 12px",
                marginTop: 6,
                borderRadius: 12,
                cursor: "pointer",
                fontWeight: 500,
                color: "#374151",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#ffedd5")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              {item.label}
            </div>
          ))}

          <hr style={{ border: "1px solid #fed7aa", marginTop: 12 }} />

          {/* LOGOUT */}
          <div
            onClick={handleLogout}
            style={{
              marginTop: 12,
              padding: "12px",
              background: "#ef4444",
              color: "#fff",
              borderRadius: 14,
              cursor: "pointer",
              textAlign: "center",
              fontWeight: 600,
              boxShadow: "0 6px 14px rgba(239,68,68,0.4)",
            }}
          >
            Logout
          </div>
        </div>
      )}
    </div>
  );
}
