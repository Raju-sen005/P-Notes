import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

const QuizAttempt = () => {
  const { id } = useParams(); // quizId
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await API.get(`/quizzes/${id}`);
        setQuiz(res.data);
      } catch (err) {
        setError("Failed to load quiz");
      }
    };
    fetchQuiz();
  }, [id]);

  const handleOptionChange = (questionIndex, selected) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: selected }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedAnswers = Object.entries(answers).map(([questionIndex, selected]) => ({
      questionIndex: Number(questionIndex),
      selected,
    }));

    try {
      const res = await API.post(`/quizzes/attempt/${id}`, { answers: formattedAnswers });
      setResult(res.data);
    } catch (err) {
      setError("Failed to submit quiz");
    }
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!quiz) return <p>Loading quiz...</p>;
  if (result)
    return (
      <div>
        <h2>✅ Quiz Result</h2>
        <p>Score: {result.score} / {result.total}</p>
      </div>
    );

  return (
    <div style={{ padding: "20px" }}>
      <h2>🧠 Attempt Quiz: {quiz.title}</h2>
      <form onSubmit={handleSubmit}>
        {quiz.questions.map((q, i) => (
          <div key={i}>
            <p><strong>Q{i + 1}:</strong> {q.question}</p>
            {q.options.map((opt, j) => (
              <div key={j}>
                <label>
                  <input
                    type="radio"
                    name={`question-${i}`}
                    value={opt}
                    checked={answers[i] === opt}
                    onChange={() => handleOptionChange(i, opt)}
                  />
                  {opt}
                </label>
              </div>
            ))}
            <hr />
          </div>
        ))}
        <button type="submit">Submit Quiz</button>
      </form>
    </div>
  );
};

export default QuizAttempt;
