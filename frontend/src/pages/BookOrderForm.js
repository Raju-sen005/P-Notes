import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // ✅

const BookOrderForm = ({ onSubmit }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookTitle } = location.state || {};

  const [formData, setFormData] = useState({ name: "", mobile: "", address: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const firstInputRef = useRef();

  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  const validateMobile = (m) => /^[0-9]{10,15}$/.test(m);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateMobile(formData.mobile)) {
      setError("Invalid mobile number (10–15 digits)");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      await onSubmit({ ...formData, bookTitle });
      alert("Order submitted!");
      navigate("/books");
    } catch {
      setError("Order failed, try again.");
    }

    setSubmitting(false);
  };

  return (
    <motion.div
      className="containe mt-5 "
      style={{backgroundImage:"url(https://img.freepik.com/premium-photo/light-blue-abstract-stylish-technological-art-background-34_769134-618.jpg?uid=R196801159&ga=GA1.1.1714141213.1744818376&semt=ais_hybrid&w=740)",
       backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundRepeat: 'no-repeat',
          zIndex: 1,
          width:"100%",}}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        className="text-xl font-bold mb-3"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Order: {bookTitle}
      </motion.h2>

      <form onSubmit={handleSubmit} className="space-y-4 d-flex flex-column">
        <input
          ref={firstInputRef}
          name="name"
          value={formData.name}
          placeholder="Your Name"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full border p-2 rounded mb-2"
          required
        />
        <input
          name="mobile"
          value={formData.mobile}
          placeholder="Mobile Number"
          onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
          className="w-full border p-2 rounded mb-2"
          required
        />
        <textarea
          name="address"
          value={formData.address}
          placeholder="Delivery Address"
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="w-full border p-2 rounded mb-2"
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex gap-2 d-flex justify-end mb-2">
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-white px-1 py-1 rounded"
            style={{ background: "#0D6EFD", border:"transparent" }}
            onClick={() => navigate("/books")}
          >
            Cancel
          </motion.button>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-600 text-white px-1 py-1 rounded"
            style={{ background: "#0D6EFD", border:"transparent" }}
            disabled={submitting}
          >
            {submitting ? "Ordering..." : "Order Now"}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default BookOrderForm;
