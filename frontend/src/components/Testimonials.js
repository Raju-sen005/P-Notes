import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';  // React components
import { Autoplay, Pagination } from "swiper/modules";         // Only the modules we need
import { motion } from "framer-motion";

// Core + module styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";

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
    <section className="testimonials-section py-5" style={{ /* your styles */ }}>
      <div className="containe text-center py-4">
        <motion.h2
          className="fw-bold mb-5 text-primary"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Users Review
        </motion.h2>

        {loading ? (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            Loading testimonials...
          </motion.p>
        ) : testimonials.length ? (
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            // navigation prop removed to hide arrows
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={t.id || i}>
                <motion.div
                  className="card h-100 border-0 shadow-sm p-4"
                  style={{ borderRadius: "1rem", backgroundColor: "#fff" }}
                  whileHover={{ y: -5, boxShadow: "0 12px 28px rgba(0,0,0,0.1)" }}
                >
                  <p className="card-text text-dark fst-italic" style={{ fontSize: "1.05rem" }}>
                    "{t.message}"
                  </p>
                  <hr />
                  <div className="d-flex flex-column align-items-start">
                    <h5 className="fw-bold text-success mb-0">{t.name}</h5>
                    <small className="text-muted">{t.tag}</small>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            No testimonials found.
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
