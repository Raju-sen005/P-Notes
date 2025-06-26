import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const AllQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userAnswers, setUserAnswers] = useState({});

  useEffect(() => {
    axios.get("https://p-notes-backend.onrender.com/api/quizzes")
      .then(res => setQuizzes(res.data))
      .catch(err => console.error("Failed to fetch quizzes", err))
      .finally(() => setLoading(false));
  }, []);

  const handleAnswer = (quizId, qIndex, selectedOption) => {
    const key = `${quizId}_${qIndex}`;
    setUserAnswers(prev => ({ ...prev, [key]: selectedOption }));
  };

  if (loading) return <p className="text-center mt-8 text-gray-600 animate-pulse">Loading quizzes…</p>;
  if (!quizzes.length) return <p className="text-center mt-8 text-gray-700">No quizzes found.</p>;

  let globalQCounter = 1;

  return (
    <div
      className="min-h-screen py-12 px-4 bg-gradient-to-br from-purple-50 to-white"
      style={{ fontFamily: 'Poppins, sans-serif',
      backgroundImage:"url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs0owmgC0HDeKSQ8Kh_DU9HkNCNT5axib6gQ&s)",
      // backgroundColor:"#0D6EFD",
      backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: 'no-repeat',
        zIndex: 1, }}
    >
      <motion.h2
        className="text-4xl font-bold text-center text-white mb-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
         Interactive Quizzes
      </motion.h2>

      <div className="max-w-5xl mx-auto space-y-10">
        {quizzes.map((quiz, idx) => (
          <motion.div
            key={quiz._id}
            className="bg-transparent p-6 rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 "
            style={{padding:"11px",border:"transparent"}}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            {quiz.questions.map((q, qIdx) => {
              const key = `${quiz._id}_${qIdx}`;
              const selected = userAnswers[key];
              const correct = q.correctAnswer;
              const currentQNumber = globalQCounter++;

              return (
                <div key={key} className="mb-6">
                  <motion.p
                    className="font-semibold text-lg text-white mb-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    Q{currentQNumber}. {q.question}
                  </motion.p>

                  <div className="grid grid-cols-1 gap-3 d-flex flex-column">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selected === opt;
                      const showFeedback = selected !== undefined;
                      const isCorrect = opt === correct && isSelected;
                      const isMissed = opt === correct && selected && !isSelected;

                      const baseClasses = "cursor-pointer px-2 py-1 rounded-xl  transition-all duration-300 bg-transparent text-white";
                      const stateClasses = showFeedback
                        ? isCorrect
                          ? "bg-green-100 border-green-400 text-green-800"
                          : isMissed
                            ? "bg-yellow-100 border-yellow-400 text-yellow-800"
                            : isSelected
                              ? "bg-red-100 border-red-400 text-red-800"
                              : "bg-gray-100 border-gray-200 text-gray-800 hover:bg-gray-200"
                        : "bg-white border-gray-300 text-gray-700 hover:bg-purple-100";

                      return (
                        <motion.label
                          key={optIdx}
                          className={`${baseClasses} ${stateClasses} flex items-center gap-2`}
                          whileHover={{ scale: !showFeedback ? 1.02 : 1 }}
                          onClick={() => !selected && handleAnswer(quiz._id, qIdx, opt)}
                        >
                          {/* <input
                            type="radio"
                            name={key}
                            value={opt}
                            checked={isSelected}
                            readOnly
                            className="hidden"
                          /> */}
                          <span className="flex-grow">{opt}</span>
                          {showFeedback && isSelected && (isCorrect ? "✔️" : "❌")}
                          {showFeedback && isMissed && "✅"}
                        </motion.label>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AllQuizzes;