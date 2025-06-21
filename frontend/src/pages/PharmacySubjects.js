import React, { useState } from "react";
import axios from "axios";
import { ChevronDown, ChevronUp, Loader } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // ✅ Import Framer Motion

const PharmacySubjectsPage = () => {
  const [expandedSubjects, setExpandedSubjects] = useState({});
  const [loadingSubjects, setLoadingSubjects] = useState({});

  const subjects = [
    "Human Anatomy & Physiology",
    "Pharmaceutical Analysis",
    "Pharmaceutics",
    "Pharmaceutical Chemistry",
    "Pharmacology",
    "Pharmacognosy",
    "Biochemistry",
    "Pathophysiology",
    "Microbiology",
    "Pharmaceutical Jurisprudence",
    "Pharmaceutical Engineering",
    "Industrial Pharmacy",
    "Medicinal Chemistry",
    "Hospital & Clinical Pharmacy",
    "Biopharmaceutics & Pharmacokinetics",
    "Pharmacy Practice",
    "Quality Assurance",
    "Herbal Drug Technology",
    "Pharmaceutical Biotechnology",
    "Pharmacoepidemiology & Pharmacoeconomics",
  ];

  const toggleSubject = async (subject) => {
    if (expandedSubjects[subject]) {
      setExpandedSubjects((prev) => ({ ...prev, [subject]: null }));
    } else {
      setLoadingSubjects((prev) => ({ ...prev, [subject]: true }));
      try {
        const res = await axios.get(`https://p-notes-backend.onrender.com/api/quizzes?subject=${subject}`);
        setExpandedSubjects((prev) => ({ ...prev, [subject]: res.data }));
      } catch (err) {
        console.error("Failed to fetch quizzes", err);
        setExpandedSubjects((prev) => ({ ...prev, [subject]: [] }));
      } finally {
        setLoadingSubjects((prev) => ({ ...prev, [subject]: false }));
      }
    }
  };

  return (
    <div className="min-h-screen p-6" style={{
      backgroundImage: "url(https://img.freepik.com/premium-vector/design-vector-back-school-text-chalkboard-doodle-handdrawn-education-icon-text-space_138943-13.jpg?uid=R196801159&ga=GA1.1.1714141213.1744818376&semt=ais_hybrid&w=740)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      backgroundRepeat: 'no-repeat',
      zIndex: 1,
    }}>
      <motion.h1
        className="text-4xl font-bold text-center text-white mb-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        📚 Pharmacy Subjects
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {subjects.map((subject, index) => (
          <motion.div
            key={index}
            className="bg-transparent text-white m-auto rounded shadow hover:shadow-lg transition duration-300 mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.03 }}
            whileHover={{ scale: 1.02 }}
            style={{ padding: "15px", }}
          >
            <div
              onClick={() => toggleSubject(subject)}
              className="cursor-pointer justify-between items-center p-5"
              style={{ display: "contents", }}>
              <p className="text-lg font-semibold text-gray-800">{subject}</p>
              {loadingSubjects[subject] ? (
                <Loader className="animate-spin text-blue-600" size={20} />
              ) : expandedSubjects[subject] ? (
                <ChevronUp className="text-blue-600" size={20} />
              ) : (
                <ChevronDown className="text-blue-600" size={20} />
              )}
            </div>

            <AnimatePresence>
              {expandedSubjects[subject] && (
                <motion.div
                  className="bg-blue-50 rounded-b-2xl px-5 py-4 border-t border-gray-200"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {expandedSubjects[subject].length === 0 ? (
                    <p className="text-sm text-gray-500 italic">No quizzes available.</p>
                  ) : (
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                      {expandedSubjects[subject].map((quiz, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          {quiz.question}
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PharmacySubjectsPage;
