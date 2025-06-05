import React, { useState } from "react";

const AddBookForm = ({ onAdd, onClose }) => {
  const [formData, setFormData] = useState({ title:"", author:"", price:"" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded w-96 space-y-4">
        <h2 className="text-lg font-semibold">Add New Book</h2>

        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price (₹)"
          value={formData.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-3 py-1 rounded bg-gray-300">
            Cancel
          </button>
          <button type="submit" className="px-3 py-1 rounded bg-blue-600 text-white">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBookForm;
