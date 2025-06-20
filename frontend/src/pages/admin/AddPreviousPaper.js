import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const AddPreviousPaper = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    year: "",
  });
  const [pdfFile, setPdfFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "pdfFile") {
      setPdfFile(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("year", formData.year);
    if (pdfFile) data.append("pdfFile", pdfFile);

    try {
      await axios.post("https://p-notes-backend.onrender.com/api/previous-papers", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("✅ Previous year paper added successfully!");
      setFormData({ title: "", description: "", year: "" });
      setPdfFile(null);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to add previous year paper");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="d-flex flex-column max-w-xl mx-auto bg-transparent shadow-lg rounded p-6 space-y-4"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{padding:"11px"}}
    >
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">
        📄 Add Previous Year Paper
      </h2>

      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        className="border mb-2 px-3 py-2 rounded"
        required
      />
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className=" border mb-2 px-3 py-2 rounded"
        required
      />
      <input
        type="text"
        name="year"
        value={formData.year}
        onChange={handleChange}
        placeholder="Year"
        className="border mb-2 px-3 py-2 rounded"
        required
      />
      <input
        type="file"
        name="pdfFile"
        onChange={handleChange}
        accept="application/pdf"
        className="border px-3 py-2 rounded"
        required
      />

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="mt-4 m-auto  px-1 py-1 rounded text-white bg-primary"
        style={{ background: "#0D6EFD", border: "transparent",width:"16%" }}
      >
        Add Previous Paper
      </motion.button>

      {message && (
        <motion.p
          className="text-center mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {message}
        </motion.p>
      )}
    </motion.form>
  );
};

export default AddPreviousPaper;
