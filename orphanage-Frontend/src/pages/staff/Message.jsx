import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getNotifications, markNotificationRead } from "../../api/notification";
import LoadingScreen from "../../components/LoadingScreen";

const Message = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.id) return;

    const fetchMessages = async () => {
      try {
        setLoading(true);
        const res = await getNotifications(user.id);
        setMessages(res.data.messages || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load messages");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [user]);

  const handleMarkAsRead = async (id) => {
    try {
      await markNotificationRead(id);
      setMessages(prev =>
        prev.map(m =>
          m.notification_id === id ? { ...m, status: "read" } : m
        )
      );
    } catch {
      setError("Failed to mark message as read");
    }
  };

  if (loading) return <LoadingScreen message="Loading messages..." />;
  if (error) return <p style={styles.center}>{error}</p>;
  if (!messages.length) return <p style={styles.center}>No messages</p>;

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.heading}>📩 Messages & Notifications</h2>

        {messages.map(msg => (
          <div
            key={msg.notification_id}
            style={{
              ...styles.card,
              background: msg.status === "read" ? "#fff" : "#fff7ed",
              borderLeft:
                msg.status === "read"
                  ? "4px solid #e5e7eb"
                  : "4px solid #f97316",
            }}
          >
            <p style={styles.message}>{msg.message}</p>

            <div style={styles.footer}>
              <small style={styles.time}>
                {new Date(msg.created_at).toLocaleString()}
              </small>

              {msg.status !== "read" && (
                <button
                  style={styles.readBtn}
                  onClick={() => handleMarkAsRead(msg.notification_id)}
                >
                  Mark as Read
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Message;

/* ===================== STYLES ===================== */

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #fff7ed, #ffedd5)",
    padding: "40px 10px",
  },

  container: {
    maxWidth: 650,
    margin: "0 auto",
    background: "#ffffff",
    padding: 25,
    borderRadius: 16,
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  },

  heading: {
    marginBottom: 20,
    color: "#9a3412",
    borderBottom: "2px solid #fed7aa",
    paddingBottom: 10,
    textAlign: "center",
  },

  card: {
    padding: 16,
    borderRadius: 10,
    marginBottom: 14,
    boxShadow: "0 3px 8px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  message: {
    margin: 0,
    fontSize: 15,
    color: "#111827",
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  time: {
    fontSize: 12,
    color: "#6b7280",
  },

  readBtn: {
    background: "#f97316",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    padding: "6px 10px",
    fontSize: 12,
    cursor: "pointer",
  },

  center: {
    textAlign: "center",
    marginTop: 60,
    color: "#555",
  },
};
