import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion"; // ✅ Import Framer Motion

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

const SamplePapers = () => {
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    axios
      .get("https://p-notes-backend.onrender.com/api/sample-papers")
      .then((res) => setPapers(res.data))
      .catch((err) => console.error("Error fetching sample papers:", err));
  }, []);

  return (
    <div className="min-h-screen  py-8 px-4"
      
       style={{
        minHeight: "100vh",
        width: "100%",
        padding: "11px",
        // backgroundImage: "url(https://img.freepik.com/free-vector/gradient-abstract-wireframe-background_23-2149009903.jpg?uid=R196801159&ga=GA1.1.1714141213.1744818376&semt=ais_hybrid&w=740)",
         backgroundImage: "url(https://img.freepik.com/free-photo/close-up-laptop-pencils-printer-tray-with-blank-paper-yellow-background_23-2147875590.jpg?uid=R196801159&ga=GA1.1.1714141213.1744818376&semt=ais_hybrid&w=740)",
        backgroundSize: "cover",
        zIndex: 1,
      }}>
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-center text-blue-700 mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          📄 Sample Papers
        </motion.h2>

        {papers.length === 0 ? (
          <motion.p
            className="text-center text-gray-600 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            No sample papers found.
          </motion.p>
        ) : (
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 2fr 2fr",
              gridGap: "2rem",
            }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {papers.map((paper, idx) => (
              <motion.div
                key={idx}
                className="bg-transparent rounded shadow hover:shadow-lg transition p-6 d-flex flex-column"
                style={{ padding: "18px", cursor: "pointer" }}
                variants={cardVariants}
                transition={{ duration: 0.4 }}
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {paper.title}
                </h3>
                <p className="text-gray-600 mb-4 flex-grow">{paper.description}</p>

                <div className="mt-auto flex flex-wrap gap-2">
                  {paper.pdfUrl && (
                    <a
                      href={`http://localhost:5000${paper.pdfUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-primary text-white py-1 px-1 rounded hover:bg-green-700 transition text-decoration-none"
                      style={{ width: "20%", marginRight: "10px" }}
                    >
                      View PDF
                    </a>
                  )}
                  {paper.externalLink && (
                    <a
                      href={paper.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-primary text-white py-1 px-1 rounded hover:bg-green-700 transition text-decoration-none"
                      style={{ width: "20%" }}
                    >
                      Open Link
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SamplePapers;