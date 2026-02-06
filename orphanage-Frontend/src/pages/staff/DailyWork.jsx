import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { getTasks, addTask, deleteTask, updateTaskStatus } from "../../api/staff";

const DailyWork = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.id) return;
    fetchTasks();
  }, [user?.id]);

  const fetchTasks = async () => {
    try {
      const res = await getTasks(user.id);
      setTasks(res.data.tasks || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddTask = async () => {
    if (!title.trim()) return alert("Title required");
    setLoading(true);
    try {
      const res = await addTask(user.id, title, description);
      setTasks(prev => [res.data.task, ...prev]);
      setTitle("");
      setDescription("");
    } catch {
      alert("Failed to add task");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (task_id) => {
    try {
      await deleteTask(task_id);
      setTasks(prev => prev.filter(t => t.task_id !== task_id));
    } catch (err) {
      console.error(err);
    }
  };

  const toggleStatus = async (task) => {
    const newStatus = task.status === "pending" ? "completed" : "pending";
    try {
      await updateTaskStatus(task.task_id, newStatus);
      setTasks(prev =>
        prev.map(t =>
          t.task_id === task.task_id ? { ...t, status: newStatus } : t
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.heading}>📋 Daily Work</h2>

        {/* Add Task */}
        <div style={styles.addTask}>
          <input
            style={styles.input}
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            style={styles.input}
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button style={styles.addBtn} onClick={handleAddTask} disabled={loading}>
            {loading ? "Adding..." : "Add"}
          </button>
        </div>

        {/* Task List */}
        {tasks.length === 0 ? (
          <p style={styles.noTask}>No tasks assigned</p>
        ) : (
          <div style={styles.taskList}>
            {tasks.map(task => (
              <div key={task.task_id} style={styles.taskCard}>
                <div
                  onClick={() => toggleStatus(task)}
                  style={{
                    cursor: "pointer",
                    textDecoration: task.status === "completed" ? "line-through" : "none",
                    color: task.status === "completed" ? "#9ca3af" : "#111",
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
