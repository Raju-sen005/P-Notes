import React, { useEffect, useState } from "react";
import axios from "axios";

const QuizPage = ({ selectedCourseId }) => {
  const [tests, setTests] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (selectedCourseId) {
      axios.get(`/api/tests/by-course/${selectedCourseId}`)
        .then(res => {
          setTests(res.data);
          setAnswers({});
          setSubmitted(false);
          setScore(0);
        })
        .catch(err => console.error("Failed to load tests", err));
    }
  }, [selectedCourseId]);

  const handleOptionChange = (tIdx, qIdx, opt) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [`${tIdx}-${qIdx}`]: opt }));
  };

  const handleSubmit = () => {
    let total = 0, max = 0;
    tests.forEach((t, ti) =>
      t.questions.forEach((q, qi) => {
        max++;
        if (answers[`${ti}-${qi}`] === q.correctAnswer) total++;
      })
    );
    setScore(total);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        {tests.length === 0 ? (
          <p className="text-center text-gray-600">No test available for this course.</p>
        ) : (
          <>
            {tests.map((test, ti) => (
              <div key={ti} className="bg-white p-6 rounded-xl shadow-md space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">{test.title}</h3>
                {test.questions.map((q, qi) => {
                  const key = `${ti}-${qi}`;
                  const selected = answers[key];
                  const correct = q.correctAnswer;
                  return (
                    <fieldset key={qi} className="space-y-2">
                      <legend className="font-medium text-gray-700">
                        Q{qi + 1}. {q.question}
                      </legend>
                      <div className="space-y-2">
                        {q.options.map((opt, oi) => {
                          const isSelected = selected === opt;
                          const isCorrect = submitted && opt === correct;
                          const isWrong = submitted && isSelected && opt !== correct;
                          const base = "block w-full text-left px-4 py-2 rounded-lg border transition";
                          const state = submitted
                            ? isCorrect
                              ? "bg-green-100 border-green-400 text-green-800"
                              : isWrong
                              ? "bg-red-100 border-red-400 text-red-800"
                              : "bg-gray-100 border-gray-300 text-gray-800"
                            : isSelected
                            ? "bg-blue-50 border-blue-400 text-blue-800"
                            : "bg-white border-gray-300 hover:bg-gray-100";
                          return (
                            <label
                              key={oi}
                              className={`${base} ${state}`}
                              onClick={() => handleOptionChange(ti, qi, opt)}
                            >
                              <input
                                type="radio"
                                name={key}
                                className="form-radio mr-3"
                                checked={isSelected}
                                readOnly
                              />
                              {opt}
                              {submitted && isCorrect && " ✔️"}
                              {submitted && isWrong && " ❌"}
                            </label>
                          );
                        })}
                      </div>
                    </fieldset>
                  );
                })}
              </div>
            ))}

            {!submitted ? (
              <button
                onClick={handleSubmit}
                className="block w-full py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
              >
                Submit All Tests
              </button>
            ) : (
              <div className="p-4 bg-green-50 text-center rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">✅ Your Score</h3>
                <p className="text-xl">{score} / {tests.reduce((sum, t) => sum + t.questions.length, 0)}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default QuizPage;