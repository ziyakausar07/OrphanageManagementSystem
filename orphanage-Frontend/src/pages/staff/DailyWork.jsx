import React, { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import { getTasks, addTask, deleteTask, updateTaskStatus } from "../../api/staff";
import LoadingScreen from "../../components/LoadingScreen";

const DailyWork = () => {
  const { user, loading } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [fetching, setFetching] = useState(false);

  const fetchTasks = useCallback(async (userId) => {
    if (!userId) return;
    setFetching(true);
    try {
      const res = await getTasks(userId);
      setTasks(res.data.tasks || []);
    } catch (err) {
      console.error("Fetch tasks error:", err);
    } finally {
      setFetching(false);
    }
  }, []);

  const activeUserId = user?.id || JSON.parse(localStorage.getItem("user") || "{}")?.id;

  useEffect(() => {
    if (loading) return;
    if (activeUserId) {
      fetchTasks(activeUserId);
    }
  }, [activeUserId, loading, fetchTasks]);

  const handleAddTask = async () => {
    if (!title.trim()) return alert("Title required");
    if (!activeUserId) return alert("User not identified. Please login again.");

    setSaving(true);
    try {
      const res = await addTask(activeUserId, title, description);
      if (res.data?.task) {
        setTasks((prev) => [res.data.task, ...prev]);
      } else {
        fetchTasks(activeUserId);
      }
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error("Add task error:", err);
      alert("Failed to add task");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks((prev) => prev.filter((t) => t.task_id !== taskId));
    } catch (err) {
      console.error("Delete task error:", err);
      alert("Failed to delete task");
    }
  };

  const toggleStatus = async (task) => {
    const newStatus = task.status === "completed" ? "pending" : "completed";
    try {
      await updateTaskStatus(task.task_id, newStatus);
      setTasks((prev) =>
        prev.map((t) =>
          t.task_id === task.task_id ? { ...t, status: newStatus } : t
        )
      );
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  if (loading) {
    return <LoadingScreen message="Loading tasks..." />;
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.heading}>📋 Daily Work</h2>

        <div style={styles.addTask}>
          <input
            style={styles.input}
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            style={styles.input}
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            style={styles.addBtn}
            onClick={handleAddTask}
            disabled={saving}
          >
            {saving ? "Adding..." : "Add"}
          </button>
        </div>

        {fetching ? (
          <p style={styles.noTask}>Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p style={styles.noTask}>No tasks assigned</p>
        ) : (
          <div style={styles.taskList}>
            {tasks.map((task) => (
              <div key={task.task_id} style={styles.taskCard}>
                <div
                  onClick={() => toggleStatus(task)}
                  style={{
                    cursor: "pointer",
                    textDecoration:
                      task.status === "completed" ? "line-through" : "none",
                    color:
                      task.status === "completed" ? "#9ca3af" : "#111",
                  }}
                >
                  <strong>{task.title}</strong>
                  <p style={styles.desc}>{task.description}</p>
                  <small>Status: {task.status}</small>
                </div>

                <button
                  style={styles.deleteBtn}
                  onClick={() => handleDelete(task.task_id)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyWork;

/* ===================== STYLES ===================== */
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #fff7ed, #ffedd5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  container: {
    width: "100%",
    maxWidth: 700,
    background: "#fff",
    padding: 30,
    borderRadius: 16,
    boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
  },

  heading: {
    textAlign: "center",
    marginBottom: 20,
    color: "#9a3412",
    borderBottom: "2px solid #fed7aa",
    paddingBottom: 10,
  },

  addTask: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr auto",
    gap: 10,
    marginBottom: 20,
  },

  input: {
    padding: 12,
    borderRadius: 8,
    border: "1px solid #d1d5db",
  },

  addBtn: {
    background: "#f97316",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "0 20px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  taskList: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },

  taskCard: {
    background: "#fff7ed",
    padding: 15,
    borderRadius: 10,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 3px 8px rgba(0,0,0,0.08)",
  },

  desc: {
    margin: "4px 0",
    fontSize: 14,
    color: "#555",
  },

  deleteBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    padding: "6px 10px",
    cursor: "pointer",
  },

  noTask: {
    textAlign: "center",
    color: "#6b7280",
    fontStyle: "italic",
  },
};
