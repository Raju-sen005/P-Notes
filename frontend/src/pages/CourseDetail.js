import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const CourseDetails = () => {
  const { id } = useParams();
  const [notes, setNotes] = useState([]);
  const [courseTitle, setCourseTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseAndNotes = async () => {
      try {
        const courseRes = await axios.get(`http://localhost:5000/api/courses/${id}`);
        setCourseTitle(courseRes.data.title);

        const notesRes = await axios.get(`http://localhost:5000/api/notes/course/${id}`);
        setNotes(notesRes.data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourseAndNotes();
  }, [id]);

  return (
    <div className="min-h-screen  py-8 px-4" style={{
      backgroundImage: "url(https://img.freepik.com/free-photo/crayons-open-notebook_23-2147623636.jpg?uid=R196801159&ga=GA1.1.1714141213.1744818376&semt=ais_hybrid&w=740)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      backgroundRepeat: 'no-repeat',
      zIndex: 1,
    }}>
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-center text-green-700 mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          📑 Notes for: <span className="text-blue-600">{courseTitle}</span>
        </motion.h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading notes…</p>
        ) : notes.length === 0 ? (
          <motion.p
            className="text-center text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No notes available for this course.
          </motion.p>
        ) : (
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 d-flex"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            {notes.map((note) => {
              const filename = note.pdfUrl.split("/").pop();
              const downloadUrl = `http://localhost:5000/api/notes/download/${filename}`;

              return (
                <motion.div
                  key={note._id}
                  className="w-50 bg-transparent rounded shadow hover:shadow-lg transition p-6 d-flex flex-column "
                  style={{
                    padding: "18px"

                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div>
                    <h5 className="text-xl font-semibold mb-2 text-gray-800">{note.title}</h5>
                    <p className="text-gray-600 mb-4">
                      <strong>Subject:</strong> {note.subject}
                    </p>
                  </div>
                  <a
                    href={downloadUrl}
                    className="mt-auto inline-block text-center bg-primary text-white py-0 px-0 rounded hover:bg-green-700 transition text-decoration-none border"
                    style={{ width: "25%" }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download PDF
                  </a>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
