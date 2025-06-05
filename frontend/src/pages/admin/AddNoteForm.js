import React, { useState, useEffect } from "react";
import axios from "axios";

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
        console.log("Course API Response:", res.data);
        const courseList = res.data?.data || [];
        setCourses(courseList);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch courses:", err);
        setError("Failed to load courses.");
        setCourses([]);
        setLoading(false);
      });
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pdf) return alert("Please upload a PDF file.");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subject", subject);
    formData.append("course", course);
    formData.append("pdf", pdf);

    try {
      const { data } = await axios.post("/api/admin/notes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}` },
      });
      onAdd(data);
      onClose();
    } catch (err) {
      alert("Failed to upload note");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
      <h2 className="text-xl font-bold">📝 Upload Note</h2>

      {error && <p className="text-red-600">{error}</p>}

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full border px-2 py-1"
      />

      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="w-full border px-2 py-1"
      />

      {loading ? (
        <p>Loading courses...</p>
      ) : courses.length === 0 ? (
        <p className="text-red-500">⚠️ No courses found. Please add a course first.</p>
      ) : (
        <select
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          required
          className="w-full border px-2 py-1"
        >
          <option value="">Select Course</option>
          {courses.map((c) => (
            <option key={c._id} value={c._id}>
              {c.title}
            </option>
          ))}
        </select>
      )}

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setPdf(e.target.files[0])}
        required
        className="w-full border px-2 py-1"
      />

      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-1 rounded"
          disabled={courses.length === 0}
        >
          Upload
        </button>
        <button onClick={onClose} className="text-red-600 px-4 py-1">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddNoteForm;
