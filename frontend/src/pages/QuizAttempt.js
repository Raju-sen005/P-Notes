import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

const QuizAttempt = () => {
  const { id } = useParams(); // quizId
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    API.get(`/quizzes/${id}`)
      .then((res) => setQuiz(res.data))
      .catch(() => setError("Failed to load quiz"));
  }, [id]);

  const handleOptionChange = (qIdx, opt) => {
    setAnswers((prev) => ({ ...prev, [qIdx]: opt }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    const formatted = Object.entries(answers).map(([i, sel]) => ({
      questionIndex: +i,
      selected: sel,
    }));

    try {
      const res = await API.post(`/quizzes/attempt/${id}`, { answers: formatted });
      setResult(res.data);
    } catch {
      setError("Failed to submit quiz");
    } finally {
      setSubmitting(false);
    }
  };

  if (error) return <p className="text-red-600 text-center mt-6">{error}</p>;
  if (!quiz) return <p className="text-center mt-6">Loading quiz…</p>;
  if (result)
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-green-50 rounded-lg shadow text-center">
        <h2 className="text-2xl font-semibold mb-4">✅ Quiz Result</h2>
        <p className="text-lg">
          Score: <strong>{result.score}</strong> / {result.total}
        </p>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">🧠 {quiz.title}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {quiz.questions.map((q, i) => (
          <fieldset key={i} className="space-y-3">
            <legend className="font-medium text-gray-800">
              Q{i + 1}. {q.question}
            </legend>
            <div className="space-y-1">
              {q.options.map((opt, j) => (
                <label
                  key={j}
                  className={`flex items-center p-2 border rounded cursor-pointer transition
                  ${
                    answers[i] === opt
                      ? "bg-blue-100 border-blue-400"
                      : "bg-white border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name={`q-${i}`}
                    value={opt}
                    checked={answers[i] === opt}
                    onChange={() => handleOptionChange(i, opt)}
                    className="form-radio text-blue-600 mr-3"
                    required={!answers[i]}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}

        <button
          type="submit"
          disabled={
            submitting || quiz.questions.some((_, idx) => !(idx in answers))
          }
          className={`w-full py-3 font-semibold text-white rounded-lg transition
            ${
              submitting || quiz.questions.some((_, idx) => !(idx in answers))
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          {submitting
            ? "Submitting…"
            : quiz.questions.some((_, idx) => !(idx in answers))
            ? "Answer all questions"
            : "Submit Quiz"}
        </button>
      </form>
    </div>
  );
};

export default QuizAttempt;