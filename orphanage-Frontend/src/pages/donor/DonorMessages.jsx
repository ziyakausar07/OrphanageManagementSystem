import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getNotifications, markNotificationRead } from "../../api/notification";
import LoadingScreen from "../../components/LoadingScreen";

const DonorMessages = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    const fetchMessages = async () => {
      try {
        const res = await getNotifications(user.id);
        setMessages(res.data.messages || []);
      } catch (err) {
        console.error("Error fetching notifications", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [user]);

  const handleRead = async (id) => {
    await markNotificationRead(id);
    setMessages((prev) =>
      prev.map((m) =>
        m.notification_id === id ? { ...m, status: "read" } : m
      )
    );
  };

  /* ===== COMMON BACKGROUND ===== */
  const backgroundStyle = {
    minHeight: "100vh",
    width: "100%",
    margin: 0,
    padding: 0,
    fontFamily: "'Inter', sans-serif",
    background: `
      radial-gradient(circle at top left, #ffedd5, transparent 45%),
      radial-gradient(circle at bottom right, #fed7aa, transparent 45%),
      #fffaf5
    `,
  };

  /* ===== LOGIN / LOADING ===== */
  if (!user) {
    return (
      <div
        style={{
          ...backgroundStyle,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#9a3412",
          fontWeight: 600,
          fontSize: 18,
        }}
      >
        Please login to view messages.
      </div>
    );
  }
  if (loading) {
    return <LoadingScreen message="Loading messages..." />;
  }

  return (
    <div style={backgroundStyle}>
      {/* ===== FRAME ===== */}
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "40px 24px",
        }}
      >
        {/* ===== HEADING ===== */}
        <h2
          style={{
            fontSize: 26,
            fontWeight: 600,
            fontFamily: "'Poppins', sans-serif",
            color: "#9a3412",
            marginBottom: 30,
            borderBottom: "2px solid #fed7aa",
            paddingBottom: 10,
          }}
        >
          Your Notifications
        </h2>

        {/* ===== CONTENT ===== */}
        {messages.length === 0 ? (
          <p
            style={{
              textAlign: "center",
              color: "#6b7280",
              padding: 40,
            }}
          >
            No notifications
          </p>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.notification_id}
                onClick={() => handleRead(msg.notification_id)}
                style={{
                  padding: 20,
                  borderRadius: 18,
                  background:
                    msg.status === "sent" ? "#fff3cd" : "#d1fae5",
                  boxShadow: "0 10px 24px rgba(249,115,22,0.2)",
                  borderTop: "4px solid #f97316",
                  cursor: "pointer",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-3px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <strong
                  style={{
                    display: "block",
                    marginBottom: 8,
                    fontWeight: 600,
                    color: "#9a3412",
                  }}
                >
                  {msg.type.toUpperCase()}
                </strong>

                <p
                  style={{
                    margin: "0 0 10px 0",
                    color: "#111",
                  }}
                >
                  {msg.message}
                </p>

                <small
                  style={{
                    color: "#6b7280",
                    fontSize: 12,
                  }}
                >
                  {new Date(msg.created_at).toLocaleString()}
                </small>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DonorMessages;
