import React, { useState } from "react";
import API from "../../api/axios";

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
setMessage("Note uploaded successfully!");

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
      setMessage(err.response?.data?.msg || "Upload failed.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Upload Notes</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        /><br />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        /><br />
        <input
          type="text"
          name="courseId"
          placeholder="Course ID"
          value={formData.courseId}
          onChange={handleChange}
          required
        /><br />
        <input
          type="text"
          name="pdfUrl"
          placeholder="PDF URL"
          value={formData.pdfUrl}
          onChange={handleChange}
          required
        /><br />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
        /><br />
        <input
          type="text"
          name="topic"
          placeholder="Topic"
          value={formData.topic}
          onChange={handleChange}
        /><br />
        <select
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select><br />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadNotes;