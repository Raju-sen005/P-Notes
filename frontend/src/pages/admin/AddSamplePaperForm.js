import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const AddSamplePaper = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    externalLink: "",
  });
  const [pdfFile, setPdfFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pdfFile && !formData.externalLink.trim()) {
      setMessage("Please provide either a PDF file or an external link.");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);

    if (formData.externalLink.trim()) {
      data.append("externalLink", formData.externalLink);
    }

    if (pdfFile) {
      data.append("pdfFile", pdfFile);
    }

    try {
      await axios.post("https://p-notes-backend.onrender.com/api/sample-papers", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("Sample paper uploaded successfully!");
      setFormData({ title: "", description: "", externalLink: "" });
      setPdfFile(null);
    } catch (err) {
      console.error(err);
      setMessage("Failed to upload sample paper.");
    }
  };

  return (
    <motion.div
      className="p-5 max-w-xl mx-auto  rounded shadow text-center bg-transparent"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-bold mb-4">📄 Add Sample Paper</h2>
      {message && <p className="mb-2 text-green-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded mb-2 mx-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" style={{ position: "absolute", left: "33%" }}>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded  mx-2"
            style={{
              position: "relative",
              left: "15px",
              width: "22%"
            }}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" style={{ position: "absolute", left: "25%" }}>External Link (optional)</label>
          <input
            type="url"
            name="externalLink"
            value={formData.externalLink}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2 mx-2"
            style={{ position: "relative", left: "15px" }}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium"style={{    position: "absolute",
    left: "22.5%"}}>Upload PDF File (optional)</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="w-full p-2 border rounded mb-2  mx-2"
            style={{
              position: "relative",
              left: "15px",
              width: "22%"
            }}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          type="submit"
          className="bg-green-600 text-white px-1 py-1 rounded shadow"
          style={{ background: "#0D6EFD", border: "transparent" }}
        >
          Upload
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AddSamplePaper;