import React, { useEffect, useState } from "react";
import axios from "axios";
import TestimonialForm from "./TestimonialForm";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get("/api/testimonials");
      if (Array.isArray(response.data)) {
        setTestimonials(response.data);
      } else {
        setTestimonials([]);
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <section className="testimonials-section py-5 bg-light">
      <div className="container">
        <h2 className="text-center text-success mb-4">What Our Customers Say</h2>
        <TestimonialForm onAdd={fetchTestimonials} />
        {loading ? (
          <p className="text-center">Loading testimonials...</p>
        ) : testimonials.length > 0 ? (
          <div className="row">
            {testimonials.map((testimonial, index) => (
              <div className="col-md-6 col-lg-4 mb-4" key={index}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body d-flex flex-column">
                    <p className="card-text flex-grow-1">"{testimonial.message}"</p>
                    <div className="mt-3">
                      <h5 className="card-title mb-0 text-success">{testimonial.name}</h5>
                      <small className="text-muted">{testimonial.tag}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No testimonials found.</p>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
