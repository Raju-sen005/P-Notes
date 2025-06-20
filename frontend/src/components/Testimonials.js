import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
  hover: { y: -5, boxShadow: "0 12px 28px rgba(0, 0, 0, 0.1)" },
};

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    axios
      .get("https://p-notes-backend.onrender.com/api/testimonials")
      .then(res => setTestimonials(Array.isArray(res.data) ? res.data : []))
      .catch(err => {
        console.error("Error fetching testimonials:", err);
        setTestimonials([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section
      className="testimonials-section py-5"
      style={{
        backgroundColor: "#f9fdfd",
        backgroundImage: "url('https://img.freepik.com/free-vector/pharmacy-concept-illustration_114360-8892.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        position: "relative",
        top: "0px",
        zIndex: 1,

      }}
    >
      <div
        className="container text-center"
        style={{ borderRadius: "1rem", padding: "2rem" }}
      >
        <motion.h2
          className="fw-bold mb-5 text-primary"
          style={{ fontSize: "2.3rem" }}
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          Users Review
        </motion.h2>

        {loading ? (
          <motion.p
            className="text-muted"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            Loading testimonials...
          </motion.p>
        ) : (
          <div className="row g-4">
            <AnimatePresence>
              {testimonials.length > 0 ? (
                testimonials.map((t, i) => (
                  <motion.div
                    className="col-md-6 col-lg-4"
                    key={t.id || i}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    exit={{ opacity: 0, y: 20 }}
                    viewport={{ once: true, amount: 0.2 }}
                    variants={cardVariants}
                    whileHover="hover"
                    style={{ cursor: "pointer" }}
                  >
                    <motion.div
                      className="card h-100 border-0 shadow-sm p-4"
                      style={{
                        borderRadius: "1rem",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
                        backgroundColor: "#ffffff",
                      }}
                    >
                      <motion.p
                        className="card-text text-dark"
                        style={{ fontStyle: "italic", fontSize: "1.05rem" }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                      >
                        "{t.message}"
                      </motion.p>
                      <hr className="my-3" />
                      <motion.div
                        className="d-flex flex-column align-items-start"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                      >
                        <h5 className="fw-bold text-success mb-0">{t.name}</h5>
                        <small className="text-muted">{t.tag}</small>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                ))
              ) : (
                <motion.p
                  className="text-muted"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                >
                  No testimonials found.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
