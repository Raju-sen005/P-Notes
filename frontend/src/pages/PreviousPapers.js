import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion"; // ✅ Framer Motion

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const PreviousPapers = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://p-notes-backend.onrender.com/api/previous-papers")
      .then((res) => setPapers(res.data.papers))
      .catch((err) => {
        console.error("Error fetching papers:", err);
        setError("Failed to load papers.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <motion.p
        className="p-5 text-center text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        Loading previous papers...
      </motion.p>
    );

  if (error)
    return (
      <motion.p
        className="p-5 text-center text-red-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {error}
      </motion.p>
    );

  return (
    <div className="min-h-screen  py-8 px-4" 
     style={{
        minHeight: "100vh",
        width: "100%",
        padding: "11px",
        // backgroundImage: "url(https://img.freepik.com/free-vector/gradient-abstract-wireframe-background_23-2149009903.jpg?uid=R196801159&ga=GA1.1.1714141213.1744818376&semt=ais_hybrid&w=740)",
         backgroundImage: "url(https://img.freepik.com/free-photo/colorful-pencils-concept-with-copy-space_23-2148812400.jpg?uid=R196801159&ga=GA1.1.1714141213.1744818376&semt=ais_hybrid&w=740)",
        backgroundSize: "cover",
        zIndex: 1,
      }}>
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl font-bold mb-6 text-center text-blue-700"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          📄 Previous Year Papers
        </motion.h2>

        {papers.length === 0 ? (
          <motion.p
            className="text-center text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            No previous papers found.
          </motion.p>
        ) : (
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridGap: "2rem",
            }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {papers.map((paper) => (
              <motion.div
                key={paper._id}
                className="bg-transparent rounded shadow hover:shadow-lg transition d-flex flex-column p-6"
                style={{ padding: "18px", cursor: "pointer" }}
                variants={cardVariants}
                transition={{ duration: 0.4 }}
                whileHover={{ scale: 1.03 }}
              >
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    {paper.title}{" "}
                    <span className="text-gray-500">({paper.year})</span>
                  </h3>
                  <p className="text-gray-600 mb-4">{paper.description}</p>
                </div>
                {paper.pdfUrl ? (
                  <a
                    href={`https://p-notes-backend.onrender.com${paper.pdfUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto bg-primary text-white py-1 px-1 rounded text-center hover:bg-blue-700 transition text-decoration-none"
                    style={{ width: "44%" }}
                  >
                    Download PDF
                  </a>
                ) : (
                  <p className="mt-auto text-gray-500">PDF not available</p>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PreviousPapers;
