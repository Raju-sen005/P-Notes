import React, { useState } from "react";
import axios from "axios";

const TestimonialForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    tag: "",
    message: "",
  });

  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      await axios.post("http://localhost:5000/api/testimonials", formData);
      setStatus("success");
      setFormData({ name: "", tag: "", message: "" });
      if (onAdd) {
        onAdd();
      }
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      setStatus("error");
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-success mb-4">Share your experience</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={formData.tag}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            Message
          </label>
          <textarea
            className="form-control"
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="btn btn-success"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Submission in progress.." : "Submit"}
        </button>
      </form>
      {status === "success" && (
        <div className="alert alert-success mt-3">
          Your testimonial has been submitted successfully!
        </div>
      )}
      {status === "error" && (
        <div className="alert alert-danger mt-3">
          There was an error submitting your testimonial. Please try again later.
        </div>
      )}
    </div>
  );
};

export default TestimonialForm;