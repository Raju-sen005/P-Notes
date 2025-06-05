import React, { useState, useEffect } from "react";
import axios from "axios";
import TestimonialForm from "./TestimonialForm";
import Testimonials from "./Testimonials";

const TestimonialPage = () => {
  const [testimonials, setTestimonials] = useState([]);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/testimonials");
      setTestimonials(response.data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const addTestimonial = (newTestimonial) => {
    setTestimonials((prevTestimonials) => [newTestimonial, ...prevTestimonials]);
  };

  return (
    <div>
      <Testimonials testimonials={testimonials} />
      <TestimonialForm onAdd={addTestimonial} />
    </div>
  );
};

export default TestimonialPage;