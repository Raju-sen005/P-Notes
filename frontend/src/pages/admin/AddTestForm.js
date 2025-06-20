import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const AddTestForm = () => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    courseId: "",
    title: "",
    questions: [
      {
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "",
      },
    ],
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("/api/courses").then((res) => setCourses(res.data));
  }, []);

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index][field] = value;
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[qIndex].options[optIndex] = value;
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        {
          question: "",
          options: ["", "", "", ""],
          correctAnswer: "",
        },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://p-notes-backend.onrender.com/api/tests", formData);
      setMessage("✅ Test added successfully!");
    } catch (error) {
      setMessage("❌ Failed to add test.");
    }
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto p-6 bg-transparent rounded shadow text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4">📘 Add New Test</h2>
      {message && <p className="mb-4 text-green-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div>
          <label className="block font-medium mb-1">Subject (Course):</label>
          <select
            value={formData.courseId}
            onChange={(e) =>
              setFormData({ ...formData, courseId: e.target.value })
            }
            required
            className="w-full border p-2 rounded"
          >
            <option value="">-- Select Course --</option>
            {courses.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Test Title:</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-2">Questions:</h4>
          <AnimatePresence>
            {formData.questions.map((q, qIndex) => (
              <motion.div
                key={qIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="border p-4 rounded mb-4"
              >
                <input
                  type="text"
                  placeholder={`Question ${qIndex + 1}`}
                  value={q.question}
                  onChange={(e) =>
                    handleQuestionChange(qIndex, "question", e.target.value)
                  }
                  required
                  className="w-full border p-2 rounded mb-2"
                />
                <div className="grid grid-cols-2 gap-2 mb-2">
                  {q.options.map((opt, optIndex) => (
                    <input
                      key={optIndex}
                      type="text"
                      placeholder={`Option ${optIndex + 1}`}
                      value={opt}
                      onChange={(e) =>
                        handleOptionChange(qIndex, optIndex, e.target.value)
                      }
                      required
                      className="border p-2 rounded"
                    />
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Correct Answer"
                  value={q.correctAnswer}
                  onChange={(e) =>
                    handleQuestionChange(qIndex, "correctAnswer", e.target.value)
                  }
                  required
                  className="w-full border p-2 rounded"
                />
              </motion.div>
            ))}
          </AnimatePresence>

          <motion.button
            type="button"
            onClick={addQuestion}
            whileHover={{ scale: 1.05 }}
            className="bg-blue-600 text-white px-4 py-2 rounded shadow"
            style={{ background: "#0D6EFD" }}
          >
            ➕ Add Another Question
          </motion.button>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          type="submit"
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded shadow"
          style={{ background: "#0D6EFD", border: "none" }}
        >
          ✅ Submit Test
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AddTestForm;
