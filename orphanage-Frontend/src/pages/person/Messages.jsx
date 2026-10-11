import React, { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import { useAuth } from "../../context/AuthContext";

export default function Messages() {
  const { user, loading } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);

  useEffect(() => {
    if (loading || !user) return;

    api
      .get(`/notification/user/${user.id}`)
      .then(res => {
        setMessages(res.data.messages || []);
      })
      .catch(err => console.error("Error fetching notifications:", err))
      .finally(() => setLoadingMessages(false));
  }, [user, loading]);

  if (loading || loadingMessages) return <p style={{textAlign:"center"}}>Loading messages...</p>;
  if (!user) return <p style={{textAlign:"center"}}>Error: user not found</p>;

  return (
    <div className="messages-page">
      <div className="messages-wrapper">
        <h2>Messages / Notifications</h2>
        {messages.length === 0 && <p>No notifications yet.</p>}

        {messages.map(msg => (
          <div
            key={msg.notification_id}
            className={`message-card ${msg.status === "unread" ? "unread" : ""}`}
          >
            <h4>
              {msg.type === "email" ? "📧 Email" : "💬 System"}
            </h4>
            <p>{msg.message}</p>
            <small>
              {new Date(msg.created_at).toLocaleString()} | Role: {msg.role}
            </small>

            {msg.status === "unread" && (
              <button
                onClick={() => {
                  api.post(`/notification/read/${msg.notification_id}`).then(() => {
                    setMessages(prev =>
                      prev.map(m =>
                        m.notification_id === msg.notification_id
                          ? { ...m, status: "read" }
                          : m
                      )
                    );
                  });
                }}
              >
                Mark as Read
              </button>
            )}
          </div>
        ))}
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
        .messages-page {
          min-height: 100vh;
          padding: 20px;
          display: flex;
          justify-content: center;
          background: linear-gradient(135deg, #ffedd5, #fed7aa);
          background-size: cover;
          font-family: 'Poppins', sans-serif;
        }

        .messages-wrapper {
          width: 100%;
          max-width: 700px;
          background: rgba(255, 255, 255, 0.95);
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.12);
        }

        .messages-wrapper h2 {
          text-align: center;
          margin-bottom: 25px;
          color: #f97316;
        }

        .message-card {
          background: #fff;
          border-left: 5px solid #f97316;
          padding: 15px 20px;
          border-radius: 10px;
          margin-bottom: 15px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          position: relative;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .message-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.1);
        }

        .message-card.unread {
          background: #fff7ed;
        }

        .message-card h4 {
          margin: 0 0 5px 0;
          color: #f97316;
        }

        .message-card p {
          margin: 5px 0;
          font-size: 14px;
          color: #333;
        }

        .message-card small {
          color: #555;
          font-size: 12px;
        }

        .message-card button {
          position: absolute;
          right: 15px;
          top: 15px;
          border: none;
          background: #2563eb;
          color: #fff;
          padding: 5px 10px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 12px;
          transition: background 0.2s;
        }

        .message-card button:hover {
          background: #1e40af;
        }

        @media (max-width: 480px) {
          .messages-wrapper {
            padding: 20px;
          }

          .message-card {
            padding: 12px 15px;
          }
        }
      `}</style>
    </div>
  );
}
