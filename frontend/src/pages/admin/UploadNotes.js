import React, { useState } from "react";
import API from "../../api/axios";
import { motion } from "framer-motion";

const UploadNotes = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    courseId: "",
    pdfUrl: "",
    subject: "",
    topic: "",
    difficulty: "easy",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await API.post("/notes", formData);
      setMessage("✅ Note uploaded successfully!");
      setFormData({
        title: "",
        description: "",
        courseId: "",
        pdfUrl: "",
        subject: "",
        topic: "",
        difficulty: "easy",
      });
    } catch (err) {
      setMessage(err.response?.data?.msg || "❌ Upload failed.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}
    >
      <h2 className="text-2xl font-bold mb-3">📝 Upload Notes</h2>
      {message && (
        <motion.p
          className="mb-4 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{ color: message.includes("failed") ? "red" : "green" }}
        >
          {message}
        </motion.p>
      )}
      <form onSubmit={handleSubmit} className="space-y-3">
        {[
          { name: "title", placeholder: "Title" },
          { name: "description", placeholder: "Description", textarea: true },
          { name: "courseId", placeholder: "Course ID" },
          { name: "pdfUrl", placeholder: "PDF URL" },
          { name: "subject", placeholder: "Subject" },
          { name: "topic", placeholder: "Topic" },
        ].map(({ name, placeholder, textarea }) =>
          textarea ? (
            <motion.textarea
              key={name}
              name={name}
              placeholder={placeholder}
              value={formData[name]}
              onChange={handleChange}
              required={name === "title" || name === "courseId" || name === "pdfUrl"}
              className="w-full border rounded px-3 py-2"
              whileFocus={{ scale: 1.01 }}
            />
          ) : (
            <motion.input
              key={name}
              type="text"
              name={name}
              placeholder={placeholder}
              value={formData[name]}
              onChange={handleChange}
              required={name === "title" || name === "courseId" || name === "pdfUrl"}
              className="w-full border rounded px-3 py-2"
              whileFocus={{ scale: 1.01 }}
            />
          )
        )}

        <motion.select
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          whileFocus={{ scale: 1.01 }}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </motion.select>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="bg-primary text-white px-4 py-2 rounded shadow"
          style={{ border: "none" }}
        >
          📤 Upload
        </motion.button>
      </form>
    </motion.div>
  );
};

export default UploadNotes;
