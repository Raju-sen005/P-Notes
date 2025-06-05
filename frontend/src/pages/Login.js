import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [forgotMode, setForgotMode] = useState(false); // true if user clicks "Forgot Password"
  const [newPassword, setNewPassword] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await API.put("/auth/reset-password", { email, newPassword });
      setSuccess("Password reset successful. You can now login.");
      setForgotMode(false);
      setEmail("");
      setNewPassword("");
      setError("");
    } catch (err) {
      setError(err.response?.data?.msg || "Password reset failed");
    }
  };

  return (
    <div className="container" style={{ maxWidth: "400px", marginTop: "80px" }}>
      <h2>{forgotMode ? "Reset Password" : "Login"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      {forgotMode ? (
        <form onSubmit={handleForgotPassword}>
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /><br />
          <input
            type="password"
            placeholder="Enter new password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          /><br />
          <button type="submit">Reset Password</button>
          <p style={{ cursor: "pointer", color: "blue" }} onClick={() => setForgotMode(false)}>
            Back to Login
          </p>
        </form>
      ) : (
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /><br />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /><br />
          <button type="submit">Login</button>
          <p style={{ cursor: "pointer", color: "blue" }} onClick={() => setForgotMode(true)}>
            Forgot Password?
          </p>
        </form>
      )}
    </div>
  );
};

export default Login;
