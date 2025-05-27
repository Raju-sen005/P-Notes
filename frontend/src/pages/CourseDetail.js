import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

const CourseDetail = () => {
  const { id } = useParams(); // courseId from URL
  const [notes, setNotes] = useState([]);
  const [quizzes, setQuizzes] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const notesRes = await API.get(`/notes?course=${id}`);
        setNotes(notesRes.data);

        const quizRes = await API.get(`/quizzes/${id}`);
        setQuizzes(quizRes.data);
      } catch (err) {
        setError("Failed to load course content");
      }
    };

    fetchContent();
  }, [id]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📚 Course Content</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <h3>📄 Notes</h3>
      {notes.length > 0 ? (
        notes.map((note) => (
          <div key={note._id} style={{ marginBottom: "10px" }}>
            <p><strong>{note.subject}</strong> - {note.topic}</p>
            <a href={note.pdfUrl} target="_blank" rel="noopener noreferrer">Download PDF</a>
          </div>
        ))
      ) : (
        <p>No notes found.</p>
      )}

      <h3>🧠 Quiz</h3>
      {quizzes && quizzes.questions ? (
        <a href={`/quiz/${quizzes._id}`}>Attempt Quiz</a>
      ) : (
        <p>No quiz available.</p>
      )}
    </div>
  );
};

export default CourseDetail;
