import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css/autoplay";


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
        backgroundImage:
          "url('https://img.freepik.com/free-vector/pharmacy-concept-illustration_114360-8892.jpg')",
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
        className="containe text-center"
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
        ) : testimonials.length > 0 ? (
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={t.id || i}>
                <motion.div
                  className="card h-100 border-0 shadow-sm p-4 mx-2"
                  style={{
                    borderRadius: "1rem",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
                    backgroundColor: "#ffffff",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <p
                    className="card-text text-dark"
                    style={{ fontStyle: "italic", fontSize: "1.05rem" }}
                  >
                    "{t.message}"
                  </p>
                  <hr className="my-3" />
                  <div className="d-flex flex-column align-items-start">
                    <h5 className="fw-bold text-success mb-0">{t.name}</h5>
                    <small className="text-muted">{t.tag}</small>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
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
      </div>
    </section>
  );
};

export default Testimonials;
