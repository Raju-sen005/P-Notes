import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/courses")
      .then(res => setCourses(res.data))
      .catch(err => console.error("Failed to load courses", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen  py-12 px-4 text-white "
    
      style={{
        minHeight: "100vh",
        width: "100%",
        padding: "11px",
        // backgroundImage: "url(https://img.freepik.com/free-vector/gradient-abstract-wireframe-background_23-2149009903.jpg?uid=R196801159&ga=GA1.1.1714141213.1744818376&semt=ais_hybrid&w=740)",
         backgroundImage: "url(https://img.freepik.com/free-photo/painted-solid-concrete-wall-textured-background_53876-101638.jpg?uid=R196801159&ga=GA1.1.1714141213.1744818376&semt=ais_hybrid&w=740)",
        backgroundSize: "cover",
        zIndex: 1,
      }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-blue-800 mb-10 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          📚 All Pharmacy Courses
        </motion.h2>

        {loading ? (
          <motion.p
            className="text-center text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Loading courses…
          </motion.p>
        ) : courses.length === 0 ? (
          <motion.p
            className="text-center text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No courses found.
          </motion.p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {courses.map((course, index) => (
                <motion.div
                  key={course._id}
                  className="bg-transparent rounded shadow-lg hover:shadow-xl transition p-6 d-flex flex-column mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  style={{ padding: "10px" }}
                >
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-4 flex-grow">
                    {course.description}
                  </p>
                  <Link
                    to={`/courses/${course._id}`}
                    className="mt-auto inline-block text-center bg-primary text-white py-0 px-0 rounded hover:bg-blue-700 transition font-medium shadow text-decoration-none"
                    style={{ width: "12%" }}
                  >
                    View Content
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
