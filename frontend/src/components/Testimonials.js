import React, { useEffect, useState } from "react";
import axios from "axios";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("✅ Testimonials component mounted");

    const fetchTestimonials = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/testimonials");

        console.log("📦 Response from server:", response.data);
        console.log("Is Array:", Array.isArray(response.data));

        if (Array.isArray(response.data)) {
          setTestimonials(response.data);
        } else {
          setTestimonials([]);
        }
      } catch (error) {
        console.error("❌ Error fetching testimonials:", error);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  console.log("🎯 Rendering component with testimonials:", testimonials);

  return (
    <div>
      {loading ? (
        <p>Loading testimonials...</p>
      ) : testimonials.length > 0 ? (
        testimonials.map((testimonial, index) => (
          <div key={index}>
            <p>"{testimonial.message}"</p>
            <p>- {testimonial.name} ({testimonial.tag})</p>
          </div>
        ))
      ) : (
        <p>No testimonials found.</p>
      )}
    </div>
  );
};

export default Testimonials;
