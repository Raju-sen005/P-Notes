import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await API.get("/courses");
        setCourses(res.data);
      } catch (err) {
        console.error("Failed to load courses");
      }
    };

    fetchCourses();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📚 All Courses</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {courses.map((course) => (
          <div
            key={course._id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              borderRadius: "8px",
              width: "250px",
              background: "#f9f9f9"
            }}
          >
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <Link to={`/courses/${course._id}`}>📄 View Content</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
