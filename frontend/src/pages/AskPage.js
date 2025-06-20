import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion"; // ✅ Import Framer Motion

const AskPage = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAsk = async () => {
    if (!question.trim()) {
      setError("Please enter a question.");
      return;
    }
    setLoading(true);
    setAnswer("");
    setError("");

    try {
      const res = await axios.post("https://p-notes-backend.onrender.com/api/ask", { question });
      setAnswer(res.data.answer);
    } catch {
      setError("❌ Failed to get answer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-transparent  flex items-center justify-center p-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="w-full max-w-xl bg-transparent rounded-lg shadow-lg p-6 d-flex flex-column"
       
         style={{
        minHeight: "100vh",
        width: "100%",
        padding: "11px",
        // backgroundImage: "url(https://img.freepik.com/free-vector/gradient-abstract-wireframe-background_23-2149009903.jpg?uid=R196801159&ga=GA1.1.1714141213.1744818376&semt=ais_hybrid&w=740)",
         backgroundImage: "url(https://img.freepik.com/free-vector/orange-question-mark-background-with-text-space_1017-27394.jpg?uid=R196801159&ga=GA1.1.1714141213.1744818376&semt=ais_hybrid&w=740)",
        backgroundSize: "cover",
        zIndex: 1,
      }}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="text-3xl font-bold text-center mb-6 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Ask a Pharmacy Question
        </motion.h1>

        <motion.textarea
          className="w-full p-4 bg-transparent text-white rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          style={{border:"1px solid #ccc"}}
          rows={5}
          placeholder="Type your question here..."
          value={question}
          onChange={(e) => {
            setQuestion(e.target.value);
            setError("");
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        />

        <AnimatePresence>
          {error && (
            <motion.p
              className="mt-2 text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <motion.button
          onClick={handleAsk}
          disabled={loading}
          whileTap={{ scale: 0.95 }}
          className={`mt-4 py-0 rounded bg-primary font-semibold text-white transition 
            ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
          style={{ border: "transparent",width:"11%" }}
        >
          {loading ? "Thinking..." : "Get Answer"}
        </motion.button>

        <AnimatePresence>
          {answer && (
            <motion.div
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="p-4 bg-transparent rounded">
                <h2 className="font-semibold text-primary-700 mb-2">AI Answer:</h2>
                <p className="text-gray-800">{answer}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default AskPage;
