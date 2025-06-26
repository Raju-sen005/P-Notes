import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const AddArticleForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        'https://p-notes-backend.onrender.com/api/admin/articles',
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage('Article added successfully!');
      setTitle('');
      setContent('');
    } catch (err) {
      console.error('Error adding article:', err);
      setMessage('Error adding article');
    }
  };

  return (
    <motion.div
      className="max-w-xl mx-auto p-6 bg-transparent rounded shadow d-flex flex-column text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        className="text-2xl font-bold mb-4"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Add New Article
      </motion.h2>

      {message && (
        <motion.p
          className="mb-4 text-green-600"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {message}
        </motion.p>
      )}

      <motion.form
        onSubmit={handleSubmit}
        style={{ padding: "15px" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="mb-2">
          <label className="block font-semibold mb-1 mx-2">Title</label>
          <motion.input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            whileFocus={{ scale: 1.02 }}
          />
        </div>

        <div className="mb-2">
          <label className="block font-semibold mb-1 mx-2" style={{position:"absolute",left:"34.5%"}}>Content</label>
          <motion.textarea
            className="w-full border border-gray-300 rounded px-3 py-2"
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            whileFocus={{ scale: 1.02 }}
            style={{    position: "relative",
    left: "2.5%",
    width: "22%"}}
          ></motion.textarea>
        </div>

        <motion.button
          type="submit"
          className="bg-green-600 text-white px-1 py-1 rounded hover:bg-blue-700"
          style={{ background: "#0D6EFD", border: "1px solid transparent" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Submit
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default AddArticleForm;