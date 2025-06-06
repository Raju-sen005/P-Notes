import React, { useState, useEffect } from "react";
import axios from "axios";

const AddQuizForm = ({ onAdd, onClose }) => {
  const [courseId, setCourseId] = useState("");
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [courses, setCourses] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("/api/admin/courses", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCourses(res.data?.data || []))
      .catch((err) => console.error("Course fetch failed", err));
  }, [token]);

  const handleOptionChange = (value, index) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      courseId,
      title,
      questions: [
        {
          question,
          options,
          correctAnswer
        }
      ]
    };

    try {
      await axios.post("/api/admin/quizzes", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onAdd();
      onClose();
    } catch (error) {
      console.error("Quiz save failed", error);
      alert("Save failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded w-96 space-y-4" style={{
        display: "flex",
        flexDirection: "column",
        width: "50%",
        textAlign: "center",
        margin: "auto"
      }}>
        <h2 className="text-lg font-semibold">Add New Quiz</h2>

        <select
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          required
          className="w-full border p-2 rounded"
          style={{
            marginBottom: "10px"
          }}
        >
          <option value="">Select Course</option>
          {courses.map((c) => (
            <option key={c._id} value={c._id}>
              {c.title}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border p-2 rounded"
          style={{
            marginBottom: "10px"
          }}
        />

        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
          className="w-full border p-2 rounded"
          style={{
            marginBottom: "10px"
          }}
        />

        {options.map((opt, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Option ${index + 1}`}
            value={opt}
            onChange={(e) => handleOptionChange(e.target.value, index)}
            className="w-full border p-2 rounded"
            style={{
              marginBottom: "10px"
            }}
          />
        ))}

        <input
          type="text"
          placeholder="Correct Answer"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          required
          className="w-full border p-2 rounded"
          style={{
            marginBottom: "10px"
          }}
        />

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-3 py-1 bg-gray-400 text-white rounded" style={{
            background: "#198754",
            border: "1px solid #ccc",
            marginInline: "7px",
            color: "white"
          }}>
            Cancel
          </button>
          <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded" style={{
            background: "#198754",
            border: "1px solid #ccc",
            marginInline: "7px",
            color: "white"
          }}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddQuizForm;
