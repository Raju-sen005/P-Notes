import React, { useEffect, useState } from "react";
import API from "../../api/axios";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/admin/stats");
        setStats(res.data);
      } catch (err) {
        setError("Unauthorized or failed to fetch stats");
      }
    };

    fetchStats();
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!stats) return <p>Loading admin data...</p>;

  return (
    <div style={{ padding: "30px" }}>
      <h2>📊 Admin Dashboard</h2>
      <ul>
        <li>👤 Users: {stats.users}</li>
        <li>📚 Courses: {stats.courses}</li>
        <li>📝 Notes: {stats.notes}</li>
        <li>🧠 Quizzes: {stats.quizzes}</li>
        <li>📘 Books: {stats.books}</li>
        <li>🛒 Orders: {stats.orders}</li>
      </ul>
    </div>
  );
};

export default Dashboard;
