import React, { useState } from "react";
import { motion } from "framer-motion";

const AddCourseForm = ({ onAdd, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === "price" ? Number(value) : value;
    setFormData({ ...formData, [name]: updatedValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
  };

  return (
    <motion.div
      className="fixed inset-0 bg-transparent flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.form
        onSubmit={handleSubmit}
        className="bg-transparent p-6 rounded w-96 space-y-4"
        initial={{ scale: 0.8, opacity: 0, y: -30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: -30 }}
        transition={{ duration: 0.3 }}
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          width: "50%",
          margin: "auto"
        }}
      >
        <h2 className="text-lg font-semibold text-white">Add New Course</h2>

        <motion.input
          whileFocus={{ scale: 1.02 }}
          name="title"
          placeholder="Course Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
          style={{ marginBottom: "10px" }}
        />
        <motion.textarea
          whileFocus={{ scale: 1.02 }}
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
          style={{ marginBottom: "10px" }}
        ></motion.textarea>
        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
          style={{ marginBottom: "10px" }}
        />

        <div className="flex justify-end gap-2">
          <motion.button
            type="button"
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            className="px-3 py-1 rounded text-white"
            style={{
              background: "#0D6EFD",
              border: "transparent",
              marginInline: "7px"
            }}
          >
            Cancel
          </motion.button>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-1 rounded text-white"
            style={{
              background: "#0D6EFD",
              border: "transparent",
              marginInline: "7px"
            }}
          >
            Add
          </motion.button>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default AddCourseForm;
