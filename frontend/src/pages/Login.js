import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const Login = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [forgotMode, setForgotMode] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false); // Show signup first

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const res = await API.post(endpoint, formData);
      if (isLogin) {
        localStorage.setItem("token", res.data.token);
        navigate("/");
      } else {
        // Successful registration — switch to login
        setSuccess("Registration successful! Please log in.");
        setFormData({ name: "", email: "", password: "" });
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.response?.data?.msg || (isLogin ? "Login failed" : "Registration failed"));
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await API.put("/auth/reset-password", { email: formData.email, newPassword });
      setSuccess("Password reset successful. You can now login.");
      setForgotMode(false);
      setFormData({ name: "", email: "", password: "" });
      setNewPassword("");
      setError("");
    } catch (err) {
      setError(err.response?.data?.msg || "Password reset failed");
    }
  };

  const inputStyle = { width: "100%", padding: 10, margin: "10px 0", borderRadius: 5, border: "1px solid #ccc" };
  const buttonStyle = { borderRadius: 5, border: "none", backgroundColor: "#007bff", color: "white", cursor: "pointer", marginTop: 10 };

  return (
    <div
      className="containe m-auto"
      style={{
        position: "absolute",
        top: "100px",
        right: "40px",
        maxWidth: "300px",
        background: "#fff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        padding: 20,
        borderRadius: 10,
        textAlign: "center",
        height: forgotMode ? "52%" : "auto",
      }}
    >
      <h3>{forgotMode ? "Reset Password" : isLogin ? "Login" : "Signup"}</h3>

      {error && <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>}
      {success && <p style={{ color: "green", fontSize: "0.9rem" }}>{success}</p>}

      {!forgotMode ? (
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              value={formData.name}
              onChange={handleChange}
              style={inputStyle}
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>
            {isLogin ? "Login" : "Register"}
          </button>
          <p
            style={{ cursor: "pointer", color: "#aaa", marginTop: 10 }}
            onClick={() => setForgotMode(true)}
          >
            Forgot Password?
          </p>
        </form>
      ) : (
        <form onSubmit={handleForgotPassword}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="New Password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>
            Reset Password
          </button>
          <p
            style={{ cursor: "pointer", color: "#555", marginTop: 10 }}
            onClick={() => setForgotMode(false)}
          >
            Back to Login
          </p>
        </form>
      )}

      {!forgotMode && (
        <div style={{ fontSize: "0.9rem", marginTop: 10 }}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setFormData({ name: "", email: "", password: "" });
              setError("");
              setSuccess("");
            }}
            style={{ fontSize: "0.9rem", background: "transparent", border: "none", color: "#007bff", cursor: "pointer", marginLeft: 5 }}
          >
            {isLogin ? "Signup" : "Login"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
