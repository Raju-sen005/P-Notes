import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";

const statItemsConfig = [
  { key: "views", label: "Total Views", icon: "bi bi-eye", color: "#1abc9c" },
  { key: "subscribers", label: "Users/Subscribers", icon: "bi bi-people-fill", color: "#e67e22" },
  { key: "videos", label: "Video Lectures", icon: "bi bi-play-circle", color: "#9b59b6" },
  { key: "questions", label: "Practice Questions", icon: "bi bi-patch-question", color: "#3498db" },
  { key: "notes", label: "Notes", icon: "bi bi-journal-text", color: "#e74c3c" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  hover: { scale: 1.05, boxShadow: "0 8px 20px rgba(0,0,0,0.1)" },
};

const Stats = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://p-notes-backend.onrender.com/api/stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
   
  }, []);

  return (
    <motion.div
      className="py-0 text-center position-relative"
      style={{
        fontFamily: "Noto Sans, sans-serif",
        top: "0px",

        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        zIndex: 1,
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div
        style={{
          // backgroundColor: "rgba(255,255,255,0.9)",
          borderRadius: "1rem",
          padding: "2rem 1rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <motion.h2
          className="fw-bold mb-4 text-primary"
          style={{ fontSize: "2.5rem", }}
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          Real‑Time Access Logs
        </motion.h2>

        <div className="container d-flex flex-wrap justify-content-center gap-4 mt-4">
          <AnimatePresence>
            {statItemsConfig.map((item, i) => {
              const value = stats[item.key] ?? 0;
              return (
                <motion.div
                  key={item.key}
                  className="p-4 rounded shadow-sm bg-transparent"
                  style={{
                    width: "220px",
                    minHeight: "160px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    // border: `1px solid ${item.color}33`,
                    boxShadow: `0 4px 12px ${item.color}22`,
                  }}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover="hover"
                >
                  <i className={item.icon + " mb-3"} style={{ fontSize: "2rem", color: item.color }} />
                  <div style={{ fontSize: "2rem", fontWeight: 700, color: item.color }}>
                    {!loading ? <CountUp end={value} duration={2} separator="," /> : "..."}
                  </div>
                  <div style={{ fontSize: "1rem", fontWeight: 500, marginTop: "0.5rem", color: "#34495e" }}>
                    {item.label}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Stats;
