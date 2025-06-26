import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactPage = () => {
  const [status, setStatus] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const res = await fetch("https://p-notes-backend.onrender.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setStatus("Message saved successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      setStatus("Error sending message!");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen py-12 px-6 bg-gradient-to-r from-white to-teal-50 font-[Poppins,sans-serif]"
        style={{
        minHeight: "100vh",
        width: "100%",
        padding: "11px",
        backgroundImage: "url(https://img.freepik.com/free-vector/gradient-abstract-wireframe-background_23-2149009903.jpg?uid=R196801159&ga=GA1.1.1714141213.1744818376&semt=ais_hybrid&w=740)",
          // backgroundImage: "url('https://img.freepik.com/free-vector/medical-healthcare-blue-color_1017-26807.jpg')",
        backgroundSize: "cover",
        zIndex: 1,
      }}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="max-w-3xl mx-auto p-8 bg-transparent rounded-3xl shadow-xl"
      >
        <h1 className="text-4xl font-extrabold mb-6 text-white text-center">📬 Contact Us</h1>
        <p className="mb-8 text-white text-center text-lg">
          We'd love to hear from you! Please fill out the form and we’ll respond soon.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 d-flex flex-column p-4 m-auto" style={{alignItems:"center"}}>
          {['name', 'email', 'phone'].map((field, idx) => (
            <motion.input
              key={field}
              type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1) + (field !== 'phone' ? ' *' : '')}
              required={field !== 'phone'}
              className="inp w-50 p-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-400 outline-none transition mb-2"
              whileFocus={{ scale: 1.01 }}
            />
          ))}

          <motion.textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message *"
            required
            rows="5"
            className="inp w-50 p-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-400 outline-none transition resize-none mb-2"
            whileFocus={{ scale: 1.01 }}
          />

          <motion.button
            type="submit"
            className="w-full bg-primary hover:bg-teal-700 text-white py-1 font-semibold rounded shadow-md transition"
            style={{border:"transparent"}}
            whileTap={{ scale: 0.95 }}
          >
            Send Message
          </motion.button>
        </form>

        {status && (
          <motion.p
            className="mt-6 text-center text-teal-600 font-medium animate-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {status}
          </motion.p>
        )}

        <div className="mt-10 h-64 rounded-lg overflow-hidden shadow-md">
          <iframe
            title="Pharmacy Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.518387499178!2d75.78732137536038!3d26.862277362620914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db53bd6f1ce75%3A0x2e3e57e80de43e9c!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1717924929055!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ContactPage;