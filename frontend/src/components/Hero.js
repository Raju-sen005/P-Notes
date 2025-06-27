import React, { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { jwtDecode } from "jwt-decode"; // ✅ जरूरी

const Hero = () => {
  const typedRef = useRef(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState("");
  const [showAuthCard, setShowAuthCard] = useState(true);

  // Typed animation
  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        "B.Pharm Notes",
        "D.Pharm Notes",
        "Sample Papers",
        "MCQ Quizzes",
        "Practical Files",
      ],
      typeSpeed: 60,
      backSpeed: 30,
      backDelay: 1500,
      startDelay: 500,
      loop: true,
      showCursor: false,
    });

    return () => typed.destroy();
  }, []);

  // ✅ Check login on mount
  useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decoded = jwtDecode(token);
      if (decoded?.id) {
        setShowAuthCard(false);
        // ✅ Optional: navigate("/dashboard") or wherever
      }
    } catch {
      setShowAuthCard(true);
    }
  }
}, []);


  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const res = await API.post(endpoint, formData);
      localStorage.setItem("token", res.data.token);

      if (isLogin) {
        setShowAuthCard(false); // ✅ hide card after login
        navigate("/");
      } else {
        setIsLogin(true);
        setFormData({ name: "", email: "", password: "" });
        setError("Registered successfully! Please login.");
      }
    } catch (err) {
      setError(err.response?.data?.msg || (isLogin ? "Login failed" : "Registration failed"));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="text-center py-5 px-3"
      style={{
        fontFamily: 'Poppins, sans-serif',
        position: 'sticky',
        minHeight: '100vh',
      }}
    >
      {/* Heading */}
      <h1 className="fw-bold mb-2" style={{ fontSize: '2.5rem', color: '#1F2937', position: "relative", top: "150px", textAlign: "initial", width: "50%" }}>
        Welcome to your Perfect Pharmacy
      </h1>

      {/* Typed animation */}
      <h4 className="mt-3 d-none" style={{ fontSize: '1.5rem', fontWeight: 600, fontFamily: 'Noto Sans, sans-serif', color: '#2d3436' }}>
        <span ref={typedRef} style={{ color: '#00a8ff', minWidth: '220px', display: 'inline-block', textAlign: 'left' }} />
      </h4>

      {/* Subheading */}
      <p className="mt-3" style={{ fontSize: '1.3rem', color: '#636e72', position: "absolute", top: "305px", width: "29%", textAlign: "initial" }}>
        <strong>Your One-Stop Solution for Pharmacy Education</strong>
      </p>

      {/* Buttons */}
      <div className="d-flex justify-content-center flex-wrap gap-3 mt-4" style={{ position: "absolute", top: "400px" }}>
        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary m-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Course Video
        </a>
        <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary m-auto" title="Chat with us" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Chat on WhatsApp
        </a>
      </div>


      {/* Auth Card */}
      {showAuthCard && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="container auth-box"
          style={{
            position: 'absolute',
            top: '150px',
            right: '80px',
            width: '300px',
            background: '#ffffff',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            padding: '20px',
            borderRadius: '10px',
            color: 'black',
          }}
        >
          <h3>{isLogin ? 'Login' : 'Signup'}</h3>
          {error && <p style={{ color: '#ff3333', fontSize: '0.9rem' }}>{error}</p>}
          <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
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
              {isLogin ? 'Login' : 'Register'}
            </button>
          </form>

          <div style={{ fontSize: '0.9rem', marginTop: '10px' }}>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setFormData({ name: '', email: '', password: '' });
                setError('');
              }}
              style={{
                marginLeft: '10px',
                color: '#0d6efd',
                background: 'transparent',
                border: 'none',
                fontWeight: 600,
              }}
            >
              {isLogin ? 'Signup' : 'Login'}
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

// Styles
const inputStyle = {
  borderRadius: '5px',
  marginBottom: '10px',
  padding: '10px',
  border: '1px solid #ccc',
  width: '100%',
};

const buttonStyle = {
  borderRadius: '5px',
  padding: '10px',
  background: '#0d6efd',
  color: '#ffffff',
  border: 'none',
  width: '100%',
  fontWeight: 600,
};

export default Hero;
