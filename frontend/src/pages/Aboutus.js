import React from 'react';
import { motion } from 'framer-motion';

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const AboutUs = () => {
  return (
    <motion.div
      className="container py-5 about-page"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <motion.h2 className="text-primary mb-4 fw-bold" variants={sectionVariants}>
        About Perfect Pharmacy
      </motion.h2>

      <motion.p className="lead" variants={sectionVariants}>
        <strong>Perfect Pharmacy</strong> is a dedicated platform created with the vision to support pharmacy students
        and professionals across India. We believe in simplifying education and making quality resources easily
        accessible to all.
      </motion.p>

      <motion.h4 className="text-success mt-5 section-heading" variants={sectionVariants}>🎯 Our Mission</motion.h4>
      <motion.p variants={sectionVariants}>
        To provide accurate, up-to-date, and easily understandable study materials, notes, and practice resources to help
        students excel in pharmacy education and exams.
      </motion.p>

      <motion.h4 className="text-success mt-4 section-heading" variants={sectionVariants}>📚 What We Offer</motion.h4>
      <motion.ul className="custom-list" variants={sectionVariants}>
        <li>Curated Pharmacy Notes (PDF)</li>
        <li>Books and Reference Materials</li>
        <li>Video Lectures</li>
        <li>Practice Questions and Quizzes</li>
        <li>Sample & Previous Year Papers</li>
      </motion.ul>

      <motion.h4 className="text-success mt-4 section-heading" variants={sectionVariants}>🌐 Why Choose Us?</motion.h4>
      <motion.ul className="custom-list" variants={sectionVariants}>
        <li>Free and Premium Learning Resources</li>
        <li>Content designed by experienced professionals</li>
        <li>Easy-to-navigate and user-friendly website</li>
        <li>Regular updates and latest syllabus coverage</li>
        <li>Responsive support team</li>
      </motion.ul>

      <motion.h4 className="text-success mt-4 section-heading" variants={sectionVariants}>📍 Location</motion.h4>
      <motion.p variants={sectionVariants}>
        Based in Jaipur, Rajasthan (India), our team is committed to supporting students across the nation with the best
        possible digital pharmacy education tools.
      </motion.p>

      <motion.h4 className="text-success mt-4 section-heading" variants={sectionVariants}>🤝 Contact Us</motion.h4>
      <motion.p variants={sectionVariants}>
        If you have any questions, feedback, or partnership opportunities, feel free to email us at:
        <br />
        <strong>pharmacyperfect20@gmail.com</strong>
      </motion.p>

      {/* Embedded Styles */}
      <style jsx>{`
        .about-page {
          font-family: 'Poppins', sans-serif;
          line-height: 1.7;
        }

        .section-heading {
          font-weight: 600;
        }

        .custom-list {
          padding-left: 1.2rem;
        }

        .custom-list li {
          margin-bottom: 0.4rem;
          list-style-type: circle;
        }
      `}</style>
    </motion.div>
  );
};

export default AboutUs;
