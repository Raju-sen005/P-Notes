import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/auth/register", formData);
      localStorage.setItem("token", res.data.token);
      navigate("/"); // Redirect after successful registration
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="container" style={{ maxWidth: "400px", marginTop: "80px",textAlign: "center" }}>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          value={formData.name}
          onChange={handleChange}
          style={{ borderRadius: "5px", marginBottom: "11px", padding: "3px", border: "1px solid #ccc" }}
        /><br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}style={{ borderRadius: "5px", marginBottom: "11px", padding: "3px", border: "1px solid #ccc" }}
        /><br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
          style={{ borderRadius: "5px", marginBottom: "11px", padding: "3px", border: "1px solid #ccc" }}
        /><br />
        <button type="submit"style={{ borderRadius: "5px", marginBottom: "11px !important", padding: "3px", background: "#198754", color: "#ffffff", border: "1px solid #ccc" }}>Register</button>
      </form>
    </div>
  );
};

export default Register;