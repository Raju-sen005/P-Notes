// TestimonialPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Testimonials from "./Testimonials";

const TestimonialPage = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/testimonials");
        setTestimonials(res.data);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <section className="testimonials-section py-5">
      <div className="container text-center">
        <h2 className="mb-4" style={{ color: "#00b894", fontFamily: "Poppins,sans-serif" }}>
          What Our Students Say
        </h2>
        <Testimonials testimonials={testimonials} />
      </div>

      <style jsx>{`
        .testimonials-section {
          background-color: #f9fcfb;
        }
        .testimonials-section h2 {
          font-size: 2.4rem;
          font-weight: 600;
        }
      `}</style>
    </section>
  );
};

export default TestimonialPage;
