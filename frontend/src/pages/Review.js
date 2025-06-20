import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const TestimonialForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({ name: "", tag: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const formRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status !== "idle") setStatus("idle");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      await axios.post("http://localhost:5000/api/testimonials", formData);
      setStatus("success");
      setFormData({ name: "", tag: "", message: "" });
      if (onAdd) onAdd();
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      setStatus("error");
    }
  };

  useEffect(() => {
    if (status === "success" || status === "error") {
      const timer = setTimeout(() => setStatus("idle"), 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <motion.div
      className="max-w-xl mx-auto my-16 p-8 bg-white rounded-2xl shadow-xl   "
      style={{
        // position: "relative", top: "70px",
        backgroundImage: "url(https://img.freepik.com/free-photo/blue-stationery-table_23-2148169490.jpg?uid=R196801159&ga=GA1.1.1714141213.1744818376&semt=ais_hybrid&w=740)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: 'no-repeat',
        zIndex: 1,
        height:"653px"
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h2 className="text-3xl font-bold text-center text-black mb-6" style={{position:"relative",top:"70px"}}>
        Share Your Experience
      </h2>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="space-y-5 d-flex flex-column"
        style={{position:"relative",top:"90px"}}
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-50 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition mb-2 m-auto"
          style={{ borderRadius: "5px" }}
        />

        <input
          type="text"
          name="tag"
          placeholder="Your Tagline (e.g., Student, Pharmacist)"
          value={formData.tag}
          onChange={handleChange}
          required
          className="w-50 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition mb-2 m-auto"
          style={{ borderRadius: "5px" }}

        />

        <textarea
          name="message"
          placeholder="Type your testimonial here..."
          rows="4"
          value={formData.message}
          onChange={handleChange}
          required
          className="w-50 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition resize-none mb-2 m-auto"
          style={{ borderRadius: "5px" }}

        />

        <button
          type="submit"
          disabled={status === "submitting"}
          className={`py-1 font-semibold rounded-xl transition shadow-md m-auto bg-primary text-white ${status === "submitting"
              ? "bg-green-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
            }`}
          style={{ borderRadius: "5px", border: "transparent" }}
        >
          {status === "submitting" ? "Submitting…" : "Submit Testimonial"}
        </button>
      </form>

      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-6 p-4 bg-green-100  text-green-700 rounded-lg text-center"
          >
            ✅ Thank you! Your testimonial has been submitted.
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg text-center"
          >
            ❌ Oops! Something went wrong. Please try again.
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TestimonialForm;
