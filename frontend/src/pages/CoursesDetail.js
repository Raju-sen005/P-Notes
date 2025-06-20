import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`https://p-notes-backend.onrender.com/api/courses/${id}`);
        setCourse(res.data);
      } catch (err) {
        console.error("Course not found", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <p className="text-gray-600">Loading course details…</p>
    </div>
  );
  if (!course) return (
    <p className="text-center mt-10 text-gray-600">Course not found</p>
  );

  const filename = course.fileUrl?.split("/").pop();
  const downloadUrl = `https://p-notes-backend.onrender.com/api/courses/download/${filename}`;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-6">
        <header className="text-center">
          <h2 className="text-3xl font-bold text-green-700 mb-2">{course.title}</h2>
          <p className="text-gray-600">{course.description}</p>
        </header>

        {course.imageUrl && (
          <img
            src={course.imageUrl}
            alt={course.title}
            className="w-full rounded-lg object-cover max-h-64"
          />
        )}

        <div className="space-y-4">
          {course.details && course.details.map((detail, idx) => (
            <p key={idx} className="text-gray-700 leading-relaxed">{detail}</p>
          ))}
        </div>

        <div className="text-center">
          <a
            href={downloadUrl}
            download
            className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-semibold rounded-full shadow hover:bg-green-700 transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            📥 Download Course PDF
          </a>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
