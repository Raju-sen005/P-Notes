import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email और Password दोनों भरें");
      return;
    }

    try {
      const res = await axios.post("https://p-notes-backend.onrender.com/api/admin/login", { email, password });

      const decoded = jwtDecode(res.data.token);

      if (decoded.role !== "admin") {
        setError("आपको admin के रूप में अनुमति नहीं है");
        return;
      }

      localStorage.setItem("token", res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <motion.div
      className="containe mt-5"
      style={{
        maxWidth: "400px",
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}

    >
      <motion.h2
        className="text-center mb-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Admin Login
      </motion.h2>

      {error && (
        <motion.p
          className="text-danger"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.p>
      )}

      <form onSubmit={handleSubmit}>
        <motion.input
          type="email"
          className="form-control my-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          whileFocus={{ scale: 1.03 }}
        />

        <motion.input
          type="password"
          className="form-control my-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          whileFocus={{ scale: 1.03 }}
        />

        <motion.button
          type="submit"
          className="btn btn-primary w-100"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}

        >
          Login
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AdminLogin;
