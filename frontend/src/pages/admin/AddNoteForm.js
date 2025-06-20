import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const AddNoteForm = ({ onAdd, onClose }) => {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [pdf, setPdf] = useState(null);
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("/api/admin/courses", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const courseList = res.data?.data || [];
        setCourses(courseList);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch courses:", err);
        setError("⚠️ Courses load नहीं हो पा रहे हैं।");
        setCourses([]);
        setLoading(false);
      });
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pdf) return alert("कृपया PDF फ़ाइल चुनें।");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subject", subject);
    formData.append("course", course);
    formData.append("pdf", pdf);

    try {
      const { data } = await axios.post("/api/admin/notes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      onAdd(data);
      onClose();
    } catch (err) {
      alert("Note upload करने में विफल ❌");
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0, y: -30 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: -30 }}
      transition={{ duration: 0.3 }}
      className="max-w-xl mx-auto bg-transparent shadow-lg rounded p-6 space-y-5 d-flex flex-column text-center z-50 relative"
      style={{padding:"11px"}}
    >
      <h2 className="text-2xl font-bold text-center text-blue-700"> Upload New Note</h2>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="mb-2">
        <label className="block text-sm font-medium mb-1 mx-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter note title"
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
        />
      </div>

      <div className="mb-2">
        <label className="block text-sm font-medium mb-1 mx-2" style={{ position: "relative", left: "-10px" }}>
          Subject
        </label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Enter subject name"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
          style={{ position: "relative", left: "-10px" }}
        />
      </div>

      <div className="mb-2">
        <label className="block text-sm font-medium mb-1 mx-2" style={{ position: "relative", left: "-28px" }}>
          Select Course
        </label>
        {loading ? (
          <p className="text-gray-500">⏳ Loading courses...</p>
        ) : courses.length === 0 ? (
          <p className="text-red-500">❌ कोई course नहीं मिला। पहले course जोड़ें।</p>
        ) : (
          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400 mx-2"
            style={{ position: "relative", left: "-31px",width:"22%" }}
          >
            <option value="">-- Select Course --</option>
            {courses.map((c) => (
              <option key={c._id} value={c._id}>
                {c.title}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="mb-2">
        <label className="block text-sm font-medium mb-1 mx-2" style={{ position: "relative", left: "-28px" }}>
          Upload PDF
        </label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setPdf(e.target.files[0])}
          required
          className="w-full px-3 py-2 border rounded file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          style={{ position: "relative", left: "-25px", width:"22%" }}
        />
      </div>

      <div className="flex justify-end space-x-3 mt-4">
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-green-600 hover:bg-green-700 text-white px-1 py-1 rounded shadow"
          disabled={courses.length === 0}
          style={{ background: "#0D6EFD", border: "transparent", marginInline: "11px" }}
        >
          Upload
        </motion.button>
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          onClick={onClose}
          className="bg-gray-500 hover:bg-gray-600 text-white px-1 py-1 rounded shadow"
          style={{ background: "#0D6EFD", border: "transparent" }}
        >
          Cancel
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AddNoteForm;
