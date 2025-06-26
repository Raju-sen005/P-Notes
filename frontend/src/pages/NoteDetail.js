import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const NotesDetail = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("https://p-notes-backend.onrender.com/api/notes");
        setNotes(res.data);
      } catch (err) {
        console.error("Error fetching notes", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen py-10 px-4 "
      style={{
        minHeight: "100vh",
        width: "100%",
        padding: "11px",
        // backgroundImage: "url(https://img.freepik.com/free-vector/gradient-abstract-wireframe-background_23-2149009903.jpg?uid=R196801159&ga=GA1.1.1714141213.1744818376&semt=ais_hybrid&w=740)",
          backgroundImage: "url(https://img.freepik.com/free-photo/crayons-open-notebook_23-2147623636.jpg?uid=R196801159&ga=GA1.1.1714141213.1744818376&semt=ais_hybrid&w=740)",
        backgroundSize: "cover",
        zIndex: 1,
      }}>
      <div className="max-w-7xl mx-auto " style={{ padding: "11px" }}>
        <motion.h2
          className="text-4xl font-bold text-blue-800 mb-11 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          All Pharmacy Notes
        </motion.h2>

        {loading ? (
          <motion.p
            className="text-center text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Loading notes...
          </motion.p>
        ) : !notes.length ? (
          <motion.p
            className="text-center text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No notes found.
          </motion.p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {notes.map((note, index) => {
                const filename = note.pdfUrl.split("/").pop();
                const downloadUrl = `https://p-notes-backend.onrender.com/api/notes/download/${filename}`;

                return (
                  <motion.div
                    key={note._id}
                    className="bg-transparent rounded shadow-lg hover:shadow-xl transition p-6 d-flex flex-column"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    style={{ padding: "10px" }}
                  >
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">
                      {note.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      <strong>Subject:</strong> {note.subject}
                    </p>
                    <a
                      href={downloadUrl}
                      className="mt-auto inline-block bg-primary text-white text-center py-0 px-0 rounded hover:bg-blue-700 transition text-decoration-none "
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ width: '12%' }}
                    >
                      Download PDF
                    </a>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesDetail;